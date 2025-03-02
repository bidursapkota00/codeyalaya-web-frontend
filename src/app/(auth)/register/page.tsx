import { Metadata } from "next";
import Already from "@/app/(auth)/already";
import Form from "@/app/(auth)/register/form";
import AuthLayout from "@/app/(auth)/authlayout";

export const metadata: Metadata = {
  title: "Register Page",
};

export default function RegisterPage() {
  return (
    <AuthLayout title="Register">
      <Form />
      <Already url="/login" />
    </AuthLayout>
  );
}
