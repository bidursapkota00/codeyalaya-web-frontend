import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-purple-100 dark:bg-gray-800 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-purple-700 dark:text-white text-center">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
