import { ReactNode } from "react";
import { Metadata } from "next";

type LayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Auth Page",
};

export default function Layout({ children }: LayoutProps) {
  return children;
}
