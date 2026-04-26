import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "PromoHub",
  description: "Creator promotion marketplace for web and mobile."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <footer className="container-shell py-8 text-center text-xs text-ink/50">
          <a href="https://unavatar.io" target="_blank" rel="noreferrer">
            Avatars provided by Unavatar
          </a>
        </footer>
      </body>
    </html>
  );
}
