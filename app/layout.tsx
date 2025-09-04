import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import { Toaster } from "sonner";
import { Dialog } from "@radix-ui/react-dialog";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noor AI – Your Smart Chat Assistant",
  description:
    "Chat smarter with Noor AI – a powerful, responsive chat UI built with Next.js and Tailwind CSS. Features real-time responses, voice output, and seamless user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Dialog>
            <ClientLayout>{children}</ClientLayout>
          </Dialog>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
