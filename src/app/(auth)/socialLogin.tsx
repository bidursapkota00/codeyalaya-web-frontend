"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../context/auth";

export default function Social() {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      toast({
        variant: "success",
        title: "Logged out successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed!",
        description: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  };

  const handleSocialLogin = async (provider: GoogleAuthProvider) => {
    try {
      await signInWithPopup(auth, provider);
      toast({
        variant: "success",
        title: "Logged in successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed!",
        description: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  };

  return (
    <div>
      {user ? (
        <Button type="button" variant="outline" onClick={handleLogOut}>
          Log Out
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin(new GoogleAuthProvider())}
        >
          <FcGoogle size={24} className="mr-1" />
          Login
        </Button>
      )}
    </div>
  );
}
