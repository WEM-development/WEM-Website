"use client";

import React from "react";
import { MotionConfig, motion } from "framer-motion";

interface RevealProps {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

export default function Reveal({ delay = 0, className, children }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
