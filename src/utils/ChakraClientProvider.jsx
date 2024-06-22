"use client"

import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

export default function InitChakraProvider({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
