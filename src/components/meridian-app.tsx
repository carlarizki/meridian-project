import { useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, BarChart3, BookOpen, Check, ChevronRight, CircleDollarSign, Database, FileCheck2, Gauge, GraduationCap, LayoutDashboard, Menu, PanelLeftClose, PanelLeftOpen, Search, ShieldCheck, Sparkles, UserPlus, UserRound, Users, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { decisionRules, evidenceTrail, getDecision, pilotEmployees, populationOutcomes, type Decision, type PilotEmployee } from "@/lib/meridian-data";

type ScreenId = "overview" | "roster" | "detail" | "decision" | "impact";
type DetailTab = "profile" | "role" | "capability" | "learning";

const navigation = [
  { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
  { id: "roster" as const, label: "Roster / People", icon: Users },
  { id: "detail" as const, label: "Employee Detail", icon: UserRound },
  { id: "decision" as const, label: "Decision Engine", icon: BadgeCheck },
  { id: "impact" as const, label: "Economics / Impact", icon: CircleDollarSign },
];

const decisionTone = (decision: Decision) => populationOutcomes.find((item) => item.label === decision)?.tone ?? "neutral";
const initials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("");

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "good" | "warn" | "bad" | "info" }) {
  return <span className={cn("badge", `badge-${tone}`)}>{children}</span>;
}

function PageHeader({ title, subtitle, children }: { title: string; subtitle: string; children?: ReactNode }) {
  return <div className="page-header"><div><h1>{title}</h1><p>{subtitle}</p></div>{children && <div className="header-actions">{children}</div>}</div>;
}

function Metric({ label, value, note, tone = "blue", icon: Icon }: { label: string; value: string; note: string; tone?: string; icon: typeof Users }) {
  return <div className="metric-card"><div className={cn("metric-icon", `tone-${tone}`)}><Icon className="size-4" /></div><div><p className="metric-label">{label}</p><p className="metric-value">{value}</p><p className="metric-note">{note}</p></div></div>;
}

function Overview({ go }: { go: (id: ScreenId) => void }) {
  return <>
    <section className="welcome-band pilot-welcome"><div className="welcome-copy"><Badge tone="info"><Sparkles className="size-3" /> VALIDATED PILOT SCOPE</Badge><h1>Field Metering decisions, <span>with evidence.</span></h1><p>A focused people transition pilot for one workforce family—turning automation exposure into defensible redeployment outcomes without mass layoffs.</p><Button onClick={() => go("roster")}>Review pilot roster <ArrowRight className="size-4" /></Button></div><div className="pilot-signal"><span>PILOT FAMILY</span><strong>6,000</strong><p>Field Metering & Manual Operations</p><small>6 regional units · 18-month transition horizon</small></div></section>
    <div className="metric-grid four"><Metric icon={Users} label="Pilot Headcount" value="6,000" note="One validated job family"/><Metric icon={Zap} label="AI Exposure" value="70%" note="Routine work in 18 months" tone="red"/><Metric icon={Database} label="Skill Data Gap" value="45%" note="Requires evidence review" tone="amber"/><Metric icon={ShieldCheck} label="Mass Layoffs" value="0" note="Non-negotiable safeguard" tone="green"/></div>
    <div className="section-title"><div><h2>Decision portfolio</h2><p>Reconciled pilot population · 6,000 employees</p></div><Badge tone="neutral">Population model</Badge></div>
    <div className="decision-kpis">{populationOutcomes.map((item) => <article key={item.label}><i className={cn("decision-stripe", item.tone)}/><span>{item.label}</span><strong>{item.count.toLocaleString("en-US")}</strong><small>{item.pct}% of pilot</small></article>)}</div>
    <section className="overview-next"><div><FileCheck2/><span><strong>Evidence-first decisions</strong><small>Low or unknown evidence is routed to Further Assessment before any fit logic.</small></span></div><Button variant="outline" onClick={() => go("decision")}>Open decision engine <ArrowRight className="size-4"/></Button></section>
  </>;
}

