"use client";

import styles from "./Footer.module.css";
import { Globe, Mail } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

export default function Footer() {
  const { t } = useSettings();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3>Lumina.</h3>
          <p className={styles.tagline}>Hear the Unheard.</p>
        </div>
        
        <div className={styles.credit}>
          <p>{t("engineeredBy")} <span className={styles.name}>Ramazan Çelik</span></p>
          <div className={styles.socials}>
            <a href="https://github.com/Davidson0" target="_blank" rel="noopener noreferrer" aria-label="Website">
              <Globe size={20} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Contact">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Lumina Audio. All rights reserved.</p>
      </div>
    </footer>
  );
}
