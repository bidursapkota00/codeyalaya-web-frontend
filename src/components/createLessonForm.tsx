"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const lessonFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  filename: z.string().min(1, "Filename is required"),
  duration: z.coerce.number().min(1, "Duration is required"),
  order: z.coerce.number().min(0, "Order is required"),
  chapterId: z.string().min(1, "Chapter ID is required"),
});

type LessonFormValues = z.infer<typeof lessonFormSchema>;

interface CreateLessonFormProps {
  chapterId: string;
  courseId: string;
}

export default function CreateLessonForm({
  chapterId,
  courseId,
}: CreateLessonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize the form
  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      title: "",
      description: "",
      filename: "",
      duration: 0,
      order: 0,
      chapterId: chapterId,
    },
  });

  async function onSubmit(values: LessonFormValues) {
    try {
      setIsSubmitting(true);

      // Add courseId to the data
      const lessonData = {
        ...values,
        courseId,
      };

      // Call the Firebase function
      const createLessonFunction = httpsCallable(functions, "createLesson");
      const result = await createLessonFunction(lessonData);
      const response = result.data as { success: boolean; lessonId: string };

      if (response.success) {
        // toast.success("Lesson created successfully!");
        router.push(`/courses/${courseId}/chapters/${chapterId}`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
      //   toast.error(error.message || "Failed to create lesson");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="my-6 w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Lesson</CardTitle>
        <CardDescription>
          Add a new video lesson to your chapter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduction to the topic" {...field} />
                  </FormControl>
                  <FormDescription>The title of your lesson.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what students will learn in this lesson"
                      className="resize-none min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A detailed description of the lesson content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="filename"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filename</FormLabel>
                    <FormControl>
                      <Input placeholder="lesson_video.mp4" {...field} />
                    </FormControl>
                    <FormDescription>
                      The filename of the video.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (seconds)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="300" {...field} />
                    </FormControl>
                    <FormDescription>
                      Duration of the video in seconds.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Position of this lesson in the chapter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <input type="hidden" {...form.register("chapterId")} />

            <CardFooter className="flex justify-end px-0 pb-0">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Lesson
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
