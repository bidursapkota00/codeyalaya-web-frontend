"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { z } from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { auth } from "@/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import Social from "@/app/(auth)/social";
import { Separator } from "@/components/ui/separator";

const schema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function Form() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await user.getIdToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      if (!response.ok)
        throw new Error((await response.json()).detail || "Login failed");
      router.push("/");
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input type="email" placeholder="Email" {...register("email")} />
      {errors.email?.message && (
        <Alert variant="destructive">{errors.email.message}</Alert>
      )}

      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password?.message && (
        <Alert variant="destructive">{errors.password.message}</Alert>
      )}

      {errors.root?.message && (
        <Alert variant="destructive">{errors.root.message}</Alert>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <AiOutlineLoading3Quarters className="animate-spin" size={20} />
        ) : null}
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <Separator />

      <Social setError={setError} />
    </form>
  );
}
