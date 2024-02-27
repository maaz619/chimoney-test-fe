import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoggedInStateProvider } from "@/utils/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoggedInStateProvider>
          {children}
        </LoggedInStateProvider>
      </body>
    </html>
  );
}
