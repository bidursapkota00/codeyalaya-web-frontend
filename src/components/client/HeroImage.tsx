"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function HeroImage() {
  const { theme } = useTheme();

  return (
    <Image
      width={581}
      height={303}
      src={theme == "dark" ? "/flowchart-dark.svg" : "/flowchart-light.svg"}
      alt="Hero Image"
      className="my-8 h-[60vh] mx-auto"
      priority
    />
  );
}
