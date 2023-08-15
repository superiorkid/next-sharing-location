"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideProps {
  children: React.ReactNode;
  className?: string;
}

function Slide({ children, className }: SlideProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default Slide;
