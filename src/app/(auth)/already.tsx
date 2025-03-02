import React from "react";
import Link from "next/link";

type AlreadyProps = {
  url: string;
};

export default function Already({ url }: AlreadyProps) {
  return (
    <p className="mt-6 text-center text-gray-700 dark:text-gray-300">
      {url == "/register"
        ? "Don't have an account? "
        : "Already have an account? "}
      <Link href={url} className="text-purple-600 hover:underline">
        {url == "/register" ? "Register here" : "Login here"}
      </Link>
    </p>
  );
}
