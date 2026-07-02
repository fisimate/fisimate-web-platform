# Fisimate Web

Dashboard admin/guru untuk platform Fisimate, dibangun dengan **Next.js 16**
(App Router), **React 19**, **Tailwind CSS 4**, dan **@tanstack/react-table**.
Seluruh data diambil dari backend [fisimate-api](../fisimate-api).

## Quick start

```bash
npm install
cp .env.example .env   # arahkan NEXT_PUBLIC_API_* ke fisimate-api
npm run dev            # http://localhost:3000
```

Halaman terproteksi auth-gate (`src/proxy.js`) — akan redirect ke `/auth/login`
sampai login dengan akun role admin/guru. Detail lengkap di
[docs/SETUP.md](docs/SETUP.md).

## Scripts

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Dev server (Turbopack) di port 3000 |
| `npm run build` | Build production (`output: standalone`) |
| `npm start` | Jalankan hasil build (`next start`) |
| `npm run lint` | Lint |

## Dokumentasi

- [docs/SETUP.md](docs/SETUP.md) — setup & menjalankan lokal
- [docs/DEPLOY.md](docs/DEPLOY.md) — deploy VPS (PM2 + Nginx) & Docker/Cloud Run
- [docs/MIGRATION.md](docs/MIGRATION.md) — catatan revival & modernisasi (Next 16,
  React 19, Tailwind 4, Chakra 3, migrasi tabel)

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · Chakra UI 3 (toast) ·
@tanstack/react-query & react-table · Formik · Zustand · ApexCharts · Axios
