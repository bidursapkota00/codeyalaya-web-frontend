import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import Form from "@/app/(auth)/login/form";
import { Already } from "@/app/(auth)/already";

export const metadata: Metadata = {
  title: "Login Page",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-center text-xl font-semibold">Login</h2>
        <Form />
        <Already url="/register" />
      </Card>
    </div>
  );
}
