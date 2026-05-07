"use client";

import { useCart } from "../../context/CartContext";
import { useSettings } from "../../context/SettingsContext";
import { ShoppingBag, Globe } from "lucide-react";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { language, setLanguage, currency, setCurrency, t } = useSettings();

  return (
    <nav className={`glass ${styles.navbar}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Lumina.
        </Link>
        <div className={styles.links}>
          <Link href="#products" className={styles.link}>{t("all")}</Link>
          <Link href="#products" className={styles.link}>{t("headphones")}</Link>
          <Link href="#products" className={styles.link}>{t("audio") || "Audio"}</Link>
        </div>
        <div className={styles.actions}>
          
          <div className={styles.toggles}>
            <button 
              className={styles.toggleBtn}
              onClick={() => setLanguage(language === "EN" ? "TR" : "EN")}
            >
              <Globe size={16} /> {language}
            </button>
            <button 
              className={styles.toggleBtn}
              onClick={() => setCurrency(currency === "USD" ? "TRY" : "USD")}
            >
              {currency === "USD" ? "$" : "₺"}
            </button>
          </div>

          <div className={styles.userProfile}>
            <span className={styles.greeting}>Hi, Ramazan</span>
            <div className={styles.avatar}>R</div>
          </div>
          <button 
            className={styles.cartBtn} 
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
