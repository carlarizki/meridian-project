import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Database,
  FileCheck2,
  Filter,
  Gauge,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  Menu,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Route as RouteIcon,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { calculatePortfolio, DEFAULT_SCENARIO, formatCount, type MeridianScenario } from "@/lib/meridian-model";

type ScreenId =
  | "workforce" | "exposure" | "architecture" | "capability" | "people" | "profile"
  | "future" | "mobility" | "learning" | "decision" | "impact" | "roadmap";

const navigation: { id: ScreenId; label: string; short: string; icon: typeof LayoutDashboard }[] = [
  { id: "workforce", label: "Workforce Overview", short: "Workforce", icon: Users },
  { id: "exposure", label: "AI Exposure Analysis", short: "AI Exposure", icon: Bot },
  { id: "architecture", label: "Job & Work Model", short: "Job Model", icon: Network },
  { id: "capability", label: "Capability Library", short: "Capabilities", icon: BookOpen },
  { id: "people", label: "People & Evidence", short: "People", icon: UserRound },
  { id: "future", label: "Future Work & Roles", short: "Future Roles", icon: BriefcaseBusiness },
  { id: "mobility", label: "Mobility Analysis", short: "Mobility", icon: RouteIcon },
  { id: "learning", label: "Pathway & Learning", short: "Learning", icon: GraduationCap },
  { id: "decision", label: "Decision Output", short: "Decision", icon: BadgeCheck },
  { id: "impact", label: "Impact & Business Case", short: "Impact", icon: CircleDollarSign },
];

const families = [
  { name: "Operations", value: 12400, pct: 24, exposure: 58 },
  { name: "Engineering", value: 8600, pct: 17, exposure: 52 },
  { name: "Corporate Services", value: 7000, pct: 13, exposure: 44 },
  { name: "Commercial", value: 6200, pct: 12, exposure: 47 },
  { name: "Human Capital", value: 5400, pct: 10, exposure: 38 },
  { name: "Finance", value: 4800, pct: 9, exposure: 55 },
  { name: "IT & Digital", value: 3200, pct: 6, exposure: 35 },
  { name: "Others", value: 4400, pct: 9, exposure: 30 },
];

const tasks = [
  ["Instalasi & pemeliharaan meter", "High", "Medium", "High"],
  ["Troubleshoot masalah teknis", "High", "High", "Medium"],
  ["Monitor performa sistem", "Medium", "High", "Low"],
  ["Pembaruan laporan lapangan", "Medium", "High", "Low"],
  ["Komunikasi pelanggan", "Medium", "Medium", "High"],
];

const capabilities = [
  { name: "Digital Monitoring", current: 3, future: 4, source: "IoT & Smart Meter Systems", confidence: "High" },
  { name: "Troubleshooting", current: 4, future: 4, source: "Performance record", confidence: "High" },
  { name: "Data Analysis", current: 1, future: 3, source: "LMS + assessment", confidence: "Medium" },
  { name: "Customer Communication", current: 3, future: 3, source: "Regional assignment", confidence: "Medium" },
  { name: "AMI Diagnostics", current: 1, future: 3, source: "Role adjacency model", confidence: "Low" },
];

function Metric({ label, value, note, tone = "blue", icon: Icon }: { label: string; value: string; note: string; tone?: string; icon: typeof Users }) {
  return (
    <div className="metric-card">
      <div className={cn("metric-icon", `tone-${tone}`)}><Icon className="size-4" /></div>
      <div><p className="metric-label">{label}</p><p className="metric-value">{value}</p><p className="metric-note">{note}</p></div>
    </div>
  );
}

function SelectControl({ value, onChange, label, options }: { value: string; onChange: (value: string) => void; label: string; options: string[] }) {
  return (
    <label className="select-control">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      <ChevronDown className="size-3.5" />
    </label>
  );
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "bad" | "info" }) {
  return <span className={cn("badge", `badge-${tone}`)}>{children}</span>;
}

function PageHeader({ title, subtitle, children }: { title: string; subtitle: string; children?: React.ReactNode }) {
  return <div className="page-header"><div><h1>{title}</h1><p>{subtitle}</p></div>{children && <div className="header-actions">{children}</div>}</div>;
}

function Donut() {
  return <div className="donut" aria-label="AI exposure: 25% high, 40% medium, 35% low"><div><strong>52k</strong><span>employees</span></div></div>;
}

