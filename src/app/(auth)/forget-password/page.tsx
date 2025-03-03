"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
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
import { Card } from "@/components/ui/card";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const schema = z.object({
  email: z.string().email("Valid email is required"),
});

type FormData = z.infer<typeof schema>;

export default function Forget() {
  const router = useRouter();
  const [isSent, setIsSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit: SubmitHandler<FormData> = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setIsSent(true);
      setTimer(60);
    } catch (error) {
      setError("email", { message: "Failed to send reset email" });
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-center text-xl font-semibold">Forgot Password?</h2>
        {isSent && (
          <Alert variant="success">
            Password reset email sent!{" "}
            {timer > 0 && `Wait ${timer}s before retrying.`}
          </Alert>
        )}
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
                      disabled={isSubmitting || timer > 0}
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button type="submit" disabled={isSubmitting || timer > 0}>
                {isSubmitting ? (
                  <>
                    <AiOutlineLoading3Quarters
                      className="animate-spin"
                      size={20}
                    />{" "}
                    Sending...
                  </>
                ) : timer > 0 ? (
                  `Wait ${timer}s`
                ) : (
                  "Send Reset Email"
                )}
              </Button>
              <Button
                variant="link"
                type="button"
                onClick={() => router.push("/login")}
              >
                Go to Login
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