function Roster({ filter, setFilter, selectEmployee, go }: { filter: "All" | Decision; setFilter: (value: "All" | Decision) => void; selectEmployee: (employee: PilotEmployee) => void; go: (id: ScreenId) => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => pilotEmployees.filter((employee) => (filter === "All" || getDecision(employee)?.label === filter) && [employee.name, employee.id, employee.role].some((value) => value.toLowerCase().includes(query.toLowerCase()))), [filter, query]);
  const open = (employee: PilotEmployee) => { selectEmployee(employee); go("detail"); };
  return <><PageHeader title="Roster / People" subtitle="24-record pilot sample · proportions approximate the 6,000-person population."><Badge tone="info">SAMPLE, NOT FULL POPULATION</Badge></PageHeader>
    <section className="panel roster-panel"><div className="roster-tools"><div className="search"><Search className="size-4"/><input aria-label="Cari karyawan" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama, ID, atau peran..."/></div><div className="filter-chips" aria-label="Filter decision category"><Button size="sm" variant={filter === "All" ? "default" : "outline"} onClick={() => setFilter("All")}>All · 24</Button>{populationOutcomes.map((item) => <Button key={item.label} size="sm" variant={filter === item.label ? "default" : "outline"} onClick={() => setFilter(item.label)}>{item.label}</Button>)}</div></div>
      <div className="table-wrap"><table><thead><tr><th>Employee</th><th>Current role</th><th>Exposure</th><th>Mobility fit</th><th>Feasibility</th><th>Evidence</th><th>Decision</th><th/></tr></thead><tbody>{filtered.map((employee) => { const decision = getDecision(employee)?.label ?? "Reskill"; const insufficient = employee.evidence === "Low" || employee.evidence === "Unknown"; return <tr key={employee.id}><td><div className="emp-cell"><span className="avatar tiny">{initials(employee.name)}</span><div><strong>{employee.name}</strong><small>{employee.id} · {employee.region}</small></div></div></td><td>{employee.role}</td><td><strong>{employee.exposure}%</strong></td><td>{insufficient ? <span className="insufficient">Data tidak cukup</span> : `${employee.fit}%`}</td><td>{insufficient ? <span className="insufficient">Data tidak cukup</span> : employee.feasibility}</td><td><Badge tone={employee.evidence === "High" ? "good" : employee.evidence === "Medium" ? "warn" : "bad"}>{employee.evidence}</Badge></td><td><Badge tone={decisionTone(decision)}>{decision}</Badge></td><td><Button variant="ghost" size="icon" onClick={() => open(employee)} aria-label={`Buka profil ${employee.name}`}><ChevronRight/></Button></td></tr>; })}{filtered.length === 0 && <tr><td colSpan={8} className="empty-row">Tidak ada karyawan pada filter ini.</td></tr>}</tbody></table></div>
    </section>
    <section className="add-note"><UserPlus/><div><strong>Employee intake retained</strong><p>New records enter with Unknown evidence and must complete assessment before a pathway recommendation.</p></div></section>
  </>;
}

const capabilities = [{ name: "Digital Monitoring", current: 3, target: 4 }, { name: "Electrical Troubleshooting", current: 4, target: 4 }, { name: "Data Analysis", current: 2, target: 3 }, { name: "AMI Diagnostics", current: 1, target: 3 }];

