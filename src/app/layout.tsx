import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import Header from "@/componentes/header";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Sorteio Medfácil',
    default: 'Sorteio Medfácil'
  },
  description: "Concorra a uma TV 43 e a um Air Fryer!",
  keywords: ['Sorteio Medfácil', 'sorteio tv43', 'sorteio air fry', 'medfacil sorteio', 'sorteio de graça medfacil', 'medfacil sorteios']
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
