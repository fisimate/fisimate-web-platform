# Catatan Revival & Modernisasi (2026-07-02)

Project frontend (`fisimate-web`) ini di-revive mengikuti pola yang sama dengan
`fisimate-api` (lihat `../../fisimate-api/docs/MIGRATION.md`). Dokumen ini
mencatat apa yang diubah, breaking change yang dimigrasi, dan apa yang sengaja
dibiarkan.

## Ringkasan

1. Upgrade seluruh dependency ke versi major terbaru, memigrasi tiap breaking
   change satu per satu: Next 14→16, React 18→19, Tailwind 3→4, Chakra UI 2→3,
   dan tabel dari `react-table` v7 (legacy) ke `@tanstack/react-table` v8.
2. Ganti package manager yarn → npm.
3. Tambah konfigurasi deploy VPS (PM2 `ecosystem.config.cjs` + Nginx) dan docs.
4. Build & dev server diverifikasi jalan normal di Node LTS terbaru (Node 25).

> **Baseline sebelum revival**: berbeda dengan fisimate-api yang tidak bisa jalan
> sama sekali, `npm run build` project ini **sudah berhasil** dengan dependency
> lama di Node 25. Jadi fokus revival di sini adalah modernisasi (major bump +
> keamanan), bukan perbaikan bug fatal.

## Temuan penting saat eksplorasi

- **Chakra UI ternyata hanya dipakai untuk `useToast`** (25 file page) plus
  `extendTheme` (`src/theme.js`) dan `ChakraProvider` (provider). Komponen UI
  utama (`Button`, `Table`, `Modal`, `Input`, `SelectGroup`, `Alert`) semuanya
  **wrapper Tailwind kustom** di `src/components/`, bukan komponen Chakra. Tidak
  ada `@chakra-ui/next-js` maupun `@emotion/*` yang di-import langsung di `src/`.
  → migrasi Chakra 3 jadi jauh lebih ringan (hanya jalur toast + provider).
- **Tabel memakai `react-table` v7 legacy** (`useTable/useSortBy/usePagination`)
  di satu file `src/components/Table/index.jsx`. `@tanstack/react-table` v8 sudah
  ada di `package.json` tapi **belum dipakai sama sekali**. `react-table` v7
  peer-nya `react ^18` → satu-satunya penghalang upgrade ke React 19.
- **Semua 13 route dinamis adalah Client Component** (`"use client"`) yang
  menerima `params` sebagai prop dan mendestrukturnya sinkron
  (`const { id } = params`). Tidak ada yang memakai `useParams()`.

## Upgrade dependency (major bump)

Dilakukan dengan `npx npm-check-updates -u` lalu memperbaiki tiap breaking change.

### Next 14.1 → 16.2

- **`params` sekarang Promise.** Di Next 15+ (dan wajib di 16), `params` pada
  dynamic route adalah Promise. Karena semua halaman dinamis di sini Client
  Component, unwrap-nya pakai `React.use()`: `const { id } = use(params);`
  (ditambah `import { use } from "react"`). Diterapkan di 13 file
  `src/app/**/[*]/page.jsx`. Kalau tidak dimigrasi, di Next 16 akses sinkron ke
  `params` akan error saat runtime.
- **`middleware` → `proxy`.** Next 16 mendeprecate konvensi file `middleware`.
  File `src/middleware.js` di-rename jadi `src/proxy.js` dan fungsi ter-export
  `middleware()` jadi `proxy()`. `config.matcher` tetap sama. Field
  `unstable_includeFiles` (workaround Edge runtime lama untuk primitives
  `@edge-runtime`) dihapus — proxy Next 16 jalan di Node runtime, tidak butuh itu.
- **`next.config.mjs`**: `output: "standalone"` sudah ada (dipakai untuk
  Docker/PM2). Ditambah `images.remotePatterns` untuk host Supabase
  (`*.supabase.co`, path `/storage/v1/object/public/**`) karena fisimate-api
  sudah pindah ke Supabase Storage.
- Peringatan keamanan Next 14.1.0 (diumumkan Des 2025) otomatis hilang dengan
  bump ini.

### React 18 → 19

- react + react-dom ke 19. Tidak ada API usang yang dipakai (tidak ada
  `ReactDOM.render` legacy, dll — semua lewat Next App Router). formik, zustand,
  framer-motion, react-apexcharts semua mendukung React 19 (peer `>=16.8` atau
  eksplisit `^19`).

### Chakra UI 2.8 → 3.36

Karena Chakra hanya dipakai untuk toast, migrasi diisolasi:

- **`src/theme.js`**: `extendTheme(...)` (v2) tidak ada lagi di v3. Diganti
  `createSystem(defaultConfig, defineConfig({ globalCss: { body: {...} } }))`.
  Style global (font Poppins) pindah dari `styles.global` ke `globalCss`.
- **`src/utils/ChakraClientProvider.jsx`**: prop `<ChakraProvider theme={...}>`
  → `<ChakraProvider value={system}>`, dan me-render `<Toaster />` global.
