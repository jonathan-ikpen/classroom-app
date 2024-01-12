import React, {Suspense} from "react";
import "../globals.css";
import Loading from "@/app/loading";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
      <Suspense fallback={<Loading/>}>
          <main className="w-full max-h-screen mt-24 flex flex-col fjustify-center fitems-center">
              {children}
          </main>
      </Suspense>
  );
}
