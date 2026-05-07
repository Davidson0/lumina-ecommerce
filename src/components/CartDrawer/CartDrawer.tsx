"use client";

import { useCart } from "../../context/CartContext";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./CartDrawer.module.css";
import { useRouter } from "next/navigation";
import { useSettings } from "../../context/SettingsContext";
import Image from "next/image";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { t, formatPrice } = useSettings();
  const router = useRouter();

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div 
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <h2>{t("bag")}</h2>
              <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.content}>
              {items.length === 0 ? (
                <div className={styles.empty}>
                  <ShoppingBag size={48} strokeWidth={1} className="text-muted" />
                  <p>{t("emptyBag")}</p>
                </div>
              ) : (
                <ul className={styles.list}>
                  {items.map((item) => (
                    <li key={item.id} className={styles.item}>
                      <div className={styles.imageWrapper}>
                        <img src={item.image} alt={item.name} className={styles.image} />
                      </div>
                      <div className={styles.details}>
                        <div className={styles.topRow}>
                          <span className={styles.name}>{item.name}</span>
                          <span className={styles.price}>{formatPrice(item.price)}</span>
                        </div>
                        <div className={styles.actions}>
                          <div className={styles.quantityCtrl}>
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus size={14} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            className={styles.removeBtn}
                            onClick={() => removeFromCart(item.id)}
                          >
                            {t("remove")}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.total}>
                  <span>{t("total")}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: "100%" }}
                  onClick={handleCheckout}
                >
                  {t("checkout")}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
