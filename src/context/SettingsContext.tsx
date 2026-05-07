"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "TR";
type Currency = "USD" | "TRY";

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: keyof typeof translations["EN"]) => string;
  formatPrice: (usdPrice: number) => string;
}

const EXCHANGE_RATE = 45; // 1 USD = 45 TRY

const translations = {
  EN: {
    heroTitle: "Hear the Unheard.",
    heroSubtitle: "Lumina Pro redefines premium audio with spatial sound and active noise cancellation.",
    buyNow: "Buy Now",
    learnMore: "Learn More",
    latestInnovations: "Latest Innovations.",
    discoverText: "Discover the new generation of Lumina audio.",
    all: "All",
    headphones: "Headphones",
    earbuds: "Earbuds",
    speakers: "Speakers",
    wearables: "Wearables",
    bag: "Bag",
    emptyBag: "Your bag is empty.",
    remove: "Remove",
    total: "Total",
    checkout: "Checkout",
    processing: "Processing your order...",
    doNotClose: "Please do not close this window.",
    paymentSuccess: "Payment Successful!",
    thankYou: "Thank you for your purchase.",
    orderNumber: "Order Number:",
    returnStore: "Return to Store",
    backToStore: "Back to Store",
    keyFeatures: "Key Features",
    addToBag: "Add to Bag",
    addedToBag: "added to bag",
    engineeredBy: "Designed & Engineered by",
  },
  TR: {
    heroTitle: "Duyulmayanı Duy.",
    heroSubtitle: "Lumina Pro, uzamsal ses ve aktif gürültü engelleme ile premium sesi yeniden tanımlıyor.",
    buyNow: "Hemen Al",
    learnMore: "Daha Fazla",
    latestInnovations: "En Yeni Teknolojiler.",
    discoverText: "Lumina ses sistemlerinin yeni neslini keşfedin.",
    all: "Hepsi",
    headphones: "Kulaküstü",
    earbuds: "Kulakiçi",
    speakers: "Hoparlör",
    wearables: "Saat",
    bag: "Sepet",
    emptyBag: "Sepetiniz boş.",
    remove: "Kaldır",
    total: "Toplam",
    checkout: "Ödeme Yap",
    processing: "Siparişiniz işleniyor...",
    doNotClose: "Lütfen bu pencereyi kapatmayın.",
    paymentSuccess: "Ödeme Başarılı!",
    thankYou: "Bizi tercih ettiğiniz için teşekkürler.",
    orderNumber: "Sipariş Numarası:",
    returnStore: "Mağazaya Dön",
    backToStore: "Mağazaya Dön",
    keyFeatures: "Öne Çıkan Özellikler",
    addToBag: "Sepete Ekle",
    addedToBag: "sepete eklendi",
    engineeredBy: "Tasarım & Mimari:",
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const savedLang = localStorage.getItem("lumina_lang") as Language;
    const savedCurr = localStorage.getItem("lumina_curr") as Currency;
    if (savedLang) setLanguage(savedLang);
    if (savedCurr) setCurrency(savedCurr);
  }, []);

  useEffect(() => {
    localStorage.setItem("lumina_lang", language);
    localStorage.setItem("lumina_curr", currency);
  }, [language, currency]);

  const t = (key: keyof typeof translations["EN"]) => {
    return translations[language][key] || key;
  };

  const formatPrice = (usdPrice: number) => {
    if (currency === "TRY") {
      const tryPrice = usdPrice * EXCHANGE_RATE;
      return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(tryPrice);
    }
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(usdPrice);
  };

  return (
    <SettingsContext.Provider value={{ language, setLanguage, currency, setCurrency, t, formatPrice }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
