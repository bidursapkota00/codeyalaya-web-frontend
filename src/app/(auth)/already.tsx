import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Already({ url }: { url: string }) {
  return (
    <p className="text-center text-muted-foreground">
      {url === "/register"
        ? "Don't have an account? "
        : "Already have an account? "}
      <Link href={url} passHref>
        <Button variant="link" className="p-0 text-purple-600">
          {url === "/register" ? "Register here" : "Login here"}
        </Button>
      </Link>
    </p>
  );
}
