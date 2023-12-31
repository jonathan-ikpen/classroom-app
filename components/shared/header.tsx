"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import SignOutButton from "./signout-button";
import { useAuth } from "@/utils/contextfile";
import LoginButton from "./login-button";

const Header = () => {
  const { isAuthenticated, user, login, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 border-b dark:border-zinc-800">
      <Link href="/" className="flex items-center gap-2">
        <svg
          className=" w-8 h-8 text-prim"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
        <span className="text-lg font-semibold">PTI ClassRoom</span>
      </Link>
      <nav className="hidden lg:flex gap-6">
        <Link className="font-medium" href="#">
          Dashboard
        </Link>
        <Link className="font-medium" href="#">
          Classrooms
        </Link>
        <Link className="font-medium" href="#">
          Assignments
        </Link>
        <Link className="font-medium" href="#">
          Notes
        </Link>
        <Link className="font-medium" href="#">
          Videos
        </Link>
      </nav>
      {isAuthenticated ? <SignOutButton /> : <LoginButton />}
    </header>
  );
};

export default Header;