function Overview({ go }: { go: (id: ScreenId) => void }) {
  return <>
    <section className="welcome-band">
      <div className="welcome-copy"><Badge tone="info"><Sparkles className="size-3" /> 90-DAY BOARD PROOF POINT</Badge><h1>From Work Insights to <span>People Outcomes</span></h1><p>Intelligent workforce decisions that protect people, accelerate capability, and strengthen Indonesia's energy transition.</p><Button onClick={() => go("exposure")}>Explore AI exposure <ArrowRight className="size-4" /></Button></div>
      <div className="energy-scene" aria-hidden="true"><div className="sun"/><div className="tower t1"/><div className="tower t2"/><div className="cityline"/><div className="scene-label"><Zap className="size-4" /> ENERGY TRANSITION · 2026</div></div>
    </section>
    <div className="metric-grid four"><Metric icon={Users} label="Total Employees" value="52,000" note="6 regions + head office"/><Metric icon={Network} label="Job Architecture" value="1,800+ → 14" note="Legacy titles to families" tone="amber"/><Metric icon={Activity} label="At-Risk Roles" value="4,200" note="Metering & manual ops" tone="red"/><Metric icon={ShieldCheck} label="Mass Layoffs" value="0" note="Our commitment" tone="green"/></div>
    <div className="section-title"><div><h2>Key outcomes</h2><p>Target outcomes by Day 90</p></div><Badge tone="neutral">Last refreshed · Today, 13:45</Badge></div>
    <div className="outcome-grid"><article><div className="ring-stat">100%</div><h3>AI Exposure Mapping</h3><p>52,000 employees mapped across 14 job families.</p></article><article><div className="ring-stat green">14</div><h3>Capability Architecture</h3><p>Five bands with evidence-based skill taxonomy.</p></article><article><div className="ring-stat amber">4,200</div><h3>Redeployment Pathway</h3><p>Zero-PHK transition plan across three growth clusters.</p></article><article className="business-case"><span>BUSINESS CASE</span><h3>Rp 3.5T</h3><p>Estimated strategic value over three years</p><button onClick={() => go("impact")}>View economics <ArrowRight className="size-4" /></button></article></div>
  </>;
}

function Workforce({ region, setRegion }: { region: string; setRegion: (v: string) => void }) {
  const multiplier = region === "All Units" ? 1 : 0.16;
  return <><PageHeader title="Workforce Overview" subtitle="A complete view of people, roles, and AI exposure across the organization."><SelectControl value={region} onChange={setRegion} label="Regional unit" options={["All Units", "Regional 1", "Regional 2", "Regional 3", "Regional 4", "Regional 5", "Regional 6", "Head Office"]}/></PageHeader>
    <div className="metric-grid four"><Metric icon={Users} label="Total Employees" value={Math.round(52000*multiplier).toLocaleString("en-US")} note={region === "All Units" ? "Enterprise workforce" : region}/><Metric icon={Network} label="Job Families" value="14" note="From 1,800+ titles"/><Metric icon={Database} label="Missing Skill Data" value="45%" note="Requires evidence review" tone="red"/><Metric icon={Building2} label="Regional Units" value="6" note="Plus head office" tone="green"/></div>
    <div className="two-col"><section className="panel"><div className="panel-head"><div><h2>Workforce by job family</h2><p>Operations remains the largest talent pool</p></div><Badge tone="info">52,000 total</Badge></div><div className="bar-list">{families.map((f) => <div className="bar-row" key={f.name}><span>{f.name}</span><div><i style={{ width: `${f.pct * 3.8}%` }}/></div><strong>{Math.round(f.value*multiplier).toLocaleString("en-US")}</strong><small>{f.pct}%</small></div>)}</div></section>
    <section className="panel"><div className="panel-head"><div><h2>AI exposure distribution</h2><p>All jobs, weighted by task composition</p></div></div><div className="donut-layout"><Donut/><div className="legend"><p><i className="dot bad"/><span>High exposure</span><strong>25% · 13,000</strong></p><p><i className="dot warn"/><span>Medium exposure</span><strong>40% · 20,800</strong></p><p><i className="dot good"/><span>Low exposure</span><strong>35% · 18,200</strong></p></div></div><div className="insight"><BrainCircuit className="size-4"/><p><strong>Priority signal:</strong> 4,200 roles in Field Metering need a pathway decision within 18 months.</p></div></section></div>
  </>;
}

type Employee = { id: string; name: string; role: string; family: string; region: string; level: string; education: string; age: number; years: number; completeness: number; exposure: "High" | "Medium" | "Low" };

const seedEmployees: Employee[] = [
  { id: "EMP-10492", name: "Budi Santoso", role: "Field Technician (Metering)", family: "Operations", region: "Regional 1", level: "L3", education: "D3 Teknik Elektro", age: 34, years: 8, completeness: 78, exposure: "High" },
  { id: "EMP-22510", name: "Siti Rahma", role: "Distribution Engineer", family: "Engineering", region: "Regional 2", level: "L4", education: "S1 Teknik Elektro", age: 38, years: 12, completeness: 86, exposure: "Medium" },
  { id: "EMP-33018", name: "Andi Wijaya", role: "Customer Service Officer", family: "Commercial", region: "Regional 3", level: "L2", education: "S1 Manajemen", age: 29, years: 5, completeness: 64, exposure: "Medium" },
  { id: "EMP-41207", name: "Dewi Lestari", role: "HR Business Partner", family: "Human Capital", region: "Head Office", level: "L4", education: "S1 Psikologi", age: 41, years: 15, completeness: 91, exposure: "Low" },
  { id: "EMP-50883", name: "Rizky Pratama", role: "Meter Reader", family: "Operations", region: "Regional 4", level: "L2", education: "SMK Listrik", age: 27, years: 4, completeness: 52, exposure: "High" },
  { id: "EMP-61145", name: "Maya Kusuma", role: "Financial Analyst", family: "Finance", region: "Head Office", level: "L3", education: "S1 Akuntansi", age: 33, years: 9, completeness: 83, exposure: "Medium" },
  { id: "EMP-70219", name: "Agus Setiawan", role: "SCADA Operator", family: "IT & Digital", region: "Regional 5", level: "L3", education: "D3 Teknik Informatika", age: 36, years: 10, completeness: 74, exposure: "Low" },
  { id: "EMP-81556", name: "Nur Hidayah", role: "Substation Technician", family: "Operations", region: "Regional 6", level: "L3", education: "D3 Teknik Elektro", age: 35, years: 9, completeness: 69, exposure: "High" },
];

