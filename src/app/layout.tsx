import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { SettingsProvider } from "../context/SettingsContext";
import { ToastProvider } from "../context/ToastContext";
import Navbar from "../components/Navbar/Navbar";
import CartDrawer from "../components/CartDrawer/CartDrawer";
import Footer from "../components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lumina | Premium Audio",
  description: "Experience sound like never before with Lumina high-end audio.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>
          <ToastProvider>
            <CartProvider>
              <Navbar />
              <CartDrawer />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </ToastProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
