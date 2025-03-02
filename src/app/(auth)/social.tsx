import React from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";

type SocialProps = {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Social({ setError, setLoading }: SocialProps) {
  const router = useRouter();

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
  return (
    <>
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
    </>
  );
}
