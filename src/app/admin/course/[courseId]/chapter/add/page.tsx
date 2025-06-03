"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ChapterFormValues, chapterSchema } from "@/lib/schemas";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import {
  generateCodeFileUploadUrlRequest,
  generateCodeFileUploadUrlResponse,
} from "@/lib/functions-schemas";

// interface ChapterFormProps {
//   courseId: string;
// }

export default function ChapterForm() {
  const params = useParams();
  const courseId = params.courseId as string;
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [starterCodeFile, setStarterCodeFile] = useState<File | null>(null);
  const [finalCodeFile, setFinalCodeFile] = useState<File | null>(null);

  const form = useForm<ChapterFormValues>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      courseId,
      title: "",
      description: "",
      order: 1,
      starterCodeUrl: "",
      finalCodeUrl: "",
    },
  });

  const handleStarterCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStarterCodeFile(file);
    }
  };

  const handleFinalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFinalCodeFile(file);
    }
  };

  const onSubmit = async (values: ChapterFormValues) => {
    try {
      setIsLoading(true);

      if (starterCodeFile) {
        const generateUploadUrl = httpsCallable<
          generateCodeFileUploadUrlRequest,
          generateCodeFileUploadUrlResponse
        >(functions, "generateCodeFileUploadUrl");
        const fileExtension = starterCodeFile.name.split(".").pop()!;

        const { data } = await generateUploadUrl({ fileExtension });

        const response = await fetch(data.url, {
          method: "PUT",
          body: starterCodeFile,
          headers: {
            "Content-Type": "application/zip",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to upload starter code");
        }

        values.starterCodeUrl = data.fileName;
      }

      if (finalCodeFile) {
        const generateUploadUrl = httpsCallable<
          generateCodeFileUploadUrlRequest,
          generateCodeFileUploadUrlResponse
        >(functions, "generateCodeFileUploadUrl");

        const fileExtension = finalCodeFile.name.split(".").pop()!;

        const { data } = await generateUploadUrl({ fileExtension });

        const response = await fetch(data.url, {
          method: "PUT",
          body: finalCodeFile,
          headers: {
            "Content-Type": "application/zip",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to upload final code");
        }

        values.finalCodeUrl = data.fileName;
      }

      const createChapter = httpsCallable(functions, "createChapter");
      await createChapter(values);

      toast({
        variant: "success",
        title: "Chapter created successfully!",
      });
      router.push(`/admin/course/${courseId}`);
    } catch (error) {
      console.error("Error creating chapter:", error);
      toast({
        variant: "destructive",
        title: "Failed to create chapter",
        description: error instanceof Error ? error.message : "Unknown Error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="my-6 w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Chapter</CardTitle>
        <CardDescription>Add a new chapter to your course</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter chapter title" {...field} />
                  </FormControl>
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
                      placeholder="Enter chapter description"
                      className="resize-none min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Order</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    The position of this chapter in the course (1, 2, 3, etc.)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Starter Code (ZIP file)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".zip"
                  onChange={handleStarterCodeChange}
                />
              </FormControl>
              <FormDescription>
                Upload starter code files for this chapter (optional)
              </FormDescription>
            </FormItem>

            <FormItem>
              <FormLabel>Final Code (ZIP file)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".zip"
                  onChange={handleFinalCodeChange}
                />
              </FormControl>
              <FormDescription>
                Upload final code files for this chapter (optional)
              </FormDescription>
            </FormItem>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Chapter"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
