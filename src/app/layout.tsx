import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minha Loja Digital",
  description: "Produtos digitais com entrega rápida e segura."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
