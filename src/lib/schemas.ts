import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  thumbnailUrl: z.string().optional(),
  hours: z.coerce
    .number()
    .min(1, { message: "Course must have some duration" }),
  level: z.enum(["easy", "medium", "hard"], {
    required_error: "Please select a difficulty level",
  }),
});

export const chapterSchema = z.object({
  courseId: z.string().min(1, { message: "Course ID is required" }),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  order: z.coerce
    .number()
    .int()
    .min(1, { message: "Order must be at least 1" }),
  starterCodeUrl: z.string().optional().or(z.literal("")),
  finalCodeUrl: z.string().optional().or(z.literal("")),
});

export const lessonSchema = z.object({
  chapterId: z.string().min(1, { message: "Chapter ID is required" }),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  filename: z.string().min(1, { message: "Filename is required" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 second" }),
  order: z.coerce
    .number()
    .int()
    .min(1, { message: "Order must be at least 1" }),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
export type ChapterFormValues = z.infer<typeof chapterSchema>;
export type LessonFormValues = z.infer<typeof lessonSchema>;
