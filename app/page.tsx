import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatPillProps {
  value: string;
  label: string;
}

interface PhaseCardProps {
  number: string;
  title: string;
  children: ReactNode;
}

interface FlywheelStepProps {
  index: number;
  title: string;
  description: string;
  isLast?: boolean;
}

interface MetricRowProps {
  product: string;
  definition: string;
  signal: string;
}

interface StackBadgeProps {
  name: string;
  category: string;
}

interface ColumnProps {
  title: string;
  subtitle: string;
  items: string[];
  audiences: string[];
  accent?: boolean;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatPill({ value, label }: StatPillProps) {
  return (
    <div
      style={{
        background: "var(--accent-muted)",
        border: "1px solid var(--accent-border)",
        borderRadius: "12px",
        padding: "18px 28px",
        textAlign: "center",
        minWidth: "140px",
      }}
    >
      <div
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#a5b4fc",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.78rem",
          color: "var(--foreground-muted)",
          marginTop: "4px",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: "0.7rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: "var(--accent)",
        marginBottom: "12px",
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
        fontWeight: 700,
        color: "var(--foreground)",
        letterSpacing: "-0.025em",
        lineHeight: 1.25,
        marginBottom: "16px",
      }}
    >
      {children}
    </h2>
  );
}

function SectionDescription({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: "1rem",
        color: "var(--foreground-muted)",
        lineHeight: 1.75,
        maxWidth: "600px",
      }}
    >
      {children}
    </p>
  );
}

function PhaseCard({ number, title, children }: PhaseCardProps) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "16px",
        padding: "32px",
        position: "relative",
        flex: 1,
        minWidth: "260px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "var(--accent-muted)",
            border: "1px solid var(--accent-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--accent)",
            flexShrink: 0,
          }}
        >
          {number}
        </div>
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--foreground-subtle)",
          }}
        >
          Phase {number}
        </div>
      </div>
      <h3
        style={{
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "var(--foreground)",
          marginBottom: "14px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <div style={{ fontSize: "0.92rem", color: "var(--foreground-muted)", lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

function TagPill({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "var(--surface-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        padding: "3px 10px",
        fontSize: "0.78rem",
        color: "var(--foreground-muted)",
        fontWeight: 500,
        marginTop: "10px",
        marginRight: "6px",
      }}
    >
      {children}
    </span>
  );
}

function PhaseConstraint({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: "16px",
        paddingTop: "14px",
        borderTop: "1px solid var(--border-subtle)",
        fontSize: "0.82rem",
        color: "var(--foreground-subtle)",
        lineHeight: 1.65,
      }}
    >
      <span
        style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#ef4444",
          marginRight: "6px",
        }}
      >
        Ceiling:
      </span>
      {children}
    </div>
  );
}

function FlywheelStep({ index, title, description, isLast = false }: FlywheelStepProps) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: "0" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "var(--accent-muted)",
            border: "2px solid var(--accent-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#a5b4fc",
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          {index}
        </div>
        {!isLast && (
          <div
            style={{
              width: "2px",
              flex: 1,
              minHeight: "28px",
              background: "var(--border)",
              marginTop: "2px",
              marginBottom: "2px",
            }}
          />
        )}
      </div>
      <div style={{ paddingLeft: "20px", paddingBottom: isLast ? "0" : "28px", paddingTop: "8px" }}>
        <h4
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: "4px",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h4>
        <p style={{ fontSize: "0.9rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

function MetricRow({ product, definition, signal }: MetricRowProps) {
  return (
    <tr
      style={{
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <td
        style={{
          padding: "14px 20px",
          fontSize: "0.88rem",
          fontWeight: 700,
          color: "#a5b4fc",
          whiteSpace: "nowrap",
        }}
      >
        {product}
      </td>
      <td
        style={{
          padding: "14px 20px",
          fontSize: "0.88rem",
          color: "var(--foreground)",
          lineHeight: 1.5,
        }}
      >
        {definition}
      </td>
      <td
        style={{
          padding: "14px 20px",
          fontSize: "0.82rem",
          color: "var(--foreground-muted)",
          lineHeight: 1.5,
        }}
      >
        {signal}
      </td>
    </tr>
  );
}

function StackBadge({ name, category }: StackBadgeProps) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "12px",
        padding: "18px 22px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)" }}>{name}</div>
      <div
        style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--foreground-subtle)",
        }}
      >
        {category}
      </div>
    </div>
  );
}

