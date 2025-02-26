"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(); // Get Firebase ID Token

      const response = await fetch("http://localhost:8000/auth/social-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`, // Send token to backend
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Login failed");

      console.log("User authenticated:", data);
      // localStorage.setItem("token", idToken);
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
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-purple-100 dark:bg-gray-800 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-purple-700 dark:text-white text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-purple-800 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-purple-800 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <div className="px-4 text-gray-600 dark:text-gray-300">
            or continue with
          </div>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleGoogleLogin}
            className="p-2 bg-white dark:bg-gray-700 shadow-md rounded-full"
          >
            <FcGoogle size={24} />
          </button>
          <button className="p-2 bg-gray-900 text-white dark:bg-gray-600 shadow-md rounded-full">
            <FaGithub size={24} />
          </button>
          <button className="p-2 bg-blue-600 text-white shadow-md rounded-full">
            <FaFacebook size={24} />
          </button>
        </div>
        <p className="mt-6 text-center text-gray-700 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-purple-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
