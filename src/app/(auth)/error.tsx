"use client";

type CustomErrorProps = {
  error: string;
};

export default function CustomError({ error }: CustomErrorProps) {
  if (!error) return null;
  return <p className="text-red-500 text-sm mt-2 break-words">{error}</p>;
}
