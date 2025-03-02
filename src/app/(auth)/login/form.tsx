"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Social from "@/app/(auth)/social";
import Input from "@/app/(auth)/input";

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

      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`, // Send token to backend
        },
      });

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
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" size={20} />
          ) : null}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <Social setError={setError} setLoading={setLoading} />
    </>
  );
}
