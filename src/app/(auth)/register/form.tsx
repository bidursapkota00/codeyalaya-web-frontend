"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import Social from "@/app/(auth)/social";
import { Separator } from "@/components/ui/separator";

const schema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Valid email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include an uppercase letter, a lowercase letter, a number, and a symbol"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async ({
    fullName,
    email,
    password,
  }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: fullName,
            email,
            password,
          }),
        }
      );
      if (!response.ok)
        throw new Error(
          (await response.json()).detail || "Registration failed"
        );
      router.push("/login");
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input type="text" placeholder="Full Name" {...register("fullName")} />
      {errors.fullName?.message && (
        <Alert variant="destructive">{errors.fullName.message}</Alert>
      )}

      <Input type="email" placeholder="Email" {...register("email")} />
      {errors.email?.message && (
        <Alert variant="destructive">{errors.email.message}</Alert>
      )}

      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password?.message && (
        <Alert variant="destructive">{errors.password.message}</Alert>
      )}

      <Input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword?.message && (
        <Alert variant="destructive">{errors.confirmPassword.message}</Alert>
      )}

      {errors.root?.message && (
        <Alert variant="destructive">{errors.root.message}</Alert>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <AiOutlineLoading3Quarters className="animate-spin" size={20} />
        ) : null}
        {isSubmitting ? "Registering..." : "Register"}
      </Button>

      <Separator />

      <Social setError={setError} />
    </form>
  );
}
