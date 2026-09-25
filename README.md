# Meridian Pathways

Bangun aplikasi web prototipe eksekutif interaktif untuk Project Meridian (Workforce Intelligence & Capability Redeployment Platform untuk BUMN Energi 52.000 karyawan) mengacu persis pada 12 layar di storyboard gambar yang dilampirkan, case study brief, dan PRD:

Navigasi sidebar interaktif mencakup seluruh 12 modul/layar:
1. Landing Page / Overview: Hero banner 'From Work Insights to People Outcomes', KPI Cards (52k Karyawan, 1.800+ Titles dinormalisasi ke 14 Families, 4.200 At Risk Metering & Manual Ops, 0 Mass Layoffs commitment), Key Outcomes Target 90 Days & Business Case ROI Rp 3.5T.
2. Workforce Overview: Distribusi 52k karyawan di 6 Unit Regional, data kelengkapan (45% missing skill data), breakdown per Job Family (Operations, Engineering, Corporate Services, dll.), dan donat distribusi paparan AI (High 25%, Med 40%, Low 35%).
3. AI Exposure Analysis: Matriks eksposur per Job Family dengan filter regional & famili, serta sorotan krisis 'Field Metering & Manual Operations' (6.000 karyawan, 70% rentan otomatisasi dalam 18 bulan, ~4.200 peran terdampak).
4. Job & Work Model (Architecture): Dekonstruksi 14 Job Families dari 1.800+ jabatan warisan, rincian tugas Field Technician (Metering) dengan parameter frekuensi, AI applicability, dan human criticality.
5. Capability Library: Taksonomi kapabilitas standar dengan 5-level proficiency (Foundational s/d Expert), domains (Technical & Digital, Business, People, Domain, Leadership & Core) lengkap dengan rubrik penilaian.
6. Employee Profile & Capability: Profil interaktif karyawan riil 'Budi Santoso' (Field Technician - L3, Regional 1, D3 Teknik Elektro, kelengkapan data 78%), spider chart/matriks kapabilitas saat ini vs masa depan, serta penanda bukti dan keyakinan sinyal (Measured vs Inferred, High/Medium/Low).
7. Future Work & Roles: Klaster pertumbuhan bisnis energi (Smart Energy & Grid Digitalization, Renewable Energy & Green Solutions, Customer Experience & Energy Services), spesifikasi peran masa depan seperti 'Smart Meter Operations Specialist'.
8. Mobility Analysis: Matriks kesiapan talenta (3.240 Ready to Redeploy, 8.750 Reskill, 2.100 Further Assessment, 1.100 Surplus/VERS), scatter plot interaktif Mobility Fit vs AI Exposure.
9. Pathway & Learning Plan: Personalized learning journey Budi Santoso menuju 'Smart Meter Operations Specialist' (Mobility Fit 80%), analisis gap kapabilitas, dan timeline kurikulum pelatihan 8 minggu.
10. Decision Output: Decision Engine eksekutif dengan rekomendasi terarah 'Reskill -> Redeploy', skor kesiapan 80%, transparansi confidence input, dan tombol aksi approval penugasan.
11. Overall Impact & Business Case: Ringkasan dampak transformasi 3 tahun (3.240 redeployed, 8.750 reskilled, net cost avoided ratusan miliar rupiah, produktivitas Rp 450B, investasi reskilling Rp 120B, ROI 3.2x) tanpa melanggar kerahasiaan payroll Oracle.
12. 90-Day Implementation Plan: Roadmap implementasi 3 fase (Phase 1 Day 1-30 Foundation & Analysis, Phase 2 Day 31-60 Pathway Design, Phase 3 Day 61-90 Pilot & Business Case) lengkap dengan deliverable siap demo di setiap gate.

Desain antarmuka: Modern enterprise dark-slate theme (#0B1120 / #1E293B / #0284C7 / #10B981 / #F59E0B), tipografi profesional (Plus Jakarta Sans/Inter), interaktif (klik navigasi, filter regional, kartu detail profil, toggle measured vs inferred), dan data mock realistis.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://meridian-project.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a73d4f93-f9d0-4f99-af8d-e5c8588bb57d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
