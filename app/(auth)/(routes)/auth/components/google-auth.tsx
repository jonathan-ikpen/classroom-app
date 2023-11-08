import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/lib/firebase";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";

const GoogleAuth = () => {
  const router = useRouter();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [userAuth] = useAuthState(auth);

  const handleAuth = async () => {
    try {
      await signInWithGoogle();

      const userData = {
        userId: userAuth?.uid ?? "",
        name: userAuth?.displayName ?? "",
        email: userAuth?.email ?? "",
        photoUrl: userAuth?.photoURL ?? "",
      };

      console.log(userData);

      // addMember(userData, {
      //   onSuccess: () => {
      //     router.push("/onboarding");
      //   },
      //   onError: (error) => {
      //     console.log(error);
      //   },
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleAuth}
        variant={"secondary"}
        className="w-full flex items-center gap-x-3"
        size={"lg"}
      >
        <FcGoogle />
        Google
      </Button>
    </div>
  );
};

export default GoogleAuth;
