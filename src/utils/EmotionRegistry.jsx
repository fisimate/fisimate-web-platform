"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// Registry SSR untuk Emotion (dipakai Chakra v3 di bawah kapotnya). Tanpa ini,
// style global Emotion di-render inline oleh server tapi dipindah ke <head> oleh
// client → hydration mismatch. Menggantikan peran CacheProvider dari
// `@chakra-ui/next-js` (v2, sudah dihapus) dengan pola resmi Next App Router.
export default function EmotionRegistry({ children }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "chakra" });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prev = inserted;
      inserted = [];
      return prev;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
