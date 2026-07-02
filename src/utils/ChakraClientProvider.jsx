"use client";

import system from "@/theme";
import EmotionRegistry from "@/utils/EmotionRegistry";
import { Toaster } from "@/utils/toaster";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

export default function InitChakraProvider({ children }) {
  // Chakra v3: prop `theme` → `value` (system dari createSystem).
  // EmotionRegistry menjaga style Emotion SSR agar tidak hydration-mismatch.
  return (
    <EmotionRegistry>
      <ChakraProvider value={system}>
        {children}
        <Toaster />
      </ChakraProvider>
    </EmotionRegistry>
  );
}
