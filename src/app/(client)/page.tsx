import Image from "next/image";
import SocialLogin from "../(auth)/socialLogin";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-primary">
        <div className="text-xl font-bold text-primary-foreground">
          Codeyalaya
        </div>
        <div className="flex gap-5">
          <Link href="/courses">
            <Button variant="outline">Courses</Button>
          </Link>
          <SocialLogin />
        </div>
      </nav>
      {/* Hero Section */}
      <section>
        <Image
          width={581}
          height={303}
          src="/flowchart-dark.svg"
          alt="Hero Image"
          className="my-8 h-[60vh] mx-auto"
        />
        <Link
          href="/courses"
          className="inline-block ml-[50%] -translate-x-[50%]"
        >
          <Button>
            See all Courses <FaExternalLinkAlt />
          </Button>
        </Link>
      </section>
    </div>
  );
}
