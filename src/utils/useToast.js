"use client";

import { toaster } from "@/utils/toaster";

// Shim kompatibilitas Chakra v2 → v3.
// Di v2, komponen memakai `const toast = useToast()` lalu memanggil
// `toast({ title, status, isClosable, position })`. Di v3 API-nya berubah jadi
// `toaster.create({ title, type, closable })` dan `position` diset di instance
// toaster (lihat `toaster.jsx`), bukan per-panggilan.
//
// Shim ini menjaga call site lama tetap utuh: cukup ganti baris import dari
// `@chakra-ui/react` ke `@/utils/useToast`, sisanya tidak berubah.
export function useToast() {
  return ({ title, description, status, isClosable = true, duration }) =>
    toaster.create({
      title,
      description,
      type: status, // v2 `status` → v3 `type` (nilai sama: success/error/warning/info/loading)
      closable: isClosable, // v2 `isClosable` → v3 `closable`
      duration,
    });
}
