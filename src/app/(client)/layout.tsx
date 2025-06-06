import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SocialLogin from "../(auth)/socialLogin";
import { ModeToggle } from "@/components/mode-toggle";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-primary">
        <div className="text-xl font-bold text-primary-foreground">
          Codeyalaya
        </div>
        <div className="flex gap-5">
          <ModeToggle />
          <Link href="/courses">
            <Button variant="outline">Courses</Button>
          </Link>
          <SocialLogin />
        </div>
      </nav>
      {children}
    </>
  );
}
