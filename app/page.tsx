"use client";

import React from "react";
import type { ReactNode } from "react";

// ─── Primitives ──────────────────────────────────────────────────────────────

function Label({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "8px",
      fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase",
      letterSpacing: "0.15em", color: "var(--accent)", marginBottom: "14px",
    }}>
      <span style={{
        width: "6px", height: "6px", borderRadius: "50%",
        background: "var(--accent)", display: "inline-block",
        boxShadow: "0 0 6px var(--accent-glow)",
      }} />
      {children}
    </div>
  );
}

function Heading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={className} style={{
      fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800,
      letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "16px",
    }}>
      {children}
    </h2>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: "1rem", color: "var(--foreground-muted)", lineHeight: 1.8, maxWidth: "640px" }}>
      {children}
    </p>
  );
}

function Tag({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span style={{
      display: "inline-block",
      background: color ? `${color}15` : "var(--surface-elevated)",
      border: `1px solid ${color ? `${color}30` : "var(--border)"}`,
      borderRadius: "6px", padding: "3px 11px", fontSize: "0.77rem",
      color: color ?? "var(--foreground-muted)", fontWeight: 500,
      marginTop: "8px", marginRight: "6px",
    }}>
      {children}
    </span>
  );
}

// ─── Phase card ──────────────────────────────────────────────────────────────

function Phase({ n, title, children, constraint }: {
  n: string; title: string; children: ReactNode; constraint?: string;
}) {
  return (
    <div className="card-hover card-tier card-tier-indigo" style={{
      background: "var(--surface)", border: "1px solid var(--border-subtle)",
      borderRadius: "16px", padding: "28px 26px", flex: 1, minWidth: "260px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "var(--accent-muted)", border: "1px solid var(--accent-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.78rem", fontWeight: 800, color: "var(--accent)", flexShrink: 0,
          boxShadow: "0 0 12px rgba(99,102,241,0.2)",
        }}>
          {n}
        </div>
        <span style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)" }}>
          Phase {n}
        </span>
      </div>
      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "12px", letterSpacing: "-0.01em" }}>
        {title}
      </h3>
      <div style={{ fontSize: "0.88rem", color: "var(--foreground-muted)", lineHeight: 1.7 }}>{children}</div>
      {constraint && (
        <div style={{
          marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)",
          fontSize: "0.79rem", color: "var(--foreground-subtle)", lineHeight: 1.6,
        }}>
          <span style={{
            fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "#ef4444", marginRight: "6px",
          }}>Ceiling:</span>
          {constraint}
        </div>
      )}
    </div>
  );
}

// ─── Dashboard Tier card ──────────────────────────────────────────────────────

