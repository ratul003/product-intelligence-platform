-- =============================================================================
-- Survival Analysis: Account Retention by Engagement Tier
-- =============================================================================
-- Methodology : Kaplan-Meier estimator
-- Unit of analysis : Customer account (MASTER_CUSTOMER_ID grain)
-- Survival event  : Contract churn / non-renewal (CONTRACT_END_DATE < observation end)
-- Censoring       : Accounts still active at observation end date
--
-- Engagement tier classification (set at cohort entry):
--   Engaged        → RAG_STATUS = 'Green'  (meets L1 product engagement threshold)
--   Low engagement → RAG_STATUS = 'Amber'  (active but below L1 threshold)
--   Non-engaged    → RAG_STATUS = 'Red' or NULL (minimal product usage)
--
-- To swap in L1-based classification instead of RAG_STATUS, replace the
-- engagement_tier CASE block with the L1 variant shown in the comments below.
--
-- Tables used:
--   TRANSFORM.KIMBALL_DATA_MODEL.DIM_ACCOUNT          — account master, ARR, contract dates
--   TRANSFORM.KIMBALL_DATA_MODEL.FACT_MONTHLY_CUSTOMER_USAGE — MAU signal (optional enrichment)
--   REPORTING.GAINSIGHTPX_REPORTS.FCT_GAINSIGHTPX_ENGAGEMENT — engagement score (optional)
--
-- Parameters (replace or bind):
--   :measurement_date     — cohort entry date (e.g. '2024-01-01')
--   :observation_end_date — last observation date (e.g. '2025-01-01')
-- =============================================================================

-- ── 1. Cohort: accounts with active contracts at measurement date ──────────────

WITH cohort AS (

    SELECT
        a.ACCOUNT_ID,
        a.ACCOUNT_NAME,
        a.MASTER_CUSTOMER_ID,
        a.ARR,
        a.CUSTOMER_BANDING,
        a.CONTRACT_START_DATE,
        a.CONTRACT_END_DATE,
        a.RENEWAL_DATE,
        a.RAG_STATUS,

        -- Engagement tier (RAG-based — swap with L1 block if preferred)
        CASE
            WHEN a.RAG_STATUS = 'Green' THEN 'Engaged'
            WHEN a.RAG_STATUS = 'Amber' THEN 'Low engagement'
            ELSE 'Non-engaged'
        END AS engagement_tier,

        -- ── L1-based alternative (uncomment and replace CASE above) ───────────
        -- Requires a mart table that tracks L1 status per account per month.
        -- Example: REPORTING.WELCOME.ACCOUNT_L1_STATUS or a custom dbt model.
        --
        -- CASE
        --     WHEN l1.L1_STATUS = 'MET'     THEN 'Engaged'
        --     WHEN l1.L1_STATUS = 'PARTIAL' THEN 'Low engagement'
        --     ELSE 'Non-engaged'
        -- END AS engagement_tier,
        -- ─────────────────────────────────────────────────────────────────────

        DATE('2024-01-01')  AS cohort_date,          -- :measurement_date
        DATE('2025-01-01')  AS observation_end        -- :observation_end_date

    FROM TRANSFORM.KIMBALL_DATA_MODEL.DIM_ACCOUNT a

    -- ── Optional: join L1 status mart (uncomment with L1 block above) ──────────
    -- LEFT JOIN REPORTING.WELCOME.ACCOUNT_L1_STATUS l1
    --     ON  l1.ACCOUNT_ID   = a.ACCOUNT_ID
    --     AND l1.MONTH        = DATE_TRUNC('month', DATE('2024-01-01'))
    -- ─────────────────────────────────────────────────────────────────────────

    WHERE a.HAS_ACTIVE_CONTRACT = TRUE
      AND a.CONTRACT_START_DATE <= DATE('2024-01-01')
      AND (a.CONTRACT_END_DATE IS NULL OR a.CONTRACT_END_DATE > DATE('2024-01-01'))

),

-- ── 2. Per-account survival record (duration + event flag) ───────────────────

survival_records AS (

    SELECT
        c.ACCOUNT_ID,
        c.ACCOUNT_NAME,
        c.MASTER_CUSTOMER_ID,
        c.ARR,
        c.CUSTOMER_BANDING,
        c.engagement_tier,

        -- Effective end: first of contract end or observation window
        LEAST(
            COALESCE(c.CONTRACT_END_DATE, c.observation_end),
            c.observation_end
        )                                                   AS effective_end_date,

        -- Duration in months from cohort entry to event/censoring
        DATEDIFF(
            'month',
            c.cohort_date,
            LEAST(
                COALESCE(c.CONTRACT_END_DATE, c.observation_end),
                c.observation_end
            )
        )                                                   AS duration_months,

        -- Event indicator: 1 = churned, 0 = censored (still active)
        CASE
            WHEN c.CONTRACT_END_DATE IS NOT NULL
             AND c.CONTRACT_END_DATE < c.observation_end
            THEN 1
            ELSE 0
        END                                                 AS churned

    FROM cohort c

),

