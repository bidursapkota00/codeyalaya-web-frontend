import React from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { UseFormSetError } from "react-hook-form";

import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase";

type SocialProps = {
  setError: UseFormSetError<any>;
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
      if (!response.ok)
        throw new Error((await response.json()).detail || "Login failed");
      router.push("/");
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <div className="flex justify-center gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSocialLogin(new GoogleAuthProvider())}
      >
        <FcGoogle size={24} className="mr-2" /> Google
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSocialLogin(new GithubAuthProvider())}
      >
        <FaGithub size={24} className="mr-2" /> GitHub
      </Button>
    </div>
  );
}
