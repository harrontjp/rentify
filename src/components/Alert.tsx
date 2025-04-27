// components/AlertToast.tsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AlertToastProps = {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  isOpen: boolean;
  onClose: () => void;
};

const typeStyles = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-yellow-500 text-black",
};

export default function AlertToast({
  message,
  type = "info",
  isOpen,
  onClose,
}: AlertToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-lg text-white ${typeStyles[type]}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
