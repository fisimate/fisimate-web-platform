module.exports = {
  apps: [
    {
      name: "fisimate-web",
      // Jalankan Next production server (`next start`). Membutuhkan `npm run build`
      // sudah dijalankan sebelumnya (folder `.next` harus ada).
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
