import React, {Suspense} from "react";
import "../globals.css";
import { PopoverComp } from "@/app/lecturer/components/popup-button";
import Loading from "@/app/loading";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
      <Suspense fallback={<Loading/>}>
          <>
              {children}
              <PopoverComp/>
          </>
      </Suspense>
  );
}
