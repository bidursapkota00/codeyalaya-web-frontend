import React, { ReactNode } from "react";

type InputProps = {
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  children: ReactNode;
};

export default function Input({ type, value, setValue, children }: InputProps) {
  return (
    <div className="mt-4">
      <label className="block text-purple-800 dark:text-gray-300">
        {children}
      </label>
      <input
        type={type}
        className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
