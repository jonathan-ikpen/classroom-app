import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const GoogleAuth = () => {
  const router = useRouter();

  const handleAuth = async () => {
    try {
      toast.success("signed in successfully");
      router.push("/auth/new");

    } catch (error) {
      console.log(error);
      toast.error("error: " + error);
    }
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleAuth}
        variant={"secondary"}
        className="w-full flex items-center gap-x-3"
        size={"lg"}
        disabled={false}
      >
        <FcGoogle />
        Google
      </Button>
    </div>
  );
};

export default GoogleAuth;
