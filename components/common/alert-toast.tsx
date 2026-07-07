"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";

interface AlertToastProps {
  show: boolean;
  title: string;
  message: string;
}

export default function AlertToast({
  show,
  title,
  message,
}: AlertToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -80,
            scale: 0.9,
          }}
          transition={{
            duration: 0.35,
          }}
          className="fixed right-8 top-8 z-[9999] w-[360px] rounded-2xl border border-red-500/30 bg-red-950/95 p-5 shadow-2xl shadow-red-900/60 backdrop-blur-xl"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-red-500/20 p-3">
              <TriangleAlert className="h-7 w-7 text-red-400" />
            </div>

            <div className="flex-1">
              <h2 className="font-bold text-red-300">
                {title}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-red-100">
                {message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}