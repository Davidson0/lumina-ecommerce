"use client";

import { Product } from "../../../types";
import { useCart } from "../../../context/CartContext";
import { useSettings } from "../../../context/SettingsContext";
import styles from "./ProductDetail.module.css";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { t, formatPrice } = useSettings();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        <ArrowLeft size={20} />
        {t("backToStore")}
      </Link>
      
      <div className={styles.productGrid}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <img src={product.image} alt={product.name} className={styles.image} />
          </div>
        </div>
        
        <div className={styles.infoSection}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          
          <p className={styles.description}>{product.description}</p>
          
          <div className={styles.features}>
            <h3>{t("keyFeatures")}</h3>
            <ul>
              {product.features.map((feature, idx) => (
                <li key={idx}>
                  <Check size={16} className={styles.checkIcon} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <button 
            className="btn-primary" 
            style={{ width: "100%", marginTop: "2rem", padding: "1rem" }}
            onClick={() => addToCart(product)}
          >
            {t("addToBag")}
          </button>
        </div>
      </div>
    </div>
  );
}
