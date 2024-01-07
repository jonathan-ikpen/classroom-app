import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/shared/header";
import { AuthProvider } from "@/utils/contextfile";
import Loading from "@/app/loading";
import { getCurrentUser } from "@/app/server/action";
import OnboardingPage from "./(auth)/(routes)/auth/new/components/oboarding-page"
import {Suspense} from "react";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
      <Suspense fallback={<Loading/>}>
          <AuthProvider>
            <Header />
            <Toaster />
            {children}
          </AuthProvider>
      </Suspense>
      </body>
    </html>
  );
}
