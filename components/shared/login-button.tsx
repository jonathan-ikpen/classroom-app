import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function LoginButton() {
  return (
    <Link href={"/auth"}>
      <Button className="bg-prim hover:bg-[#222]">Log In</Button>
    </Link>
  );
}

export default LoginButton;