const emptyEmployeeForm = { name: "", id: "", role: "", family: "Operations", region: "Regional 1", level: "L1", education: "", age: "", years: "" };

function Directory() {
  const [employees, setEmployees] = useState<Employee[]>(seedEmployees);
  const [query, setQuery] = useState("");
  const [familyFilter, setFamilyFilter] = useState("All Families");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyEmployeeForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [added, setAdded] = useState<string | null>(null);

  const filtered = employees.filter((e) =>
    (familyFilter === "All Families" || e.family === familyFilter) &&
    (e.name.toLowerCase().includes(query.toLowerCase()) || e.id.toLowerCase().includes(query.toLowerCase()) || e.role.toLowerCase().includes(query.toLowerCase()))
  );

  const set = (key: keyof typeof emptyEmployeeForm) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = () => {
    const problems: string[] = [];
    if (form.name.trim().length < 3) problems.push("Nama minimal 3 karakter.");
    if (!/^EMP-\d{4,6}$/.test(form.id.trim())) problems.push("Employee ID harus berformat EMP-XXXXX.");
    if (employees.some((e) => e.id === form.id.trim())) problems.push("Employee ID sudah terdaftar.");
    if (form.role.trim().length < 3) problems.push("Jabatan wajib diisi.");
    const age = Number(form.age);
    if (!Number.isInteger(age) || age < 18 || age > 65) problems.push("Usia harus antara 18–65 tahun.");
    const years = Number(form.years);
    if (!Number.isInteger(years) || years < 0 || years > 45) problems.push("Masa kerja harus antara 0–45 tahun.");
    setErrors(problems);
    if (problems.length) return;
    const highRisk = form.family === "Operations" || form.family === "Finance";
    setEmployees((list) => [{ id: form.id.trim().toUpperCase(), name: form.name.trim(), role: form.role.trim(), family: form.family, region: form.region, level: form.level, education: form.education.trim() || "—", age, years, completeness: 45, exposure: highRisk ? "High" : "Medium" }, ...list]);
    setAdded(form.name.trim());
    setForm(emptyEmployeeForm);
    setShowForm(false);
  };

  return <>
    <PageHeader title="Employee Directory" subtitle="Kelola data karyawan, tinjau kelengkapan data, dan tambahkan karyawan baru.">
      <Button onClick={() => { setShowForm(!showForm); setAdded(null); }}><UserPlus className="size-4" /> Tambah Karyawan</Button>
    </PageHeader>
    {added && <div className="insight success-note"><BadgeCheck className="size-4" /><p><strong>{added}</strong> berhasil ditambahkan. Data awal bersifat inferred — lengkapi bukti measured sebelum keputusan kritis.</p></div>}
    {showForm && <section className="panel employee-form">
      <div className="panel-head"><div><h2>Input karyawan baru</h2><p>Data masuk sebagai profil baru dengan status evidence inferred</p></div><Button variant="ghost" size="icon" onClick={() => setShowForm(false)} aria-label="Tutup form"><X /></Button></div>
      <div className="form-grid">
        <label><span>Nama lengkap *</span><input value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="cth. Bambang Hartono" maxLength={100} /></label>
        <label><span>Employee ID *</span><input value={form.id} onChange={(e) => set("id")(e.target.value)} placeholder="EMP-XXXXX" maxLength={10} /></label>
        <label><span>Jabatan *</span><input value={form.role} onChange={(e) => set("role")(e.target.value)} placeholder="cth. Field Technician" maxLength={80} /></label>
        <label><span>Job family</span><select value={form.family} onChange={(e) => set("family")(e.target.value)}>{families.map((f) => <option key={f.name}>{f.name}</option>)}</select></label>
        <label><span>Unit regional</span><select value={form.region} onChange={(e) => set("region")(e.target.value)}>{["Regional 1", "Regional 2", "Regional 3", "Regional 4", "Regional 5", "Regional 6", "Head Office"].map((r) => <option key={r}>{r}</option>)}</select></label>
        <label><span>Level</span><select value={form.level} onChange={(e) => set("level")(e.target.value)}>{["L1", "L2", "L3", "L4", "L5"].map((l) => <option key={l}>{l}</option>)}</select></label>
        <label><span>Pendidikan</span><input value={form.education} onChange={(e) => set("education")(e.target.value)} placeholder="cth. D3 Teknik Elektro" maxLength={80} /></label>
        <label><span>Usia *</span><input type="number" value={form.age} onChange={(e) => set("age")(e.target.value)} placeholder="cth. 32" min={18} max={65} /></label>
        <label><span>Masa kerja (tahun) *</span><input type="number" value={form.years} onChange={(e) => set("years")(e.target.value)} placeholder="cth. 6" min={0} max={45} /></label>
      </div>
      {errors.length > 0 && <div className="form-errors">{errors.map((err) => <p key={err}><X className="size-3" />{err}</p>)}</div>}
      <div className="form-actions"><Button variant="outline" onClick={() => { setShowForm(false); setErrors([]); }}>Batal</Button><Button onClick={submit}><Check className="size-4" /> Simpan karyawan</Button></div>
    </section>}
    <section className="panel">
      <div className="panel-head"><div><h2>Daftar karyawan</h2><p>{filtered.length} dari {employees.length} profil ditampilkan</p></div><div className="directory-tools"><div className="search"><Search className="size-4" /><input aria-label="Cari karyawan" placeholder="Cari nama, ID, jabatan..." value={query} onChange={(e) => setQuery(e.target.value)} /></div><SelectControl value={familyFilter} onChange={setFamilyFilter} label="Filter job family" options={["All Families", ...families.map((f) => f.name)]} /></div></div>
      <div className="table-wrap"><table><thead><tr><th>Karyawan</th><th>Jabatan</th><th>Job Family</th><th>Region</th><th>Level</th><th>Kelengkapan</th><th>AI Exposure</th></tr></thead><tbody>
        {filtered.map((e) => <tr key={e.id}>
          <td><div className="emp-cell"><span className="avatar tiny">{e.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span><div><strong>{e.name}</strong><small>{e.id}</small></div></div></td>
          <td>{e.role}</td><td>{e.family}</td><td>{e.region}</td><td><Badge tone="neutral">{e.level}</Badge></td>
          <td><div className="mini-progress"><i><b style={{ width: `${e.completeness}%` }} /></i><span>{e.completeness}%</span></div></td>
          <td><Badge tone={e.exposure === "High" ? "bad" : e.exposure === "Medium" ? "warn" : "good"}>{e.exposure}</Badge></td>
        </tr>)}
        {filtered.length === 0 && <tr><td colSpan={7} className="empty-row">Tidak ada karyawan yang cocok dengan pencarian.</td></tr>}
      </tbody></table></div>
    </section>
  </>;
}

function Exposure({ region, setRegion }: { region: string; setRegion: (v: string) => void }) {
  return <><PageHeader title="AI Exposure Analysis" subtitle="Assess how each job family can be augmented or automated by AI."><SelectControl value={region} onChange={setRegion} label="Regional unit" options={["All Units", "Regional 1", "Regional 2", "Regional 3", "Regional 4", "Regional 5", "Regional 6"]}/></PageHeader>
    <div className="metric-grid three"><Metric icon={Activity} label="High Exposure" value="13,000" note="25% of workforce" tone="red"/><Metric icon={Gauge} label="Medium Exposure" value="20,800" note="40% of workforce" tone="amber"/><Metric icon={ShieldCheck} label="Low Exposure" value="18,200" note="35% of workforce" tone="green"/></div>
    <div className="two-col exposure-layout"><section className="panel"><div className="panel-head"><div><h2>AI exposure by job family</h2><p>Task-weighted share of each family</p></div><Filter className="size-4 text-muted-foreground"/></div><div className="heatmap"><div className="heat-head"><span/><span>High</span><span>Medium</span><span>Low</span></div>{families.slice(0,7).map((f) => <div className="heat-row" key={f.name}><strong>{f.name}</strong><i className="high" style={{width:`${f.exposure}%`}}>{f.exposure}%</i><i className="medium">{Math.max(20, 75-f.exposure)}%</i><i className="low">{Math.max(8, f.exposure-28)}%</i></div>)}</div></section>
    <section className="crisis-panel"><div className="crisis-kicker"><Activity className="size-4"/> CRITICAL WORKFORCE SIGNAL</div><h2>Field Metering &<br/>Manual Operations</h2><p>Smart-meter rollout and AI-assisted dispatch will remove most routine work from this family.</p><div className="crisis-ring"><div><strong>70%</strong><span>automatable<br/>in 18 months</span></div></div><div className="crisis-stats"><div><span>Affected family</span><strong>6,000 people</strong></div><div><span>Roles displaced</span><strong>~4,200</strong></div></div><div className="crisis-note"><ShieldCheck className="size-4"/><span>Redeployment required. Mass layoffs are not an option.</span></div></section></div>
  </>;
}

function Architecture() {
  const [selected, setSelected] = useState("Operations");
  return <><PageHeader title="Job & Work Model" subtitle="From job titles to tasks and capabilities."><SelectControl value="All Job Families" onChange={() => undefined} label="Job family filter" options={["All Job Families", "Operations", "Engineering"]}/></PageHeader>
    <div className="architecture-grid"><section className="panel family-list"><div className="panel-head"><div><h2>14 job families</h2><p>From 1,800+ legacy titles</p></div></div>{families.map((f) => <button key={f.name} onClick={() => setSelected(f.name)} className={selected === f.name ? "active" : ""}><span>{f.name}</span><Badge tone="neutral">{f.value.toLocaleString("en-US")}</Badge></button>)}</section>
    <section className="panel task-panel"><div className="panel-head"><div><h2>{selected === "Operations" ? "Field Technician (Metering)" : `${selected} Specialist`}</h2><p>Job overview decomposed into observable work</p></div><Badge tone="info">Band 2</Badge></div><div className="task-tabs"><button className="active">Tasks</button><button>Capabilities</button></div><div className="table-wrap"><table><thead><tr><th>#</th><th>Task</th><th>Frequency</th><th>AI applicability</th><th>Human criticality</th></tr></thead><tbody>{tasks.map((task, index) => <tr key={task[0]}><td>{index+1}</td><td>{task[0]}</td>{task.slice(1).map((cell, i) => <td key={i}><Badge tone={cell === "High" ? (i===2 ? "bad" : "good") : cell === "Medium" ? "warn" : "neutral"}>{cell}</Badge></td>)}</tr>)}</tbody></table></div><div className="triad"><div><Landmark/><span>Legal anchor</span><strong>Corporate Grade</strong></div><ChevronRight/><div><Building2/><span>Work context</span><strong>Functional Domain</strong></div><ChevronRight/><div><Sparkles/><span>Dynamic layer</span><strong>Skill Portfolio</strong></div></div></section></div>
  </>;
}

function Capability() {
  const [domain, setDomain] = useState("Technical & Digital");
  return <><PageHeader title="Capability Library" subtitle="Standardized capability taxonomy with five-level proficiency."><div className="search"><Search className="size-4"/><input aria-label="Search capability" placeholder="Search capability..."/></div></PageHeader>
    <div className="architecture-grid"><section className="panel family-list"><div className="panel-head"><div><h2>Capability domains</h2><p>Enterprise standard</p></div></div>{["Technical & Digital", "Business", "People", "Domain", "Leadership & Core"].map((name) => <button key={name} onClick={() => setDomain(name)} className={domain === name ? "active" : ""}><span>{name}</span><ChevronRight className="size-4"/></button>)}</section>
    <section className="panel"><div className="panel-head"><div><h2>{domain}: Data Analysis</h2><p>The ability to collect, analyze, and interpret data to generate insights.</p></div><Badge tone="info">Digital & Technology</Badge></div><div className="levels">{[
      ["5","Expert","Sets standards and authority","Designs data strategy; mentors others"],
      ["4","Advanced","Handles complex work","Analyzes complex datasets; builds models"],
      ["3","Proficient","Works independently","Performs analysis; generates insights"],
      ["2","Developing","Basic with guidance","Runs basic analysis with guidance"],
      ["1","Foundational","Basic awareness","Reads and understands basic data"],
    ].map(([n,title,sub,example]) => <div className="level-row" key={n}><strong>{n}</strong><div><h3>{title}</h3><p>{sub}</p></div><span>{example}</span></div>)}</div></section></div>
  </>;
}

function Profile({ inferred, setInferred }: { inferred: boolean; setInferred: (v: boolean) => void }) {
  return <><PageHeader title="Employee Profile & Capability" subtitle="Current capability, evidence, and potential future roles."><SelectControl value="Budi Santoso · EMP-10492" onChange={() => undefined} label="Employee" options={["Budi Santoso · EMP-10492", "Siti Rahma · EMP-22510", "Andi Wijaya · EMP-33018"]}/></PageHeader>
    <div className="profile-grid"><section className="panel identity"><div className="avatar">BS</div><h2>Budi Santoso</h2><p>Field Technician · L3</p><Badge tone="info">Regional 1</Badge><dl><div><dt>Employee ID</dt><dd>EMP-10492</dd></div><div><dt>Age</dt><dd>34</dd></div><div><dt>Years of Service</dt><dd>8 years</dd></div><div><dt>Education</dt><dd>D3 Teknik Elektro</dd></div></dl><div className="completeness"><div><span>Data completeness</span><strong>78%</strong></div><i><b/></i></div><div className="evidence-list"><span><i className="measured"/>HRIS verified</span><span><i className="measured"/>LMS verified</span><span><i className="measured"/>Performance</span><span><i className="inferred"/>Role inference</span></div></section>
    <section className="panel capability-profile"><div className="panel-head"><div><h2>Budi Santoso</h2><p>Capability comparison</p></div><div className="toggle-wrap"><span>Measured</span><button role="switch" aria-checked={inferred} onClick={() => setInferred(!inferred)} className={inferred ? "on" : ""}><i/></button><span>Inferred</span></div></div><div className="profile-tabs"><button className="active">Current Capability</button><button>Future Role Match</button><button>Learning Plan</button></div><div className="cap-table"><div className="cap-head"><span>Capability</span><span>Current / Future</span><span>Evidence</span><span>Confidence</span></div>{capabilities.map((cap, idx) => <div className={cn("cap-row", !inferred && idx === 4 && "dimmed")} key={cap.name}><strong>{cap.name}</strong><div className="level-dots">{[1,2,3,4,5].map(n => <i key={n} className={n <= cap.current ? "filled" : n <= cap.future ? "target" : ""}/>)}<small>{cap.current} / {cap.future}</small></div><span>{cap.source}</span><Badge tone={cap.confidence === "High" ? "good" : cap.confidence === "Medium" ? "warn" : "bad"}>{cap.confidence}</Badge></div>)}</div><div className="evidence-callout"><Database className="size-5"/><div><strong>Evidence threshold</strong><p>Critical decisions require ≥50% measured evidence. Budi currently has 62% measured signals.</p></div><Badge tone="good">Eligible</Badge></div></section></div>
  </>;
}

function FutureRoles({ go }: { go: (id: ScreenId) => void }) {
  const [cluster, setCluster] = useState(0);
  const clusters = [
    { name:"Smart Energy & Grid Digitalization", count:"1,800", role:"Smart Meter Operations Specialist", fit:"80%", gaps:["Digital Monitoring L3","Data Analysis L3","AMI Diagnostics L3"] },
    { name:"Renewable Energy & Green Solutions", count:"1,400", role:"Distributed Solar O&M Technician", fit:"68%", gaps:["PV Safety L3","Inverter Inspection L2","Preventive O&M L3"] },
    { name:"Customer Experience & Energy Services", count:"800", role:"Energy Services Verification Officer", fit:"74%", gaps:["Digital Billing L3","Energy Audit L2","Customer Advisory L3"] },
  ];
  const active = clusters[cluster] ?? clusters[0];
  if (!active) return null;
  return <><PageHeader title="Future Work & Roles" subtitle="Identify which tasks will change and define future roles."/><div className="future-grid"><section className="panel cluster-list"><div className="panel-head"><div><h2>Business growth clusters</h2><p>Capacity to absorb displaced talent</p></div></div>{clusters.map((item,index) => <button key={item.name} onClick={() => setCluster(index)} className={cluster===index ? "active" : ""}><span className="number">{index+1}</span><div><strong>{item.name}</strong><small>{item.count} target roles</small></div><ChevronRight className="size-4"/></button>)}</section><section className="panel role-spec"><div className="panel-head"><div><Badge tone="info">GROWTH ROLE</Badge><h2>{active.role}</h2><p>Operate and monitor next-generation energy systems, analyze data, and ensure service reliability.</p></div><div className="fit-score"><strong>{active.fit}</strong><span>adjacency fit</span></div></div><div className="role-meta"><div><span>Job family</span><strong>{active.name}</strong></div><div><span>Level</span><strong>L3 · Specialist</strong></div><div><span>Demand</span><strong>High</strong></div><div><span>Timeline</span><strong>0–2 years</strong></div></div><h3>Key capabilities required</h3><div className="skill-chips">{active.gaps.map(gap => <Badge key={gap} tone="neutral">{gap}</Badge>)}</div><div className="role-reason"><Sparkles className="size-5"/><div><strong>Why this pathway works</strong><p>Field route knowledge, electrical safety, customer interaction, and hands-on troubleshooting transfer directly.</p></div></div><Button onClick={() => go("mobility")}>Analyze talent mobility <ArrowRight className="size-4"/></Button></section></div></>;
}

function Mobility({ go }: { go: (id: ScreenId) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dots = useMemo(() => Array.from({length: 46}, (_,i) => ({ x: 8 + ((i*17)%86), y: 8 + ((i*29)%82), type: i%7===0 ? "bad" : i%3===0 ? "warn" : "good" })), []);
  return <><PageHeader title="Mobility Analysis" subtitle="Match employees to future roles and assess reskill feasibility."/><div className="metric-grid four"><Metric icon={BadgeCheck} label="Ready to Redeploy" value="3,240" note="19% of assessed pool" tone="green"/><Metric icon={GraduationCap} label="Reskill" value="8,750" note="52% of assessed pool" tone="amber"/><Metric icon={FileCheck2} label="Further Assessment" value="2,100" note="13% of assessed pool" tone="red"/><Metric icon={Users} label="Surplus Review" value="1,100" note="7% · includes VERS" tone="red"/></div><section className="panel scatter-panel"><div className="panel-head"><div><h2>Mobility Fit vs AI Exposure</h2><p>Click a talent signal to inspect the recommendation</p></div><div className="legend inline"><p><i className="dot good"/>Ready</p><p><i className="dot warn"/>Reskill</p><p><i className="dot bad"/>Review</p></div></div><div className="scatter"><span className="axis-y">Mobility fit</span><span className="axis-x">AI exposure</span><div className="quadrant q1">Protect & grow</div><div className="quadrant q2">Priority redeploy</div>{dots.map((dot,index) => <button aria-label={`Talent signal ${index+1}`} onClick={()=>setSelected(index)} key={index} className={cn("scatter-dot", dot.type, selected===index && "selected")} style={{left:`${dot.x}%`,bottom:`${dot.y}%`}}/>)}<button aria-label="Budi Santoso talent signal" onClick={()=>setSelected(99)} className={cn("scatter-dot budi", selected===99 && "selected")} style={{left:"72%",bottom:"78%"}}>BS</button></div>{selected !== null && <div className="talent-pop"><div><strong>{selected === 99 ? "Budi Santoso" : `Talent profile #${selected+1}`}</strong><span>{selected === 99 ? "80% mobility fit · 82% AI exposure" : "Recommended for structured pathway"}</span></div><Button size="sm" onClick={() => go("learning")}>Open pathway <ArrowRight className="size-3.5"/></Button></div>}</section></>;
}

function Learning({ go }: { go: (id: ScreenId) => void }) {
  return <><PageHeader title="Learning Pathway" subtitle="Personalized reskilling plan to close capability gaps."/><section className="employee-strip"><div className="avatar small">BS</div><div><strong>Budi Santoso</strong><span>Field Technician · L3</span></div><ArrowRight/><div><span>Target role</span><strong>Smart Meter Operations Specialist</strong></div><div className="mobility-fit"><strong>80%</strong><span>Mobility fit</span></div></section><div className="two-col learning-layout"><section className="panel"><div className="panel-head"><div><h2>Capability gaps</h2><p>Current level compared with role requirement</p></div></div><div className="gap-list">{capabilities.slice(0,3).map((cap) => <div key={cap.name}><div><strong>{cap.name}</strong><span>Gap +{cap.future-cap.current}</span></div><div className="level-dots big">{[1,2,3,4,5].map(n=><i key={n} className={n<=cap.current?"filled":n<=cap.future?"target":""}/>)}</div><small>{cap.source}</small></div>)}</div></section><section className="panel"><div className="panel-head"><div><h2>Recommended learning journey</h2><p>8 weeks · blended, assessment-led</p></div><Badge tone="good">Ready to enroll</Badge></div><div className="timeline">{[["1","Foundations","Week 1–2","IoT & Smart Meter Basics"],["2","Data & Diagnostics","Week 3–6","Data Analysis for Operations"],["3","Applied Practice","Week 7–8","Field Simulation & Assessment"]].map(([n,title,time,course])=><div key={n}><span>{n}</span><div><small>{time}</small><strong>{title}</strong><p>{course}</p></div></div>)}</div><div className="learning-cost"><div><span>Estimated investment</span><strong>Rp 14.5M</strong></div><div><span>External hire alternative</span><strong>Rp 85M+</strong></div></div><Button onClick={()=>go("decision")}>Review decision <ArrowRight className="size-4"/></Button></section></div></>;
}

function Decision() {
  const [approved, setApproved] = useState(false);
  return <><PageHeader title="Decision Output" subtitle="Recommended pathway for each employee based on fit, feasibility, and evidence."/><section className="decision-card"><div className="decision-person"><div className="avatar">BS</div><div><span>EMP-10492</span><h2>Budi Santoso</h2><p>Field Technician · L3 · Regional 1</p></div></div><div className="recommendation"><span>RECOMMENDED PATHWAY</span><h2><GraduationCap/> Reskill <ArrowRight/> Redeploy</h2><p>80% capability alignment. Gaps are trainable within 8 weeks.</p></div><div className="readiness"><div className="readiness-ring">80%</div><span>Readiness score</span></div></section><div className="two-col decision-grid"><section className="panel"><div className="panel-head"><div><h2>Decision inputs</h2><p>Transparent, reviewable signals</p></div></div>{[["Mobility fit","80%","good"],["Reskill feasibility","High","good"],["Evidence confidence","Medium","warn"],["Role demand","High","good"]].map(([l,v,t])=><div className="decision-input" key={l}><span>{l}</span><Badge tone={t as "good"|"warn"}>{v}</Badge></div>)}<div className="insight"><ShieldCheck className="size-4"/><p>62% measured evidence clears the 50% decision threshold.</p></div></section><section className="panel"><div className="panel-head"><div><h2>Next-step approval</h2><p>Human review remains mandatory</p></div></div><div className="approval-steps"><div className="done"><Check/>Learning pathway assigned</div><div className="done"><Check/>Fast-track assessment booked</div><div><span>3</span>Receiving manager approval</div></div>{approved ? <div className="approved-state"><BadgeCheck/><div><strong>Assignment approved</strong><p>Decision recorded for pilot planning. No legal title or base pay change.</p></div></div> : <Button onClick={()=>setApproved(true)} className="w-full">Approve pilot assignment <BadgeCheck className="size-4"/></Button>}</section></div></>;
}

function Impact() {
  return <><PageHeader title="Overall Impact & Business Case" subtitle="Estimated business and people impact based on current analysis."><Badge tone="warn">PROXY MODEL · NO ORACLE PAYROLL DATA</Badge></PageHeader><div className="impact-top"><section className="panel"><div className="panel-head"><div><h2>Workforce outcomes</h2><p>Three-year transition portfolio</p></div></div><div className="impact-donut"><div className="impact-ring"><div><strong>52,000</strong><span>employees</span></div></div><div className="legend">{[["Redeploy","3,240","good"],["Reskill","8,750","info"],["Further assessment","2,100","warn"],["Surplus / VERS","1,100","bad"],["No impact / stable","36,810","neutral"]].map(([l,v,t])=><p key={l}><i className={cn("dot",t)}/><span>{l}</span><strong>{v}</strong></p>)}</div></div></section><section className="panel"><div className="panel-head"><div><h2>Estimated business impact</h2><p>Three-year value case</p></div></div><div className="value-list"><div><CircleDollarSign/><span>Net cost avoided<small>Versus inaction scenario</small></span><strong>Rp 778B</strong></div><div><TrendingUp/><span>Productivity gain<small>Digital field operations</small></span><strong>Rp 450B</strong></div><div><GraduationCap/><span>Reskilling investment<small>People + program costs</small></span><strong>Rp 120B</strong></div><div className="roi"><Gauge/><span>Return on transformation<small>Conservative modeled case</small></span><strong>3.2× ROI</strong></div></div></section></div><section className="assumptions"><div><FileCheck2/><p><strong>Defensible by design.</strong> Economics use standardized BUMN energy grade benchmarks, not individual compensation records.</p></div><Button variant="outline" size="sm">View assumptions</Button></section></>;
}

function Roadmap() {
  const phases = [
    { phase:"Phase 1", days:"Day 1–30", title:"Foundation & Analysis", tone:"blue", bullets:["Data ingestion layer","Job family normalization","AI exposure analysis","Metering workforce deep dive"], output:"AI Exposure Baseline" },
    { phase:"Phase 2", days:"Day 31–60", title:"Pathway Design", tone:"violet", bullets:["Capability library finalization","Evidence model & audit trail","Mobility matching validation","Learning pathways design"], output:"Redeployment Plan (4,200)" },
    { phase:"Phase 3", days:"Day 61–90", title:"Pilot & Business Case", tone:"green", bullets:["Pilot implementation · Regional 1","Learning program launch","Impact measurement","Final business case & board report"], output:"90-Day Board Proof Point" },
  ];
  return <><PageHeader title="90-Day Implementation Plan" subtitle="Key milestones to deliver a board-ready proof of concept."/><div className="roadmap">{phases.map((p,index)=><section className={cn("phase",`phase-${p.tone}`)} key={p.phase}><div className="phase-head"><span>{p.phase} · {p.days}</span><strong>{p.title}</strong></div><div className="phase-body"><small>FOUNDATION & DELIVERABLES</small>{p.bullets.map(b=><p key={b}><Check/>{b}</p>)}<div className="gate"><span>GATE {index+1}</span><strong>{p.output}</strong><BadgeCheck/></div></div></section>)}</div><section className="board-pack"><Landmark/><div><strong>Day 90 Board & Ministry Pack</strong><p>Live decision prototype, master redeployment plan, union-aligned safeguards, and defensible ROI model.</p></div><Badge tone="good">READY FOR APPROVAL</Badge></section><div className="risk-note"><Activity/><div><strong>Critical validation before scale</strong><p>Confirm Solar PV & Renewable O&M absorption capacity against the investment pipeline across six regions.</p></div></div></>;
}

export function MeridianApp() {
  const [screen, setScreen] = useState<ScreenId>("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [region, setRegion] = useState("All Units");
  const [inferred, setInferred] = useState(true);
  const current = navigation.find((item) => item.id === screen) ?? navigation[0];
  const go = (id: ScreenId) => { setScreen(id); setMobileOpen(false); window.scrollTo({top:0,behavior:"smooth"}); };
  const screens: Record<ScreenId, React.ReactNode> = {
    overview: <Overview go={go}/>, workforce: <Workforce region={region} setRegion={setRegion}/>, directory: <Directory/>, exposure: <Exposure region={region} setRegion={setRegion}/>, architecture: <Architecture/>, capability: <Capability/>, profile: <Profile inferred={inferred} setInferred={setInferred}/>, future: <FutureRoles go={go}/>, mobility: <Mobility go={go}/>, learning: <Learning go={go}/>, decision: <Decision/>, impact: <Impact/>, roadmap: <Roadmap/>,
  };
  return <div className="app-shell"><aside className={cn("sidebar", collapsed && "collapsed", mobileOpen && "mobile-open")}><div className="brand"><div className="brand-mark"><Zap/></div>{!collapsed && <div><strong>Meridian</strong><span>WORKFORCE INTELLIGENCE</span></div>}<Button variant="ghost" size="icon" className="mobile-close" onClick={()=>setMobileOpen(false)} aria-label="Close navigation"><X/></Button></div><nav>{navigation.map((item,index)=><button key={item.id} onClick={()=>go(item.id)} className={screen===item.id?"active":""} title={item.label}><item.icon/><span>{collapsed?"":item.short}</span>{!collapsed && <small>{String(index+1).padStart(2,"0")}</small>}</button>)}</nav><div className="sidebar-foot"><div className="status-dot"/>{!collapsed&&<div><strong>Prototype environment</strong><span>Mock data · Sep 2026</span></div>}</div></aside>
  <div className="main"><header className="topbar"><div className="topbar-left"><Button variant="ghost" size="icon" onClick={()=>setMobileOpen(true)} className="mobile-menu" aria-label="Open navigation"><Menu/></Button><Button variant="ghost" size="icon" onClick={()=>setCollapsed(!collapsed)} className="desktop-collapse" aria-label="Toggle sidebar">{collapsed?<PanelLeftOpen/>:<PanelLeftClose/>}</Button><div className="crumb"><span>Project Meridian</span><ChevronRight/><strong>{current?.short}</strong></div></div><div className="topbar-right"><Badge tone="good"><span className="live-dot"/> EXECUTIVE PROTOTYPE</Badge><div className="director"><div>MR</div><span><strong>Maya R.</strong><small>Director HC</small></span></div></div></header><main key={screen} className="content">{screens[screen]}</main></div>{mobileOpen&&<button className="scrim" onClick={()=>setMobileOpen(false)} aria-label="Close navigation overlay"/>}</div>;
}