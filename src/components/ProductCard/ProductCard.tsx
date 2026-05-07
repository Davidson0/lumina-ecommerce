"use client";

import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { useSettings } from "../../context/SettingsContext";
import styles from "./ProductCard.module.css";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const { formatPrice } = useSettings();

  return (
    <div className={styles.card}>
      <Link href={`/product/${product.id}`} className={styles.linkWrapper}>
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.name} className={styles.image} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.description}>{product.description}</p>
        </div>
      </Link>
      <div className={styles.footer}>
        <span className={styles.price}>{formatPrice(product.price)}</span>
        <button 
          className={styles.addBtn}
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
          >
            <Plus size={20} strokeWidth={2} />
          </button>
      </div>
    </div>
  );
}
