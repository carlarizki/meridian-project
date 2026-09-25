export type EvidenceTier = "High" | "Medium" | "Low" | "Unknown";
export type Feasibility = "High" | "Medium" | "Low" | null;
export type Decision = "Redeploy" | "Reskill → Redeploy" | "Reskill" | "Further Assessment" | "Voluntary Transition Review";

export type PilotEmployee = {
  id: string;
  name: string;
  role: string;
  exposure: number;
  fit: number | null;
  feasibility: Feasibility;
  evidence: EvidenceTier;
  target: string | null;
  region: string;
};

export const populationOutcomes: { label: Decision; count: number; pct: number; tone: "good" | "info" | "warn" | "bad" | "neutral" }[] = [
  { label: "Redeploy", count: 1200, pct: 20, tone: "good" },
  { label: "Reskill → Redeploy", count: 1800, pct: 30, tone: "info" },
  { label: "Reskill", count: 1500, pct: 25, tone: "warn" },
  { label: "Further Assessment", count: 900, pct: 15, tone: "neutral" },
  { label: "Voluntary Transition Review", count: 600, pct: 10, tone: "bad" },
];

const regions = ["Regional 1", "Regional 2", "Regional 3", "Regional 4", "Regional 5", "Regional 6"];

export const pilotEmployees: PilotEmployee[] = [
  ["EMP-1001", "Budi Santoso", "Teknisi Pencatat Meter", 82, 88, "High", "High", "Smart Meter Operations Specialist"],
  ["EMP-1002", "Siti Rahayu", "Petugas Lapangan Senior", 75, 80, "High", "High", "Digital Metering Technician"],
  ["EMP-1003", "Agus Wijaya", "Teknisi Jaringan Meter", 79, 85, "High", "Medium", "IoT Field Analyst"],
  ["EMP-1004", "Dewi Lestari", "Operator Meter Elektronik", 70, 90, "High", "High", "Smart Meter Operations Specialist"],
  ["EMP-1005", "Hendra Gunawan", "Petugas P2TL", 68, 77, "High", "Medium", "Field Data Quality Analyst"],
  ["EMP-1006", "Fajar Nugroho", "Teknisi Pemeliharaan Meter", 74, 80, "Medium", "Medium", "Digital Metering Technician"],
  ["EMP-1007", "Rina Marlina", "Petugas Baca Meter Keliling", 85, 60, "High", "High", "Customer Energy Advisor"],
  ["EMP-1008", "Yusuf Hidayat", "Teknisi Instalasi Meter", 71, 78, "Medium", "Medium", "IoT Field Analyst"],
  ["EMP-1009", "Maya Puspita", "Operator Meter Elektronik", 66, 55, "High", "High", "Field Data Quality Analyst"],
  ["EMP-1010", "Bambang Setiawan", "Teknisi Pencatat Meter", 80, 76, "Medium", "High", "Smart Meter Operations Specialist"],
  ["EMP-1011", "Nia Kurniawati", "Petugas Lapangan Senior", 69, 52, "High", "Medium", "Customer Energy Advisor"],
  ["EMP-1012", "Rudi Hartono", "Teknisi Jaringan Meter", 77, 79, "Medium", "High", "Digital Metering Technician"],
  ["EMP-1013", "Sri Wahyuni", "Petugas P2TL", 73, 55, "Medium", "Medium", null],
  ["EMP-1014", "Eko Prasetyo", "Teknisi Pemeliharaan Meter", 62, 48, "Medium", "High", null],
  ["EMP-1015", "Wulan Sari", "Operator Meter Elektronik", 84, 82, "Low", "Medium", null],
  ["EMP-1016", "Anton Wibowo", "Teknisi Instalasi Meter", 58, 40, "Medium", "High", null],
  ["EMP-1017", "Indah Permatasari", "Petugas Baca Meter Keliling", 76, 50, "Medium", "Medium", null],
  ["EMP-1018", "Joko Susilo", "Teknisi Pencatat Meter", 65, 44, "Medium", "High", null],
  ["EMP-1019", "Lina Marlina", "Petugas Lapangan Senior", 70, null, null, "Unknown", null],
  ["EMP-1020", "Dian Kusuma", "Teknisi Jaringan Meter", 81, 65, "Medium", "Low", null],
  ["EMP-1021", "Taufik Hidayat", "Operator Meter Elektronik", 60, null, null, "Unknown", null],
  ["EMP-1022", "Ratna Dewi", "Petugas P2TL", 72, 58, "Medium", "Low", null],
  ["EMP-1023", "Slamet Riyadi", "Teknisi Pemeliharaan Meter", 88, 32, "Low", "Medium", null],
  ["EMP-1024", "Wahyu Setiadi", "Teknisi Instalasi Meter", 91, 28, "Low", "High", null],
].map(([id, name, role, exposure, fit, feasibility, evidence, target], index) => ({
  id: String(id), name: String(name), role: String(role), exposure: Number(exposure),
  fit: fit === null ? null : Number(fit), feasibility: feasibility as Feasibility,
  evidence: evidence as EvidenceTier, target: target === null ? null : String(target),
  region: regions[index % regions.length] ?? "Regional 1",
}));

type DecisionRule = { label: Decision; explanation: string; matches: (employee: PilotEmployee) => boolean };

export const decisionRules: DecisionRule[] = [
  { label: "Further Assessment", explanation: "Evidence Low atau Unknown — fit dan feasibility belum layak menjadi dasar keputusan.", matches: ({ evidence }) => evidence === "Low" || evidence === "Unknown" },
  { label: "Redeploy", explanation: "Mobility Fit High (≥75%) + Reskill Feasibility High.", matches: ({ fit, feasibility }) => fit !== null && fit >= 75 && feasibility === "High" },
  { label: "Voluntary Transition Review", explanation: "Mobility Fit Low (<45%) + Reskill Feasibility Low.", matches: ({ fit, feasibility }) => fit !== null && fit < 45 && feasibility === "Low" },
  { label: "Reskill → Redeploy", explanation: "High fit + Medium feasibility, atau Medium fit + High feasibility.", matches: ({ fit, feasibility }) => fit !== null && ((fit >= 75 && feasibility === "Medium") || (fit >= 45 && fit < 75 && feasibility === "High")) },
  { label: "Reskill", explanation: "Kombinasi lain dengan evidence yang cukup.", matches: () => true },
];

export const getDecision = (employee: PilotEmployee) => decisionRules.find((rule) => rule.matches(employee)) ?? decisionRules[decisionRules.length - 1];

export const evidenceTrail = (tier: EvidenceTier) => ({
  High: ["HRIS profile verified", "Assessment 2025 verified", "LMS completion verified", "Manager validation complete"],
  Medium: ["HRIS profile verified", "Recent role history verified", "LMS evidence partial", "Manager validation pending"],
  Low: ["HRIS identity verified", "Pre-2023 skill score stale", "Recent assessment missing", "Manager validation required"],
  Unknown: ["HRIS identity only", "Skill assessment unavailable", "Learning history unavailable", "Field validation required"],
}[tier]);