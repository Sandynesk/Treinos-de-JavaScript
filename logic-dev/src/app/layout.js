import { Archivo, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin"],
});

export const metadata = {
  title: "Logic.dev — Plataforma de Exercícios",
  description: "Domine a Lógica de Programação com exercícios práticos em JavaScript",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-zinc-950 text-zinc-300 min-h-screen flex flex-col selection:bg-zinc-700 selection:text-white relative overflow-x-hidden" style={{ fontFamily: "var(--font-body)" }}>
        {children}
      </body>
    </html>
  );
}
