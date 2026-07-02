module.exports = {
  plugins: {
    // Tailwind v4: plugin PostCSS dipindah ke paket terpisah `@tailwindcss/postcss`.
    // Autoprefixer sudah built-in di v4, jadi tidak perlu lagi.
    "@tailwindcss/postcss": {},
  },
};
