"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/firebase";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <div className="text-xl font-bold">Codeyalaya</div>
      <div>
        {user ? (
          <button
            onClick={handleSignOut}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Sign Out
          </button>
        ) : (
          <Link href="/login">
            <button className="bg-blue-500 px-4 py-2 rounded">Sign In</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
