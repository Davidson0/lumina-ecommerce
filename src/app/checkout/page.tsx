"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useSettings } from "../../context/SettingsContext";
import { CheckCircle2, Loader2 } from "lucide-react";
import styles from "./Checkout.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [status, setStatus] = useState<"processing" | "success">("processing");
  const { clearCart } = useCart();
  const { t } = useSettings();
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate a random order number
    setOrderNumber(`LUM-${Math.floor(100000 + Math.random() * 900000)}`);
    
    // Simulate payment processing
    const timer = setTimeout(() => {
      setStatus("success");
      clearCart();
    }, 2500);

    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <div className={styles.container}>
      {status === "processing" ? (
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 size={64} className={`${styles.spinner} ${styles.icon}`} />
          <h1 className={styles.title}>{t("processing")}</h1>
          <p className="text-muted">{t("doNotClose")}</p>
        </motion.div>
      ) : (
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
          >
            <CheckCircle2 size={80} className={`${styles.successIcon} ${styles.icon}`} />
          </motion.div>
          <h1 className={styles.title}>{t("paymentSuccess")}</h1>
          <p className="text-muted">{t("thankYou")}</p>
          <div className={styles.orderBox}>
            <span>{t("orderNumber")}</span>
            <span className={styles.orderNum}>{orderNumber}</span>
          </div>
          <Link href="/" className={`btn-primary ${styles.homeBtn}`}>
            {t("returnStore")}
          </Link>
        </motion.div>
      )}
    </div>
  );
}