function EmployeeDetail({ employee, go, tab, setTab }: { employee: PilotEmployee; go: (id: ScreenId) => void; tab: DetailTab; setTab: (tab: DetailTab) => void }) {
  const decision = getDecision(employee)?.label ?? "Reskill";
  const trail = evidenceTrail(employee.evidence);
  const insufficient = employee.evidence === "Low" || employee.evidence === "Unknown";
  return <><PageHeader title="Employee Detail" subtitle="Capability, target role, evidence, and learning context in one review."><Button variant="outline" onClick={() => go("roster")}><ArrowLeft className="size-4"/> Back to roster</Button></PageHeader>
    <section className="employee-hero"><div className="avatar">{initials(employee.name)}</div><div className="employee-hero-copy"><span>{employee.id} · {employee.region}</span><h2>{employee.name}</h2><p>{employee.role}</p></div><div className="employee-hero-status"><Badge tone={decisionTone(decision)}>{decision}</Badge><small>Evidence confidence</small><strong>{employee.evidence}</strong></div></section>
    <div className="detail-tabs">{(["profile", "role", "capability", "learning"] as DetailTab[]).map((item) => <Button key={item} variant={tab === item ? "default" : "ghost"} onClick={() => setTab(item)}>{item === "profile" ? "Evidence Profile" : item === "role" ? "Future Role" : item === "capability" ? "Capabilities" : "Learning Plan"}</Button>)}</div>
    {tab === "profile" && <div className="two-col detail-grid"><section className="panel"><div className="panel-head"><div><h2>Decision signals</h2><p>Fit is suppressed when evidence is insufficient</p></div></div><div className="signal-grid"><div><span>AI exposure</span><strong>{employee.exposure}%</strong></div><div><span>Mobility fit</span><strong>{insufficient ? "Data tidak cukup" : `${employee.fit}%`}</strong></div><div><span>Reskill feasibility</span><strong>{insufficient ? "Data tidak cukup" : employee.feasibility}</strong></div><div><span>Evidence tier</span><strong>{employee.evidence}</strong></div></div></section><section className="panel"><div className="panel-head"><div><h2>Evidence trail</h2><p>Employee-specific verification status</p></div><Badge tone={employee.evidence === "High" ? "good" : employee.evidence === "Medium" ? "warn" : "bad"}>{employee.evidence}</Badge></div><div className="evidence-trail">{trail.map((item, index) => <p key={item} className={index < (employee.evidence === "High" ? 4 : employee.evidence === "Medium" ? 2 : 1) ? "verified" : "missing"}>{index < (employee.evidence === "High" ? 4 : employee.evidence === "Medium" ? 2 : 1) ? <Check/> : <X/>}{item}</p>)}</div></section></div>}
    {tab === "role" && <section className="panel role-focus"><Badge tone="info">TARGET ROLE</Badge><h2>{employee.target ?? "Target role pending assessment"}</h2><p>{employee.target ? "Field experience transfers into smart-meter monitoring, diagnostics, exception handling, and customer resolution." : "A future role target will be assigned after the current evidence gaps are closed."}</p><div className="role-meta"><div><span>Job family</span><strong>Field Metering & Manual Operations</strong></div><div><span>Demand</span><strong>{employee.target ? "High" : "Pending"}</strong></div><div><span>Transition horizon</span><strong>0–18 months</strong></div></div></section>}
    {tab === "capability" && <section className="panel"><div className="panel-head"><div><h2>Capability comparison</h2><p>Current evidence against future-role requirement</p></div></div><div className="cap-list">{capabilities.map((cap) => <div key={cap.name}><strong>{cap.name}</strong><div className="level-dots">{[1,2,3,4,5].map((level) => <i key={level} className={level <= cap.current ? "filled" : level <= cap.target ? "target" : ""}/>)}</div><span>L{cap.current} → L{cap.target}</span></div>)}</div></section>}
    {tab === "learning" && <section className="panel"><div className="panel-head"><div><h2>{insufficient ? "Assessment before learning" : "Recommended learning journey"}</h2><p>{insufficient ? "Close evidence gaps before committing investment." : "8 weeks · blended · assessment-led"}</p></div></div><div className="timeline">{(insufficient ? [["1","Evidence intake","Week 1","Field validation"],["2","Capability check","Week 2","Observed assessment"],["3","Pathway decision","Week 3","Human review"]] : [["1","Foundations","Week 1–2","IoT & Smart Meter Basics"],["2","Data & Diagnostics","Week 3–6","Operational data analysis"],["3","Applied Practice","Week 7–8","Field simulation"]]).map(([n,title,time,course]) => <div key={n}><span>{n}</span><div><small>{time}</small><strong>{title}</strong><p>{course}</p></div></div>)}</div></section>}
    <div className="detail-action"><Button onClick={() => go("decision")}>Review decision <ArrowRight className="size-4"/></Button></div>
  </>;
}

