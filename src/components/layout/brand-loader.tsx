"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "lecoquette-loader-seen";
const LOADER_DURATION_MS = 700;

export function BrandLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY)) {
      return;
    }

    setVisible(true);

    const timeout = window.setTimeout(() => {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
      setVisible(false);
    }, LOADER_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center bg-[linear-gradient(180deg,rgba(255,245,239,0.98),rgba(255,227,211,0.98))]"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-28 w-20 items-center justify-center rounded-[2.5rem] border border-[rgba(122,48,27,0.18)] bg-[rgba(255,255,255,0.35)]"
            >
              <span className="font-display text-5xl tracking-[-0.08em] text-[var(--color-primary)]">
                LC
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.65 }}
              className="font-display text-[clamp(2.4rem,4vw,4rem)] tracking-[-0.05em] text-[var(--color-foreground-strong)]"
            >
              LeCoquette
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
