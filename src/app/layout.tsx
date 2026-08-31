import type { Metadata } from "next";
import { Sora, Montserrat } from "next/font/google";
import { Analytics } from "./components/Analytics";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "publeTV — Mídia Indoor Premium",
  description:
    "Ecossistema completo de mídia indoor: instalação das telas, curadoria de conteúdo e comunicação que transforma valor em atração para o cliente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
