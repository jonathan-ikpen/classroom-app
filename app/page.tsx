import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/shared/signout-button";

/** Add your relevant code here for the issue to reproduce */
export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex items-end gap-2 mb-7">
        <h1 className="text-xl">ClassRoom App</h1>
      </div>
    </div>
  );
}
