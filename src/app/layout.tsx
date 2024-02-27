import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoggedInStateProvider } from "@/utils/authContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

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
          <ToastContainer />
          {children}
        </LoggedInStateProvider>
      </body>
    </html>
  );
}
