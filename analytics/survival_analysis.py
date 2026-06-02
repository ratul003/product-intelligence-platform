"""
Survival Analysis: Account Retention by Engagement Tier
========================================================
Methodology : Kaplan-Meier estimator via the `lifelines` library
Input       : Per-account survival records from survival_analysis.sql (supplementary query)
Output      : KM curves PNG, summary stats CSV, printed log-rank test results

Dependencies
------------
    pip install lifelines snowflake-connector-python pandas matplotlib

Usage
-----
    # Pull live data from Snowflake:
    python survival_analysis.py --source snowflake

    # Use local CSV (e.g. exported from OA / Snowflake worksheet):
    python survival_analysis.py --source csv --file survival_records.csv
"""

import argparse
import os
from pathlib import Path

import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from lifelines import KaplanMeierFitter
from lifelines.statistics import multivariate_logrank_test, logrank_test


# ── Configuration ─────────────────────────────────────────────────────────────

COHORT_DATE       = "2024-01-01"
OBSERVATION_END   = "2025-01-01"
OUTPUT_DIR        = Path(__file__).parent / "output"

TIER_COLORS = {
    "Engaged":        "#34d399",   # emerald  — meets L1 threshold
    "Low engagement": "#f59e0b",   # amber    — active but below L1
    "Non-engaged":    "#f43f5e",   # rose     — minimal usage
}

TIER_ORDER = ["Engaged", "Low engagement", "Non-engaged"]

SNOWFLAKE_CONFIG = {
    "account":   os.getenv("SNOWFLAKE_ACCOUNT",   "OPTIMIZELY_DATA_SERVICES"),
    "user":      os.getenv("SNOWFLAKE_USER",       "WAHIDRATUL"),
    "role":      os.getenv("SNOWFLAKE_ROLE",       "ANALYST"),
    "warehouse": os.getenv("SNOWFLAKE_WAREHOUSE",  "ANALYST_WH"),
    "database":  os.getenv("SNOWFLAKE_DATABASE",   "TRANSFORM"),
    "schema":    os.getenv("SNOWFLAKE_SCHEMA",     "KIMBALL_DATA_MODEL"),
    # authenticator: "externalbrowser" for SSO, or set SNOWFLAKE_PASSWORD env var
    "authenticator": os.getenv("SNOWFLAKE_AUTH", "externalbrowser"),
}

SURVIVAL_SQL = """
WITH cohort AS (
    SELECT
        a.ACCOUNT_ID,
        a.ACCOUNT_NAME,
        a.ARR,
        a.CUSTOMER_BANDING,
        CASE
            WHEN a.RAG_STATUS = 'Green' THEN 'Engaged'
            WHEN a.RAG_STATUS = 'Amber' THEN 'Low engagement'
            ELSE 'Non-engaged'
        END AS engagement_tier,
        DATE('{cohort_date}')       AS cohort_date,
        DATE('{observation_end}')   AS observation_end
    FROM TRANSFORM.KIMBALL_DATA_MODEL.DIM_ACCOUNT a
    WHERE a.HAS_ACTIVE_CONTRACT = TRUE
      AND a.CONTRACT_START_DATE  <= DATE('{cohort_date}')
      AND (a.CONTRACT_END_DATE IS NULL OR a.CONTRACT_END_DATE > DATE('{cohort_date}'))
)
SELECT
    ACCOUNT_ID,
    ACCOUNT_NAME,
    ARR,
    CUSTOMER_BANDING,
    engagement_tier,
    DATEDIFF('month', cohort_date,
        LEAST(COALESCE(CONTRACT_END_DATE, observation_end), observation_end)
    )  AS duration_months,
    CASE
        WHEN CONTRACT_END_DATE IS NOT NULL AND CONTRACT_END_DATE < observation_end
        THEN 1 ELSE 0
    END AS churned
FROM cohort
ORDER BY engagement_tier, duration_months
""".format(cohort_date=COHORT_DATE, observation_end=OBSERVATION_END)