function DecisionEngine({ employee, go }: { employee: PilotEmployee; go: (id: ScreenId) => void }) {
  const [approved, setApproved] = useState(false);
  const rule = getDecision(employee);
  const decision = rule?.label ?? "Reskill";
  const insufficient = employee.evidence === "Low" || employee.evidence === "Unknown";
  return <><PageHeader title="Decision Engine" subtitle="Recommendation, reason, and confidence—visible in one review."><Button variant="outline" onClick={() => go("detail")}><ArrowLeft className="size-4"/> Employee detail</Button></PageHeader>
    <section className="decision-card aha-card"><div className="decision-person"><div className="avatar">{initials(employee.name)}</div><div><span>{employee.id}</span><h2>{employee.name}</h2><p>{employee.role}</p></div></div><div className="recommendation"><span>RECOMMENDED PATHWAY</span><h2><BadgeCheck/> {decision}</h2><p>{rule?.explanation}</p></div><div className="readiness"><div className={cn("readiness-ring", insufficient && "muted-ring")}>{insufficient ? "—" : `${employee.fit}%`}</div><span>{insufficient ? "Insufficient data" : "Mobility fit"}</span></div></section>
    <div className="two-col decision-grid"><section className="panel"><div className="panel-head"><div><h2>Why this decision</h2><p>Transparent employee-level inputs</p></div><Badge tone={decisionTone(decision)}>{decision}</Badge></div>{[["Mobility fit", insufficient ? "Data tidak cukup" : `${employee.fit}%`],["Reskill feasibility", insufficient ? "Data tidak cukup" : employee.feasibility ?? "Data tidak cukup"],["Evidence confidence", employee.evidence],["AI exposure", `${employee.exposure}%`]].map(([label,value]) => <div className="decision-input" key={label}><span>{label}</span><strong>{value}</strong></div>)}<div className={cn("insight", insufficient && "warning-insight")}><ShieldCheck className="size-4"/><p>{insufficient ? "Evidence gate fired first. No fit-based recommendation is allowed until data is refreshed." : "Evidence is sufficient for a human-reviewed pathway recommendation."}</p></div></section>
      <section className="panel"><div className="panel-head"><div><h2>Ordered rules</h2><p>First match wins · single source of truth</p></div></div><div className="rule-list">{decisionRules.map((item, index) => <div key={item.label} className={item.label === decision ? "fired" : ""}><span>{index + 1}</span><div><strong>{item.label}</strong><p>{item.explanation}</p></div>{item.label === decision && <Badge tone="good">FIRED</Badge>}</div>)}</div></section></div>
    <section className="approval-bar"><div><strong>Human review is mandatory</strong><p>No legal title or base-pay change is created by this prototype.</p></div>{approved ? <Badge tone="good"><Check/> Decision recorded</Badge> : <Button onClick={() => setApproved(true)} disabled={insufficient}>Approve pilot pathway <BadgeCheck className="size-4"/></Button>}</section>
  </>;
}

