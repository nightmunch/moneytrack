"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const sunAnimation = {
    initial: { rotate: -90, scale: resolvedTheme === "dark" ? 0 : 1 },
    animate: {
      rotate: resolvedTheme === "dark" ? -90 : 0,
      scale: resolvedTheme === "dark" ? 1 : 0,
    },
    transition: { duration: 0.3 },
  };

  const moonAnimation = {
    initial: {
      rotate: resolvedTheme === "dark" ? 90 : 0,
      scale: resolvedTheme === "dark" ? 1 : 0,
    },
    animate: { rotate: 0, scale: resolvedTheme === "dark" ? 0 : 1 },
    transition: { duration: 0.3 },
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <motion.div
        initial={sunAnimation.initial}
        animate={sunAnimation.animate}
        transition={{ duration: 0.3 }}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
      <motion.div
        className="absolute"
        initial={moonAnimation.initial}
        animate={moonAnimation.animate}
        transition={{ duration: 0.3 }}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