# ── Data loading ──────────────────────────────────────────────────────────────

def load_from_snowflake() -> pd.DataFrame:
    import snowflake.connector
    print("Connecting to Snowflake...")
    conn = snowflake.connector.connect(**SNOWFLAKE_CONFIG)
    try:
        df = pd.read_sql(SURVIVAL_SQL, conn)
        df.columns = [c.lower() for c in df.columns]
        print(f"Loaded {len(df):,} account records from Snowflake.")
        return df
    finally:
        conn.close()


def load_from_csv(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)
    df.columns = [c.lower() for c in df.columns]
    required = {"engagement_tier", "duration_months", "churned"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"CSV is missing required columns: {missing}")
    print(f"Loaded {len(df):,} account records from {path}.")
    return df


def make_sample_data() -> pd.DataFrame:
    """Synthetic data matching the portfolio illustrative values."""
    import numpy as np
    rng = np.random.default_rng(42)

    tiers = {
        "Engaged":        {"n": 250, "median_survival": 24, "churn_rate": 0.04},
        "Low engagement": {"n": 100, "median_survival": 14, "churn_rate": 0.22},
        "Non-engaged":    {"n":  60, "median_survival":  6, "churn_rate": 0.51},
    }

    rows = []
    for tier, cfg in tiers.items():
        for _ in range(cfg["n"]):
            churned    = rng.random() < cfg["churn_rate"]
            duration   = int(rng.exponential(scale=cfg["median_survival"] / 0.693))
            duration   = max(1, min(duration, 12))
            rows.append({
                "engagement_tier": tier,
                "duration_months": duration,
                "churned":         int(churned),
                "arr":             float(rng.choice([50_000, 100_000, 250_000, 500_000])),
                "customer_banding": rng.choice(["SMB", "Mid-Market", "Enterprise"]),
            })

    df = pd.DataFrame(rows)
    print(f"Generated {len(df):,} synthetic account records (sample data).")
    return df


# ── Kaplan-Meier fitting ──────────────────────────────────────────────────────

def fit_km(df: pd.DataFrame) -> dict[str, KaplanMeierFitter]:
    fitters = {}
    for tier in TIER_ORDER:
        subset = df[df["engagement_tier"] == tier]
        if subset.empty:
            print(f"Warning: no records for tier '{tier}', skipping.")
            continue
        kmf = KaplanMeierFitter(label=tier)
        kmf.fit(
            durations=subset["duration_months"],
            event_observed=subset["churned"],
        )
        fitters[tier] = kmf
        median = kmf.median_survival_time_
        print(f"  {tier:22s}  n={len(subset):4d}  median survival={median:.1f} months")
    return fitters


# ── Statistical tests ─────────────────────────────────────────────────────────

def run_logrank_tests(df: pd.DataFrame) -> None:
    print("\n── Log-rank tests ──────────────────────────────────────────────")

    # Overall multivariate test (all 3 tiers)
    result = multivariate_logrank_test(
        event_durations=df["duration_months"],
        groups=df["engagement_tier"],
        event_observed=df["churned"],
    )
    print(f"All tiers  χ²={result.test_statistic:.2f}  p={result.p_value:.4f}"
          f"  {'*significant*' if result.p_value < 0.05 else 'not significant'}")

    # Pairwise tests
    pairs = [
        ("Engaged", "Low engagement"),
        ("Engaged", "Non-engaged"),
        ("Low engagement", "Non-engaged"),
    ]
    for t1, t2 in pairs:
        g1 = df[df["engagement_tier"] == t1]
        g2 = df[df["engagement_tier"] == t2]
        if g1.empty or g2.empty:
            continue
        r = logrank_test(
            durations_A=g1["duration_months"], event_observed_A=g1["churned"],
            durations_B=g2["duration_months"], event_observed_B=g2["churned"],
        )
        print(f"  {t1} vs {t2:<22s}  p={r.p_value:.4f}"
              f"  {'*' if r.p_value < 0.05 else ''}")


