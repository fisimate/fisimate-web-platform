# Deploy ke VPS (PM2 + Nginx)

Panduan deploy `fisimate-web` ke VPS pribadi, jalan di PORT **3006**
(PORT 3000 di VPS ini sudah dipakai proses lain), di-manage oleh PM2,
di-expose lewat Nginx reverse proxy ke domain
`fisimate.rafiadipramana.dev` (HTTPS via Let's Encrypt).

Asumsi: VPS Ubuntu/Debian, akses root/sudo via SSH. Web ini hanya frontend —
data diambil dari **fisimate-api** (di-deploy terpisah, lihat
`../../fisimate-api/docs/DEPLOY.md`).

## 0. Prasyarat DNS

Pastikan `fisimate.rafiadipramana.dev` sudah punya DNS record **A** (atau AAAA)
ke IP publik VPS. Certbot di langkah 6 butuh ini aktif (cek: `dig fisimate.rafiadipramana.dev`).

## 1. Install Node.js, PM2, Nginx di VPS

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
sudo apt-get install -y nginx
sudo apt-get install -y certbot python3-certbot-nginx
```

## 2. Clone & build project

```bash
cd /var/www
git clone <URL_REPO_GIT_KAMU> fisimate-web
cd fisimate-web

npm ci
```

Buat file `.env` (lihat `.env.example`) yang menunjuk ke fisimate-api produksi:

```bash
cp .env.example .env
nano .env
```

Contoh:

```
NEXT_PUBLIC_TYPE=prod
NEXT_PUBLIC_API_URL=https://fisimate-api.rafiadipramana.dev
NEXT_PUBLIC_API_VERSION=v1
```

> `NEXT_PUBLIC_*` di-inline saat build, jadi `.env` harus benar **sebelum**
> `npm run build`. Kalau nanti ganti URL API, perlu build ulang.

Lalu build:

```bash
npm run build
```

## 3. Jalankan dengan PM2

Repo ini sudah punya `ecosystem.config.cjs` (jalan di PORT **3006** via
`next start`). Dari root project:

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup   # ikuti instruksi output-nya untuk enable systemd service
```

Cek status:

```bash
pm2 status
pm2 logs fisimate-web
```

Deploy update di kemudian hari:

```bash
cd /var/www/fisimate-web
git pull
npm ci
npm run build          # WAJIB build ulang (Next production butuh .next terbaru)
pm2 restart fisimate-web
```

## 4. Konfigurasi Nginx (reverse proxy)

```bash
sudo cp docs/nginx/fisimate-web.conf /etc/nginx/sites-available/fisimate.rafiadipramana.dev
sudo ln -s /etc/nginx/sites-available/fisimate.rafiadipramana.dev /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Aktifkan HTTPS dengan Certbot

```bash
sudo certbot --nginx -d fisimate.rafiadipramana.dev
```

## 6. Verifikasi

```bash
curl -I https://fisimate.rafiadipramana.dev
# harus 307 redirect ke /auth/login (auth-gate) atau 200, bukan 502
```

## Alternatif: Docker / Cloud Run

Repo juga punya `Dockerfile` (multi-stage, Next `output: standalone`) dan
`cloudbouild.yaml` (perhatikan ejaan file: `cloudbouild`, bukan `cloudbuild` —
jangan di-rename tanpa memperbarui trigger Cloud Build yang mungkin merujuknya)
untuk deploy ke Google Cloud Run. Build & jalankan lokal:

```bash
docker compose up --build   # lihat docker-compose.yml (port 3000)
```

> Env `NEXT_PUBLIC_*` untuk image Docker di-set di `Dockerfile` (build-time),
> bukan runtime — sesuaikan di sana bila endpoint API berubah.

## Troubleshooting

- **502 Bad Gateway**: cek `pm2 status` (harus `online`) dan `pm2 logs
  fisimate-web`. Pastikan `npm run build` sudah dijalankan (tanpa `.next`,
  `next start` gagal).
- **Halaman selalu redirect ke /auth/login**: normal — itu auth-gate di
  `src/proxy.js`. Login butuh akun role admin/guru dari fisimate-api.
- **Data tidak muncul / error jaringan**: cek `NEXT_PUBLIC_API_URL` menunjuk
  API yang benar dan API-nya online (CORS di sisi API harus mengizinkan domain
  web ini).
- **PM2 tidak restart setelah reboot**: pastikan sudah `pm2 save` setelah
  `pm2 startup`.
