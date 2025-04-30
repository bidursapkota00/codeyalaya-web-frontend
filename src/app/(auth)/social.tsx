import React from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { UseFormSetError } from "react-hook-form";
import { FormData } from "./register/form";

import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase";
import { Separator } from "@/components/ui/separator";

type SocialProps = {
  setError: UseFormSetError<FormData>;
};

export default function Social({ setError }: SocialProps) {
  const router = useRouter();

  const handleSocialLogin = async (
    provider: GoogleAuthProvider | GithubAuthProvider
  ) => {
    setError("root", { message: "" });
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      if (!response.ok) {
        // Logout from Firebase if backend login fails
        await auth.signOut();
        throw new Error(
          (await response.json()).detail || "Login failed on server."
        );
      }
      router.push("/");
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Separator className="shrink " />
        <p>OR</p>
        <Separator className="shrink " />
      </div>
      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin(new GoogleAuthProvider())}
        >
          <FcGoogle size={24} className="mr-2" />
          Continue with Google
        </Button>
      </div>
    </>
  );
}
