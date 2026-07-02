import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Chakra v3: `extendTheme` (v2) dihapus, diganti "system" hasil `createSystem`.
// Global style (font Poppins) yang dulu di `styles.global` dipindah ke `globalCss`.
const config = defineConfig({
  globalCss: {
    body: {
      fontFamily: '"Poppins", sans-serif',
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
