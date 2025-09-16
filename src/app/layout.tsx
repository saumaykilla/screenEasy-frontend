import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "screenEasy - Land Your Dream Job",
  description: "Generate professional resumes, cover letters, and ace interviews with skill prep guides and mock interviews. Get hired faster with screenEasy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.variable} antialiased`}
      >
         <AuthProvider>
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
