"use client";

import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard/ProductCard";
import { useSettings } from "../context/SettingsContext";
import styles from "./page.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { t } = useSettings();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Headphones", "Earbuds", "Speakers", "Wearables"];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">{t("heroTitle")}</h1>
          <p className={`${styles.subtitle} text-muted`}>
            {t("heroSubtitle")}
          </p>
          <div className={styles.actions}>
            <button className="btn-primary">{t("buyNow")}</button>
            <button className="btn-secondary">{t("learnMore")}</button>
          </div>
        </motion.div>
      </section>

      <section id="products" className={styles.productsSection}>
        <div className={styles.productsHeader}>
          <h2 className="section-title">{t("latestInnovations")}</h2>
          <p className="text-muted">{t("discoverText")}</p>
        </div>

        <div className={styles.filterBar}>
          {categories.map((cat) => {
            const translationKey = cat.toLowerCase() as keyof typeof import("../context/SettingsContext")["translations"]["EN"];
            // Quick hack for 'All' since it's lowercase 'all' in translations
            return (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {t(cat.toLowerCase() as any) || cat}
              </button>
            );
          })}
        </div>

        <motion.div layout className={styles.grid}>
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
