"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Social from "@/app/(auth)/social";
import Input from "@/app/(auth)/input";
import Button from "@/app/(auth)/button";
import CustomError from "@/app/(auth)/error";

export default function Form() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError("Valid email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken(); // Get Firebase ID token

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`, // Send token to backend
          },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Login failed");

      console.log("User authenticated:", data);
      // Store user info in context/state/localStorage
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.log(error.message);
      } else {
        setError("An unknown error occurred");
        console.log("Unknown error: ", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-2">
        <Input type="email" value={email} setValue={setEmail}>
          Email
        </Input>
        <Input type="password" value={password} setValue={setPassword}>
          Password
        </Input>
        <CustomError error={error} />
        <Button loading={loading} text="Login" loadingText="Logging in" />
      </form>
      <Social setError={setError} setLoading={setLoading} />
    </>
  );
}
