import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Chakra v3: `extendTheme` (v2) dihapus, diganti "system" hasil `createSystem`.
//
// `preflight: false` WAJIB di sini. Chakra v3 secara default menyuntikkan CSS
// reset global (`* { padding: 0; border-width: 0 }`, dll) lewat Emotion secara
// UNLAYERED. Tailwind v4 menaruh semua utility-nya di dalam `@layer utilities`,
// dan menurut aturan cascade CSS, style unlayered MENGALAHKAN style ber-layer —
// sehingga reset Chakra menimpa seluruh utility Tailwind (padding/border hilang
// di semua elemen). Karena Chakra di project ini hanya dipakai untuk toast,
// reset global-nya tidak diperlukan (Tailwind sudah punya preflight sendiri).
const config = defineConfig({
  preflight: false,
});

const system = createSystem(defaultConfig, config);

export default system;
