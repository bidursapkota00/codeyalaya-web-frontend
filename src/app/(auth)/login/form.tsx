"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { z } from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { auth } from "@/firebase";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import Social from "@/app/(auth)/social";

const schema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    try {
      // Firebase Authentication
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await user.getIdToken();

      // Backend Authentication
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

      if (!response.ok) {
        // Logout from Firebase if backend login fails
        await auth.signOut();
        throw new Error(
          (await response.json()).detail || "Login failed on server."
        );
      }

      router.push("/");
    } catch (error) {
      // Handle errors and display messages
      setError("root", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        {errors.root?.message && (
          <Alert variant="destructive">{errors.root.message}</Alert>
        )}

        <div className="flex justify-between">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={20} />
            ) : null}
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <Button
            variant="link"
            type="button"
            onClick={() => router.push("/forget-password")}
          >
            Forgot Password?
          </Button>
        </div>

        <Social setError={setError} />
      </form>
    </Form>
  );
}