# ── Survival table output ─────────────────────────────────────────────────────

def build_summary_table(fitters: dict[str, KaplanMeierFitter]) -> pd.DataFrame:
    frames = []
    for tier, kmf in fitters.items():
        tbl = kmf.survival_function_.reset_index()
        tbl.columns = ["duration_months", "km_survival"]
        ci  = kmf.confidence_interval_.reset_index()
        ci.columns = ["duration_months", "km_ci_lower_95", "km_ci_upper_95"]
        merged = tbl.merge(ci, on="duration_months")
        merged.insert(0, "engagement_tier", tier)
        frames.append(merged)
    return pd.concat(frames, ignore_index=True)


# ── Plotting ──────────────────────────────────────────────────────────────────

def plot_km_curves(fitters: dict[str, KaplanMeierFitter], output_path: Path) -> None:
    fig, ax = plt.subplots(figsize=(10, 6))
    fig.patch.set_facecolor("#0a0a0f")
    ax.set_facecolor("#0d0d18")

    for spine in ax.spines.values():
        spine.set_color("#2a2a3a")

    ax.tick_params(colors="#6b7280", which="both")
    ax.xaxis.label.set_color("#9ca3af")
    ax.yaxis.label.set_color("#9ca3af")
    ax.title.set_color("#e5e7eb")

    for tier in TIER_ORDER:
        if tier not in fitters:
            continue
        kmf   = fitters[tier]
        color = TIER_COLORS[tier]
        t     = kmf.survival_function_.index.values
        s     = kmf.survival_function_.values.flatten()
        lo    = kmf.confidence_interval_.iloc[:, 0].values
        hi    = kmf.confidence_interval_.iloc[:, 1].values

        ax.step(t, s, where="post", color=color, linewidth=2.5, label=tier)
        ax.fill_between(t, lo, hi, step="post", alpha=0.12, color=color)

    # Gridlines
    ax.set_ylim(0, 1.02)
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda v, _: f"{v:.0%}"))
    ax.set_yticks([0, 0.25, 0.5, 0.75, 1.0])
    ax.grid(axis="y", color="#1e1e2e", linewidth=1, linestyle="--")
    ax.grid(axis="x", color="#1e1e2e", linewidth=0.5, linestyle=":")

    ax.set_xlabel("Months since cohort entry", fontsize=11)
    ax.set_ylabel("Survival probability (retention)", fontsize=11)
    ax.set_title(
        "Account Survival by Engagement Tier — Kaplan-Meier",
        fontsize=13, fontweight="bold", pad=14,
    )

    legend_patches = [
        mpatches.Patch(color=TIER_COLORS[tier], label=tier)
        for tier in TIER_ORDER if tier in fitters
    ]
    ax.legend(
        handles=legend_patches,
        facecolor="#12121f", edgecolor="#2a2a3a",
        labelcolor="white", fontsize=10,
        loc="lower left",
    )

    # Annotation: median lines
    for tier, kmf in fitters.items():
        median = kmf.median_survival_time_
        if median and not pd.isna(median):
            ax.axvline(x=median, color=TIER_COLORS[tier], linestyle=":", alpha=0.4, linewidth=1)

    plt.tight_layout()
    fig.savefig(output_path, dpi=150, bbox_inches="tight", facecolor=fig.get_facecolor())
    print(f"\nPlot saved → {output_path}")
    plt.close(fig)


