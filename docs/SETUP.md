# Setup Lokal

Panduan menjalankan Fisimate Web (dashboard admin/guru, Next.js) di mesin lokal.

## Prasyarat

- Node.js 20+ (project menargetkan Node LTS terbaru; sudah diverifikasi jalan di Node 25)
- npm (project memakai `package-lock.json`, bukan `yarn.lock`)
- Backend **fisimate-api** yang bisa diakses (lokal atau remote) — web ini hanya
  frontend, seluruh data diambil dari API. Lihat `../../fisimate-api/docs/SETUP.md`
  untuk menjalankan API-nya (default jalan di `http://localhost:8080`).

## Langkah

1. **Install dependencies**

   ```bash
   npm install
   ```

   > Saat instalasi npm mungkin memberi peringatan bahwa `sharp` (dipakai
   > Next.js untuk optimasi gambar) punya install script yang belum di-approve.
   > Boleh diabaikan untuk dev, atau jalankan `npm approve-scripts sharp`.

2. **Buat file `.env`**

   Salin dari `.env.example` lalu arahkan ke fisimate-api:

   ```bash
   cp .env.example .env
   ```

   Contoh isi untuk development (menunjuk API lokal):

   ```
   NEXT_PUBLIC_TYPE=dev
   NEXT_PUBLIC_API_DEV_URL=http://127.0.0.1:8080
   NEXT_PUBLIC_API_DEV_VERSION=v1
   NEXT_PUBLIC_API_URL=https://fisimate-api-gg6y243dza-et.a.run.app
   NEXT_PUBLIC_API_VERSION=v1
   ```

   `src/configs/index.js` memilih `apiUrl`/`apiVersion` berdasarkan
   `NEXT_PUBLIC_TYPE`: kalau `dev` memakai `NEXT_PUBLIC_API_DEV_*`, selain itu
   memakai `NEXT_PUBLIC_API_*`. Axios (`src/libs/axios.js`) lalu membentuk
   base URL `{apiUrl}/api/{apiVersion}`.

   > Semua variabel berprefiks `NEXT_PUBLIC_` di-inline saat build, jadi kalau
   > diubah perlu restart `npm run dev` (atau build ulang untuk production).

3. **Jalankan server dev**

   ```bash
   npm run dev
   ```

   Buka `http://localhost:3000`. Karena ada auth-gate di `src/proxy.js`, semua
   halaman akan redirect ke `/auth/login` sampai login berhasil. Login butuh
   akun ber-role **admin/guru** (role `user`/siswa ditolak di halaman login).

## Login

Gunakan akun hasil seed fisimate-api (lihat `../../fisimate-api/docs/SETUP.md`),
misal admin `admin@gmail.com` / `admin`. Token disimpan di cookie `token`.

## Build production lokal

```bash
npm run build
npm start        # next start, default PORT 3000
```
