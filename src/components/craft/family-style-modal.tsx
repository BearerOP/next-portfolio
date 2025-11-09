"use client";

import { useState, useEffect } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ModalStep = "initial" | "confirmation" | "processing" | "success";

export function FamilyStyleModal() {
  const [step, setStep] = useState<ModalStep>("initial");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (step === "processing") {
      const timer = setTimeout(() => {
        setStep("success");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleReceive = () => {
    setIsOpen(true);
    setStep("confirmation");
  };

  const handleConfirm = () => {
    setStep("processing");
  };

  const handleCancel = () => {
    setIsOpen(false);
    setStep("initial");
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep("initial");
  };

  return (
    <div className="relative flex items-center justify-center min-h-[400px] bg-zinc-100 dark:bg-background rounded-3xl p-8 overflow-hidden">
      <div className="text-center space-y-4">
        {/* Initial Button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              layoutId="receive-button"
              onClick={handleReceive}
              className="bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-full px-6 py-3 font-semibold cursor-pointer"
            >
              <motion.span layoutId="receive-button-text">Receive</motion.span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/50 z-40 backdrop-blur-sm rounded-3xl"
                onClick={handleClose}
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl max-w-md w-full relative flex flex-col max-h-[90vh]">
                  {/* Close Button */}
                  {step !== "processing" && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleClose}
                      className="absolute top-4 right-4 z-10 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}

                  {/* Scrollable Content */}
                  <div className="overflow-y-auto p-6 md:p-8" style={{ scrollbarWidth: "none" }}>
                    <AnimatePresence mode="wait">
                    {/* Confirmation Step */}
                    {step === "confirmation" && (
                      <motion.div
                        key="confirmation"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <div className="text-center">
                          <motion.h3
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-2"
                          >
                            Confirm
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="text-zinc-600 dark:text-zinc-400"
                          >
                            Are you sure you want to receive a load of money?
                          </motion.p>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex gap-3"
                        >
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCancel}
                            className="flex-1 px-6 py-3 rounded-full border-2 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white font-semibold"
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            layoutId="receive-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleConfirm}
                            className="flex-1 px-6 py-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold"
                          >
                            Receive
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Processing Step */}
                    {step === "processing" && (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-8"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 className="w-12 h-12 text-zinc-900 dark:text-zinc-100" />
                          </motion.div>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg font-semibold text-zinc-900 dark:text-white"
                          >
                            Processing...
                          </motion.p>
                        </div>
                      </motion.div>
                    )}

                    {/* Success Step */}
                    {step === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="text-center py-8"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15, stiffness: 400, delay: 0.1 }}
                            className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center"
                          >
                            <motion.div
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.3, type: "spring", damping: 12 }}
                            >
                              <Check className="w-8 h-8 text-white" />
                            </motion.div>
                          </motion.div>
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl font-bold text-zinc-900 dark:text-white"
                          >
                            Amount Credited
                          </motion.p>
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleClose}
                            className="mt-4 px-6 py-2 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold"
                          >
                            Done
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </div>

                  {/* Bottom Gradient Mask */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-zinc-800 to-transparent rounded-b-3xl pointer-events-none" />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
