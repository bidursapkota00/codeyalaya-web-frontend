import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import HeroImage from "@/components/client/HeroImage";

export default function Navbar() {
  return (
    <div>
      {/* Hero Section */}
      <section>
        <HeroImage />
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
