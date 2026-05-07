"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface Toast {
  id: string;
  message: string;
}

interface ToastContextType {
  addToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div 
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              style={{
                background: "var(--surface)",
                backdropFilter: "blur(20px)",
                border: "1px solid var(--border)",
                padding: "1rem 1.5rem",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <CheckCircle2 size={20} color="#34c759" />
              <span style={{ fontWeight: 500, fontSize: "0.95rem" }}>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
