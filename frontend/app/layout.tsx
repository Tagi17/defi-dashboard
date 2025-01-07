import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';

import { DepositProvider, useDeposit } from "./ethLogic/depositContext"
import { Geist, Geist_Mono, Newsreader, Vazirmatn } from "next/font/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import type { Metadata } from "next";
import { Providers } from './providers';

const vazirmatn = Vazirmatn({
  weight: '400', 
  style: 'normal',
  subsets: ['latin'],
})
const newsreader = Newsreader({
  weight: '400', 
  style: 'normal',
  subsets: ['latin'],
})

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const queryClient = new QueryClient()

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={newsreader.className} >
      <body
      >
            <Providers >
              {children}
            </Providers>
      </body>
    </html>
  );
}