def plot_km_by_arr_band(df: pd.DataFrame, tier: str, output_path: Path) -> None:
    """Secondary plot: KM curves for a single tier, split by ARR band."""
    if "arr" not in df.columns:
        return

    subset = df[df["engagement_tier"] == tier].copy()
    subset["arr_band"] = pd.cut(
        subset["arr"],
        bins=[0, 100_000, 300_000, float("inf")],
        labels=["< $100K", "$100K–$300K", "> $300K"],
    )

    fig, ax = plt.subplots(figsize=(9, 5))
    fig.patch.set_facecolor("#0a0a0f")
    ax.set_facecolor("#0d0d18")
    for spine in ax.spines.values():
        spine.set_color("#2a2a3a")
    ax.tick_params(colors="#6b7280")

    band_colors = {"< $100K": "#6366f1", "$100K–$300K": "#818cf8", "> $300K": "#a5b4fc"}

    for band, color in band_colors.items():
        grp = subset[subset["arr_band"] == band]
        if grp.empty:
            continue
        kmf = KaplanMeierFitter(label=f"{band} ARR")
        kmf.fit(grp["duration_months"], event_observed=grp["churned"])
        t  = kmf.survival_function_.index.values
        s  = kmf.survival_function_.values.flatten()
        lo = kmf.confidence_interval_.iloc[:, 0].values
        hi = kmf.confidence_interval_.iloc[:, 1].values
        ax.step(t, s, where="post", color=color, linewidth=2, label=f"{band} (n={len(grp)})")
        ax.fill_between(t, lo, hi, step="post", alpha=0.1, color=color)

    ax.set_ylim(0, 1.02)
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda v, _: f"{v:.0%}"))
    ax.grid(axis="y", color="#1e1e2e", linewidth=1, linestyle="--")
    ax.set_xlabel("Months since cohort entry", fontsize=10)
    ax.set_ylabel("Survival probability", fontsize=10)
    ax.set_title(f"Survival by ARR Band — {tier}", fontsize=12, fontweight="bold",
                 color="#e5e7eb", pad=12)
    ax.legend(facecolor="#12121f", edgecolor="#2a2a3a", labelcolor="white", fontsize=9)

    plt.tight_layout()
    fig.savefig(output_path, dpi=150, bbox_inches="tight", facecolor=fig.get_facecolor())
    print(f"ARR-band plot saved → {output_path}")
    plt.close(fig)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Survival analysis — engagement tier KM curves")
    parser.add_argument("--source", choices=["snowflake", "csv", "sample"],
                        default="sample", help="Data source")
    parser.add_argument("--file",   default="survival_records.csv",
                        help="CSV path (only used when --source csv)")
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # ── Load data ─────────────────────────────────────────────────────────────
    if args.source == "snowflake":
        df = load_from_snowflake()
    elif args.source == "csv":
        df = load_from_csv(args.file)
    else:
        df = make_sample_data()

    print(f"\nCohort size : {len(df):,} accounts")
    print(df["engagement_tier"].value_counts().to_string())
    print(f"\nChurn rate  : {df['churned'].mean():.1%} overall")

    # ── Fit KM ────────────────────────────────────────────────────────────────
    print("\n── Kaplan-Meier fit ────────────────────────────────────────────")
    fitters = fit_km(df)

    # ── Log-rank tests ────────────────────────────────────────────────────────
    run_logrank_tests(df)

    # ── Summary table ─────────────────────────────────────────────────────────
    summary = build_summary_table(fitters)
    csv_path = OUTPUT_DIR / "km_survival_by_tier.csv"
    summary.to_csv(csv_path, index=False)
    print(f"\nSummary table saved → {csv_path}")
    print(summary.pivot(index="duration_months", columns="engagement_tier",
                        values="km_survival").round(3).to_string())

    # ── Plots ─────────────────────────────────────────────────────────────────
    plot_km_curves(fitters, OUTPUT_DIR / "km_curves_by_tier.png")

    for tier in TIER_ORDER:
        if tier in fitters:
            safe = tier.lower().replace(" ", "_")
            plot_km_by_arr_band(df, tier, OUTPUT_DIR / f"km_arr_band_{safe}.png")

    print("\nDone.")


if __name__ == "__main__":
    main()