function Impact() {
  return <><PageHeader title="Economics / Impact" subtitle="Reconciled cost comparison for the 6,000-person pilot."><Badge tone="warn">PROXY MODEL · ORACLE PAYROLL OFF-LIMITS</Badge></PageHeader>
    <div className="economics-hero"><section><span>LAYOFF-THEN-REHIRE</span><strong>Rp108.6B</strong><p>Separation, recruitment, onboarding, and productivity ramp.</p></section><ArrowRight/><section className="preferred"><span>CAPABILITY REDEPLOYMENT</span><strong>Rp50.4B</strong><p>Assessment, reskilling, transition, and program delivery.</p></section><div className="saving"><small>SAVING</small><strong>53.6%</strong><span>Rp58.2B avoided</span></div></div>
    <div className="impact-top"><section className="panel"><div className="panel-head"><div><h2>Pilot outcomes</h2><p>Exactly reconciled to 6,000 employees</p></div></div><div className="population-bar">{populationOutcomes.map((item) => <i key={item.label} className={item.tone} style={{width:`${item.pct}%`}} title={`${item.label}: ${item.pct}%`}/>)}</div><div className="impact-legend">{populationOutcomes.map((item) => <p key={item.label}><i className={cn("dot", item.tone)}/><span>{item.label}<small>{item.pct}%</small></span><strong>{item.count.toLocaleString("en-US")}</strong></p>)}</div></section><section className="panel"><div className="panel-head"><div><h2>Model guardrails</h2><p>What the economics does—and does not—use</p></div></div><div className="guardrails"><div><Check/><span><strong>Uses</strong> standardized program and external-hire assumptions</span></div><div><Check/><span><strong>Uses</strong> reconciled pilot headcount and pathway split</span></div><div><X/><span><strong>Excludes</strong> individual compensation and Oracle Payroll</span></div><div><X/><span><strong>Excludes</strong> unvalidated enterprise-wide value claims</span></div></div></section></div>
    <section className="assumptions"><div><FileCheck2/><p><strong>Defensible by design.</strong> This is a pilot decision model, not an enterprise valuation.</p></div></section>
  </>;
}

export function MeridianApp() {
  const [screen, setScreen] = useState<ScreenId>("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState(pilotEmployees[0]);
  const [filter, setFilter] = useState<"All" | Decision>("All");
  const [detailTab, setDetailTab] = useState<DetailTab>("profile");
  if (!selected) return null;
  const current = navigation.find((item) => item.id === screen) ?? navigation[0];
  const go = (id: ScreenId) => { setScreen(id); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const screens: Record<ScreenId, ReactNode> = { overview: <Overview go={go}/>, roster: <Roster filter={filter} setFilter={setFilter} selectEmployee={setSelected} go={go}/>, detail: <EmployeeDetail employee={selected} go={go} tab={detailTab} setTab={setDetailTab}/>, decision: <DecisionEngine employee={selected} go={go}/>, impact: <Impact/> };
  return <div className="app-shell"><aside className={cn("sidebar", collapsed && "collapsed", mobileOpen && "mobile-open")}><div className="brand"><div className="brand-mark"><Zap/></div>{!collapsed && <div><strong>Meridian</strong><span>FIELD METERING PILOT</span></div>}<Button variant="ghost" size="icon" className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X/></Button></div><nav>{navigation.map((item, index) => <Button variant="ghost" key={item.id} onClick={() => go(item.id)} className={screen === item.id ? "active" : ""} title={item.label}><item.icon/><span>{collapsed ? "" : item.label}</span>{!collapsed && <small>{String(index + 1).padStart(2,"0")}</small>}</Button>)}</nav><div className="sidebar-foot"><div className="status-dot"/>{!collapsed && <div><strong>Validated pilot scope</strong><span>24 sample records · Sep 2026</span></div>}</div></aside>
    <div className="main"><header className="topbar"><div className="topbar-left"><Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} className="mobile-menu" aria-label="Open navigation"><Menu/></Button><Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="desktop-collapse" aria-label="Toggle sidebar">{collapsed ? <PanelLeftOpen/> : <PanelLeftClose/>}</Button><div className="crumb"><span>Project Meridian</span><ChevronRight/><strong>{current?.label}</strong></div></div><div className="topbar-right"><Badge tone="good"><span className="live-dot"/> PILOT · 6,000 PEOPLE</Badge><div className="director"><div>HR</div><span><strong>People Ops Lead</strong><small>Field Metering Pilot</small></span></div></div></header><main key={screen} className="content">{screens[screen]}</main></div>{mobileOpen && <Button variant="ghost" className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay"/>}</div>;
}