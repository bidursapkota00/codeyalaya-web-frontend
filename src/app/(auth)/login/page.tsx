import { Metadata } from "next";
import Already from "@/app/(auth)/already";
import Form from "@/app/(auth)/login/form";
import AuthLayout from "@/app/(auth)/authlayout";

export const metadata: Metadata = {
  title: "Login Page",
};

export default function LoginPage() {
  return (
    <AuthLayout title="Login">
      <Form />
      <Already url="/register" />
    </AuthLayout>
  );
}