function DashTier({ tier, label, audience, color, borderClass, dashboards, metrics }: {
  tier: string; label: string; audience: string; color: string; borderClass: string;
  dashboards: string[]; metrics: string[];
}) {
  return (
    <div className={`card-hover card-tier ${borderClass}`} style={{
      background: "var(--surface)", border: "1px solid var(--border-subtle)",
      borderRadius: "16px", overflow: "hidden",
    }}>
      <div style={{
        background: `${color}0d`, borderBottom: "1px solid var(--border-subtle)",
        padding: "18px 22px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "4px" }}>
              {audience}
            </div>
            <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--foreground)" }}>{label}</div>
          </div>
          <div style={{
            background: `${color}18`, border: `1px solid ${color}30`,
            borderRadius: "8px", padding: "6px 12px", textAlign: "center",
          }}>
            <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color }}>
              Tier
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color, lineHeight: 1 }}>{tier}</div>
          </div>
        </div>
      </div>
      <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <div style={{
            fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "var(--foreground-subtle)", marginBottom: "8px",
          }}>
            Dashboard types
          </div>
          {dashboards.map((d) => (
            <div key={d} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "6px 0", borderBottom: "1px solid var(--border-subtle)",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, flexShrink: 0 }} />
              <span style={{ fontSize: "0.84rem", color: "var(--foreground-muted)" }}>{d}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{
            fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "var(--foreground-subtle)", marginBottom: "8px",
          }}>
            Metric types
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {metrics.map((m) => (
              <span key={m} style={{
                background: `${color}10`, border: `1px solid ${color}28`,
                borderRadius: "5px", padding: "3px 9px",
                fontSize: "0.75rem", color, fontWeight: 500,
              }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GTM Play card ───────────────────────────────────────────────────────────

function GTMPlay({ vertical, signal, finding, play, outcome }: {
  vertical: string; signal: string; finding: string; play: string; outcome: string;
}) {
  const steps = [
    { label: "Signal", text: signal, color: "var(--foreground-subtle)" },
    { label: "Sprint Finding", text: finding, color: "var(--foreground-muted)" },
    { label: "GTM Play", text: play, color: "var(--foreground)" },
    { label: "Outcome", text: outcome, color: "#a5b4fc" },
  ];
  return (
    <div className="card-hover card-tier card-tier-indigo" style={{
      background: "var(--surface)", border: "1px solid var(--border-subtle)",
      borderRadius: "16px", overflow: "hidden",
    }}>
      <div style={{
        background: "rgba(99,102,241,0.07)", borderBottom: "1px solid var(--border-subtle)",
        padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#a5b4fc" }}>{vertical}</span>
        <div style={{ display: "flex", gap: "4px" }}>
          {["Signal", "Sprint", "Play", "Outcome"].map((s, i) => (
            <span key={s} style={{
              width: "28px", height: "4px", borderRadius: "2px",
              background: i === 3 ? "var(--accent)" : "rgba(99,102,241,0.25)",
            }} />
          ))}
        </div>
      </div>
      <div style={{ padding: "22px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {steps.map(({ label, text, color }) => (
          <div key={label} style={{
            background: label === "Outcome" ? "rgba(99,102,241,0.06)" : "transparent",
            border: label === "Outcome" ? "1px solid rgba(99,102,241,0.18)" : "none",
            borderRadius: "10px", padding: label === "Outcome" ? "14px" : "0",
          }}>
            <div style={{
              fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "0.12em", color: label === "Outcome" ? "var(--accent)" : "var(--foreground-subtle)",
              marginBottom: "6px",
            }}>
              {label}
            </div>
            <p style={{ fontSize: "0.85rem", color, lineHeight: 1.65 }}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Metric Rationale Card ────────────────────────────────────────────────────

// MetricCard removed: metric section now presents metric types + a coverage
// matrix instead of per-product Level 1 definitions.

// ─── Tool Logos ──────────────────────────────────────────────────────────────

const TOOLS: Record<string, { color: string; bg: string; svg: React.ReactNode; category: string }> = {
  Segment: {
    color: "#52BD94", bg: "#52BD9415",
    category: "Event Collection",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M18 7H10a5 5 0 0 0 0 10h3" stroke="#52BD94" strokeWidth="2" strokeLinecap="round"/><path d="M6 17h8a5 5 0 0 0 0-10H9" stroke="#52BD94" strokeWidth="2" strokeLinecap="round" opacity="0.55"/><circle cx="18" cy="7" r="2" fill="#52BD94"/><circle cx="6" cy="17" r="2" fill="#52BD94" opacity="0.55"/></svg>,
  },
  Snowflake: {
    color: "#29B5E8", bg: "#29B5E815",
    category: "Data Warehouse",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><line x1="12" y1="2" x2="12" y2="22" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/><line x1="2" y1="12" x2="22" y2="12" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/><line x1="5.5" y1="5.5" x2="18.5" y2="18.5" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/><line x1="18.5" y1="5.5" x2="5.5" y2="18.5" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="2.5" fill="#29B5E8"/></svg>,
  },
  dbt: {
    color: "#FF694B", bg: "#FF694B15",
    category: "Transformation",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="#FF694B" strokeWidth="1.8" strokeLinejoin="round"/><path d="M4 7L12 12L20 7" stroke="#FF694B" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/><line x1="12" y1="12" x2="12" y2="22" stroke="#FF694B" strokeWidth="1.8" opacity="0.5"/></svg>,
  },
  "Optimizely Analytics": {
    color: "#6366f1", bg: "#6366f115",
    category: "Product Analytics",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><circle cx="12" cy="12" r="9" stroke="#6366f1" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="#6366f1" opacity="0.25"/><circle cx="12" cy="12" r="1.5" fill="#6366f1"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/></svg>,
  },
  PowerBI: {
    color: "#F2C811", bg: "#F2C81115",
    category: "Business Intelligence",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><rect x="14" y="4" width="6" height="16" rx="1.5" fill="#F2C811"/><rect x="8" y="9" width="5" height="11" rx="1.5" fill="#F2C811" opacity="0.7"/><rect x="2" y="14" width="5" height="6" rx="1.5" fill="#F2C811" opacity="0.4"/></svg>,
  },
  Salesforce: {
    color: "#00A1E0", bg: "#00A1E015",
    category: "CRM · Revenue",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M10.5 6.5a3.5 3.5 0 0 1 6.8 1.2 2.8 2.8 0 0 1 2 4.9 3.5 3.5 0 0 1-3.3 4.9H8a3 3 0 0 1-.7-5.9A3.5 3.5 0 0 1 10.5 6.5Z" stroke="#00A1E0" strokeWidth="1.6" fill="#00A1E0" fillOpacity="0.12" strokeLinejoin="round"/></svg>,
  },
  Fivetran: {
    color: "#0073FF", bg: "#0073FF15",
    category: "SaaS Connectors",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><circle cx="12" cy="4" r="2.5" fill="#0073FF"/><circle cx="4" cy="20" r="2.5" fill="#0073FF" opacity="0.6"/><circle cx="20" cy="20" r="2.5" fill="#0073FF" opacity="0.6"/><path d="M12 6.5L5 17.8M12 6.5L19 17.8M6.5 20h11" stroke="#0073FF" strokeWidth="1.5"/></svg>,
  },
  "Segment Unify": {
    color: "#34D399", bg: "#34D39915",
    category: "Identity Graph",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><circle cx="8" cy="8" r="3" stroke="#34D399" strokeWidth="1.8"/><circle cx="16" cy="16" r="3" stroke="#34D399" strokeWidth="1.8"/><path d="M10.5 10.5L13.5 13.5" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round"/><circle cx="16" cy="8" r="1.5" fill="#34D399" opacity="0.4"/><circle cx="8" cy="16" r="1.5" fill="#34D399" opacity="0.4"/></svg>,
  },
  Airbyte: {
    color: "#615EFF", bg: "#615EFF15",
    category: "Data Ingestion",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M12 3L20 19H4L12 3Z" stroke="#615EFF" strokeWidth="1.8" strokeLinejoin="round" fill="#615EFF" fillOpacity="0.12"/><line x1="8.5" y1="15" x2="15.5" y2="15" stroke="#615EFF" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  Mixpanel: {
    color: "#7856FF", bg: "#7856FF15",
    category: "Phase 1 · Replaced",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M4 18V9L12 15L20 9V18" stroke="#7856FF" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="6" r="2.5" fill="#7856FF" opacity="0.6"/></svg>,
  },
  Python: {
    color: "#3776AB", bg: "#3776AB15",
    category: "Backend Instrumentation",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M12 2C9 2 8 3.5 8 5v3h4.5v1H5.5C3.5 9 2 10.5 2 13s1.4 4 3.5 4H7v-2.5C7 12.5 8.5 11 11 11h6c2 0 3-1.2 3-3V5c0-2-1.5-3-8-3Z" fill="#3776AB" fillOpacity="0.8"/><circle cx="10" cy="5.5" r="1" fill="white"/><path d="M12 22c3 0 4-1.5 4-3v-3h-4.5v-1h6.5c2 0 3.5-1.5 3.5-4s-1.4-4-3.5-4H17v2.5C17 11.5 15.5 13 13 13H7c-2 0-3 1.2-3 3v3c0 2 1.5 3 8 3Z" fill="#FFD43B" fillOpacity="0.9"/><circle cx="14" cy="18.5" r="1" fill="#3776AB"/></svg>,
  },
  "Reverse ETL": {
    color: "#F59E0B", bg: "#F59E0B15",
    category: "Activation",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M4 12H20M14 6l6 6-6 6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 12H4M10 18l-6-6 6-6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/></svg>,
  },
  Coda: {
    color: "#E03E2D", bg: "#E03E2D15",
    category: "Reporting · ELT",
    svg: <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#E03E2D" strokeWidth="1.8"/><path d="M7 8h10M7 12h7M7 16h5" stroke="#E03E2D" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
};

function ToolCard({ name }: { name: string }) {
  const t = TOOLS[name];
  if (!t) return null;
  return (
    <div className="card-hover" style={{
      background: t.bg,
      border: `1px solid ${t.color}22`,
      borderRadius: "12px", padding: "16px",
      display: "flex", flexDirection: "column", gap: "10px",
    }}>
      <div style={{ width: "28px", height: "28px", flexShrink: 0 }}>{t.svg}</div>
      <div>
        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.01em" }}>{name}</div>
        <div style={{ fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: t.color, marginTop: "3px", opacity: 0.85 }}>{t.category}</div>
      </div>
    </div>
  );
}

// ─── Pipeline Diagram ─────────────────────────────────────────────────────────

function PipelineDiagram() {
  const node = (label: string, sub: string, color: string, w = "auto") => (
    <div style={{
      background: `${color}0e`, border: `1px solid ${color}28`,
      borderRadius: "10px", padding: "10px 14px", minWidth: w,
      display: "flex", flexDirection: "column", gap: "3px", flexShrink: 0,
    }}>
      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--foreground)", whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ fontSize: "0.65rem", color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap" }}>{sub}</span>
    </div>
  );
  const arrow = (label?: string) => (
    <div style={{
      display: "flex", flexDirection: "row",
      alignItems: "center", gap: "3px", flexShrink: 0,
      color: "var(--foreground-subtle)", fontSize: "0.65rem",
    }}>
      {label && <span style={{ whiteSpace: "nowrap" }}>{label}</span>}
      <span style={{ fontSize: "1rem", opacity: 0.5 }}>→</span>
    </div>
  );

  return (
    <div style={{ overflowX: "auto", paddingBottom: "8px" }}>
      {/* Row 1: Products */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", flexWrap: "nowrap" }}>
        <span style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--foreground-subtle)", marginRight: "4px", whiteSpace: "nowrap" }}>User Events</span>
        {["Experimentation", "Content Marketing Platform", "Opal AI", "Optimizely Data Platform", "Product Recommendations", "Content Management System", "Search & Navigation", "Configured Commerce"].map((p) => (
          <div key={p} style={{
            background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: "6px", padding: "4px 10px", fontSize: "0.72rem", fontWeight: 700,
            color: "#a5b4fc", whiteSpace: "nowrap",
          }}>{p}</div>
        ))}
      </div>

      {/* Connector line down */}
      <div style={{ display: "flex", gap: "6px", alignItems: "flex-start", marginBottom: "6px" }}>
        <div style={{ width: "80px", flexShrink: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "1px", height: "16px", background: "rgba(99,102,241,0.3)" }} />
          <span style={{ color: "var(--foreground-subtle)", fontSize: "0.75rem" }}>↓</span>
        </div>
      </div>

      {/* Row 2: Collection → Warehouse → Models */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "nowrap" }}>
        {node("Segment", "real-time event stream", "#52BD94", "160px")}
        {arrow("+ SaaS connectors")}
        {node("Snowflake", "raw event storage", "#29B5E8", "160px")}
        {arrow("dbt models")}
        {node("Transformed Models", "dimensional + reporting layer", "#FF694B", "210px")}
      </div>

      {/* Connector + split */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "6px", marginLeft: "450px" }}>
        <div style={{ display: "flex", gap: "60px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "1px", height: "14px", background: "rgba(99,102,241,0.3)" }} />
            <span style={{ color: "var(--foreground-subtle)", fontSize: "0.75rem" }}>↓</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "1px", height: "14px", background: "rgba(99,102,241,0.3)" }} />
            <span style={{ color: "var(--foreground-subtle)", fontSize: "0.75rem" }}>↓</span>
          </div>
        </div>
      </div>

      {/* Row 3: OA + PowerBI */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginLeft: "420px", marginBottom: "6px", flexWrap: "nowrap" }}>
        {node("Optimizely Analytics", "product analytics · PM-facing", "#6366f1", "200px")}
        <div style={{ width: "20px" }} />
        {node("PowerBI", "business intelligence", "#F2C811", "160px")}
      </div>

      {/* Row 4: Reverse ETL arrow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "520px", marginBottom: "6px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "1px", height: "14px", background: "rgba(245,158,11,0.4)" }} />
          <span style={{ color: "#F59E0B", fontSize: "0.65rem" }}>↓ Reverse ETL</span>
        </div>
      </div>

      {/* Row 5: Salesforce */}
      <div style={{ marginLeft: "460px" }}>
        {node("Salesforce", "account health · CS workflows · activation", "#00A1E0", "260px")}
      </div>
    </div>
  );
}

// ─── Agent Execution Flow ─────────────────────────────────────────────────────

function AgentExecFlow() {
  const steps: { label: string; sub: string; color: string; annotation: { event: string; desc: string; color: string } | null }[] = [
    { label: "User Prompt", sub: "Opal interface", color: "#a5b4fc", annotation: null },
    { label: "Agent Router", sub: "selects agent type", color: "#818cf8", annotation: { event: "Discovery event", desc: "Which agents are found and opened — discoverability measured at entry", color: "#c4b5fd" } },
    { label: "Tool Chain", sub: "sequential invocations", color: "#6366f1", annotation: { event: "Tool invocation", desc: "Every call: name · execution context · outcome · latency", color: "#818cf8" } },
    { label: "LLM Inference", sub: "per tool call", color: "#4f46e5", annotation: null },
    { label: "Response", sub: "streamed output", color: "#34d399", annotation: { event: "Agent execution", desc: "Task completion: agent type · context · success signal", color: "#6366f1" } },
  ];
  return (
    <div>
      {steps.map(({ label, sub, color, annotation }, i) => (
        <div key={label}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              background: `${color}10`, border: `1px solid ${color}30`,
              borderRadius: "10px", padding: "10px 20px", textAlign: "center",
              width: "200px", flexShrink: 0,
            }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--foreground)" }}>{label}</div>
              <div style={{ fontSize: "0.65rem", color, marginTop: "2px" }}>{sub}</div>
            </div>
            {annotation && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "24px", height: "1px", background: `${annotation.color}50` }} />
                <div style={{
                  background: `${annotation.color}0a`, border: `1px solid ${annotation.color}28`,
                  borderRadius: "8px", padding: "8px 14px", borderLeft: `2px solid ${annotation.color}70`,
                }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: annotation.color, marginBottom: "3px" }}>{annotation.event}</div>
                  <div style={{ fontSize: "0.64rem", color: "var(--foreground-subtle)", lineHeight: 1.45 }}>{annotation.desc}</div>
                </div>
              </div>
            )}
          </div>
          {i < steps.length - 1 && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div style={{ width: "200px", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "1px", height: "10px", background: `${color}35` }} />
                <div style={{ fontSize: "0.55rem", color: `${color}80` }}>▼</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── OOTB Agent Card ──────────────────────────────────────────────────────────

function OOTBAgent({ name, desc, color }: {
  name: string; desc: string; color: string;
}) {
  return (
    <div className="card-hover card-tier card-tier-indigo" style={{
      background: "var(--surface)", border: "1px solid var(--border-subtle)",
      borderRadius: "12px", padding: "18px",
    }}>
      <div style={{ marginBottom: "8px" }}>
        <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.3 }}>{name}</span>
      </div>
      <p style={{ fontSize: "0.79rem", color: "var(--foreground-muted)", lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

// ─── Cloud mark ───────────────────────────────────────────────────────────────

function CloudMark({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A3.5 3.5 0 0 1 17 18H7Z"
        stroke={color} strokeWidth="1.6" fill={`${color}20`} strokeLinejoin="round" />
    </svg>
  );
}

// ─── Multi-cloud ingestion → Segment → destinations ───────────────────────────

function CloudSourcesIngestion() {
  const sources = [
    { name: "GCP", color: "#4285F4", sub: "product backends" },
    { name: "AWS", color: "#FF9900", sub: "product services" },
    { name: "Azure", color: "#0078D4", sub: "DXP services" },
    { name: "Web & Mobile", color: "#a5b4fc", sub: "client SDKs" },
    { name: "SaaS APIs", color: "#52BD94", sub: "connector sources" },
  ];
  const stages = [
    { label: "Sources", sub: "HTTP API + SDK ingest", color: "#52BD94" },
    { label: "Tracking Plan", sub: "schema validation gate", color: "#34D399" },
    { label: "Functions", sub: "transform · enrich · normalise", color: "#6366f1" },
    { label: "Real-time routing", sub: "stream fan-out", color: "#818cf8" },
  ];
  const dests = [
    { name: "Snowflake", color: "#29B5E8", sub: "raw event storage" },
    { name: "Mixpanel", color: "#7856FF", sub: "Phase 1 dashboards" },
  ];
  const colHead = (t: string) => (
    <div style={{ fontSize: "0.56rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "12px", textAlign: "center" }}>{t}</div>
  );
  const arrow = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", fontSize: "1.2rem", opacity: 0.7 }}>→</div>
  );
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1.25fr auto 1fr", gap: "10px", alignItems: "center" }}>
      {/* Sources */}
      <div>
        {colHead("Multi-cloud sources")}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {sources.map((s) => (
            <div key={s.name} style={{ display: "flex", alignItems: "center", gap: "9px", background: `${s.color}0e`, border: `1px solid ${s.color}28`, borderRadius: "9px", padding: "8px 11px" }}>
              <CloudMark color={s.color} />
              <div>
                <div style={{ fontSize: "0.77rem", fontWeight: 700, color: "var(--foreground)" }}>{s.name}</div>
                <div style={{ fontSize: "0.6rem", color: s.color, fontWeight: 600 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {arrow}
      {/* Segment hub */}
      <div style={{ background: "rgba(82,189,148,0.06)", border: "1px solid rgba(82,189,148,0.3)", borderRadius: "16px", padding: "16px 14px", boxShadow: "0 0 32px rgba(82,189,148,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
          <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#52BD94" }}>Segment</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.54rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#34D399", background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "20px", padding: "2px 8px" }}>
            <span className="stat-glow" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#34D399", boxShadow: "0 0 6px #34D399" }} /> real-time
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {stages.map((st, i) => (
            <div key={st.label}>
              <div style={{ background: `${st.color}10`, border: `1px solid ${st.color}28`, borderRadius: "8px", padding: "7px 10px", textAlign: "center" }}>
                <div style={{ fontSize: "0.73rem", fontWeight: 700, color: "var(--foreground)" }}>{st.label}</div>
                <div style={{ fontSize: "0.59rem", color: st.color, fontWeight: 600 }}>{st.sub}</div>
              </div>
              {i < stages.length - 1 && <div style={{ textAlign: "center", color: "var(--foreground-subtle)", fontSize: "0.7rem", lineHeight: 1.2 }}>↓</div>}
            </div>
          ))}
        </div>
      </div>
      {arrow}
      {/* Destinations */}
      <div>
        {colHead("Destinations")}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {dests.map((d) => (
            <div key={d.name} style={{ background: `${d.color}0e`, border: `1px solid ${d.color}28`, borderRadius: "9px", padding: "10px 12px" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--foreground)" }}>{d.name}</div>
              <div style={{ fontSize: "0.6rem", color: d.color, fontWeight: 600 }}>{d.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── In-flight event transformation (arbitrary payload) ───────────────────────

function EventTransform() {
  const card = (title: string, color: string, tag: string, lines: [string, string][]) => (
    <div style={{ flex: 1, minWidth: "230px", background: "var(--surface)", border: `1px solid ${color}2e`, borderRadius: "12px", overflow: "hidden" }}>
      <div style={{ background: `${color}0e`, borderBottom: `1px solid ${color}22`, padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 700, color }}>{title}</span>
        <span style={{ fontSize: "0.54rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--foreground-subtle)" }}>{tag}</span>
      </div>
      <div style={{ padding: "12px 14px", fontFamily: "ui-monospace, monospace", fontSize: "0.72rem", lineHeight: 1.65 }}>
        <span style={{ color: "var(--foreground-subtle)" }}>{"{"}</span>
        {lines.map(([k, v]) => (
          <div key={k} style={{ paddingLeft: "12px" }}>
            <span style={{ color: "#a5b4fc" }}>{k}</span>
            <span style={{ color: "var(--foreground-subtle)" }}>: </span>
            <span style={{ color: "var(--foreground-muted)" }}>{v}</span>
          </div>
        ))}
        <span style={{ color: "var(--foreground-subtle)" }}>{"}"}</span>
      </div>
    </div>
  );
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        {card("Raw event in", "#7856FF", "from source", [
          ["obj", "\"object.action\""],
          ["uid", "\"raw-source-id\""],
          ["ts", "1699048800"],
          ["meta", "{ src: \"gcp\" }"],
        ])}
        <div style={{ color: "var(--accent)", fontSize: "1.3rem", fontWeight: 700 }}>→</div>
        {card("Normalised + enriched out", "#52BD94", "to warehouse", [
          ["event", "\"Product_Object_Action\""],
          ["user", "\"actor@•••\""],
          ["account_key", "\"acct_•••\""],
          ["is_internal", "false"],
          ["release_qtr", "\"Qx-YY\""],
          ["ts", "\"ISO-8601\""],
        ])}
      </div>
      <p style={{ marginTop: "12px", fontSize: "0.7rem", color: "var(--foreground-subtle)", fontStyle: "italic", lineHeight: 1.6 }}>
        Field names illustrative: not production schema. Functions normalise event naming, attach the canonical account key and identity, flag internal traffic, and drop PII before fan-out.
      </p>
    </div>
  );
}

// ─── Snowflake customization → Mixpanel + OA reporting paths ───────────────────

function SnowflakeReportingPaths() {
  const inWarehouse = [
    { name: "Event data", color: "#52BD94" },
    { name: "Billing / usage", color: "#F2C811" },
    { name: "CRM mirror (ARR)", color: "#00A1E0" },
  ];
  const pathBox = (header: string, headerColor: string, sub: string, items: string[], borderColor: string) => (
    <div style={{ background: "var(--surface)", border: `1px solid ${borderColor}`, borderRadius: "12px", overflow: "hidden" }}>
      <div style={{ background: `${headerColor}14`, padding: "8px 14px", borderBottom: "1px solid var(--border-subtle)" }}>
        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: headerColor }}>{header}</span>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontSize: "0.68rem", color: "var(--foreground-subtle)", marginBottom: "8px" }}>{sub}</div>
        {items.map((d) => (
          <div key={d} style={{ display: "flex", gap: "7px", alignItems: "center", padding: "4px 0" }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: headerColor, flexShrink: 0 }} />
            <span style={{ fontSize: "0.78rem", color: "var(--foreground-muted)" }}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: "640px" }}>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "8px", flexWrap: "nowrap" }}>
          {inWarehouse.map((s) => (
            <div key={s.name} style={{ background: `${s.color}12`, border: `1px solid ${s.color}30`, borderRadius: "8px", padding: "6px 13px", fontSize: "0.74rem", fontWeight: 700, color: "var(--foreground)", whiteSpace: "nowrap" }}>{s.name}</div>
          ))}
        </div>
        <div style={{ textAlign: "center", color: "var(--foreground-subtle)", fontSize: "0.7rem" }}>↓ already stored in the warehouse</div>
        <div style={{ margin: "8px auto", maxWidth: "440px", background: "rgba(41,181,232,0.07)", border: "1px solid rgba(41,181,232,0.3)", borderRadius: "14px", padding: "14px 18px", textAlign: "center", boxShadow: "0 0 28px rgba(41,181,232,0.07)" }}>
          <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#29B5E8" }}>Snowflake</div>
          <div style={{ fontSize: "0.7rem", color: "var(--foreground-muted)", marginTop: "4px", lineHeight: 1.5 }}>Custom transformation layer: SQL models, joins, derived tables. Behaviour + ARR modelled together in one place.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "32%", marginBottom: "6px" }}>
          <span style={{ color: "#7856FF", fontSize: "0.66rem", fontWeight: 700 }}>↓ Phase 1</span>
          <span style={{ color: "#818cf8", fontSize: "0.66rem", fontWeight: 700 }}>↓ Phase 2+</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          {pathBox("→ Mixpanel", "#7856FF", "Synced subset · behavioural dashboards", ["Product usage funnels", "Retention cohorts", "Feature adoption"], "var(--border-subtle)")}
          {pathBox("→ Optimizely Analytics", "#818cf8", "Warehouse-native · ARR-joined dashboards", ["Engagement × ARR by segment", "Cross-product cohorts", "Executive + CS views"], "rgba(99,102,241,0.28)")}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard → audience → decision usability map ─────────────────────────────

function DashboardUsabilityMap() {
  const rows = [
    { dash: "Engagement × ARR", aud: "Executive / Steerco", dec: "Where to invest · board narrative", color: "#f59e0b" },
    { dash: "Feature adoption funnels", aud: "Product Managers", dec: "Roadmap prioritisation", color: "#6366f1" },
    { dash: "Account health scores", aud: "Customer Success", dec: "Churn intervention before risk", color: "#10b981" },
    { dash: "Opal usage & attach", aud: "Sales / GTM", dec: "AI expansion targeting", color: "#a5b4fc" },
  ];
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: "560px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {rows.map((r) => (
          <div key={r.dash} style={{ display: "grid", gridTemplateColumns: "1.1fr auto 1fr auto 1.3fr", gap: "10px", alignItems: "center", background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "10px", padding: "11px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: r.color, flexShrink: 0, boxShadow: `0 0 6px ${r.color}80` }} />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--foreground)" }}>{r.dash}</span>
            </div>
            <span style={{ color: "var(--foreground-subtle)", fontSize: "0.8rem" }}>→</span>
            <span style={{ fontSize: "0.77rem", color: "var(--foreground-muted)" }}>{r.aud}</span>
            <span style={{ color: r.color, fontSize: "0.8rem" }}>→</span>
            <span style={{ fontSize: "0.77rem", fontWeight: 600, color: r.color }}>{r.dec}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Per-product reporting depth ───────────────────────────────────────────────

function PerProductReporting() {
  const products = [
    {
      name: "Web & Feature Experimentation", color: "#6366f1",
      flavor: "Experiment program health",
      views: ["Program KPIs & velocity", "Experiment stage length", "Adoption KPIs", "Outcome & primary-metric lift", "Benchmark by sub-industry", "At-risk accounts"],
    },
    {
      name: "Content Management System", color: "#818cf8",
      flavor: "Authoring & content-creation behaviour",
      views: ["Users & clients", "Content creation", "Editing activity", "Projects", "Editorial distribution", "Feature & block enhancements"],
    },
    {
      name: "Content Marketing Platform", color: "#10b981",
      flavor: "Seat utilisation & regional adoption",
      views: ["User seats", "Year-over-year adoption", "Regional summary", "Core-object engagement"],
    },
    {
      name: "Product Recommendations", color: "#34d399",
      flavor: "Commerce outcomes",
      views: ["Average order value", "Units per order", "Conversion rate", "Site revenue", "Devices & referrers", "Order time-of-day"],
    },
    {
      name: "Optimizely Data Platform", color: "#a5b4fc",
      flavor: "Activation & audience engagement",
      views: ["Monthly active users", "Feature usage", "Audience activation", "Channel engagement"],
    },
    {
      name: "Campaign", color: "#f59e0b",
      flavor: "Omnichannel deliverability & performance",
      views: ["Opens · clicks · bounces", "Unsubscribe trends", "Send day & time-of-day", "Subject-line analysis", "Industry benchmark"],
    },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px" }}>
      {products.map((p) => (
        <div key={p.name} className="card-hover" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "14px", overflow: "hidden" }}>
          <div style={{ background: `${p.color}0d`, borderBottom: "1px solid var(--border-subtle)", padding: "14px 18px" }}>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "5px" }}>{p.name}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.61rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: p.color }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: p.color }} />
              {p.flavor}
            </div>
          </div>
          <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 14px" }}>
            {p.views.map((v) => (
              <div key={v} style={{ display: "flex", gap: "7px", alignItems: "flex-start" }}>
                <span style={{ color: p.color, fontSize: "0.6rem", marginTop: "3px", flexShrink: 0 }}>▪</span>
                <span style={{ fontSize: "0.75rem", color: "var(--foreground-muted)", lineHeight: 1.4 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Pipeline guardrails (data observability) ──────────────────────────────────

function PipelineGuardrails() {
  const stages = [
    { label: "Schema validation", sub: "tracking-plan enforced", color: "#52BD94" },
    { label: "Volume anomaly", sub: "spike / drop alerts", color: "#34D399" },
    { label: "Freshness SLA", sub: "landed-by guarantees", color: "#6366f1" },
    { label: "Transformation tests", sub: "model assertions in CI", color: "#818cf8" },
    { label: "Drift alerts", sub: "routed to the gate owner", color: "#a5b4fc" },
  ];
  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "nowrap", gap: "0", marginBottom: "16px", minWidth: "640px" }}>
          {stages.map((s, i) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ background: `${s.color}10`, border: `1px solid ${s.color}28`, borderRadius: "10px", padding: "10px 14px", textAlign: "center" }}>
                <div style={{ fontSize: "0.77rem", fontWeight: 700, color: "var(--foreground)", whiteSpace: "nowrap" }}>{s.label}</div>
                <div style={{ fontSize: "0.61rem", color: s.color, marginTop: "2px", whiteSpace: "nowrap" }}>{s.sub}</div>
              </div>
              {i < stages.length - 1 && <div style={{ color: "var(--foreground-subtle)", margin: "0 6px" }}>→</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: "10px", padding: "12px 18px", display: "flex", alignItems: "center", gap: "11px" }}>
        <span className="stat-glow" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34D399", boxShadow: "0 0 8px #34D399", flexShrink: 0 }} />
        <span style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", lineHeight: 1.55 }}>
          <strong style={{ color: "#34D399" }}>Data Health view</strong>: every guardrail rolls up into one freshness + quality dashboard. When a number looks wrong, you can see why before anyone has to ask.
        </span>
      </div>
    </div>
  );
}

// ─── Metric governance ─────────────────────────────────────────────────────────

function MetricGovernance() {
  const tiers = [
    { tier: "Certified", desc: "Single owner, reviewed definition, governed folder: safe for board, finance, and CS use.", color: "#34d399", icon: "✓" },
    { tier: "Experimental", desc: "Analyst exploration and forks: clearly separated, never used for commercial decisions.", color: "#f59e0b", icon: "~" },
  ];
  const registry: [string, string][] = [
    ["Owner", "named PM + analyst"],
    ["Definition", "one canonical SQL source"],
    ["Window", "engaged = core action L30D"],
    ["Freshness", "last-validated timestamp"],
    ["Consumers", "dbt → OA → PowerBI"],
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
      <div className="card-hover" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "14px", padding: "20px" }}>
        <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>Two-tier metric layer</div>
        {tiers.map((t) => (
          <div key={t.tier} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: `${t.color}15`, border: `1px solid ${t.color}35`, display: "flex", alignItems: "center", justifyContent: "center", color: t.color, fontSize: "0.7rem", fontWeight: 800, flexShrink: 0 }}>{t.icon}</div>
            <div>
              <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--foreground)" }}>{t.tier}</div>
              <div style={{ fontSize: "0.76rem", color: "var(--foreground-muted)", lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-hover" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "14px", padding: "20px" }}>
        <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>Every certified metric carries</div>
        {registry.map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "6px 0", borderBottom: "1px solid var(--border-subtle)" }}>
            <span style={{ fontSize: "0.76rem", color: "var(--foreground-subtle)" }}>{k}</span>
            <span style={{ fontSize: "0.76rem", color: "var(--foreground-muted)", fontWeight: 600, textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Metric coverage matrix (WX / FX / P13N separated) ─────────────────────────

// ─── Survival curve (Kaplan-Meier style) ─────────────────────────────────────

function SurvivalCurveChart() {
  const [hover, setHover] = React.useState<number | null>(null);
  const W = 720, H = 280, padL = 38, padR = 14, padT = 20, padB = 32;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const x = (i: number) => padL + (i / (months.length - 1)) * plotW;
  const y = (v: number) => padT + (1 - v / 100) * plotH;
  const cGrid = "#1a1a28", cAxis = "#4a4a68", cSurface = "#111119";

  const series = [
    { name: "Engaged (Level 1 met)", color: "#34d399", values: [100, 99, 98, 97, 96, 96, 95, 95, 94, 94, 93, 93, 92] },
    { name: "Low engagement", color: "#f59e0b", values: [100, 97, 93, 89, 85, 81, 78, 75, 72, 70, 68, 66, 64] },
    { name: "Non-engaged", color: "#f43f5e", values: [100, 93, 85, 76, 68, 61, 55, 50, 46, 42, 39, 36, 34] },
  ];

  const riskRows = [
    { tier: "Engaged", share: "~61%", prob: "~4%", action: "Expansion & upsell outreach", color: "#34d399" },
    { tier: "Low engagement", share: "~24%", prob: "~22%", action: "Activation programme (CS-led)", color: "#f59e0b" },
    { tier: "Non-engaged", share: "~15%", prob: "~51%", action: "CSM escalation, save plays", color: "#f43f5e" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "14px", padding: "18px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--foreground)" }}>Survival probability by engagement tier</div>
            <div style={{ fontSize: "0.72rem", color: "var(--foreground-subtle)", marginTop: "2px" }}>probability of retention · months post-measurement</div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "20px", padding: "4px 11px" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)" }}>Kaplan-Meier · illustrative</span>
          </div>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} onMouseLeave={() => setHover(null)}>
          {[0, 25, 50, 75, 100].map((g) => (
            <g key={g}>
              <line x1={padL} y1={y(g)} x2={W - padR} y2={y(g)} stroke={cGrid} strokeWidth="1" />
              <text x={padL - 6} y={y(g) + 3} textAnchor="end" fontSize="9" fill={cAxis}>{g}%</text>
            </g>
          ))}
          {months.map((m, i) => (
            <text key={m} x={x(i)} y={H - padB + 16} textAnchor="middle" fontSize="9" fill={cAxis}>M{m}</text>
          ))}
          {series.map((s) => (
            <polyline key={s.name} points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          ))}
          {series.map((s) => s.values.map((v, i) => (
            <circle key={`${s.name}-${i}`} cx={x(i)} cy={y(v)} r={hover === i ? 6 : 3} fill={s.color} stroke={cSurface} strokeWidth="1.5" />
          )))}
          {months.map((_, i) => (
            <rect key={`h-${i}`} x={x(i) - (plotW / (months.length - 1)) / 2} y={padT} width={plotW / (months.length - 1)} height={plotH} fill="transparent" onMouseEnter={() => setHover(i)} />
          ))}
          {hover !== null && (() => {
            const lineH = 26, bW = 260, bH = 30 + series.length * lineH;
            const tx = Math.min(Math.max(x(hover) + 16, padL), W - padR - bW);
            return (
              <g>
                <line x1={x(hover)} y1={padT} x2={x(hover)} y2={padT + plotH} stroke={cAxis} strokeWidth="1" opacity="0.4" />
                <rect x={tx} y={padT + 6} width={bW} height={bH} rx="10" fill="#0d0d18" stroke="#2a2a40" strokeWidth="1.5" opacity="0.97" />
                <text x={tx + 14} y={padT + 22} fontSize="13" fontWeight="700" fill={cAxis}>Month {months[hover]}</text>
                {series.map((s, k) => (
                  <g key={s.name}>
                    <circle cx={tx + 17} cy={padT + 38 + k * lineH} r="6" fill={s.color} />
                    <text x={tx + 30} y={padT + 43 + k * lineH} fontSize="12" fill="#e8e8f0">{s.name}</text>
                    <text x={tx + bW - 14} y={padT + 43 + k * lineH} textAnchor="end" fontSize="13" fontWeight="800" fill={s.color}>{s.values[hover]}%</text>
                  </g>
                ))}
              </g>
            );
          })()}
        </svg>
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "8px" }}>
          {series.map((s) => (
            <span key={s.name} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "12px", height: "3px", borderRadius: "2px", background: s.color }} />
              <span style={{ fontSize: "0.72rem", color: "var(--foreground-muted)" }}>{s.name}</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "560px", border: "1px solid var(--border-subtle)", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.7fr 0.8fr 2fr", background: "var(--surface-elevated)", borderBottom: "1px solid var(--border-subtle)" }}>
            {["Risk tier", "Account share", "12-month churn probability", "CS action triggered"].map((h) => (
              <div key={h} style={{ padding: "9px 14px", fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--foreground-subtle)" }}>{h}</div>
            ))}
          </div>
          {riskRows.map((r, i) => (
            <div key={r.tier} style={{ display: "grid", gridTemplateColumns: "1.1fr 0.7fr 0.8fr 2fr", borderBottom: i < riskRows.length - 1 ? "1px solid var(--border-subtle)" : "none", alignItems: "center" }}>
              <div style={{ padding: "11px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: r.color, flexShrink: 0, boxShadow: `0 0 6px ${r.color}60` }} />
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--foreground)" }}>{r.tier}</span>
              </div>
              <div style={{ padding: "11px 14px", fontSize: "0.82rem", color: "var(--foreground-muted)" }}>{r.share}</div>
              <div style={{ padding: "11px 14px", fontSize: "0.82rem", fontWeight: 700, color: r.color }}>{r.prob}</div>
              <div style={{ padding: "11px 14px", fontSize: "0.78rem", color: "var(--foreground-muted)" }}>{r.action}</div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: "0.68rem", color: "var(--foreground-subtle)", fontStyle: "italic", lineHeight: 1.55 }}>
        Illustrative survival curves and probabilities, representative of the model output shape. Actual thresholds and churn rates are internal.
      </p>
    </div>
  );
}

// ─── dbt model DAG ────────────────────────────────────────────────────────────

function DbtModelDag() {
  const layers = [
    {
      name: "Staging",
      prefix: "stg_",
      color: "#52BD94",
      desc: "Raw source cleaning. One model per source table. No joins.",
      models: [
        { name: "stg_segment_events", note: "events stream" },
        { name: "stg_salesforce_accounts", note: "CRM accounts" },
        { name: "stg_billing_usage", note: "usage + credits" },
        { name: "stg_opal_interactions", note: "AI agent events" },
      ],
    },
    {
      name: "Intermediate",
      prefix: "int_",
      color: "#818cf8",
      desc: "Business logic and joins. Not exposed directly to consumers.",
      models: [
        { name: "int_account_identity", note: "id resolution" },
        { name: "int_event_dedup", note: "deduplication" },
        { name: "int_account_engagement", note: "session + activity" },
        { name: "int_experiment_results", note: "qualified exp logic" },
      ],
    },
    {
      name: "Mart",
      prefix: "fct_ / dim_",
      color: "#6366f1",
      desc: "Dimensional models. The layer consumed by OA and PowerBI.",
      models: [
        { name: "fct_account_engagement", note: "Level 1 metrics" },
        { name: "fct_experiment_results", note: "exp outcomes" },
        { name: "dim_accounts", note: "account spine + ARR" },
        { name: "dim_products", note: "product hierarchy" },
      ],
    },
    {
      name: "Reporting",
      prefix: "rpt_",
      color: "#f59e0b",
      desc: "Pre-aggregated for dashboards. Thin slice on top of mart.",
      models: [
        { name: "rpt_level1_metrics", note: "monthly engagement" },
        { name: "rpt_opal_usage", note: "Opal credit billing" },
        { name: "rpt_gtm_signals", note: "expansion flags" },
        { name: "rpt_exec_summary", note: "board / steerco" },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", alignItems: "start" }}>
        {layers.map((layer, li) => (
          <div key={layer.name} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ background: `${layer.color}10`, border: `1px solid ${layer.color}30`, borderRadius: "10px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.88rem", fontWeight: 700, color: layer.color }}>{layer.name}</span>
              <code style={{ fontSize: "0.65rem", background: `${layer.color}18`, border: `1px solid ${layer.color}30`, borderRadius: "4px", padding: "1px 6px", color: layer.color, fontFamily: "ui-monospace, monospace" }}>{layer.prefix}</code>
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--foreground-subtle)", lineHeight: 1.5, paddingLeft: "2px" }}>{layer.desc}</div>
            {layer.models.map((m) => (
              <div key={m.name} style={{ background: "var(--surface)", border: `1px solid ${layer.color}20`, borderRadius: "8px", padding: "7px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                <code style={{ fontSize: "0.72rem", color: "var(--foreground)", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>{m.name}</code>
                <span style={{ fontSize: "0.62rem", color: layer.color, fontWeight: 600, whiteSpace: "nowrap" }}>{m.note}</span>
              </div>
            ))}
            {li < layers.length - 1 && (
              <div style={{ textAlign: "center", color: "var(--foreground-subtle)", fontSize: "1rem", display: "none" }}>→</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
        {layers.map((l, i) => (
          <React.Fragment key={l.name}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: l.color }}>{l.name}</span>
            {i < layers.length - 1 && <span style={{ color: "var(--foreground-subtle)", fontSize: "0.8rem" }}>→</span>}
          </React.Fragment>
        ))}
        <span style={{ fontSize: "0.7rem", color: "var(--foreground-subtle)" }}>· model materialisation: views (stg/int), tables (mart/rpt)</span>
      </div>
    </div>
  );
}

// ─── Segment pipeline detail ──────────────────────────────────────────────────

function SegmentPipelineDetail() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
        {[
          {
            step: "01", label: "Source intake",
            detail: "Two ingest paths: client-side via the JavaScript Analytics.js SDK (browser events, page calls, UI interactions) and server-side via the HTTP Tracking API (backend events, async queues). Both paths flow into the same Segment source.",
            color: "#52BD94",
          },
          {
            step: "02", label: "Protocols enforcement",
            detail: "Every incoming event is validated against the Tracking Plan in Segment Protocols. Events not in the plan are blocked at ingestion: not routed, not warehoused. Schema drift never reaches the warehouse silently.",
            color: "#6366f1",
          },
          {
            step: "03", label: "Functions (transform)",
            detail: "Segment Functions enrich events in-flight: canonical account key attached, PII stripped from properties, internal traffic flagged, event names normalised to the Product_Object_Action convention before fan-out.",
            color: "#818cf8",
          },
          {
            step: "04", label: "Destination routing",
            detail: "Enriched events fan out to destinations: Snowflake (raw storage, via the Data Warehouse destination), Mixpanel (Phase 1 PM analytics, now deprecated), and a webhook destination for Reverse ETL back into Salesforce.",
            color: "#f59e0b",
          },
        ].map(({ step, label, detail, color }) => (
          <div key={step} className="card-hover" style={{ background: "var(--surface)", border: `1px solid ${color}22`, borderRadius: "12px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${color}18`, border: `1px solid ${color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800, color, flexShrink: 0 }}>{step}</div>
              <span style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--foreground)" }}>{label}</span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}>{detail}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(82,189,148,0.05)", border: "1px solid rgba(82,189,148,0.2)", borderRadius: "12px", padding: "14px 18px" }}>
        <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#52BD94", marginBottom: "8px" }}>What Protocols blocking looks like in practice</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
          {[
            { outcome: "Event blocked at gate", reason: "Name not in Tracking Plan: never reaches warehouse", icon: "✗", color: "#f43f5e" },
            { outcome: "Event with unplanned property", reason: "Property stripped, core event still delivered: no silent schema pollution", icon: "~", color: "#f59e0b" },
            { outcome: "Valid event, in-plan", reason: "Passes Protocols, enters Functions for enrichment, fans out to all destinations", icon: "✓", color: "#34d399" },
          ].map(({ outcome, reason, icon, color }) => (
            <div key={outcome} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: `${color}12`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.62rem", fontWeight: 800, color, flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--foreground)" }}>{outcome}</div>
                <div style={{ fontSize: "0.71rem", color: "var(--foreground-muted)", lineHeight: 1.5, marginTop: "2px" }}>{reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCoverageMatrix() {
  const cols = ["Engaged Accts", "Engaged ARR", "ARR %", "Non-Engaged"];
  const rows = [
    { product: "Web Experimentation", spec: "Qualified-experiment based", color: "#6366f1" },
    { product: "Feature Experimentation", spec: "Experiment + flag based", color: "#6366f1" },
    { product: "Personalization (P13N)", spec: "+ audience-cohort sub-metrics", color: "#818cf8" },
    { product: "Content Marketing Platform", spec: "+ depth bands: power → at-risk", color: "#10b981" },
    { product: "Content Management System", spec: "Content-item creation", color: "#34d399" },
    { product: "Optimizely Data Platform", spec: "+ weekly · Core / Acquired splits", color: "#a5b4fc" },
    { product: "Optimizely Analytics", spec: "Create · view · update", color: "#c4b5fd" },
  ];
  const grid = "1.6fr repeat(4, 0.8fr) 1.7fr";
  const check = (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399", fontSize: "0.62rem", fontWeight: 800 }}>✓</span>
  );
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: "720px", border: "1px solid var(--border-subtle)", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: grid, background: "var(--surface-elevated)", borderBottom: "1px solid var(--border-subtle)" }}>
          <div style={{ padding: "10px 16px", fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--foreground-subtle)" }}>Product line</div>
          {cols.map((c) => (
            <div key={c} style={{ padding: "10px 6px", fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--foreground-subtle)", textAlign: "center" }}>{c}</div>
          ))}
          <div style={{ padding: "10px 16px", fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--foreground-subtle)" }}>Specialisation</div>
        </div>
        {rows.map((r, i) => (
          <div key={r.product} style={{ display: "grid", gridTemplateColumns: grid, borderBottom: i < rows.length - 1 ? "1px solid var(--border-subtle)" : "none", alignItems: "center" }}>
            <div style={{ padding: "11px 16px", display: "flex", alignItems: "center", gap: "9px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: r.color, flexShrink: 0 }} />
              <span style={{ fontSize: "0.79rem", fontWeight: 600, color: "var(--foreground)" }}>{r.product}</span>
            </div>
            {[0, 1, 2, 3].map((c) => (
              <div key={c} style={{ padding: "11px 6px", display: "flex", justifyContent: "center" }}>{check}</div>
            ))}
            <div style={{ padding: "11px 16px", fontSize: "0.72rem", color: "var(--foreground-subtle)" }}>{r.spec}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Retention & adoption growth trend charts ─────────────────────────────────

type ImpactSeries = { name: string; color: string; values: number[] };
type ImpactChart = {
  key: string; title: string; sub: string; growth: string;
  xLabels: string[]; series: ImpactSeries[];
  marker?: { i: number; label: string }; caption: string;
};

function TrendChart({ chart, tall }: { chart: ImpactChart; tall?: boolean }) {
  const [hover, setHover] = React.useState<number | null>(null);
  const W = 720, H = tall ? 620 : 220, padL = 30, padR = 14, padT = 16, padB = 28;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const n = chart.xLabels.length;
  const x = (i: number) => padL + (i / (n - 1)) * plotW;
  const y = (v: number) => padT + (1 - v / 100) * plotH;
  const colW = plotW / (n - 1);
  const cGrid = "#1a1a28", cAxis = "#4a4a68", cText = "#8888a8", cFg = "#e8e8f0", cSurface = "#111119";
  const primary = chart.series[0];
  const gid = `grad-${chart.key}`;

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "14px", padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
        <div>
          <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--foreground)" }}>{chart.title}</div>
          <div style={{ fontSize: "0.72rem", color: "var(--foreground-subtle)", marginTop: "2px" }}>{chart.sub}</div>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "20px", padding: "4px 11px", flexShrink: 0 }}>
          <span style={{ color: "#34d399", fontSize: "0.7rem" }}>▲</span>
          <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#34d399", whiteSpace: "nowrap" }}>{chart.growth}</span>
        </div>
      </div>

      <svg role="img" aria-label={`${chart.title}: ${chart.series[0].name} rising from ${chart.series[0].values[0]}% to ${chart.series[0].values[chart.series[0].values.length - 1]}% (${chart.growth})`} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={primary.color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={primary.color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={padL} y1={y(g)} x2={W - padR} y2={y(g)} stroke={cGrid} strokeWidth="1" />
            <text x={padL - 6} y={y(g) + 3} textAnchor="end" fontSize="9" fill={cAxis}>{g}</text>
          </g>
        ))}
        {chart.xLabels.map((lab, i) => (
          <text key={lab} x={x(i)} y={H - padB + 15} textAnchor="middle" fontSize="9" fill={cAxis}>{lab}</text>
        ))}
        {chart.marker && (
          <g>
            <line x1={x(chart.marker.i)} y1={padT} x2={x(chart.marker.i)} y2={padT + plotH} stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
            <text x={x(chart.marker.i) + 5} y={padT + 10} fontSize="8" fill="#a5b4fc">{chart.marker.label}</text>
          </g>
        )}
        <polygon points={`${x(0)},${y(0)} ` + primary.values.map((v, i) => `${x(i)},${y(v)}`).join(" ") + ` ${x(n - 1)},${y(0)}`} fill={`url(#${gid})`} stroke="none" />
        {chart.series.map((s) => (
          <g key={s.name}>
            <polyline points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {s.values.map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r={hover === i ? 6 : 3.5} fill={s.color} stroke={cSurface} strokeWidth="1.5" />
            ))}
          </g>
        ))}
        {hover !== null && (
          <line x1={x(hover)} y1={padT} x2={x(hover)} y2={padT + plotH} stroke={cAxis} strokeWidth="1" opacity="0.5" />
        )}
        {chart.xLabels.map((lab, i) => (
          <rect key={`h-${lab}`} x={x(i) - colW / 2} y={padT} width={colW} height={plotH} fill="transparent" onMouseEnter={() => setHover(i)} />
        ))}
        {hover !== null && (() => {
          const lineH = 26, boxW = 260, boxH = 30 + chart.series.length * lineH;
          const tx = Math.min(Math.max(x(hover) + 16, padL), W - padR - boxW);
          const ty = padT + 6;
          return (
            <g>
              <rect x={tx} y={ty} width={boxW} height={boxH} rx="10" fill="#0d0d18" stroke="#2a2a40" strokeWidth="1.5" opacity="0.97" />
              <text x={tx + 14} y={ty + 20} fontSize="13" fontWeight="700" fill={cText}>{chart.xLabels[hover]}</text>
              {chart.series.map((s, k) => (
                <g key={s.name}>
                  <circle cx={tx + 17} cy={ty + 36 + k * lineH} r="6" fill={s.color} />
                  <text x={tx + 30} y={ty + 41 + k * lineH} fontSize="12" fill={cFg}>{s.name}</text>
                  <text x={tx + boxW - 14} y={ty + 41 + k * lineH} textAnchor="end" fontSize="13" fontWeight="800" fill={s.color}>{s.values[hover]}%</text>
                </g>
              ))}
            </g>
          );
        })()}
      </svg>

      {chart.series.length > 1 && (
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "8px" }}>
          {chart.series.map((s) => (
            <span key={s.name} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "12px", height: "3px", borderRadius: "2px", background: s.color }} />
              <span style={{ fontSize: "0.72rem", color: "var(--foreground-muted)" }}>{s.name}</span>
            </span>
          ))}
        </div>
      )}
      <p style={{ marginTop: "10px", fontSize: "0.74rem", color: "var(--foreground-subtle)", lineHeight: 1.55, fontStyle: "italic" }}>{chart.caption}</p>
    </div>
  );
}

function RetentionImpactCharts() {
  const charts: ImpactChart[] = [
    {
      key: "retention", title: "Cohort retention by generation",
      sub: "% of cohort still active · weeks since signup", growth: "+31% by W12",
      xLabels: ["W0", "W1", "W2", "W4", "W6", "W8", "W10", "W12"],
      series: [
        { name: "Pre-Level 1 cohort", color: "#f43f5e", values: [100, 70, 55, 43, 35, 30, 27, 25] },
        { name: "Post-Level 1 cohort", color: "#818cf8", values: [100, 80, 69, 59, 52, 48, 45, 43] },
        { name: "+ Feature-adoption tracking", color: "#34d399", values: [100, 86, 77, 69, 63, 60, 57, 56] },
      ],
      caption: "Each new cohort: first instrumented, then measured against an Level 1 metric, then with feature-adoption tracking layered on: holds a higher retention floor by week 12.",
    },
    {
      key: "adoption", title: "Adoption & engagement",
      sub: "% of paying accounts · by quarter", growth: "+33% engaged",
      xLabels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
      marker: { i: 2, label: "Level 1 + feature tracking live" },
      series: [
        { name: "Engaged accounts %", color: "#6366f1", values: [38, 43, 48, 53, 58, 63, 67, 71] },
        { name: "Feature adoption rate %", color: "#f59e0b", values: [22, 28, 35, 41, 48, 55, 60, 64] },
      ],
      caption: "Once teams could see Level 1 engagement and per-feature adoption, both climbed steadily as PM and CS actions targeted the visible gaps.",
    },
    {
      key: "revenue", title: "Revenue health",
      sub: "% of product ARR · by quarter", growth: "+27% engaged ARR",
      xLabels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
      marker: { i: 2, label: "Level 1 + feature tracking live" },
      series: [
        { name: "Engaged ARR %", color: "#10b981", values: [44, 47, 52, 57, 61, 65, 68, 71] },
        { name: "At-risk (non-engaged) ARR %", color: "#f43f5e", values: [56, 53, 48, 43, 39, 35, 32, 29] },
      ],
      caption: "As engaged ARR rose the at-risk surface shrank: and net revenue retention expanded from ~104% to ~118% over the same window.",
    },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "14px" }}>
        <TrendChart chart={charts[1]} tall />
        <TrendChart chart={charts[2]} tall />
      </div>
      <TrendChart chart={charts[0]} />
      <p style={{ fontSize: "0.68rem", color: "var(--foreground-subtle)" }}>
        Illustrative figures, representative of the growth trajectory, not production values. Hover any line for values.
      </p>
    </div>
  );
}

// ─── Specialized agents + MCP tools grid ─────────────────────────────────────

function SpecializedAgentsGrid() {
  const agents = [
    {
      name: "Engagement Analyst",
      purpose: "Fetches Level 1 metrics, feature adoption rates, and cohort trends across any product and time window.",
      color: "#6366f1",
      tools: [
        { fn: "get_level1_metrics", sig: "(product, period)" },
        { fn: "get_feature_adoption", sig: "(product, feature, period)" },
        { fn: "get_cohort_trends", sig: "(cohort_type, windows[])" },
        { fn: "get_segment_breakdown", sig: "(product, dimension)" },
      ],
    },
    {
      name: "Account Health",
      purpose: "Pulls a full engagement profile for a named account: risk tier, peer benchmarks, and usage history.",
      color: "#10b981",
      tools: [
        { fn: "get_account_profile", sig: "(account_id)" },
        { fn: "get_risk_tier", sig: "(account_id, product)" },
        { fn: "get_peer_benchmarks", sig: "(account_id, arr_band)" },
        { fn: "get_engagement_history", sig: "(account_id, months)" },
      ],
    },
    {
      name: "Experiment Velocity",
      purpose: "Reports on experiment counts, qualification rates, win rates, and AI-assisted vs manual quality split.",
      color: "#f59e0b",
      tools: [
        { fn: "get_experiment_counts", sig: "(scope, period)" },
        { fn: "get_qualification_rate", sig: "(scope, period)" },
        { fn: "get_win_rate", sig: "(scope, period)" },
        { fn: "compare_ai_vs_manual", sig: "(scope, metric)" },
      ],
    },
    {
      name: "Opal Usage",
      purpose: "Surfaces AI platform adoption: agent executions, tool usage rankings, credit consumption by tier.",
      color: "#a5b4fc",
      tools: [
        { fn: "get_agent_executions", sig: "(scope, period)" },
        { fn: "get_tool_usage_ranking", sig: "(period, top_n)" },
        { fn: "get_credit_consumption", sig: "(account_id, tier)" },
        { fn: "get_attach_rate", sig: "(product, period)" },
      ],
    },
  ];

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "14px", padding: "18px 20px" }}>
      <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--foreground-subtle)", marginBottom: "16px" }}>
        Each agent owns one analytics domain and exposes its capabilities as typed MCP tools
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {agents.map((agent, ai) => (
          <div key={agent.name} style={{ display: "flex", gap: "0", marginBottom: ai < agents.length - 1 ? "16px" : 0 }}>
            {/* Tree trunk + branch */}
            <div style={{ width: "22px", flexShrink: 0, position: "relative" }}>
              <div style={{ position: "absolute", top: "14px", left: "8px", width: "14px", height: "1px", background: "rgba(99,102,241,0.22)" }} />
              {ai < agents.length - 1 && (
                <div style={{ position: "absolute", top: 0, left: "8px", width: "1px", background: "rgba(99,102,241,0.18)", bottom: "-16px" }} />
              )}
            </div>
            {/* Agent content */}
            <div style={{ flex: 1 }}>
              {/* Agent header */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: agent.color, boxShadow: `0 0 5px ${agent.color}70`, flexShrink: 0 }} />
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--foreground)" }}>{agent.name} Agent</span>
              </div>
              <p style={{ fontSize: "0.71rem", color: "var(--foreground-muted)", lineHeight: 1.5, margin: "0 0 8px 16px" }}>{agent.purpose}</p>
              {/* Tool tree */}
              <div style={{ marginLeft: "16px", display: "flex", flexDirection: "column", gap: "0" }}>
                {agent.tools.map((tool, ti) => (
                  <div key={tool.fn} style={{ display: "flex", gap: "0", marginBottom: ti < agent.tools.length - 1 ? "4px" : 0 }}>
                    <div style={{ width: "18px", flexShrink: 0, position: "relative" }}>
                      <div style={{ position: "absolute", top: "8px", left: "6px", width: "12px", height: "1px", background: `${agent.color}28` }} />
                      {ti < agent.tools.length - 1 && (
                        <div style={{ position: "absolute", top: 0, left: "6px", width: "1px", background: `${agent.color}20`, bottom: "-4px" }} />
                      )}
                    </div>
                    <div style={{ fontFamily: "ui-monospace, monospace" }}>
                      <span style={{ fontSize: "0.71rem", color: agent.color, fontWeight: 600 }}>{tool.fn}</span>
                      <span style={{ fontSize: "0.67rem", color: "var(--foreground-subtle)" }}>{tool.sig}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Workflow agent orchestration diagram ─────────────────────────────────────

function WorkflowOrchestrationDiagram() {
  const parallelAgents = [
    { label: "Engagement Analyst", color: "#6366f1" },
    { label: "Account Health", color: "#10b981" },
    { label: "Experiment Velocity", color: "#f59e0b" },
  ];
  const continuedSteps = [
    { n: "03", label: "Tools fetch live data", sub: "Each agent calls its MCP tools, executing structured queries against Optimizely Analytics — live Snowflake data, no cache", color: "#818cf8" },
    { n: "04", label: "Aggregate & synthesise", sub: "Workflow agent collects sub-agent outputs, identifies key movements, flags anomalies, and drafts the narrative layer", color: "#a5b4fc" },
    { n: "05", label: "Format report", sub: "Structures the output as a Coda document, email body, or Teams card depending on the configured distribution target", color: "#f59e0b" },
  ];
  const dests = [
    { name: "Coda", desc: "Living document — ELT can comment, link, and reference across quarters", color: "#f59e0b" },
    { name: "Outlook", desc: "Monthly email to Executive Leadership Team with embedded highlights", color: "#0078D4" },
    { name: "Teams", desc: "Channel message with summary card and link to full Coda report", color: "#6264A7" },
  ];

  return (
    <div>
      {/* Step 01 */}
      <div style={{ background: "var(--surface)", border: "1px solid rgba(82,189,148,0.28)", borderRadius: "10px", padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(82,189,148,0.15)", border: "1px solid rgba(82,189,148,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800, color: "#52BD94", flexShrink: 0 }}>01</span>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--foreground)" }}>Scheduled trigger</span>
        </div>
        <p style={{ fontSize: "0.71rem", color: "var(--foreground-muted)", lineHeight: 1.5, margin: 0, paddingLeft: "32px" }}>Monthly cadence or on-demand API call kicks off the workflow</p>
      </div>

      {/* Arrow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 0" }}>
        <div style={{ width: "1px", height: "12px", background: "rgba(82,189,148,0.3)" }} />
        <div style={{ fontSize: "0.6rem", color: "rgba(82,189,148,0.6)" }}>▼</div>
      </div>

      {/* Step 02 */}
      <div style={{ background: "var(--surface)", border: "1px solid rgba(99,102,241,0.28)", borderRadius: "10px", padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800, color: "#6366f1", flexShrink: 0 }}>02</span>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--foreground)" }}>Dispatch to agents</span>
        </div>
        <p style={{ fontSize: "0.71rem", color: "var(--foreground-muted)", lineHeight: 1.5, margin: 0, paddingLeft: "32px" }}>Workflow agent spawns three specialized agents in parallel</p>
      </div>

      {/* Parallel fork */}
      <div style={{ paddingLeft: "24px", paddingRight: "0" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ width: "1px", height: "10px", background: "rgba(99,102,241,0.25)", marginLeft: "10px" }} />
        </div>
        <div style={{ border: "1px dashed rgba(99,102,241,0.25)", borderRadius: "10px", padding: "12px 14px", position: "relative" }}>
          <div style={{ position: "absolute", top: "-9px", left: "14px", background: "var(--surface)", padding: "0 6px", fontSize: "0.56rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#818cf8" }}>parallel</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {parallelAgents.map(({ label, color }) => (
              <div key={label} style={{ background: `${color}0d`, border: `1px solid ${color}28`, borderRadius: "8px", padding: "7px 14px", fontSize: "0.75rem", fontWeight: 600, color }}>{label}</div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ width: "1px", height: "10px", background: "rgba(99,102,241,0.25)", marginLeft: "10px" }} />
        </div>
      </div>

      {/* Steps 03–05 */}
      {continuedSteps.map((s, i) => (
        <div key={s.n}>
          <div style={{ background: "var(--surface)", border: `1px solid ${s.color}28`, borderRadius: "10px", padding: "12px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${s.color}18`, border: `1px solid ${s.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800, color: s.color, flexShrink: 0 }}>{s.n}</span>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--foreground)" }}>{s.label}</span>
            </div>
            <p style={{ fontSize: "0.71rem", color: "var(--foreground-muted)", lineHeight: 1.5, margin: 0, paddingLeft: "32px" }}>{s.sub}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4px 0" }}>
            <div style={{ width: "1px", height: "12px", background: `${s.color}35` }} />
            <div style={{ fontSize: "0.6rem", color: `${s.color}70` }}>▼</div>
          </div>
        </div>
      ))}

      {/* Step 06 */}
      <div style={{ background: "var(--surface)", border: "1px solid rgba(52,211,153,0.28)", borderRadius: "10px", padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800, color: "#34d399", flexShrink: 0 }}>06</span>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--foreground)" }}>Distribute</span>
        </div>
        <p style={{ fontSize: "0.71rem", color: "var(--foreground-muted)", lineHeight: 1.5, margin: 0, paddingLeft: "32px" }}>Pushes to configured destinations: Coda page update, Outlook email to ELT, or Teams channel message</p>
      </div>

      {/* Distribution branch */}
      <div style={{ paddingLeft: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ width: "1px", height: "10px", background: "rgba(52,211,153,0.25)", marginLeft: "10px" }} />
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {dests.map((d) => (
            <div key={d.name} style={{ background: `${d.color}0d`, border: `1px solid ${d.color}28`, borderRadius: "10px", padding: "10px 14px", flex: 1, minWidth: "140px" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: d.color, marginBottom: "3px" }}>{d.name}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--foreground-muted)", lineHeight: 1.5 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Agent architecture stack diagram ────────────────────────────────────────

function RelConnector({ label, cardinality }: { label: string; cardinality: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 0 6px 18px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "18px" }}>
        <div style={{ width: "1px", height: "12px", background: "rgba(99,102,241,0.22)" }} />
        <div style={{ fontSize: "0.5rem", color: "rgba(99,102,241,0.35)" }}>▼</div>
      </div>
      <span style={{ fontSize: "0.66rem", fontStyle: "italic", color: "var(--foreground-subtle)" }}>{label}</span>
      <span style={{ fontSize: "0.58rem", fontWeight: 700, color: "rgba(99,102,241,0.55)", background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "4px", padding: "1px 6px", letterSpacing: "0.04em" }}>{cardinality}</span>
    </div>
  );
}

function AgentArchitectureStack() {
  const [activeAgent, setActiveAgent] = React.useState<string | null>(null);
  const [activeWorkflow, setActiveWorkflow] = React.useState<string | null>(null);

  const workflows = [
    { id: "monthly", name: "Monthly Report", agents: ["engagement", "account", "experiment"] },
    { id: "board", name: "Board Prep", agents: ["engagement", "account"] },
    { id: "cs", name: "CS Intelligence", agents: ["account", "opal"] },
  ];

  const agents = [
    { id: "engagement", name: "Engagement Analyst", color: "#6366f1", tools: ["get_level1_metrics", "get_feature_adoption", "get_cohort_trends", "get_segment_breakdown"] },
    { id: "account",    name: "Account Health",      color: "#10b981", tools: ["get_account_profile", "get_risk_tier", "get_peer_benchmarks", "get_engagement_history"] },
    { id: "experiment", name: "Experiment Velocity", color: "#f59e0b", tools: ["get_experiment_counts", "get_qualification_rate", "get_win_rate", "compare_ai_vs_manual"] },
    { id: "opal",       name: "Opal Usage",          color: "#a5b4fc", tools: ["get_agent_executions", "get_tool_usage_ranking", "get_credit_consumption", "get_attach_rate"] },
  ];

  const activeWorkflowObj = workflows.find(w => w.id === activeWorkflow);
  const calledAgentIds = activeWorkflowObj?.agents ?? null;

  const agentHighlighted = (id: string) => {
    if (activeAgent) return activeAgent === id;
    if (calledAgentIds) return calledAgentIds.includes(id);
    return true;
  };
  const toolHighlighted = (agentId: string) => activeAgent ? activeAgent === agentId : true;

  const handleWorkflow = (id: string) => { setActiveWorkflow(v => v === id ? null : id); setActiveAgent(null); };
  const handleAgent    = (id: string) => { setActiveAgent(v => v === id ? null : id); setActiveWorkflow(null); };

  const hasSelection = !!(activeAgent || activeWorkflow);

  return (
    <div>
      {/* Hint */}
      <div style={{ textAlign: "right", fontSize: "0.62rem", color: "var(--foreground-subtle)", marginBottom: "12px", fontStyle: "italic", transition: "opacity 0.2s", opacity: hasSelection ? 0 : 1 }}>
        Click a workflow or agent to trace its connections →
      </div>

      {/* ── Layer 1: Workflow Agents ── */}
      <div style={{ border: "1px solid rgba(52,211,153,0.3)", borderRadius: "14px", overflow: "hidden" }}>
        <div style={{ background: "rgba(52,211,153,0.06)", borderBottom: "1px solid rgba(52,211,153,0.15)", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.55rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", background: "rgba(52,211,153,0.15)", color: "#34d399", borderRadius: "4px", padding: "2px 7px" }}>Layer 1</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--foreground)" }}>Workflow Agents</span>
          <span style={{ marginLeft: "auto", fontSize: "0.62rem", color: "var(--foreground-muted)", fontStyle: "italic" }}>orchestrators</span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
            {workflows.map((wf) => {
              const sel = activeWorkflow === wf.id;
              return (
                <button key={wf.id} onClick={() => handleWorkflow(wf.id)} style={{
                  background: sel ? "rgba(52,211,153,0.14)" : "rgba(52,211,153,0.06)",
                  border: sel ? "1px solid rgba(52,211,153,0.55)" : "1px solid rgba(52,211,153,0.22)",
                  borderRadius: "9px", padding: "9px 14px", cursor: "pointer",
                  boxShadow: sel ? "0 0 14px rgba(52,211,153,0.18)" : "none",
                  transition: "all 0.15s", textAlign: "left",
                }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#34d399" }}>{wf.name}</div>
                  <div style={{ fontSize: "0.62rem", color: "rgba(52,211,153,0.7)", marginTop: "3px" }}>
                    {sel
                      ? `calls: ${wf.agents.map(id => agents.find(a => a.id === id)?.name).join(", ")}`
                      : `${wf.agents.length} agents`}
                  </div>
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: "0.7rem", color: "var(--foreground-muted)", margin: 0, lineHeight: 1.55 }}>
            Dispatch sub-tasks to specialized agents, aggregate outputs, synthesise the narrative, and route to a distribution endpoint (Coda, Outlook, Teams).
          </p>
        </div>
      </div>

      <RelConnector label="orchestrates" cardinality="1 : n" />

      {/* ── Layer 2: Specialized Agents ── */}
      <div style={{ border: "1px solid rgba(99,102,241,0.28)", borderRadius: "14px", overflow: "hidden" }}>
        <div style={{ background: "rgba(99,102,241,0.06)", borderBottom: "1px solid rgba(99,102,241,0.15)", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.55rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", background: "rgba(99,102,241,0.14)", color: "#818cf8", borderRadius: "4px", padding: "2px 7px" }}>Layer 2</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--foreground)" }}>Specialized Agents</span>
          <span style={{ marginLeft: "auto", fontSize: "0.62rem", color: "var(--foreground-muted)", fontStyle: "italic" }}>domain-focused</span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
            {agents.map((agent) => {
              const lit = agentHighlighted(agent.id);
              const sel = activeAgent === agent.id;
              return (
                <button key={agent.id} onClick={() => handleAgent(agent.id)} style={{
                  background: sel ? `${agent.color}18` : lit ? `${agent.color}0c` : "transparent",
                  border: sel ? `1px solid ${agent.color}60` : lit ? `1px solid ${agent.color}30` : `1px solid ${agent.color}14`,
                  borderRadius: "9px", padding: "9px 14px", cursor: "pointer",
                  opacity: lit ? 1 : 0.28,
                  boxShadow: sel ? `0 0 14px ${agent.color}28` : "none",
                  transition: "all 0.15s", textAlign: "left",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: agent.color, flexShrink: 0, boxShadow: sel ? `0 0 6px ${agent.color}` : "none" }} />
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: lit ? agent.color : "var(--foreground-subtle)" }}>{agent.name}</span>
                  </div>
                  <div style={{ fontSize: "0.62rem", color: `${agent.color}80`, marginTop: "3px" }}>
                    {sel ? `${agent.tools.length} MCP tools ↓` : `${agent.tools.length} tools`}
                  </div>
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: "0.7rem", color: "var(--foreground-muted)", margin: 0, lineHeight: 1.55 }}>
            Each handles one question type well and composes cleanly into any workflow above it.
          </p>
        </div>
      </div>

      <RelConnector label="exposes as MCP tools" cardinality="1 : n" />

      {/* ── Layer 3: MCP Tools ── */}
      <div style={{ border: "1px solid rgba(82,189,148,0.28)", borderRadius: "14px", overflow: "hidden" }}>
        <div style={{ background: "rgba(82,189,148,0.06)", borderBottom: "1px solid rgba(82,189,148,0.15)", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.55rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", background: "rgba(82,189,148,0.14)", color: "#52BD94", borderRadius: "4px", padding: "2px 7px" }}>Layer 3</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--foreground)" }}>MCP Tools</span>
          <span style={{ marginLeft: "auto", fontSize: "0.62rem", color: "var(--foreground-muted)", fontStyle: "italic" }}>typed functions · JSON output</span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
            {agents.map(agent =>
              agent.tools.map(tool => {
                const lit = toolHighlighted(agent.id);
                return (
                  <code key={tool} style={{
                    background: lit ? `${agent.color}10` : "rgba(99,102,241,0.03)",
                    border: lit ? `1px solid ${agent.color}38` : "1px solid rgba(99,102,241,0.1)",
                    borderRadius: "5px", padding: "3px 9px",
                    fontSize: "0.68rem", fontFamily: "ui-monospace, monospace", fontWeight: 600,
                    color: lit ? agent.color : "var(--foreground-subtle)",
                    opacity: lit ? 1 : 0.28,
                    transition: "all 0.15s",
                  }}>
                    {tool}
                  </code>
                );
              })
            )}
          </div>
          <p style={{ fontSize: "0.7rem", color: "var(--foreground-muted)", margin: 0, lineHeight: 1.55 }}>
            Structured functions with typed parameters — execute a specific OA query and return clean JSON. No natural-language interpretation at the data layer.
          </p>
        </div>
      </div>

      <RelConnector label="queries · live SQL" cardinality="n : 1" />

      {/* ── Layer 4: Data ── */}
      <div style={{ border: "1px solid rgba(41,181,232,0.28)", borderRadius: "14px", overflow: "hidden" }}>
        <div style={{ background: "rgba(41,181,232,0.06)", borderBottom: "1px solid rgba(41,181,232,0.15)", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.55rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", background: "rgba(41,181,232,0.14)", color: "#29B5E8", borderRadius: "4px", padding: "2px 7px" }}>Layer 4</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--foreground)" }}>Optimizely Analytics → Snowflake</span>
          <span style={{ marginLeft: "auto", fontSize: "0.62rem", color: "var(--foreground-muted)", fontStyle: "italic" }}>warehouse-native</span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
            {[
              { label: "No export", desc: "SQL runs directly in Snowflake", color: "#29B5E8" },
              { label: "No cache", desc: "Every query is live data", color: "#29B5E8" },
              { label: "Consistent", desc: "Same engine as OA dashboards", color: "#29B5E8" },
            ].map(({ label, desc, color }) => (
              <div key={label} style={{ background: `${color}08`, border: `1px solid ${color}22`, borderRadius: "8px", padding: "7px 12px" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color }}>{label}</div>
                <div style={{ fontSize: "0.62rem", color: "var(--foreground-muted)", marginTop: "2px" }}>{desc}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.7rem", color: "var(--foreground-muted)", margin: 0, lineHeight: 1.55 }}>
            OA executes SQL directly against Snowflake — no sync, no export, no stale cache. Agents always see the same numbers as a PM looking at OA in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

// ─── Section nav (scroll-spy) ──────────────────────────────────────────────────

// ─── Story arc (4-chapter progress banner) ───────────────────────────────────

const CHAPTERS = [
  { n: "01", title: "The Problem", sub: "8 products, zero shared visibility", href: "#problem", color: "#f43f5e" },
  { n: "02", title: "The Build", sub: "Instrumentation · pipeline · identity", href: "#architecture", color: "#f59e0b" },
  { n: "03", title: "The Intelligence", sub: "Metrics · dashboards · churn prediction", href: "#metrics", color: "#6366f1" },
  { n: "04", title: "The Impact", sub: "GTM plays · AI measurement · outcomes", href: "#gtm", color: "#10b981" },
];

function StoryArc() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "20px 24px" }}>
      <div style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--foreground-subtle)", marginBottom: "16px" }}>The story — four chapters</div>
      <div style={{ display: "flex", alignItems: "stretch", gap: "0", overflowX: "auto" }}>
        {CHAPTERS.map((c, i, arr) => (
          <React.Fragment key={c.n}>
            <a href={c.href} style={{ textDecoration: "none", flex: 1, minWidth: "160px" }}>
              <div style={{
                padding: "14px 16px", borderRadius: "12px",
                background: `${c.color}08`, border: `1px solid ${c.color}22`,
                height: "100%", boxSizing: "border-box",
                transition: "background 0.2s, border-color 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${c.color}14`; (e.currentTarget as HTMLElement).style.borderColor = `${c.color}40`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${c.color}08`; (e.currentTarget as HTMLElement).style.borderColor = `${c.color}22`; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${c.color}18`, border: `1px solid ${c.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800, color: c.color, flexShrink: 0 }}>{c.n}</span>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--foreground)" }}>{c.title}</span>
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--foreground-subtle)", lineHeight: 1.5, paddingLeft: "30px" }}>{c.sub}</div>
              </div>
            </a>
            {i < arr.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", padding: "0 6px", flexShrink: 0 }}>
                <span style={{ color: "var(--foreground-subtle)", fontSize: "1rem" }}>→</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ChapterBadge({ n, color }: { n: number; color: string }) {
  const c = CHAPTERS[n - 1];
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `${color}08`, border: `1px solid ${color}22`, borderRadius: "20px", padding: "5px 14px", marginBottom: "18px" }}>
      <span style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color }}>{c.n}</span>
      <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: color, flexShrink: 0 }} />
      <span style={{ fontSize: "0.72rem", fontWeight: 600, color }}>{c.title}</span>
      <span style={{ fontSize: "0.68rem", color: "var(--foreground-subtle)" }}>·</span>
      <span style={{ fontSize: "0.68rem", color: "var(--foreground-subtle)" }}>{c.sub}</span>
    </div>
  );
}

function ChapterTransition({ from, to }: { from: string; to: string }) {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "18px 0" }}>
        <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "20px", padding: "6px 16px", flexShrink: 0 }}>
          <span style={{ fontSize: "0.72rem", color: "var(--foreground-subtle)" }}>{from}</span>
          <span style={{ color: "var(--accent)", fontSize: "0.8rem" }}>→</span>
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--foreground)" }}>{to}</span>
        </div>
        <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
      </div>
    </div>
  );
}

// ─── Instrumentation flow (visual 2×4 snake) ──────────────────────────────────

function InstrumentationFlow() {
  const steps = [
    { n: 1, label: "Propose", desc: "Eng team submits events against the instrumentation spec", color: "#52BD94", gate: false },
    { n: 2, label: "Review", desc: "Analytics checks schema compliance & naming conventions", color: "#6366f1", gate: false },
    { n: 3, label: "Register", desc: "Events added to Segment Tracking Plan (schema registry)", color: "#818cf8", gate: false },
    { n: 4, label: "Instrument FE", desc: "Frontend engineers add the JS SDK calls", color: "#a5b4fc", gate: false },
    { n: 5, label: "Instrument BE", desc: "Backend instruments via HTTP API (async queue)", color: "#a5b4fc", gate: false },
    { n: 6, label: "Protocols gate", desc: "Segment Protocols conditionally blocks or allows events based on Tracking Plan rules — unplanned events are rejected at ingestion, no manual intervention needed at scale", color: "#f59e0b", gate: true },
    { n: 7, label: "Warehouse", desc: "Approved events propagate to Snowflake in near-real-time", color: "#29B5E8", gate: false },
    { n: 8, label: "dbt + surfaces", desc: "dbt models transform events; surfaced in OA & PowerBI", color: "#FF694B", gate: false },
  ];
  const row1 = steps.slice(0, 4);
  const row2 = [...steps.slice(4, 8)].reverse();

  const Card = ({ s, arrowRight, arrowLeft }: { s: typeof steps[0]; arrowRight?: boolean; arrowLeft?: boolean }) => (
    <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
      <div style={{
        flex: 1, borderRadius: "10px", padding: "12px 14px",
        background: s.gate ? "rgba(245,158,11,0.08)" : "var(--surface)",
        border: `1px solid ${s.gate ? "rgba(245,158,11,0.35)" : "var(--border-subtle)"}`,
        boxShadow: s.gate ? "0 0 16px rgba(245,158,11,0.12)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
          <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: `${s.color}18`, border: `1px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.58rem", fontWeight: 800, color: s.color, flexShrink: 0 }}>{s.n}</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: s.gate ? "#f59e0b" : "var(--foreground)" }}>{s.label}</span>
          {s.gate && <span style={{ fontSize: "0.55rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#f59e0b", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "4px", padding: "1px 5px" }}>gate</span>}
        </div>
        <p style={{ fontSize: "0.71rem", color: "var(--foreground-muted)", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
      </div>
      {arrowRight && <span style={{ color: "var(--foreground-subtle)", fontSize: "0.9rem", padding: "0 6px", flexShrink: 0 }}>→</span>}
      {arrowLeft && <span style={{ color: "var(--foreground-subtle)", fontSize: "0.9rem", padding: "0 6px", flexShrink: 0 }}>←</span>}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", alignItems: "stretch", gap: "0" }}>
        {row1.map((s, i) => <Card key={s.n} s={s} arrowRight={i < row1.length - 1} />)}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "0" }}>
        <span style={{ color: "var(--foreground-subtle)", fontSize: "0.9rem" }}>↓</span>
      </div>
      <div style={{ display: "flex", alignItems: "stretch", gap: "0" }}>
        {row2.map((s, i) => <Card key={s.n} s={s} arrowLeft={i < row2.length - 1} />)}
      </div>
    </div>
  );
}

const NAV_SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "architecture", label: "Architecture" },
  { id: "pipeline", label: "Pipeline" },
  { id: "identity", label: "Identity" },
  { id: "evolution", label: "Evolution" },
  { id: "metrics", label: "Metrics" },
  { id: "dashboards", label: "Dashboards" },
  { id: "gtm", label: "GTM Plays" },
  { id: "ai", label: "Agentic AI" },
  { id: "outcomes", label: "Outcomes" },
];

function SectionNav() {
  const [active, setActive] = React.useState<string>("problem");
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id); });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <nav aria-label="Section navigation" className="section-rail" style={{ position: "fixed", right: "26px", top: "50%", transform: "translateY(-50%)", zIndex: 40, flexDirection: "column", gap: "5px" }}>
      {NAV_SECTIONS.map((s) => {
        const on = active === s.id;
        return (
          <a key={s.id} href={`#${s.id}`} aria-current={on ? "true" : undefined}
            style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px", textDecoration: "none", padding: "3px 0" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: on ? 700 : 500, color: on ? "var(--accent)" : "var(--foreground-subtle)", whiteSpace: "nowrap", transition: "color .2s" }}>{s.label}</span>
            <span style={{ width: on ? "24px" : "12px", height: "3px", borderRadius: "2px", background: on ? "var(--accent)" : "var(--border)", boxShadow: on ? "0 0 8px var(--accent-glow)" : "none", transition: "all .2s" }} />
          </a>
        );
      })}
    </nav>
  );
}

export default function Home() {
  const wrap: React.CSSProperties = { maxWidth: "1100px", margin: "0 auto", padding: "0 24px" };
  const sec: React.CSSProperties = { padding: "88px 0" };
  const secAlt: React.CSSProperties = { ...sec, background: "rgba(12,12,20,0.5)" };

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>

      <SectionNav />

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      }}>
        <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "space-between", height: "58px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "26px", height: "26px", borderRadius: "6px",
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 12px rgba(99,102,241,0.4)",
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="1" width="4" height="4" rx="1" fill="white" opacity="0.9"/>
                <rect x="7" y="1" width="4" height="4" rx="1" fill="white" opacity="0.6"/>
                <rect x="1" y="7" width="4" height="4" rx="1" fill="white" opacity="0.6"/>
                <rect x="7" y="7" width="4" height="4" rx="1" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.01em" }}>
              Product Intelligence Platform
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--foreground-muted)" }}>
            Wahid Tawsif Ratul
            <span style={{ color: "var(--foreground-subtle)" }}>·</span>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>Product Analytics Engineer</span>
          </div>
        </div>
      </nav>

      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="hero-section" style={{ padding: "110px 0 90px" }}>
          <div style={wrap}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "24px",
              background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "20px", padding: "5px 14px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a5b4fc" }}>
                Case Study · Optimizely
              </span>
            </div>

            <h1 className="gradient-heading" style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4rem)", fontWeight: 900,
              letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: "22px", maxWidth: "860px",
            }}>
              Product Intelligence Platform
            </h1>

            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.18rem)", color: "var(--foreground-muted)",
              lineHeight: 1.75, maxWidth: "660px", marginBottom: "52px",
            }}>
              I built Optimizely&apos;s product intelligence stack from the ground up: designed the cross-company
              instrumentation contract, set up the identity layer that made ARR-linked engagement possible,
              defined product metrics alongside PMs and feature owners, drove the migration to a
              warehouse-native reporting platform, and extended the whole thing to measure AI at production
              scale when Opal shipped.
            </p>

            {/* Stat pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
              {[
                { value: "8", label: "Products Instrumented" },
                { value: "3", label: "Intelligence Tiers" },
                { value: "End-to-End", label: "Pipeline Architecture" },
                { value: "ARR-Linked", label: "Engagement Metrics" },
                { value: "AI-Scale", label: "Measurement Framework" },
              ].map(({ value, label }) => (
                <div key={label} className="stat-glow" style={{
                  background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.25)",
                  borderRadius: "14px", padding: "18px 28px", textAlign: "center", minWidth: "130px",
                }}>
                  <div className="gradient-number" style={{
                    fontSize: "1.5rem", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.03em",
                  }}>
                    {value}
                  </div>
                  <div style={{
                    fontSize: "0.68rem", color: "var(--foreground-muted)", marginTop: "5px",
                    fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Business outcomes */}
            <div style={{
              marginTop: "44px", paddingTop: "32px",
              borderTop: "1px solid var(--border-subtle)", maxWidth: "720px",
            }}>
              <div style={{
                fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.14em", color: "var(--foreground-subtle)", marginBottom: "18px",
              }}>
                Business outcomes
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  "8 engineering teams aligned to a single instrumentation standard: analytics owns the approval gate; no event ships without review",
                  "Product engagement became joinable to ARR for the first time: enabling data-backed GTM plays across Financial Services, Healthcare, and AI verticals",
                  "Designed the measurement infrastructure for Optimizely&apos;s AI platform (Opal) from first principles: a new analytics discipline with no existing playbook, now powering commercial expansion decisions",
                ].map((outcome) => (
                  <div key={outcome} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{
                      width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
                      background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.28)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ color: "#34d399", fontSize: "0.65rem", fontWeight: 700 }}>✓</span>
                    </div>
                    <p style={{ fontSize: "0.92rem", color: "var(--foreground-muted)", lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: outcome }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Role & scope */}
            <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", maxWidth: "720px" }}>
              <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "16px 18px" }}>
                <div style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "8px" }}>My role</div>
                <p style={{ fontSize: "0.83rem", color: "var(--foreground-muted)", lineHeight: 1.6 }}>Product Analytics Engineer: owned the cross-product instrumentation standard and the engagement-metric framework end to end, from the event contract through to executive reporting.</p>
              </div>
              <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "12px", padding: "16px 18px" }}>
                <div style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "8px" }}>Partnered with</div>
                <p style={{ fontSize: "0.83rem", color: "var(--foreground-muted)", lineHeight: 1.6 }}>8 product engineering teams · Product Management · FP&amp;A · Customer Success · GTM: analytics held the approval gate across all of them.</p>
              </div>
            </div>

            {/* Contact / CTA */}
            <div style={{ marginTop: "28px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <a href="mailto:wahidtratul@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #6366f1, #818cf8)", color: "white", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", borderRadius: "9px", padding: "10px 18px", boxShadow: "0 0 18px rgba(99,102,241,0.35)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6.5 12 13l9-6.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                Email me
              </a>
              <a href="https://github.com/ratul003" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", color: "var(--foreground-muted)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", border: "1px solid var(--border)", borderRadius: "9px", padding: "10px 18px" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" /></svg>
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── Story arc ──────────────────────────────────────────────────── */}
        <section style={{ padding: "0 0 40px" }}>
          <div style={wrap}>
            <StoryArc />
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Business Problem ──────────────────────────────────────────── */}
        <section id="problem" style={secAlt}>
          <div style={wrap}>
            <ChapterBadge n={1} color="#f43f5e" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "64px", alignItems: "start" }}>
              <div>
                <Label>The Business Problem</Label>
                <Heading className="gradient-heading">
                  Products growing without visibility into what was driving it.
                </Heading>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  {
                    icon: "◈",
                    title: "No shared data standard across 8 products",
                    body: "Each product tracked events differently: or not at all. Different identifiers, different naming conventions, different schemas. Cross-product analysis was structurally impossible, not just difficult.",
                  },
                  {
                    icon: "◈",
                    title: "Engagement invisible to revenue teams",
                    body: "CS had no product usage signal. Finance had no engagement-to-ARR view. Sales had no data-backed expansion story. Analytics produced insights that never reached the people making revenue decisions.",
                  },
                  {
                    icon: "◈",
                    title: "No foundation for product-led growth",
                    body: "Without a consistent 'engaged account' definition linked to contract value, there was no data substrate for a PLG motion: no way to identify expansion-ready accounts, churn signals, or activation blockers at scale.",
                  },
                ].map(({ icon, title, body }) => (
                  <div key={title} className="card-hover" style={{
                    background: "var(--surface)", border: "1px solid var(--border-subtle)",
                    borderRadius: "14px", padding: "20px 24px",
                    display: "flex", gap: "16px",
                  }}>
                    <span style={{ color: "var(--accent)", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>{icon}</span>
                    <div>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "7px" }}>{title}</h3>
                      <p style={{ fontSize: "0.87rem", color: "var(--foreground-muted)", lineHeight: 1.7 }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Designing the Data Architecture ──────────────────────────── */}
        <section id="architecture" style={sec}>
          <div style={wrap}>
            <ChapterBadge n={2} color="#f59e0b" />
            <Label>Data Architecture Design</Label>
            <Heading className="gradient-heading">Designing a shared event vocabulary from scratch</Heading>
            <Body>
              The hardest part wasn&apos;t the tooling: it was getting alignment across 8 product teams on a single standard. How do you build one instrumentation model that works across products with completely different data shapes and analytics needs? The answer I kept coming back to was: make it a contract, not a suggestion.
            </Body>

            <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
              {[
                {
                  n: "01",
                  title: "Three-event model",
                  body: "Every Segment instrumentation follows the same pattern: an identity call (who the user is), an account call (which organisation they belong to), and behavioural events (what they did). This three-part structure is what makes user-level, account-level, and cross-product analysis all possible from the same events.",
                  color: "#a5b4fc",
                },
                {
                  n: "02",
                  title: "Cross-product identity key",
                  body: "Each product had its own internal account identifier. The architecture required every event to carry a single canonical account key: the join bridge from any product's behavioural data to the contract, revenue, and CS records in Salesforce. Without this, cross-product analysis always requires a bespoke mapping table built per product pair.",
                  color: "#818cf8",
                },
                {
                  n: "03",
                  title: "Event taxonomy principles",
                  body: "Event names follow a strict convention: product prefix, object–action pattern, no dynamic values baked in. Dynamic data belongs in properties: not in the event name. Names with IDs or free text baked in break group-by analysis and make metrics impossible to define cleanly.",
                  color: "#6366f1",
                },
                {
                  n: "04",
                  title: "Analytics owns the gate",
                  body: "Product Analytics acts as the approval gate for all new events. No event reaches the warehouse without review. This is not bureaucracy: it is the only mechanism that enforces data quality at the source rather than patching it downstream. One bad event in production creates analytical debt that compounds.",
                  color: "#c4b5fd",
                },
                {
                  n: "05",
                  title: "Internal traffic exclusion",
                  body: "Every event carries a flag identifying Optimizely employees. This is not optional: without it, internal usage pollutes every engagement metric. Product teams testing their own features, CS demoing accounts, and engineers debugging all need to be cleanly excluded before any metric is calculated.",
                  color: "#a5b4fc",
                },
                {
                  n: "06",
                  title: "Release-gated tracking",
                  body: "Feature tracking includes properties for the release quarter and feature name: enabling cohort comparison between accounts that received a feature at launch versus those who received it later. This enables rollout adoption analysis and launch-day vs steady-state usage comparison natively, without additional event instrumentation.",
                  color: "#818cf8",
                },
              ].map(({ n, title, body, color }) => (
                <div key={n} className="card-hover" style={{
                  background: "var(--surface)", border: "1px solid var(--border-subtle)",
                  borderRadius: "14px", padding: "22px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: `${color}15`, border: `1px solid ${color}35`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.65rem", fontWeight: 800, color, flexShrink: 0,
                    }}>
                      {n}
                    </div>
                    <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--foreground)" }}>{title}</span>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--foreground-muted)", lineHeight: 1.7 }}>{body}</p>
                </div>
              ))}
            </div>

            {/* Instrumentation process — visual flow */}
            <div style={{ marginTop: "32px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                Gating process: from proposal to production
              </div>
              <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "14px", padding: "20px" }}>
                <InstrumentationFlow />
              </div>
            </div>

            <div style={{ marginTop: "14px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px" }}>
              <div className="card-hover" style={{
                background: "var(--surface)", border: "1px solid var(--border-subtle)",
                borderRadius: "14px", padding: "24px",
              }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                  Event naming standard
                </div>
                {[
                  { ex: "EXP - Experiment_Started", v: true },
                  { ex: "CMP - Task_Created", v: true },
                  { ex: "OPAL - Agent_Executed", v: true },
                  { ex: "Experiment 1234 was Started", v: false },
                ].map(({ ex, v }) => (
                  <div key={ex} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", fontFamily: "ui-monospace, monospace", fontSize: "0.82rem" }}>
                    <span style={{
                      width: "18px", height: "18px", borderRadius: "50%",
                      background: v ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)",
                      border: `1px solid ${v ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.65rem", color: v ? "#34d399" : "#ef4444", flexShrink: 0,
                    }}>
                      {v ? "✓" : "✗"}
                    </span>
                    <span style={{ color: v ? "var(--foreground)" : "var(--foreground-subtle)", textDecoration: v ? "none" : "line-through" }}>{ex}</span>
                  </div>
                ))}
                <p style={{ marginTop: "16px", fontSize: "0.79rem", color: "var(--foreground-subtle)", lineHeight: 1.6 }}>
                  Product prefix · Object_Action format · no dynamic values in event names. Dynamic data belongs in event properties: baked-in values break group-by analysis.
                </p>

                <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)" }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "10px" }}>
                    Teams onboarded
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {["Experimentation", "Content Marketing Platform", "Opal", "Optimizely Data Platform", "Product Recommendations", "Content Management System", "Search & Navigation", "Configured Commerce"].map((t) => (
                      <span key={t} style={{
                        background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
                        borderRadius: "5px", padding: "3px 9px", fontSize: "0.72rem", color: "#a5b4fc", fontWeight: 500,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Platform Architecture ─────────────────────────────────────── */}
        <section id="pipeline" style={secAlt}>
          <div style={wrap}>
            <Label>Platform Architecture</Label>
            <Heading className="gradient-heading">End-to-end data pipeline: from product event to Salesforce</Heading>
            <Body>
              Eight products emit behavioural events through a single Segment contract. Those events flow
              into Snowflake, get modelled by dbt, surface in Optimizely Analytics and PowerBI, and sync
              back into Salesforce via Reverse ETL. One pipeline. One identity key. Every layer.
            </Body>
            <div style={{
              marginTop: "32px", background: "var(--surface)", border: "1px solid var(--border-subtle)",
              borderRadius: "16px", padding: "28px 24px",
            }}>
              <PipelineDiagram />
            </div>

            <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
              {[
                { layer: "Collection", tools: "Segment · Fivetran · Airbyte", note: "Real-time event stream + SaaS connector ingestion", color: "#52BD94" },
                { layer: "Warehouse", tools: "Snowflake", note: "Immutable raw layer → modelled layer → reporting layer", color: "#29B5E8" },
                { layer: "Transform", tools: "dbt", note: "Dimensional models and reporting aggregates", color: "#FF694B" },
                { layer: "Analytics", tools: "Optimizely Analytics + PowerBI", note: "Warehouse-native · no sync · ARR-joinable queries", color: "#6366f1" },
                { layer: "Activation", tools: "Reverse ETL → Salesforce", note: "Account health and engagement signals pushed to CRM", color: "#F59E0B" },
              ].map(({ layer, tools, note, color }) => (
                <div key={layer} style={{
                  background: `${color}08`, border: `1px solid ${color}20`,
                  borderRadius: "10px", padding: "14px",
                }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color, marginBottom: "5px" }}>{layer}</div>
                  <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "4px" }}>{tools}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--foreground-subtle)", lineHeight: 1.5 }}>{note}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "32px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                dbt model architecture: four-layer DAG
              </div>
              <p style={{ fontSize: "0.84rem", color: "var(--foreground-muted)", lineHeight: 1.7, maxWidth: "680px", marginBottom: "20px" }}>
                The transform layer follows a strict four-layer DAG. Staging models clean raw sources without any joins. Intermediate models apply business logic. Mart models produce the dimensional tables consumed by Optimizely Analytics and PowerBI. Reporting models are pre-aggregated for dashboards and board-level exports.
              </p>
              <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "14px", padding: "22px" }}>
                <DbtModelDag />
              </div>
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Real-Time Ingestion & Pipeline Transformation ─────────────── */}
        <section style={sec}>
          <div style={wrap}>
            <Label>Real-Time Ingestion &amp; Pipeline Transformation</Label>
            <Heading className="gradient-heading">Multi-cloud sources → one real-time, transformed stream</Heading>
            <Body>
              Product data originates across GCP, AWS, and Azure. Segment unifies it into a single
              real-time stream: validating, transforming, and enriching every event in flight
              before it ever lands.
            </Body>

            <div style={{ marginTop: "32px", background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "24px", overflowX: "auto" }}>
              <div style={{ minWidth: "640px" }}>
                <CloudSourcesIngestion />
              </div>
            </div>

            <div style={{ marginTop: "16px", background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "24px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "16px" }}>
                In-flight transformation: one event&apos;s journey
              </div>
              <EventTransform />
            </div>

            <div style={{ marginTop: "24px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                Inside the Segment pipeline: four stages from source to warehouse
              </div>
              <SegmentPipelineDetail />
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Warehouse Customization & Reporting Paths ─────────────────── */}
        <section style={secAlt}>
          <div style={wrap}>
            <Label>Warehouse Customization &amp; Reporting Paths</Label>
            <Heading className="gradient-heading">Reusing data already in Snowflake: Mixpanel, then warehouse-native</Heading>
            <Body>
              Not all data arrived as events. Records already in Snowflake: billing, usage,
              CRM-mirrored ARR: were custom-transformed and joined to behaviour, then surfaced
              first through Mixpanel and later natively through Optimizely Analytics.
            </Body>

            <div style={{ marginTop: "32px", background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "24px" }}>
              <SnowflakeReportingPaths />
            </div>

            <div style={{ marginTop: "24px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "16px" }}>
                Dashboard → audience → decision it drives
              </div>
              <DashboardUsabilityMap />
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Identity Architecture ─────────────────────────────────────── */}
        <section id="identity" style={sec}>
          <div style={wrap}>
            <Label>Identity Architecture</Label>
            <Heading className="gradient-heading">The cross-product account key: making ARR joins possible</Heading>
            <Body>
              Without a shared account key, every analytics question is product-siloed.
              A canonical cross-product account identifier is embedded in every Segment event: the universal
              join key from any behavioural signal, through any product, to ARR and contract data in Salesforce.
            </Body>

            <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "22px", alignItems: "start" }}>
              <div className="card-hover" style={{
                background: "var(--surface)", border: "1px solid var(--border-subtle)",
                borderRadius: "16px", padding: "28px",
              }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "22px" }}>
                  Identity resolution chain
                </div>
                {[
                  { value: "User identity + account identity", label: "Every Segment event", note: "Two join keys on every call: user-level and account-level analysis from the same event stream", color: "#a5b4fc" },
                  { value: "Anonymous → known resolution", label: "Segment Unify identity graph", note: "Stitches pre-login sessions to authenticated users: essential for accurate activation funnel analysis", color: "#c4b5fd" },
                  { value: "Account dimension table", label: "Warehouse identity spine", note: "ARR, contract dates, product tier, lifecycle: all joinable to behaviour via the shared account key", color: "#a5b4fc" },
                  { value: "Salesforce CRM", label: "Revenue source of truth", note: "Renewal, expansion, and churn: joinable to product engagement at account level for the first time", color: "#818cf8" },
                  { value: "Optimizely Analytics + PowerBI", label: "Business intelligence layer", note: "Engagement metrics answerable with ARR context: the foundation of the PLG data model", color: "#34d399" },
                ].map(({ value, label, note, color }, i, arr) => (
                  <div key={label} style={{ display: "flex", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}60`, flexShrink: 0, marginTop: "3px" }} />
                      {i < arr.length - 1 && <div style={{ width: "1px", flex: 1, minHeight: "30px", background: "linear-gradient(to bottom, var(--border), transparent)", margin: "3px 0" }} />}
                    </div>
                    <div style={{ paddingBottom: i < arr.length - 1 ? "18px" : "0" }}>
                      <div style={{ color, fontWeight: 700, fontSize: "0.84rem" }}>{value}</div>
                      <div style={{ color: "var(--foreground-subtle)", fontSize: "0.7rem", marginTop: "2px" }}>{label}</div>
                      <div style={{ color: "var(--foreground-subtle)", fontSize: "0.7rem", marginTop: "2px", fontStyle: "italic" }}>{note}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { q: "Why a stable user key?", a: "User identifiers that reset between sessions or devices make funnel analysis unreliable. Using email as the user key ensures continuity across re-authentication and device changes: and is a natural join to CRM records." },
                  { q: "Why one shared account key?", a: "Each product has its own internal account ID. Without a canonical cross-product key, every cross-product join requires a bespoke lookup table. One key resolves all products to the same account: enabling cross-product cohort analysis at query time." },
                  { q: "What does the identity graph solve?", a: "Users interact anonymously before logging in. Without identity resolution, pre-login behaviour disappears from activation funnels. Segment Unify retroactively stitches these sessions to known accounts: essential for accurate top-of-funnel analysis." },
                  { q: "How do product-specific IDs resolve?", a: "Some products use their own internal account IDs. A product-to-account mapping layer in the warehouse resolves these to the canonical key: enabling revenue analysis against product-specific engagement data without restructuring the source systems." },
                ].map(({ q, a }) => (
                  <div key={q} className="card-hover" style={{
                    background: "var(--surface)", border: "1px solid var(--border-subtle)",
                    borderRadius: "12px", padding: "16px 18px",
                  }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)", marginBottom: "7px" }}>{q}</div>
                    <p style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Three Phases ──────────────────────────────────────────────── */}
        <section id="evolution" style={secAlt}>
          <div style={wrap}>
            <Label>Platform Evolution</Label>
            <Heading className="gradient-heading">Three phases: each solving the ceiling of the last</Heading>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "36px" }}>
              <Phase n="1" title="Segment + Snowflake + Mixpanel"
                constraint="Sync between Segment and Mixpanel was fragile: schema changes caused data gaps. Per-user pricing scaled unsustainably at enterprise volume. Behavioural data lived in a silo with no direct path to ARR joins.">
                <p>First full analytics stack. Segment collected events and routed them to Snowflake (warehouse) and Mixpanel (PM dashboards). dbt staging and dimensional models structured the raw event stream. Product Managers got self-serve analytics for the first time.</p>
                <div><Tag color="#6366f1">Segment</Tag><Tag color="#6366f1">Snowflake</Tag><Tag color="#6366f1">Mixpanel</Tag><Tag color="#6366f1">dbt</Tag></div>
              </Phase>
              <Phase n="2" title="Warehouse-Native Migration to Optimizely Analytics">
                <p>Migrated the reporting layer to <strong style={{ color: "var(--foreground)" }}>Optimizely Analytics</strong>: warehouse-native, querying Snowflake directly. No sync infrastructure, no mirror tables, no per-user pricing. Behavioural data became natively joinable to ARR and contract records in the same query.</p>
                <p style={{ marginTop: "10px" }}>All dashboards and metrics migrated under parallel-run conditions with parity validation before cutover. Classic &quot;Opti on Opti&quot;: dogfooding the company&apos;s own analytics product.</p>
                <div style={{
                  marginTop: "14px", padding: "12px 14px",
                  background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "8px",
                }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "5px" }}>
                    My decision
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--foreground-muted)", lineHeight: 1.6 }}>
                    Mixpanel was working. The migration was my recommendation: not mandated. I made the case to leadership based on sync fragility, per-user pricing trajectory, and the structural inability to join behavioural data to ARR without custom pipelines. The full architecture decision record is in the{" "}
                    <a href="https://systems-architecture.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Systems Architecture case study</a>.
                  </p>
                </div>
                <div><Tag color="#6366f1">Optimizely Analytics</Tag><Tag color="#6366f1">Warehouse-Native</Tag><Tag color="#6366f1">ARR Joins</Tag></div>
              </Phase>
              <Phase n="3" title="Agentic AI Extension">
                <p>When Opal shipped, the same Segment rails were extended with new event types covering AI tool invocations, agent executions, and discovery interactions. No new infrastructure: the contract, identity model, and pipeline all carried AI data with the same rigour as any product feature.</p>
                <p style={{ marginTop: "10px" }}>This required designing a measurement framework for an entirely new product category: defining what &quot;engagement&quot; means for an AI agent, not a button click.</p>
                <div><Tag color="#6366f1">Opal AI</Tag><Tag color="#6366f1">Agent Measurement</Tag><Tag color="#6366f1">AI-Scale Tracking</Tag></div>
              </Phase>
            </div>
          </div>
        </section>

        <ChapterTransition from="The Build: instrumentation contract, pipeline, and identity layer in place" to="Chapter 03 · The Intelligence: what do we measure, and who acts on it?" />

        <div className="divider-gradient" />

        {/* ── Metric Formulation ────────────────────────────────────────── */}
        <section id="metrics" style={sec}>
          <div style={wrap}>
            <ChapterBadge n={3} color="#6366f1" />
            <Label>Metric Formulation &amp; Stakeholder Collaboration</Label>
            <Heading className="gradient-heading">Engagement metrics co-designed with Product and Feature owners</Heading>
            <Body>
              A metric I define on my own is an analytics metric. A metric I build with the PM is a product metric: it gets used in roadmap reviews, it gets challenged, and it gets improved. I ran a design process with each product&apos;s PM and feature owners: what does &ldquo;engaged&rdquo; actually mean for this product? The definitions below show the framework: the construction patterns are real, the illustrative numbers stand in for the governed values.
            </Body>

            {/* What is Level 1 */}
            <div style={{
              marginTop: "32px", background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.18)",
              borderRadius: "14px", padding: "22px 26px", maxWidth: "800px",
            }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "10px" }}>
                What a Level 1 metric is: and what it does
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--foreground-muted)", lineHeight: 1.75 }}>
                A Level 1 metric is a product&apos;s single, canonical definition of an{" "}
                <strong style={{ color: "var(--foreground)" }}>engaged account</strong>: an account doing the
                core thing the product exists to do, not just logging in or clicking around.{" "}
                <strong style={{ color: "var(--foreground)" }}>What it does:</strong> it turns raw usage into
                one shared signal the whole company reads the same way, so product health, churn risk, and
                expansion readiness are all measured against the same line. The definition has to be specific
                enough to exclude noise (trial clicks, internal users, failed attempts) and broad enough to
                cover how customers really use the product: get it wrong and you either over-count
                disengaged accounts or under-count genuinely engaged ones.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
                {["Product health (Engaged ARR %)", "CS churn-risk queue", "Expansion & PLG targeting", "Board / steerco reporting"].map((c) => (
                  <span key={c} style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.22)", borderRadius: "6px", padding: "5px 11px", fontSize: "0.72rem", fontWeight: 600, color: "#a5b4fc" }}>{c}</span>
                ))}
              </div>
            </div>

            {/* Metric construction patterns: sophistication, illustrative examples */}
            <div style={{ marginTop: "28px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                How the metrics are built: patterns layered on the base family
              </div>

              {/* base family strip */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginBottom: "20px" }}>
                {["Engaged Accounts", "Engaged ARR", "Engaged ARR %", "Non-Engaged"].map((b) => (
                  <span key={b} style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.22)", borderRadius: "6px", padding: "5px 11px", fontSize: "0.74rem", fontWeight: 600, color: "#a5b4fc" }}>{b}</span>
                ))}
                <span style={{ fontSize: "0.74rem", color: "var(--foreground-subtle)", fontStyle: "italic" }}>
                  the base family, per product line: the depth is in how these are constructed &amp; extended ↓
                </span>
              </div>

              {/* construction pattern cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
                {[
                  {
                    pattern: "Revenue-penetration ratios",
                    construct: "An engaged measure over the FP&A-validated revenue base: computed per product and per sub-line, so Web Experimentation, Feature Experimentation and Personalization each report against their own ARR.",
                    example: "≈ 62% of a line's ARR backed by active usage this month; the remaining ≈ 38% is the at-risk surface leadership watches.",
                    color: "#6366f1",
                  },
                  {
                    pattern: "Conditional composite flags",
                    construct: "Multi-clause definitions that fuse engagement intensity, persistence, ARR and exclusions into a single signal: not a blunt active / inactive split.",
                    example: "A churn-risk flag firing when low weekly activity persists ~4 weeks AND ARR sits above a high-value line AND collaboration-only / asset-only seats are excluded.",
                    color: "#f59e0b",
                  },
                  {
                    pattern: "Multi-window cadence",
                    construct: "The same metric read at weekly, 30-, 60-, 90-day and all-time horizons: each product judged on its natural rhythm rather than one global window.",
                    example: "SaaS authoring tools on a 30-day read; bursty consumption products on a 90-day read, so a quiet month isn't misclassified as churn.",
                    color: "#10b981",
                  },
                  {
                    pattern: "Sub-account grain ratios",
                    construct: "Ratios computed below the account: at thread, session or user grain: to capture depth of use, not just whether the account showed up.",
                    example: "Share of AI threads that trigger an agent (thread grain); or authored instructions per active user (per-seat depth).",
                    color: "#818cf8",
                  },
                  {
                    pattern: "Outlier-resistant central tendency",
                    construct: "Median chosen over mean wherever a handful of heavy accounts would distort the benchmark: so the typical account is represented honestly.",
                    example: "Median credits per account by purchase tier: a realistic per-segment bar, not a whale-skewed average.",
                    color: "#a5b4fc",
                  },
                  {
                    pattern: "Lifecycle & cohort splits",
                    construct: "The same engagement lens sliced by acquisition cohort and onboarding stage, so adoption is read in the context of where an account is in its journey.",
                    example: "Core vs acquired accounts compared separately; or usage tracked by onboarding stage from recently-signed through stalled to complete.",
                    color: "#34d399",
                  },
                ].map((p) => (
                  <div key={p.pattern} className="card-hover" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "14px", overflow: "hidden" }}>
                    <div style={{ background: `${p.color}0d`, borderBottom: "1px solid var(--border-subtle)", padding: "13px 18px" }}>
                      <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "var(--foreground)" }}>{p.pattern}</div>
                    </div>
                    <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <p style={{ fontSize: "0.79rem", color: "var(--foreground-muted)", lineHeight: 1.55 }}>{p.construct}</p>
                      <div style={{ background: `${p.color}0a`, border: `1px solid ${p.color}22`, borderRadius: "7px", padding: "9px 12px" }}>
                        <div style={{ fontSize: "0.54rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: p.color, marginBottom: "4px" }}>Illustrative</div>
                        <div style={{ fontSize: "0.76rem", color: "var(--foreground-muted)", lineHeight: 1.5 }}>{p.example}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: "14px", fontSize: "0.76rem", color: "var(--foreground-subtle)", lineHeight: 1.6, maxWidth: "800px", fontStyle: "italic" }}>
                Figures above are illustrative, not production values: the real definitions, thresholds
                and windows are co-designed per product and governed internally. What is portable is the
                pattern library: the same handful of construction techniques applied across every product line.
              </p>
            </div>

            {/* Coverage: WX / FX / P13N separated */}
            <div style={{ marginTop: "28px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                Coverage: one framework, applied per product line
              </div>
              <MetricCoverageMatrix />
              <p style={{ marginTop: "12px", fontSize: "0.76rem", color: "var(--foreground-subtle)", lineHeight: 1.6, maxWidth: "780px" }}>
                Experimentation is measured as three distinct lines: Web Experimentation, Feature
                Experimentation, and Personalization: each with its own engaged-ARR penetration against
                its own revenue base. Opal (AI) sits outside this family on a consumption model (credit
                registration, tier benchmarks, and cross-product attach %), shown in the segmentation
                layer below.
              </p>
            </div>

            {/* Collaboration process */}
            <div style={{ marginTop: "32px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "16px" }}>
                Metric design process: from idea to canonical definition
              </div>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0" }}>
                {[
                  { label: "PM/Feature Owner alignment", sub: "What does 'engaged' mean for this product?" },
                  { label: "Data exploration", sub: "Which events proxy that behaviour?" },
                  { label: "Threshold calibration", sub: "What separates engaged from noise?" },
                  { label: "Governance sign-off", sub: "Single definition, documented" },
                  { label: "dbt → OA → PowerBI", sub: "One metric, all consumers" },
                ].map(({ label, sub }, i, arr) => (
                  <div key={label} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{
                      background: i === 4 ? "rgba(99,102,241,0.12)" : "var(--surface)",
                      border: `1px solid ${i === 4 ? "rgba(99,102,241,0.35)" : "var(--border-subtle)"}`,
                      borderRadius: "8px", padding: "10px 14px",
                    }}>
                      <div style={{ fontSize: "0.79rem", fontWeight: 600, color: i === 4 ? "#a5b4fc" : "var(--foreground)" }}>{label}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--foreground-subtle)", marginTop: "2px" }}>{sub}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ color: "var(--foreground-subtle)", margin: "0 5px", fontSize: "0.75rem" }}>→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature adoption metrics */}
            <div style={{ marginTop: "32px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                Feature adoption metrics: derivative layer built on Level 1 events
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                {[
                  {
                    product: "Experimentation",
                    features: ["AI-assisted experiment setup", "Multivariate test usage", "Stats Accelerator adoption", "Bandit / MAB usage"],
                    color: "#6366f1",
                    note: "Feature adoption tracked per release: enables launch-day vs steady-state cohort comparison",
                  },
                  {
                    product: "Content Marketing Platform",
                    features: ["AI content generation usage", "Content workflow feature adoption", "Multi-channel publishing", "Collaboration features"],
                    color: "#10b981",
                    note: "Feature-level metrics drive Content Marketing Platform roadmap prioritisation and surface underutilised capabilities",
                  },
                  {
                    product: "Opal (AI Platform)",
                    features: ["Agent builder adoption", "OOTB agent usage by category", "Custom agent creation", "Multi-step workflow agents"],
                    color: "#f59e0b",
                    note: "AI feature metrics directly inform which agent types to invest in and where to simplify onboarding",
                  },
                ].map(({ product, features, color, note }) => (
                  <div key={product} className="card-hover" style={{
                    background: "var(--surface)", border: "1px solid var(--border-subtle)",
                    borderRadius: "14px", padding: "20px",
                  }}>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color, marginBottom: "12px" }}>
                      {product}
                    </div>
                    {features.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                        <span style={{ fontSize: "0.82rem", color: "var(--foreground-muted)" }}>{f}</span>
                      </div>
                    ))}
                    <p style={{ marginTop: "12px", fontSize: "0.74rem", color: "var(--foreground-subtle)", lineHeight: 1.55, fontStyle: "italic" }}>{note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement segmentation: beyond Level 1 */}
            <div style={{ marginTop: "32px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                Engagement segmentation: account tiers beyond the Level 1 binary
              </div>
              <p style={{ fontSize: "0.84rem", color: "var(--foreground-muted)", lineHeight: 1.7, maxWidth: "680px", marginBottom: "20px" }}>
                Level 1 defines the minimum bar: engaged or not. But once that baseline is in place, a second layer of segmentation answers a more commercially useful question: how deeply is an engaged account using the product? These tiers power churn risk identification, CS prioritisation, and expansion targeting.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                {[
                  {
                    product: "Content Marketing Platform",
                    color: "#10b981",
                    tiers: [
                      { label: "Power Accounts", desc: "Highest weekly engagement volume: accounts deriving core value from the platform", color: "#10b981" },
                      { label: "Casual Accounts", desc: "Below engagement floor: activation risk, monitored but not yet a churn signal", color: "#f59e0b" },
                      { label: "High Risk ARR", desc: "Engagement pattern most correlated with upcoming churn: surfaced directly to CS as a priority queue", color: "#ef4444" },
                    ],
                    note: "Three-tier segmentation turns a binary engaged/not metric into a prioritised CS action list",
                  },
                  {
                    product: "Opal (AI Platform)",
                    color: "#f59e0b",
                    tiers: [
                      { label: "Advanced Tier accounts", desc: "Highest credit allocation: credit consumption benchmark tracked separately per tier", color: "#f59e0b" },
                      { label: "Enhanced Tier accounts", desc: "Mid-tier: adoption depth versus registered credit comparison", color: "#f59e0b" },
                      { label: "Essential Tier accounts", desc: "Entry point: onboarding stage and time-to-first-credit tracked as activation health", color: "#f59e0b" },
                    ],
                    note: "Tier-split benchmarks let CS set realistic activation targets per customer segment, not one-size averages",
                  },
                  {
                    product: "Experimentation + Opal (Cross-Product)",
                    color: "#6366f1",
                    tiers: [
                      { label: "Eligible accounts", desc: "Paid on both Experimentation and Opal: the addressable cross-product base", color: "#a5b4fc" },
                      { label: "Active accounts", desc: "Opal-provisioned Experimentation customers with registered credit usage in Opal", color: "#818cf8" },
                      { label: "Cross-product utilisation rate", desc: "Active / eligible: the attach metric, updated monthly, used in the AI expansion commercial play", color: "#6366f1" },
                    ],
                    note: "The first native cross-product utilisation metric: only possible because both products share the same canonical account key",
                  },
                ].map(({ product, color, tiers, note }) => (
                  <div key={product} className="card-hover" style={{
                    background: "var(--surface)", border: "1px solid var(--border-subtle)",
                    borderRadius: "14px", overflow: "hidden",
                  }}>
                    <div style={{ background: `${color}0d`, borderBottom: "1px solid var(--border-subtle)", padding: "12px 18px" }}>
                      <div style={{ fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color, marginBottom: "2px" }}>Segmentation layer</div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--foreground)" }}>{product}</div>
                    </div>
                    <div style={{ padding: "14px 18px" }}>
                      {tiers.map((t) => (
                        <div key={t.label} style={{ display: "flex", gap: "10px", marginBottom: "9px", alignItems: "flex-start" }}>
                          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: t.color, flexShrink: 0, marginTop: "5px" }} />
                          <div>
                            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--foreground)" }}>{t.label}</div>
                            <div style={{ fontSize: "0.73rem", color: "var(--foreground-muted)", lineHeight: 1.5 }}>{t.desc}</div>
                          </div>
                        </div>
                      ))}
                      <p style={{ marginTop: "10px", fontSize: "0.73rem", color, lineHeight: 1.5, fontStyle: "italic", borderTop: "1px solid var(--border-subtle)", paddingTop: "10px", opacity: 0.85 }}>{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact: retention & adoption growth */}
            <div style={{ marginTop: "40px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                Impact: what the metrics changed
              </div>
              <RetentionImpactCharts />
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Survival Analysis & Churn Prediction ──────────────────────── */}
        <section style={sec}>
          <div style={wrap}>
            <Label>Churn Prediction & CS Activation</Label>
            <Heading className="gradient-heading">From engagement metrics to predicting who leaves next</Heading>
            <Body>
              Once Level 1 metrics were in place, there was a natural next question: can we predict churn before it shows up in a renewal conversation? I applied survival analysis across the account base, using engagement tier as the stratification variable. The output wasn&apos;t just a model: it was a prioritised CS action queue.
            </Body>

            <div style={{ marginTop: "28px", background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: "14px", padding: "20px 24px", maxWidth: "820px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "10px" }}>
                How the analysis worked
              </div>
              <p style={{ fontSize: "0.87rem", color: "var(--foreground-muted)", lineHeight: 1.75 }}>
                I used the Level 1 engagement metric as the time-varying covariate in a Kaplan-Meier survival model. Each account was assigned to a risk tier at the start of each measurement period based on its engagement score. The model estimated survival probability (probability of remaining a customer) over a 12-month horizon by tier. The result: a clear separation in survival curves: engaged accounts had a dramatically lower hazard rate than non-engaged ones, which validated the Level 1 threshold as a real churn signal, not just a usage metric.
              </p>
            </div>

            <div style={{ marginTop: "32px" }}>
              <SurvivalCurveChart />
            </div>

            <div style={{ marginTop: "28px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "16px" }}>
                How this translated into CS workflows
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                {[
                  {
                    step: "01",
                    title: "Monthly risk tier export",
                    desc: "Each month, account risk tiers were calculated from the warehouse and pushed to the CS team as a prioritised list: not a dashboard for self-serve, but a structured output ready to action.",
                    color: "#6366f1",
                  },
                  {
                    step: "02",
                    title: "CS playbook per tier",
                    desc: "I worked with CS leads to build a specific playbook for each tier. Non-engaged high-ARR accounts got CSM escalation. Low-engagement accounts got a structured re-activation sequence. The playbook was built from the sprint findings, not intuition.",
                    color: "#f59e0b",
                  },
                  {
                    step: "03",
                    title: "Feedback loop into the model",
                    desc: "CS flagged accounts where the engagement signal didn't match the renewal reality: edge cases like strategic pauses or implementation phases. Those annotations fed back into threshold refinement. The model got sharper over time.",
                    color: "#10b981",
                  },
                ].map(({ step, title, desc, color }) => (
                  <div key={step} className="card-hover" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "14px", padding: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: `${color}18`, border: `1px solid ${color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800, color, flexShrink: 0 }}>{step}</div>
                      <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--foreground)" }}>{title}</span>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Dashboard Architecture ────────────────────────────────────── */}
        <section id="dashboards" style={secAlt}>
          <div style={wrap}>
            <Label>Dashboard Architecture</Label>
            <Heading className="gradient-heading">Three intelligence tiers: different questions, different audiences</Heading>
            <Body>
              Dashboards are not a flat collection: they are a tiered intelligence system. Each tier
              answers fundamentally different questions for a different audience, at a different cadence,
              with different metric granularity. Mixpanel served as the PM-facing layer in Phase 1;
              Optimizely Analytics and PowerBI now cover all three tiers natively from the warehouse.
            </Body>

            <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px" }}>
              <DashTier
                tier="1"
                label="Executive Intelligence"
                audience="Board · Steerco · Leadership"
                color="#f59e0b"
                borderClass="card-tier-amber"
                dashboards={[
                  "Product engagement by ARR segment",
                  "Cross-product adoption rates",
                  "Opal AI revenue impact overview",
                  "Quarterly engagement trends vs targets",
                ]}
                metrics={["ARR-linked engagement", "Quarterly trends", "Segment benchmarks", "Executive KPIs"]}
              />
              <DashTier
                tier="2"
                label="Product Intelligence"
                audience="Product Managers · Designers · Analytics"
                color="#6366f1"
                borderClass="card-tier-indigo"
                dashboards={[
                  "Product usage & adoption by feature",
                  "Opal AI usage across Experimentation and Content Marketing Platform",
                  "Dev Agent experiment quality analysis",
                  "Agent directory adoption and discovery",
                  "Feature adoption funnels by release cohort",
                ]}
                metrics={["Feature adoption", "Cohort retention", "Funnel analysis", "Experiment quality"]}
              />
              <DashTier
                tier="3"
                label="Operational Intelligence"
                audience="Customer Success · Sales · Finance"
                color="#10b981"
                borderClass="card-tier-emerald"
                dashboards={[
                  "Account health scores",
                  "Experimentation contract overage signals",
                  "Opal adoption and attach analysis",
                  "Usage forecast for capacity planning",
                  "DXP overage and expansion flags",
                ]}
                metrics={["Account health", "Overage signals", "Churn flags", "CS workflows"]}
              />
            </div>

            {/* Mixpanel vs OA */}
            <div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div className="card-hover" style={{
                background: "var(--surface)", border: "1px solid var(--border-subtle)",
                borderRadius: "14px", padding: "22px",
              }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7856FF", marginBottom: "12px" }}>
                  Phase 1 · Mixpanel dashboards
                </div>
                {[
                  "Product-level usage funnels per feature",
                  "User retention cohort analysis",
                  "Event volume and trend monitoring",
                  "PM self-serve exploration",
                  "Feature release adoption tracking",
                ].map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#7856FF", flexShrink: 0, opacity: 0.6 }} />
                    <span style={{ fontSize: "0.82rem", color: "var(--foreground-muted)" }}>{d}</span>
                  </div>
                ))}
                <p style={{ marginTop: "12px", fontSize: "0.74rem", color: "var(--foreground-subtle)", lineHeight: 1.5, fontStyle: "italic" }}>
                  Behavioural data only: no path to ARR joins without custom pipelines
                </p>
              </div>

              <div className="card-hover" style={{
                background: "var(--surface)", border: "1px solid var(--border-subtle)",
                borderRadius: "14px", padding: "22px",
              }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6366f1", marginBottom: "12px" }}>
                  Phase 2+ · Optimizely Analytics + PowerBI
                </div>
                {[
                  "Cross-product engagement with ARR context",
                  "Account health and expansion signal dashboards",
                  "AI feature adoption and agent utilisation",
                  "Executive board-level engagement reporting",
                  "Finance and CS operational views",
                ].map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#6366f1", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.82rem", color: "var(--foreground-muted)" }}>{d}</span>
                  </div>
                ))}
                <p style={{ marginTop: "12px", fontSize: "0.74rem", color: "var(--foreground-subtle)", lineHeight: 1.5, fontStyle: "italic" }}>
                  Warehouse-native: every metric joinable to ARR and contract data at query time
                </p>
              </div>
            </div>

            {/* GTM callout */}
            <div style={{ marginTop: "24px", background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.16)", borderRadius: "12px", padding: "16px 20px" }}>
              <p style={{ fontSize: "0.84rem", color: "var(--foreground-muted)", lineHeight: 1.7 }}>
                The Tier 3 layer extends into a GTM activation layer: named funnel dashboards refreshed as accounts cross engagement thresholds, used directly in Sales and CS conversations across AI attach, vertical, cross-sell, and displacement plays.
              </p>
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Data Observability & Governance ───────────────────────────── */}
        <section style={secAlt}>
          <div style={wrap}>
            <Label>Data Observability &amp; Governance</Label>
            <Heading className="gradient-heading">The trust layer: why every number holds up</Heading>
            <Body>
              A metric is only useful if people act on it, and they only act if they trust it. Two
              systems keep the platform credible: automated pipeline guardrails, and a governed metric
              layer with a single source of truth per definition.
            </Body>

            <div style={{ marginTop: "32px", background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "16px", padding: "24px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "16px" }}>
                Pipeline guardrails: the gate extended into automation
              </div>
              <PipelineGuardrails />
            </div>

            <div style={{ marginTop: "24px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "16px" }}>
                Metric governance: one definition, many consumers
              </div>
              <MetricGovernance />
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Monthly Product Reporting ──────────────────────────────────── */}
        <section style={sec}>
          <div style={wrap}>
            <Label>Monthly Product Reporting</Label>
            <Heading className="gradient-heading">A monthly operating review delivering product intelligence to the exec team</Heading>
            <Body>
              Dashboards give teams self-serve access to data. The monthly report translates that data
              into a structured narrative: surfacing what changed, what it means, and what decisions
              it should drive. Produced monthly and distributed to the Executive Leadership Team via Coda.
            </Body>

            <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
              {[
                { step: "01", label: "Data pull from Snowflake", sub: "Level 1 engagement, feature adoption, Opal AI usage, and experiment velocity: queried directly from the warehouse" },
                { step: "02", label: "Analysis and narrative layer", sub: "Trend identification, cohort comparisons, MoM movements, and key insights connecting data to product and commercial context" },
                { step: "03", label: "Coda document compiled", sub: "Structured report combining visualisations, narrative, notable account callouts, and recommended actions" },
                { step: "04", label: "ELT distribution", sub: "Distributed to the Executive Leadership Team monthly: used for product strategy discussions, roadmap inputs, and commercial briefings" },
              ].map(({ step, label, sub }) => (
                <div key={step} className="card-hover" style={{
                  background: "var(--surface)", border: "1px solid var(--border-subtle)",
                  borderRadius: "12px", padding: "18px",
                }}>
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%",
                    background: "var(--accent-muted)", border: "1px solid var(--accent-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.62rem", fontWeight: 800, color: "var(--accent)", marginBottom: "12px",
                  }}>
                    {step}
                  </div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "6px" }}>{label}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--foreground-muted)", lineHeight: 1.5 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ChapterTransition from="The Intelligence: metrics defined, dashboards built, churn predicted" to="Chapter 04 · The Impact: data becoming revenue decisions" />

        <div className="divider-gradient" />

        {/* ── Analytics Sprints → GTM Plays ────────────────────────────── */}
        <section id="gtm" style={secAlt}>
          <div style={wrap}>
            <ChapterBadge n={4} color="#10b981" />
            <Label>From Insight to Revenue Action</Label>
            <Heading className="gradient-heading">Analytics sprints that drove GTM plays</Heading>
            <Body>
              Dashboards are advisory. Sprints are operational. A recurring sprint cadence translated
              data signals into structured findings: delivered as written briefs to PMs, CS leads, and GTM teams.
              Five plays shaped commercial strategy directly: across activation, cross-sell, AI attach, competitor displacement, and product expansion.
            </Body>

            <div style={{ margin: "32px 0", display: "flex", alignItems: "center", gap: "0", flexWrap: "wrap" }}>
              {[
                { label: "Signal detected in OA", active: false },
                { label: "Sprint hypothesis", active: false },
                { label: "Data pull & analysis", active: false },
                { label: "Structured finding brief", active: false },
                { label: "GTM play executed", active: true },
              ].map(({ label, active }, i, arr) => (
                <div key={label} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    background: active ? "rgba(99,102,241,0.12)" : "var(--surface)",
                    border: `1px solid ${active ? "rgba(99,102,241,0.35)" : "var(--border-subtle)"}`,
                    borderRadius: "8px", padding: "9px 15px",
                    fontSize: "0.79rem", color: active ? "#a5b4fc" : "var(--foreground-muted)",
                    fontWeight: active ? 700 : 400,
                  }}>
                    {label}
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ color: "var(--foreground-subtle)", margin: "0 5px", fontSize: "0.75rem" }}>→</div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
              {[
                {
                  type: "Activation",
                  title: "Segment-specific CS playbooks",
                  desc: "High-ARR accounts below engagement thresholds: data signals identified the gap and shaped industry-specific activation programmes for CS, replacing intuition-driven outreach.",
                  color: "#6366f1",
                },
                {
                  type: "Cross-sell & Expansion",
                  title: "Product usage as the sales brief",
                  desc: "Cross-product cohort data surfaced accounts deeply engaged on one product with no footprint on an adjacent line: creating expansion-ready account lists that previously required manual CRM trawling.",
                  color: "#10b981",
                },
                {
                  type: "AI Attach",
                  title: "Behavioural data as the commercial proof point",
                  desc: "AI-assisted experiments qualified at measurably higher rates. That signal became the evidence base for the Opal attach motion: replacing product marketing claims with accounts-that-look-like-this data.",
                  color: "#f59e0b",
                },
              ].map(({ type, title, desc, color }) => (
                <div key={type} className="card-hover" style={{
                  background: "var(--surface)", border: "1px solid var(--border-subtle)",
                  borderRadius: "14px", overflow: "hidden",
                }}>
                  <div style={{ background: `${color}0d`, borderBottom: "1px solid var(--border-subtle)", padding: "12px 18px" }}>
                    <div style={{ fontSize: "0.58rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color, marginBottom: "3px" }}>{type}</div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--foreground)" }}>{title}</div>
                  </div>
                  <div style={{ padding: "14px 18px" }}>
                    <p style={{ fontSize: "0.82rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Agentic AI ────────────────────────────────────────────────── */}
        <section id="ai" style={sec}>
          <div style={wrap}>
            <Label>Agentic AI Measurement</Label>
            <Heading className="gradient-heading">Measurement infrastructure for enterprise AI at production scale</Heading>
            <Body>
              When Opal shipped, I had no reference point for measuring AI agent behaviour at product scale. Nobody did. I had to figure out what &ldquo;engagement&rdquo; even means for an agent: not a click, not a pageview, but a task completion spanning multiple tool calls. I extended the existing Segment contract with three new event types and built the measurement layer from scratch, no new infrastructure needed.
            </Body>

            <div className="card-hover card-tier card-tier-indigo" style={{
              background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "14px", padding: "22px 26px", marginTop: "28px", maxWidth: "800px",
            }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "10px" }}>
                Why this was a measurement design problem, not a tracking problem
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--foreground-muted)", lineHeight: 1.75 }}>
                A button click is either clicked or not. An AI agent executes tool chains, fails silently,
                returns partial results, and spans multiple LLM calls per user interaction. Defining what
                counts as &quot;engagement&quot; required rethinking the unit of work entirely: from a UI event to
                a task completion. The three event types below were the outcome of that design process.
              </p>
            </div>

            {/* Tree: root → 3 event type branches */}
            <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Root node */}
              <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "12px", padding: "11px 28px", textAlign: "center" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#a5b4fc" }}>Opal Agent Execution</div>
                <div style={{ fontSize: "0.68rem", color: "var(--foreground-muted)", marginTop: "3px" }}>emits three event types per execution</div>
              </div>
              {/* SVG branch connector */}
              <svg width="100%" height="36" viewBox="0 0 420 36" preserveAspectRatio="none" style={{ display: "block", maxWidth: "760px" }}>
                <line x1="210" y1="0" x2="210" y2="18" stroke="rgba(99,102,241,0.28)" strokeWidth="1.5"/>
                <line x1="70" y1="18" x2="350" y2="18" stroke="rgba(99,102,241,0.28)" strokeWidth="1.5"/>
                <line x1="70" y1="18" x2="70" y2="36" stroke="rgba(99,102,241,0.28)" strokeWidth="1.5"/>
                <line x1="210" y1="18" x2="210" y2="36" stroke="rgba(99,102,241,0.28)" strokeWidth="1.5"/>
                <line x1="350" y1="18" x2="350" y2="36" stroke="rgba(99,102,241,0.28)" strokeWidth="1.5"/>
              </svg>
              {/* Three leaf nodes */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", width: "100%", maxWidth: "760px" }}>
                {[
                  { event: "Tool invocation tracking", desc: "Every individual tool call: function name, execution context, and outcome. Enables tool-level usage analysis, failure pattern detection, and tool popularity ranking across the entire agent ecosystem.", color: "#a5b4fc" },
                  { event: "Agent execution tracking", desc: "Top-level agent engagement. Captures agent type, task context, latency, and success signal: the primary engagement event for AI product analytics. Distinguishes specialized agents from workflow orchestrators.", color: "#818cf8" },
                  { event: "Agent discovery tracking", desc: "How users navigate and discover Optimizely-built agents. Measures discoverability alongside adoption: a gap most AI analytics frameworks miss entirely. An agent nobody finds cannot be adopted.", color: "#6366f1" },
                ].map(({ event, desc, color }) => (
                  <div key={event} className="card-hover card-tier card-tier-indigo" style={{ background: "var(--surface)", border: `1px solid ${color}28`, borderRadius: "14px", padding: "20px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, marginBottom: "10px", boxShadow: `0 0 5px ${color}60` }} />
                    <div style={{ fontSize: "0.86rem", fontWeight: 700, color, marginBottom: "10px" }}>{event}</div>
                    <p style={{ fontSize: "0.82rem", color: "var(--foreground-muted)", lineHeight: 1.65, margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "16px" }}>
                How an Opal agent executes: and how it&apos;s measured
              </div>
              <div className="card-hover" style={{
                background: "var(--surface)", border: "1px solid var(--border-subtle)",
                borderRadius: "14px", padding: "22px",
              }}>
                <AgentExecFlow />
              </div>
            </div>

            {/* What this unlocked */}
            <div style={{ marginTop: "28px", background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.14)", borderRadius: "12px", padding: "18px 22px" }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "8px" }}>
                  What this measurement unlocked
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                  {[
                    { title: "AI roadmap evidence", desc: "First-time visibility into which agent types and tools customers actually use: directly powering Opal product roadmap prioritisation.", color: "#a5b4fc" },
                    { title: "Evidence-based upsell", desc: "AI-assisted experiments qualify at higher rates: a data-backed proof point replacing product marketing claims in the commercial attach motion.", color: "#818cf8" },
                    { title: "Ecosystem visibility", desc: "Customer-built agents mapped by type and usage: inputs to infrastructure scaling and enterprise sales conversations.", color: "#c4b5fd" },
                  ].map(({ title, desc, color }) => (
                    <div key={title}>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color, marginBottom: "5px" }}>{title}</div>
                      <p style={{ fontSize: "0.78rem", color: "var(--foreground-muted)", lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Agentic AI for Analytics ──────────────────────────────────── */}
        <section style={secAlt}>
          <div style={wrap}>
            <Label>Agentic AI for Analytics</Label>
            <Heading className="gradient-heading">Building analytics agents on top of Opal: specialized agents, MCP tools, and workflow orchestration</Heading>
            <Body>
              I built a two-layer agent system inside Opal. Specialized agents each own one analytics domain and expose their capabilities as MCP tools — typed functions that execute live queries against Optimizely Analytics. Workflow agents sit above them, orchestrating the specialists in sequence or parallel, synthesising their outputs into a narrative, and pushing the result to Coda, Outlook, or Teams. The monthly product report runs on this stack automatically.
            </Body>

            {/* Architecture stack */}
            <div style={{ marginTop: "32px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                Agent architecture: four layers
              </div>
              <AgentArchitectureStack />
            </div>

            {/* Specialized agents + tools */}
            <div style={{ marginTop: "28px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                Specialized agents and their MCP tools
              </div>
              <SpecializedAgentsGrid />
            </div>

            {/* Workflow orchestration */}
            <div style={{ marginTop: "28px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                Workflow agent execution: monthly report end-to-end
              </div>
              <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "14px", padding: "20px" }}>
                <WorkflowOrchestrationDiagram />
              </div>
            </div>

            {/* Design rationale */}
            <div style={{ marginTop: "20px", background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: "14px", padding: "18px 22px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "8px" }}>Why this architecture over one large agent</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                {[
                  { point: "Reusability", desc: "The Engagement Analyst agent isn't only used by the Monthly Report workflow — the same agent handles on-demand PM queries. One agent, many callers.", color: "#6366f1" },
                  { point: "Debuggability", desc: "When a number looks wrong, the fault is isolated to one agent and one tool — not a monolithic prompt that produces everything at once.", color: "#10b981" },
                  { point: "Typed data layer", desc: "MCP tools return structured JSON, not natural language. The synthesis layer gets clean data, not agent-interpreted prose that can drift.", color: "#f59e0b" },
                  { point: "Composable coverage", desc: "A new workflow (board prep, sales territory briefing) is assembled from existing agents — not built from scratch each time.", color: "#a5b4fc" },
                ].map(({ point, desc, color }) => (
                  <div key={point}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color, marginBottom: "4px" }}>{point}</div>
                    <p style={{ fontSize: "0.74rem", color: "var(--foreground-muted)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* On-demand use cases divider */}
            <div style={{ marginTop: "28px", borderTop: "1px solid var(--border-subtle)", paddingTop: "24px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginBottom: "14px" }}>
                On-demand use: prompt → agent → OA → insight
              </div>

              {/* Persona prompts row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px", marginBottom: "16px" }}>
                {[
                  { persona: "Product Manager", prompt: "\"What's the feature adoption breakdown for Experimentation this quarter?\"", color: "#6366f1", icon: "PM" },
                  { persona: "CS Lead", prompt: "\"Pull the engagement profile for [Account] — renewal is next week.\"", color: "#10b981", icon: "CS" },
                  { persona: "Executive", prompt: "\"Give me the board-ready engagement summary across all product lines.\"", color: "#f59e0b", icon: "EX" },
                  { persona: "Sales", prompt: "\"What does an engaged Experimentation account look like vs this prospect?\"", color: "#f43f5e", icon: "SA" },
                ].map(({ persona, prompt, color, icon }) => (
                  <div key={persona} style={{ background: `${color}08`, border: `1px solid ${color}22`, borderRadius: "12px", padding: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${color}20`, border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.56rem", fontWeight: 800, color, flexShrink: 0 }}>{icon}</span>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color }}>{persona}</span>
                    </div>
                    <p style={{ fontSize: "0.72rem", color: "var(--foreground-muted)", lineHeight: 1.55, fontStyle: "italic", margin: 0 }}>{prompt}</p>
                  </div>
                ))}
              </div>

              {/* Arrow down */}
              <div style={{ textAlign: "center", color: "var(--accent)", fontSize: "1.2rem", marginBottom: "12px", opacity: 0.7 }}>↓</div>

              {/* Opal agent hub */}
              <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "16px", padding: "20px 24px", marginBottom: "12px", boxShadow: "0 0 32px rgba(99,102,241,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--accent)" }}>Opal Agent</span>
                    <span style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#34d399", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "20px", padding: "2px 8px" }}>reasoning + tool calls</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {[
                    { step: "Understand intent", sub: "Parses the question into a data need: metric type, product scope, time window, account filter", color: "#6366f1" },
                    { step: "Plan tool calls", sub: "Selects which OA queries to run: level 1 metrics, feature adoption, cohort filters, trend windows", color: "#818cf8" },
                    { step: "Fetch from OA", sub: "Executes structured data requests against Optimizely Analytics: live warehouse data, no stale cache", color: "#a5b4fc" },
                    { step: "Synthesise & format", sub: "Compiles numbers into narrative: trend callouts, risk flags, comparisons, and a structured summary", color: "#c4b5fd" },
                  ].map(({ step, sub, color }, i, arr) => (
                    <div key={step}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: `${color}0d`, border: `1px solid ${color}22`, borderRadius: "8px", padding: "10px 12px" }}>
                        <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: `${color}20`, border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.58rem", fontWeight: 800, color, flexShrink: 0, marginTop: "1px" }}>{i + 1}</span>
                        <div>
                          <div style={{ fontSize: "0.78rem", fontWeight: 700, color }}>{step}</div>
                          <div style={{ fontSize: "0.68rem", color: "var(--foreground-muted)", lineHeight: 1.5, marginTop: "3px" }}>{sub}</div>
                        </div>
                      </div>
                      {i < arr.length - 1 && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "19px" }}>
                          <div style={{ width: "1px", height: "8px", background: `${color}35` }} />
                          <div style={{ fontSize: "0.5rem", color: `${color}70`, marginLeft: "-3px" }}>▼</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow down */}
              <div style={{ textAlign: "center", color: "var(--accent)", fontSize: "1.2rem", marginBottom: "12px", opacity: 0.7 }}>↓</div>

              {/* Outputs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
                {[
                  {
                    output: "Board meeting brief",
                    desc: "Quarterly engagement story across all product lines: engaged ARR %, at-risk surface, key movements, and exec-level callouts. Ready to paste into a slide deck.",
                    color: "#f59e0b",
                    tags: ["Quarterly", "Exec-level", "ARR context"],
                  },
                  {
                    output: "Feature roadmap input",
                    desc: "Feature adoption breakdown by product: which capabilities are gaining traction, which are stalling, and where the gap between engaged and non-engaged accounts is widest.",
                    color: "#6366f1",
                    tags: ["Per-feature", "Cohort split", "PM-facing"],
                  },
                  {
                    output: "Account context for CS/Sales",
                    desc: "Engagement profile for a named account: product usage pattern, Level 1 status, risk tier, and comparable peer accounts at similar ARR. Ready before a renewal or expansion call.",
                    color: "#10b981",
                    tags: ["Account-level", "Risk tier", "Peer bench"],
                  },
                  {
                    output: "Experiment velocity report",
                    desc: "Qualified experiment count, win rate, and AI-assisted vs manual comparison for a product or account segment. Used in product reviews and the AI attach commercial motion.",
                    color: "#34d399",
                    tags: ["Velocity", "Win rate", "AI vs manual"],
                  },
                ].map(({ output, desc, color, tags }) => (
                  <div key={output} className="card-hover" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ background: `${color}0d`, borderBottom: "1px solid var(--border-subtle)", padding: "10px 14px" }}>
                      <div style={{ fontSize: "0.78rem", fontWeight: 700, color }}>{output}</div>
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      <p style={{ fontSize: "0.74rem", color: "var(--foreground-muted)", lineHeight: 1.55, margin: "0 0 10px" }}>{desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {tags.map((t) => (
                          <span key={t} style={{ background: `${color}0e`, border: `1px solid ${color}25`, borderRadius: "4px", padding: "2px 7px", fontSize: "0.62rem", color, fontWeight: 600 }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why it works */}
            <div style={{ marginTop: "28px", background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: "14px", padding: "20px 24px" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "10px" }}>
                Why this is only possible on a warehouse-native stack
              </div>
              <p style={{ fontSize: "0.87rem", color: "var(--foreground-muted)", lineHeight: 1.75 }}>
                The agents work because the data is in one place: Opal agents call Optimizely Analytics tools, which query Snowflake directly. No API stitching, no stale exports, no data moving between systems. When the agent asks for an account&apos;s engagement profile against their ARR, that join happens in the same warehouse query. This is the direct payoff of the warehouse-native architecture decision made in Phase 2.
              </p>
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Outcomes & Impact ─────────────────────────────────────────── */}
        <section id="outcomes" style={secAlt}>
          <div style={wrap}>
            <Label>Outcomes &amp; Impact</Label>
            <Heading className="gradient-heading">From zero visibility to a commercial intelligence platform</Heading>
            <Body>
              The platform&apos;s value is not measured by data volume: it is measured by the decisions it
              enabled and the revenue motions it powered. Here is what changed.
            </Body>

            <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px" }}>
              {[
                {
                  category: "Product adoption visibility",
                  color: "#6366f1",
                  outcomes: [
                    "Products moved from zero or fragmented tracking to full cross-product behavioural visibility",
                    "Monthly Active Users measurable per product for the first time: with a consistent definition shared across PM, CS, and Finance",
                    "Cross-product cohort analysis became possible: which accounts use multiple products, and in what combinations",
                  ],
                },
                {
                  category: "Level 1 metric adoption",
                  color: "#10b981",
                  outcomes: [
                    "Level 1 engagement metrics established per product: representing accounts actively using core product functionality",
                    "Products could track improvement in engaged account rates over time, tied to feature releases and activation campaigns",
                    "CS teams could identify accounts below engagement thresholds before churn risk materialised",
                  ],
                },
                {
                  category: "AI feature adoption",
                  color: "#f59e0b",
                  outcomes: [
                    "Opal adoption measured from day one: tool usage, agent types, workflow patterns, and feature engagement",
                    "AI-assisted experiments showed measurably higher qualification rates: a data-backed upsell narrative for the commercial team",
                    "Agent utilisation patterns informed which Opal capabilities to invest in vs. simplify",
                  ],
                },
                {
                  category: "Revenue & commercial impact",
                  color: "#a5b4fc",
                  outcomes: [
                    "Product engagement joinable to ARR for the first time: enabling data-backed GTM plays instead of intuition-driven outreach",
                    "Three GTM plays directly executed: FinServ activation, Healthcare cross-sell, AI attach motion",
                    "Board and Steerco reporting with engagement + ARR context: product analytics visible at the highest level of the business",
                  ],
                },
              ].map(({ category, color, outcomes }) => (
                <div key={category} className="card-hover" style={{
                  background: "var(--surface)", border: "1px solid var(--border-subtle)",
                  borderRadius: "16px", padding: "24px",
                }}>
                  <div style={{
                    fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.1em", color, marginBottom: "16px",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}80` }} />
                    {category}
                  </div>
                  {outcomes.map((o) => (
                    <div key={o} style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "flex-start" }}>
                      <div style={{
                        width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
                        background: `${color}10`, border: `1px solid ${color}28`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ color, fontSize: "0.6rem", fontWeight: 700 }}>✓</span>
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "var(--foreground-muted)", lineHeight: 1.65 }}>{o}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Closing narrative */}
            <div style={{
              marginTop: "28px", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: "14px", padding: "24px 28px",
            }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "10px" }}>
                The connective thread
              </div>
              <p style={{ fontSize: "0.92rem", color: "var(--foreground-muted)", lineHeight: 1.8, maxWidth: "800px" }}>
                Every outcome above traces back to the same design decision: building one instrumentation
                contract instead of eight separate tracking implementations. The contract is what made
                cross-product analysis possible. Cross-product analysis is what made ARR joins possible.
                ARR joins are what made GTM plays data-backed. And the monthly reporting cadence is what
                brought that intelligence into the rooms where commercial decisions get made.
              </p>
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── Tech Stack ────────────────────────────────────────────────── */}
        <section style={{ ...sec, paddingBottom: "60px" }}>
          <div style={wrap}>
            <Label>Stack</Label>
            <Heading>Technology</Heading>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "10px", marginTop: "28px" }}>
              {["Segment", "Snowflake", "dbt", "Optimizely Analytics", "PowerBI", "Segment Unify", "Fivetran", "Airbyte", "Reverse ETL", "Salesforce", "Python", "Coda", "Mixpanel"].map((name) => (
                <ToolCard key={name} name={name} />
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: "1px solid var(--border-subtle)", padding: "32px 0",
        background: "var(--surface)",
      }}>
        <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--foreground-subtle)", marginRight: "6px" }}>
              Portfolio
            </span>
            {[
              { label: "Data Engineering Foundation", href: "https://data-engineering-foundation.vercel.app", color: "#10b981" },
              { label: "Experimentation Science", href: "https://experimentation-science.vercel.app", color: "#f59e0b" },
              { label: "Systems Architecture", href: "https://systems-architecture.vercel.app", color: "#f43f5e" },
            ].map(({ label, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                fontSize: "0.79rem", fontWeight: 500, color: "var(--foreground-muted)",
                textDecoration: "none", border: "1px solid var(--border-subtle)",
                borderRadius: "7px", padding: "5px 12px",
                display: "inline-flex", alignItems: "center", gap: "6px",
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = color; (e.currentTarget as HTMLAnchorElement).style.color = color; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-subtle)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground-muted)"; }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                {label}
              </a>
            ))}
          </div>

          <div style={{ fontSize: "0.7rem", color: "var(--foreground-subtle)", lineHeight: 1.6, maxWidth: "640px" }}>
            Written case study: all architecture, processes, and methodologies described from first-hand work at Optimizely. No customer data, proprietary schemas, or confidential records are reproduced.
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "22px", height: "22px", borderRadius: "5px",
                background: "linear-gradient(135deg, #6366f1, #818cf8)",
                boxShadow: "0 0 8px rgba(99,102,241,0.3)",
              }} />
              <span style={{ fontSize: "0.82rem", color: "var(--foreground-subtle)" }}>
                Wahid Tawsif Ratul · Product Analytics Engineer · Optimizely
              </span>
            </div>
            <a
              href="https://github.com/ratul003/product-intelligence-platform"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "0.82rem", fontWeight: 600, color: "var(--foreground-muted)",
                textDecoration: "none", border: "1px solid var(--border)",
                borderRadius: "8px", padding: "7px 14px",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
