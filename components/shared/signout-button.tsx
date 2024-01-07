"use client";
import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/utils/contextfile";
import toast from "react-hot-toast";

const SignOutButton = () => {
  const { isAuthenticated, user, login, logout } = useAuth();

  const handleSignOut = async () => {
    logout();
    if (!isAuthenticated) {
      toast.success("You are signed out");
    }
  };
  return (
    <Button onClick={handleSignOut} className="bg-prim">
      Log Out
    </Button>
  );
};

export default SignOutButton;