-- ── 3. Month sequence (0–12) for KM table output ─────────────────────────────

month_seq AS (

    SELECT
        seq.VALUE::INT                          AS months_since_entry,
        DATEADD('month', seq.VALUE::INT, DATE('2024-01-01')) AS observation_month
    FROM TABLE(FLATTEN(INPUT => ARRAY_GENERATE_RANGE(0, 13))) seq

),

-- ── 4. At-risk and events per tier per month (KM input table) ─────────────────

km_input AS (

    SELECT
        s.engagement_tier,
        m.months_since_entry,
        m.observation_month,

        -- At-risk: accounts whose duration >= this month (still alive at start of month)
        COUNT_IF(s.duration_months >= m.months_since_entry)            AS n_at_risk,

        -- Events: accounts that churned exactly in this month
        COUNT_IF(s.churned = 1
             AND s.duration_months = m.months_since_entry)             AS n_events,

        -- Censored: accounts whose observation ended (without churn) in this month
        COUNT_IF(s.churned = 0
             AND s.duration_months = m.months_since_entry)             AS n_censored

    FROM survival_records s
    CROSS JOIN month_seq m
    GROUP BY 1, 2, 3

),

-- ── 5. Kaplan-Meier survival probability + Greenwood confidence interval ──────

km_curve AS (

    SELECT
        engagement_tier,
        months_since_entry,
        observation_month,
        n_at_risk,
        n_events,
        n_censored,

        -- Conditional survival for this interval: (n_at_risk - n_events) / n_at_risk
        CASE
            WHEN n_at_risk = 0 THEN NULL
            ELSE (n_at_risk - n_events) / n_at_risk
        END                                                 AS conditional_survival,

        -- Cumulative KM survival probability: PRODUCT of conditional survival over all months
        EXP(
            SUM(
                LN(NULLIF((n_at_risk - n_events) / NULLIF(n_at_risk::FLOAT, 0), 0))
            ) OVER (
                PARTITION BY engagement_tier
                ORDER BY months_since_entry
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
        )                                                   AS km_survival,

        -- Greenwood standard error: S(t) * SQRT(SUM(d_i / (n_i * (n_i - d_i))))
        EXP(
            SUM(
                LN(NULLIF((n_at_risk - n_events) / NULLIF(n_at_risk::FLOAT, 0), 0))
            ) OVER (
                PARTITION BY engagement_tier
                ORDER BY months_since_entry
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
        )
        * SQRT(
            SUM(
                n_events / NULLIF(n_at_risk * (n_at_risk - n_events)::FLOAT, 0)
            ) OVER (
                PARTITION BY engagement_tier
                ORDER BY months_since_entry
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
        )                                                   AS km_se

    FROM km_input

)

-- ── 6. Final output ───────────────────────────────────────────────────────────

SELECT
    engagement_tier,
    months_since_entry,
    observation_month,
    n_at_risk,
    n_events,
    n_censored,
    ROUND(conditional_survival, 4)              AS conditional_survival,
    ROUND(km_survival, 4)                       AS km_survival,
    ROUND(km_se, 4)                             AS km_se,

    -- 95% confidence interval (log-log transform for better small-sample behaviour)
    ROUND(GREATEST(km_survival - 1.96 * km_se, 0), 4)  AS km_ci_lower_95,
    ROUND(LEAST(km_survival + 1.96 * km_se, 1), 4)     AS km_ci_upper_95

FROM km_curve
ORDER BY engagement_tier, months_since_entry
;


-- =============================================================================
-- Supplementary: per-account survival records (Python input)
-- Run this separately to feed the lifelines KM fitter in survival_analysis.py
-- =============================================================================

SELECT
    ACCOUNT_ID,
    ACCOUNT_NAME,
    ARR,
    CUSTOMER_BANDING,
    engagement_tier,
    duration_months,
    churned
FROM (

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
            DATE('2024-01-01') AS cohort_date,
            DATE('2025-01-01') AS observation_end
        FROM TRANSFORM.KIMBALL_DATA_MODEL.DIM_ACCOUNT a
        WHERE a.HAS_ACTIVE_CONTRACT = TRUE
          AND a.CONTRACT_START_DATE <= DATE('2024-01-01')
          AND (a.CONTRACT_END_DATE IS NULL OR a.CONTRACT_END_DATE > DATE('2024-01-01'))
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

)
ORDER BY engagement_tier, duration_months
;
