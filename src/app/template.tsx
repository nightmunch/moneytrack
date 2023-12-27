// app/template.tsx
"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial="initialState"
      animate="animateState"
      exit="exitState"
      transition={{
        type: "tween",
        duration: 1,
      }}
      variants={{
        initialState: {
          opacity: 0,
        },
        animateState: {
          opacity: 1,
        },
        exitState: {
          opacity: 0,
        },
      }}
    >
      {children}
    </motion.main>
  );
}
