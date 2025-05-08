"use client";

import { useEffect, useState } from "react";
import { checkIsOwner } from "@/lib/firebase";
import { Loader2, ShieldX } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../context/auth";

export function OwnerGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwnerStatus = async () => {
      if (!loading) {
        if (user) {
          const ownerStatus = await checkIsOwner();
          setIsOwner(ownerStatus);
        }
        setIsChecking(false);
      }
    };

    checkOwnerStatus();
  }, [user, loading]);

  if (loading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-background">
        <ShieldX className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive">Not Logged In</h1>
        <p className="text-xl mt-2 text-foreground">
          You need to log in to access this page
        </p>
        <Link
          href="/"
          className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-background">
        <ShieldX className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive">403 Forbidden</h1>
        <p className="text-xl mt-2 text-foreground">
          You don't have permission to access this page
        </p>
        <p className="mt-4 text-muted-foreground">
          This area is restricted to owners only
        </p>
        <Link
          href="/"
          className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
