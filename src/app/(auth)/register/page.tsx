import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import Form from "@/app/(auth)/register/form";
import { Already } from "@/app/(auth)/already";

export const metadata: Metadata = {
  title: "Register Page",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6 space-y-4 mt-8 mb-8">
        <h2 className="text-center text-xl font-semibold">Register</h2>
        <Form />
        <Already url="/login" />
      </Card>
    </div>
  );
}
