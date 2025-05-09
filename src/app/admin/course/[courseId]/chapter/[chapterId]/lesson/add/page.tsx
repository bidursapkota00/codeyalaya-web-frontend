"use client";

import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { HomeIcon, BookIcon, ChevronRightIcon, VideoIcon } from "lucide-react";
import CreateLessonForm from "@/components/createLessonForm";

export default function CreateLessonPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const chapterId = params.chapterId as string;

  return <CreateLessonForm courseId={courseId} chapterId={chapterId} />;
}
