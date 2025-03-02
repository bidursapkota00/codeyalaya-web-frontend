"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Social from "@/app/(auth)/social";
import Input from "@/app/(auth)/input";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName) {
      setError("Full name is required");
      return;
    }
    if (!email || !validateEmail(email)) {
      setError("Valid email is required");
      return;
    }
    if (!password || !validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol"
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Registration failed");

      router.push("/login");
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
        <Input type="text" value={fullName} setValue={setFullName}>
          Full Name
        </Input>
        <Input type="email" value={email} setValue={setEmail}>
          Email
        </Input>
        <Input type="password" value={password} setValue={setPassword}>
          Password
        </Input>
        <Input
          type="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
        >
          Confirm Password
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <Social setError={setError} setLoading={setLoading} />
    </>
  );
}
