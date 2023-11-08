import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/lib/firebase";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

const GoogleAuth = () => {
  const router = useRouter();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [userAuth] = useAuthState(auth);

  if (userAuth) {
    console.log("loggedin");
  } else {
    //  if (currentUser?.data?.member?.id === userAuth?.uid) {
    //    router.push("/app");
    //  }
    console.log("Not logged in");
  }

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
      toast.success("signed in successfully");
      router.push("/auth/new");

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
      >
        <FcGoogle />
        Google
      </Button>
    </div>
  );
};

export default GoogleAuth;
