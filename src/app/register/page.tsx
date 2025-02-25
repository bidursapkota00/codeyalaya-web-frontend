"use client";

import { useState, FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError("Valid email is required");
      return;
    }
    if (!username) {
      setError("Username is required");
      return;
    }
    if (!password || !validatePassword(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-purple-100 dark:bg-gray-800 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-purple-700 dark:text-white text-center">
          Register
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
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Register
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
          <button className="p-2 bg-white dark:bg-gray-700 shadow-md rounded-full">
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
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