- **`useToast` dihapus di v3.** Diganti pola toaster global. Dibuat:
  - `src/utils/toaster.jsx` — instance `createToaster({ placement: "top-end" })`
    + komponen `<Toaster />` (mengikuti snippet resmi Chakra v3).
  - `src/utils/useToast.js` — **shim kompatibilitas**: hook `useToast()` yang
    mengembalikan fungsi bersignature lama `({ title, status, isClosable,
    position })` lalu memetakannya ke `toaster.create({ title, type: status,
    closable: isClosable })`. Dengan shim ini, 25 file page **cukup ganti baris
    import** dari `@chakra-ui/react` ke `@/utils/useToast` — seluruh call site
    (`toast({...})`) tetap utuh. `position` per-panggilan diabaikan (di v3 diset
    di instance toaster).
- Dependency `@chakra-ui/next-js` (v2, tidak dipakai & tidak kompatibel v3)
  dihapus. `@emotion/*` dipertahankan (peer dependency Chakra 3).
- **`src/utils/EmotionRegistry.jsx`** (baru): registry SSR Emotion memakai
  `useServerInsertedHTML` (pola resmi Next App Router). Dibutuhkan karena
  `@chakra-ui/next-js` — yang dulu menyediakan `CacheProvider` untuk ini —
  sudah dihapus. Tanpa registry ini, style global Emotion Chakra v3 di-render
  inline oleh server tapi dipindah ke `<head>` oleh client, menyebabkan
  **hydration mismatch** (terlihat saat verifikasi browser di bawah). Provider
  membungkus `<ChakraProvider>` dengan registry ini.

### Tabel: react-table v7 → @tanstack/react-table v8

`react-table` v7 sudah unmaintained dan peer-nya menahan React di v18.
`@tanstack/react-table` v8 (penerusnya) sudah terpasang tapi belum dipakai.

- **`src/components/Table/index.jsx`** ditulis ulang pakai `useReactTable` +
  `getCoreRowModel`/`getFilteredRowModel`/`getSortedRowModel`/
  `getPaginationRowModel`, dengan state `globalFilter` untuk search dan
  `pagination` (pageSize awal 5). Kontrol pagination pakai API v8
  (`table.previousPage()`, `getCanNextPage()`, `setPageIndex()`, `setPageSize()`,
  `getPageCount()`).
- **`Thead.jsx`**: render header pakai `table.getHeaderGroups()` + `flexRender`,
  sorting via `header.column.getToggleSortingHandler()` + indikator ↑/↓.
- **`TBody.jsx`**: menerima `rows` dari `table.getRowModel().rows`; helper
  `renderField`/`getField` (untuk gambar, link file, nested key) **dipertahankan
  apa adanya** karena sel dirender dari prop `fields`, bukan dari column def.
- **Bentuk props publik `<Table>` tidak berubah** (`headers` tetap
  `{ Header, accessor }`, plus `data/fields/action/isLoading/button/withSearch/
  withFooter`), jadi 8+ pemanggil tidak perlu diubah. Konversi `{ Header,
  accessor }` → `{ header, accessorKey }` dilakukan internal di `index.jsx`.
- Dependency `react-table` dihapus.

### Tailwind CSS 3 → 4

Dipilih jalur **kompatibilitas `@config`** (bukan migrasi CSS-first penuh)
karena `tailwind.config.js` besar (±330 baris: colors/spacing/maxWidth/zIndex/
boxShadow/fontSize kustom seperti `boxdark`, `max-w-142.5`, `z-999999`) dan
risiko regresi visual paling minim dengan mempertahankannya.

- **`postcss.config.js`**: plugin `tailwindcss` + `autoprefixer` → cukup
  `@tailwindcss/postcss` (autoprefixer sudah built-in di v4).
- **`src/app/globals.css`**: `@tailwind base/components/utilities` diganti
  `@import "tailwindcss";` + `@config "../../tailwind.config.js";`. Sisa CSS
  kustom (`@layer base`, `@layer utilities`, override flatpickr dengan `@apply`)
  tetap berfungsi.
- **`tailwind.config.js`**: baris `import defaultTheme from
  "tailwindcss/defaultTheme"` (ESM) diubah jadi `require(...)` (CJS) agar
  konsisten dengan `module.exports` di file yang sama — menghilangkan warning
  `MODULE_TYPELESS_PACKAGE_JSON` dari loader Tailwind v4. `darkMode: "class"`
  tetap dihormati lewat `@config`.

### Bug latent yang terekspos data nyata

- **`src/utils/limitString.js`** crash (`Cannot read properties of null
  (reading 'length')`) saat menerima `content` bernilai `null` — terjadi di
  halaman `/chapters` karena `shortDescription` sebuah chapter dari API nyata
  bisa `null`. Ditambah guard `if (content == null) return content;`. Bug ini
  sudah ada sebelum revival, hanya belum pernah terpicu karena belum diverifikasi
  dengan data sungguhan.

### Lainnya (bump, dicek tanpa perubahan kode)