function ReportingColumn({ title, subtitle, items, audiences, accent = false }: ColumnProps) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: `1px solid ${accent ? "var(--accent-border)" : "var(--border-subtle)"}`,
        borderRadius: "16px",
        padding: "32px",
        flex: 1,
        minWidth: "260px",
      }}
    >
      <div
        style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: accent ? "var(--accent)" : "var(--foreground-subtle)",
          marginBottom: "8px",
        }}
      >
        {subtitle}
      </div>
      <h3
        style={{
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "var(--foreground)",
          marginBottom: "22px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--foreground-subtle)",
            marginBottom: "10px",
          }}
        >
          Use cases
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {items.map((item) => (
            <li
              key={item}
              style={{
                fontSize: "0.9rem",
                color: "var(--foreground-muted)",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: accent ? "var(--accent)" : "var(--foreground-subtle)", marginTop: "3px", flexShrink: 0 }}>→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--foreground-subtle)",
            marginBottom: "10px",
          }}
        >
          Audience
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {audiences.map((audience) => (
            <span
              key={audience}
              style={{
                background: accent ? "var(--accent-muted)" : "var(--surface-elevated)",
                border: `1px solid ${accent ? "var(--accent-border)" : "var(--border)"}`,
                borderRadius: "6px",
                padding: "3px 10px",
                fontSize: "0.78rem",
                color: accent ? "#a5b4fc" : "var(--foreground-muted)",
                fontWeight: 500,
              }}
            >
              {audience}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const sectionWrap: React.CSSProperties = {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px",
  };

  const divider: React.CSSProperties = {
    borderTop: "1px solid var(--border-subtle)",
    margin: "0",
  };

  const section: React.CSSProperties = {
    padding: "80px 0",
  };

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border-subtle)",
          background: "rgba(10, 10, 15, 0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            ...sectionWrap,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "60px",
          }}
        >
          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.01em" }}>
            Product Intelligence Platform
          </span>
          <span style={{ fontSize: "0.82rem", color: "var(--foreground-muted)", fontWeight: 500 }}>
            Wahid Tawsif Ratul
            <span style={{ color: "var(--foreground-subtle)", margin: "0 6px" }}>·</span>
            <span style={{ color: "var(--accent)" }}>Product Analytics Engineer</span>
          </span>
        </div>
      </nav>

      <main>
        {/* ── Hero ────────────────────────────────────────────────────────────── */}
        <section style={{ ...section, paddingTop: "100px", paddingBottom: "80px" }}>
          <div style={sectionWrap}>
            <SectionLabel>Case Study</SectionLabel>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                color: "var(--foreground)",
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                marginBottom: "20px",
                maxWidth: "780px",
              }}
            >
              Product Intelligence Platform
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "var(--foreground-muted)",
                lineHeight: 1.7,
                maxWidth: "620px",
                marginBottom: "48px",
              }}
            >
              From zero instrumentation to warehouse-native analytics across 8 SaaS products — designing the full
              stack, migrating it, and tying engagement back to ARR.
            </p>

            {/* Stat pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <StatPill value="30+" label="Segment Sources" />
              <StatPill value="8" label="Products Tracked" />
              <StatPill value="96" label="Dashboards" />
              <StatPill value="3-Tier" label="Reporting" />
            </div>
          </div>
        </section>

        <div style={divider} />

        {/* ── The Challenge ──────────────────────────────────────────────────── */}
        <section style={section}>
          <div style={sectionWrap}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "60px", alignItems: "start" }}>
              <div>
                <SectionLabel>The Problem</SectionLabel>
                <SectionHeading>Flying blind at scale</SectionHeading>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  {
                    title: "No product usage visibility",
                    body: "8 individual SaaS products had minimal or no event tracking. Engineering teams shipped features with no downstream instrumentation, making post-release analysis impossible.",
                  },
                  {
                    title: "Siloed, one-off reporting",
                    body: "Each team maintained disconnected spreadsheets and ad-hoc queries. There was no canonical definition of what 'active user' or 'engaged account' meant — every PM had their own version.",
                  },
                  {
                    title: "No cross-product or revenue linkage",
                    body: "Zero ability to track a customer journey across multiple Optimizely products, and no mechanism to link product behaviour to ARR — making engagement metrics unactionable for GTM teams.",
                  },
                ].map(({ title, body }) => (
                  <div
                    key={title}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "12px",
                      padding: "22px 26px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        marginBottom: "8px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--foreground-muted)", lineHeight: 1.7 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div style={divider} />

        {/* ── Three Phases ──────────────────────────────────────────────────── */}
        <section style={section}>
          <div style={sectionWrap}>
            <SectionLabel>Evolution</SectionLabel>
            <SectionHeading>Three phases of the platform</SectionHeading>
            <SectionDescription>
              The platform wasn&apos;t built in one shot. It evolved through three distinct phases — each solving the ceiling hit by the previous one.
            </SectionDescription>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "40px" }}>
              <PhaseCard number="1" title="Build the Foundation">
                <p>
                  Designed an event-based tracking model from scratch. Authored a company-wide{" "}
                  <strong style={{ color: "var(--foreground)" }}>Segment instrumentation contract</strong> covering the three event types:{" "}
                  <code
                    style={{
                      background: "var(--surface-elevated)",
                      borderRadius: "4px",
                      padding: "1px 6px",
                      fontSize: "0.85em",
                      color: "#a5b4fc",
                    }}
                  >
                    identify
                  </code>
                  ,{" "}
                  <code
                    style={{
                      background: "var(--surface-elevated)",
                      borderRadius: "4px",
                      padding: "1px 6px",
                      fontSize: "0.85em",
                      color: "#a5b4fc",
                    }}
                  >
                    group
                  </code>
                  ,{" "}
                  <code
                    style={{
                      background: "var(--surface-elevated)",
                      borderRadius: "4px",
                      padding: "1px 6px",
                      fontSize: "0.85em",
                      color: "#a5b4fc",
                    }}
                  >
                    track
                  </code>
                  .
                </p>
                <p style={{ marginTop: "10px" }}>
                  Established a cross-product identity spine via{" "}
                  <strong style={{ color: "var(--foreground)" }}>master_customer_id (MCID)</strong> — a common key that lets you follow a single account across all 8 products. Worked directly with 8+ engineering teams to instrument their services against the contract.
                </p>
                <div>
                  <TagPill>Segment</TagPill>
                  <TagPill>Event Schema</TagPill>
                  <TagPill>MCID</TagPill>
                  <TagPill>8 Teams</TagPill>
                </div>
              </PhaseCard>

              <PhaseCard number="2" title="Segment + Snowflake + Mixpanel">
                <p>
                  First full analytics stack deployed. Segment collected events and routed them to{" "}
                  <strong style={{ color: "var(--foreground)" }}>Snowflake</strong> (warehouse) and{" "}
                  <strong style={{ color: "var(--foreground)" }}>Mixpanel</strong> (reporting layer). PMs got their first self-serve dashboards.
                </p>
                <p style={{ marginTop: "10px" }}>
                  dbt models transformed raw event streams into clean, joinable tables. The stack ran in production and delivered real value before its limits became clear.
                </p>
                <div>
                  <TagPill>Snowflake</TagPill>
                  <TagPill>Mixpanel</TagPill>
                  <TagPill>dbt</TagPill>
                  <TagPill>Pipelines</TagPill>
                </div>
                <PhaseConstraint>
                  Sync fragility between Segment and Mixpanel caused data gaps. MTU-based Mixpanel pricing became unsustainable at scale. No ability to join warehouse tables (contracts, ARR) with behavioural data in Mixpanel.
                </PhaseConstraint>
              </PhaseCard>

              <PhaseCard number="3" title="Warehouse-Native Migration">
                <p>
                  Migrated to{" "}
                  <strong style={{ color: "var(--foreground)" }}>Optimizely Analytics (NetSpring)</strong> — a warehouse-native product analytics tool that queries Snowflake directly. No Segment sync, no MTU cost, no data copies.
                </p>
                <p style={{ marginTop: "10px" }}>
                  This unlocked ARR-linked engagement metrics: behavioural data could finally be JOINed with contract tables in the warehouse. Classic{" "}
                  <strong style={{ color: "var(--foreground)" }}>&quot;Opti on Opti&quot;</strong> dog-fooding — Optimizely building on its own analytics product.
                </p>
                <div>
                  <TagPill>OA / NetSpring</TagPill>
                  <TagPill>Warehouse-Native</TagPill>
                  <TagPill>ARR Linkage</TagPill>
                  <TagPill>No Sync</TagPill>
                </div>
              </PhaseCard>
            </div>
          </div>
        </section>

        <div style={divider} />

        {/* ── The Flywheel ───────────────────────────────────────────────────── */}
        <section style={section}>
          <div style={sectionWrap}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "60px", alignItems: "start" }}>
              <div>
                <SectionLabel>Methodology</SectionLabel>
                <SectionHeading>The analytics flywheel</SectionHeading>
                <SectionDescription>
                  Each step feeds the next. Instrumentation without metrics is noise. Metrics without dashboards are invisible. Dashboards without sprints are inert. Sprints without GTM are wasted.
                </SectionDescription>
              </div>
              <div style={{ marginTop: "8px" }}>
                <FlywheelStep
                  index={1}
                  title="Instrumentation"
                  description="Segment contracts authored, MCID-keyed events flowing across all 8 products. A clean, consistent event taxonomy that engineering teams could adopt."
                />
                <FlywheelStep
                  index={2}
                  title="Metrics with PMs"
                  description="Per-product engagement definitions co-designed with Product Managers — tied to what actually signals value delivery, not just activity. Each metric ratified and owned."
                />
                <FlywheelStep
                  index={3}
                  title="3-Tier Dashboards"
                  description="Executive (KPI roll-ups), Product (feature-level engagement), and Operational (account health, churn signals). 96 dashboards deployed across OA and PowerBI."
                />
                <FlywheelStep
                  index={4}
                  title="Analytics Sprints"
                  description="Regular sprint cadence to investigate signals — cohort drops, activation funnel leaks, adoption blockers. Insights delivered as structured findings to PMs."
                />
                <FlywheelStep
                  index={5}
                  title="GTM Strategy"
                  description="Analytics sprint outputs fed directly into Go-To-Market plays: expansion plays for power users, risk flags to CS, feature adoption insights to Marketing."
                  isLast={true}
                />
              </div>
            </div>
          </div>
        </section>

        <div style={divider} />

        {/* ── Agentic AI ────────────────────────────────────────────────────── */}
        <section style={section}>
          <div style={sectionWrap}>
            <SectionLabel>Extension</SectionLabel>
            <SectionHeading>Agentic AI tracking</SectionHeading>
            <SectionDescription>
              As Optimizely shipped AI features, the same Segment rails were extended — no new infrastructure needed. AI interactions are measured with exactly the same rigour as any other product feature.
            </SectionDescription>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginTop: "40px" }}>
              {[
                {
                  event: "TOOL_CALLED",
                  count: "1.16M events",
                  description:
                    "Fired every time an AI agent invokes a tool — function name, parameters, execution context, and outcome captured. Enables tool-level usage analysis and failure detection.",
                  color: "#a5b4fc",
                },
                {
                  event: "AGENT_EXECUTED",
                  count: "664K events",
                  description:
                    "Fires at agent-run completion with full context: model used, task type, latency, token usage, success/failure signal. The top-level engagement event for AI features.",
                  color: "#a5b4fc",
                },
                {
                  event: "AGENT_DIRECTORY",
                  count: "Catalogue",
                  description:
                    "A structured registry of deployed agents — name, purpose, owner, linked product. Used to make agent activity joinable with product and account context in Snowflake.",
                  color: "#a5b4fc",
                },
              ].map(({ event, count, description, color }) => (
                <div
                  key={event}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "14px",
                    padding: "26px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                    <code
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color,
                        background: "var(--accent-muted)",
                        border: "1px solid var(--accent-border)",
                        borderRadius: "6px",
                        padding: "3px 10px",
                        fontFamily: "ui-monospace, monospace",
                      }}
                    >
                      {event}
                    </code>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "var(--foreground-subtle)",
                      }}
                    >
                      {count}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--foreground-muted)", lineHeight: 1.7 }}>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={divider} />

        {/* ── Engagement Metrics ────────────────────────────────────────────── */}
        <section style={section}>
          <div style={sectionWrap}>
            <SectionLabel>Metric Design</SectionLabel>
            <SectionHeading>Engagement definitions tied to ARR</SectionHeading>
            <SectionDescription>
              Every engagement metric was co-designed with PMs and represents a meaningful signal of value delivery — not just a click count. All are queryable in Snowflake and joinable with contract data.
            </SectionDescription>

            <div
              style={{
                marginTop: "36px",
                background: "var(--surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid var(--border)",
                      background: "var(--surface-elevated)",
                    }}
                  >
                    {["Product", "Engagement Definition", "Behavioural Signal"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "14px 20px",
                          textAlign: "left",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--foreground-subtle)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <MetricRow
                    product="EXP"
                    definition="1+ qualified experiment in last 30 days"
                    signal="experiment_started · variation_activated"
                  />
                  <MetricRow
                    product="CMP"
                    definition="Core object created or updated in last 30 days"
                    signal="campaign_created · asset_saved · campaign_updated"
                  />
                  <MetricRow
                    product="Opal (AI)"
                    definition="Credit registration in last 90 days"
                    signal="credit_registered · generation_completed"
                  />
                  <MetricRow
                    product="ODP"
                    definition="Audience segment activated in last 30 days"
                    signal="segment_activated · audience_exported"
                  />
                  <MetricRow
                    product="PIM"
                    definition="Product record created or enriched in last 30 days"
                    signal="product_created · product_enriched · bulk_import"
                  />
                  <MetricRow
                    product="Search"
                    definition="Search query returning results in last 30 days"
                    signal="query_executed · result_clicked · index_updated"
                  />
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: "16px", fontSize: "0.82rem", color: "var(--foreground-subtle)", lineHeight: 1.6 }}>
              Definitions are windowed (30/90 day) to reduce noise from trial/churn edge cases. All metrics join to{" "}
              <code
                style={{
                  background: "var(--surface-elevated)",
                  borderRadius: "4px",
                  padding: "1px 6px",
                  fontSize: "0.85em",
                  color: "#a5b4fc",
                }}
              >
                contract_arr
              </code>{" "}
              via MCID for revenue-segment analysis.
            </p>
          </div>
        </section>

        <div style={divider} />

        {/* ── Reporting Architecture ────────────────────────────────────────── */}
        <section style={section}>
          <div style={sectionWrap}>
            <SectionLabel>Architecture</SectionLabel>
            <SectionHeading>Two-tool reporting stack</SectionHeading>
            <SectionDescription>
              The architecture deliberately separates product analytics from business intelligence — different audiences, different questions, different tooling.
            </SectionDescription>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "40px" }}>
              <ReportingColumn
                accent={true}
                title="Optimizely Analytics"
                subtitle="Product Analytics Layer"
                items={[
                  "Feature adoption funnels by cohort",
                  "Session and retention analysis",
                  "Experiment exposure and metric deltas",
                  "AI feature engagement (TOOL_CALLED, AGENT_EXECUTED)",
                  "Behavioural segmentation by account tier",
                ]}
                audiences={["Product Managers", "Analytics Engineers", "Designers"]}
              />
              <ReportingColumn
                accent={false}
                title="PowerBI"
                subtitle="Business Intelligence Layer"
                items={[
                  "ARR by product, segment, region",
                  "Renewal forecasting and churn risk",
                  "Contract expansion and contraction",
                  "CS account health scoring",
                  "Revenue-linked engagement KPIs",
                ]}
                audiences={["Sales", "Customer Success", "Finance", "Executive"]}
              />
            </div>
          </div>
        </section>

        <div style={divider} />

        {/* ── Tech Stack ────────────────────────────────────────────────────── */}
        <section style={{ ...section, paddingBottom: "60px" }}>
          <div style={sectionWrap}>
            <SectionLabel>Stack</SectionLabel>
            <SectionHeading>Technology used</SectionHeading>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px", marginTop: "32px" }}>
              <StackBadge name="Segment" category="Event Collection" />
              <StackBadge name="Snowflake" category="Data Warehouse" />
              <StackBadge name="dbt" category="Transformation" />
              <StackBadge name="Optimizely Analytics" category="Product Analytics" />
              <StackBadge name="PowerBI" category="Business Intelligence" />
              <StackBadge name="Mixpanel" category="Phase 2 Reporting" />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "28px 0",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            ...sectionWrap,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "0.82rem", color: "var(--foreground-subtle)" }}>
            Wahid Tawsif Ratul · Product Analytics Engineer · Optimizely
          </span>
          <a
            href="https://github.com/ratul003/product-intelligence-platform"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--foreground-muted)",
              textDecoration: "none",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "6px 14px",
              transition: "border-color 0.15s, color 0.15s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