`framer-motion` 11→12 (2 komponen animasi), `zustand` 4→5 (`create` API sama,
`src/stores/app-store.js` kompatibel), `formik` 2.4.5→2.4.9 (tidak ada v3),
`react-apexcharts` 1→2 + `apexcharts` 3→5, `@tanstack/react-query` 5.x,
`axios`, `js-cookie`, `react-icons`, `socket.io-client`, `nextjs-toploader`,
`flatpickr` — semua di-bump ke terbaru, dicek tidak ada breaking change yang
menyentuh kode project ini.

## yarn → npm

`yarn` tidak terpasang di mesin dev ini (sama seperti kasus fisimate-api).
`yarn.lock` dihapus, project sekarang pakai `package-lock.json`. `Dockerfile`
ditulis ulang: `yarn install` → `npm ci`, dan runner memakai output
`standalone` Next (`COPY .next/standalone` + `.next/static` + `public`, lalu
`CMD ["node", "server.js"]`) alih-alih `yarn start`. `.dockerignore` diperbaiki
(`./node_modules` → `node_modules`, tambah `.env*.local` dan `docs`).

## Keamanan (`npm audit`)

- Total vuln turun dari **22** (2 critical, 11 high, 9 moderate) di dependency
  lama menjadi **2 moderate** setelah upgrade.
- Sisa 2 moderate adalah `postcss <8.5.10` (XSS via stringify) yang **nested di
  dalam paket `next`**, bukan di dependency langsung project. `npm audit fix
  --force` "memperbaikinya" dengan **men-downgrade Next ke 9.x** (breaking total),
  jadi sengaja dibiarkan — sama seperti keputusan di fisimate-api untuk vuln
  moderate yang perbaikan otomatisnya justru downgrade. Akan hilang sendiri saat
  Next merilis versi dengan postcss yang sudah dipatch.

## Verifikasi

- `npm ci` bersih tanpa konflik peer (React 19 lolos karena `react-table` v7
  yang menahannya sudah dilepas).
- `npm run build` sukses (Next 16, Turbopack): seluruh 31 route ter-generate,
  TypeScript check lolos, dan **semua halaman tabel/dashboard prerender sebagai
  Static tanpa error** — mengonfirmasi komponen `Table` (TanStack v8), provider
  Chakra 3 + `<Toaster />`, dan shim `useToast` di 25 page semua bekerja saat
  build/SSR.
- `npm run dev`: `/auth/login` render 200 dengan konten form asli, auth-gate
  `src/proxy.js` redirect (307) ke login untuk route terproteksi, log menunjukkan
  `proxy.ts` dikenali (bukan lagi `middleware`), tanpa warning.

### Verifikasi end-to-end di browser (terhadap API live)

Setelah fisimate-api live di `https://fisimate-api.rafiadipramana.dev`, dilakukan
smoke test penuh di browser sungguhan (Playwright + Chrome, `.env` menunjuk API
live), login sebagai `guru@gmail.com`:

- **Login → redirect `/dashboard`** berhasil (token disimpan di cookie, auth-gate
  lolos).
- **Tabel render data nyata** dari API di semua halaman: `/students` (1 baris),
  `/chapters` (3), `/banks/exams` (5), `/banks/formulas` (5), `/banks/materials`
  (5), `/simulations` (4), `/leaderboards` (1) — mengonfirmasi migrasi
  `@tanstack/react-table` berfungsi. Kotak "Cari data..." (global filter v8)
  memfilter baris dengan benar.
- **Route dinamis** `/chapters/{id}` (id asli dari API) ter-load dan form terisi
  tanpa error — mengonfirmasi unwrap `params` via `use()` di Next 16.
- **Toast Chakra v3** muncul ("Password salah!") saat login gagal — mengonfirmasi
  provider Chakra 3 + shim `useToast` bekerja end-to-end.

Dua masalah ditemukan & diperbaiki dari verifikasi ini: hydration mismatch Emotion
(lihat [EmotionRegistry](#chakra-ui-28--336)) dan crash `limitString` pada data
`null` (lihat [Bug latent](#bug-latent-yang-terekspos-data-nyata)). Setelah
perbaikan, konsol browser bersih dari error JS di seluruh halaman yang diuji.

## Belum dikerjakan / sengaja dibiarkan

- **Migrasi Tailwind CSS-first penuh** (memindah `tailwind.config.js` ke blok
  `@theme` di CSS) sengaja tidak dilakukan — jalur `@config` dipilih untuk
  meminimalkan risiko regresi. Bisa dilakukan nanti sebagai polish.
- **`socket.io-client`** ada di dependency dan di-bump, tapi verifikasi fitur
  realtime tergantung endpoint socket di fisimate-api (yang di sisi API-nya
  sendiri belum di-wire — lihat MIGRATION.md fisimate-api).
- `cloudbouild.yaml` (typo, seharusnya `cloudbuild`) **tidak di-rename** karena
  bisa dirujuk trigger Google Cloud Build; hanya dicatat di [DEPLOY.md](./DEPLOY.md).
