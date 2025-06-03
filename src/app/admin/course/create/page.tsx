"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
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
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { CourseFormValues, courseSchema } from "@/lib/schemas";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  generateThumbnailUploadUrlRequest,
  generateThumbnailUploadUrlResponse,
} from "@/lib/functions-schemas";

export default function CreateCourse() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      hours: 0,
      level: "medium",
    },
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const onSubmit = async (values: CourseFormValues) => {
    try {
      setIsLoading(true);
      let thumbnailUrl = values.thumbnailUrl;
      let thumbnailUploadData = null;

      if (thumbnailFile) {
        const generateUploadUrl = httpsCallable<
          generateThumbnailUploadUrlRequest,
          generateThumbnailUploadUrlResponse
        >(functions, "generateThumbnailUploadUrl");

        const fileExtension = thumbnailFile.name.split(".").pop()!;

        const { data } = await generateUploadUrl({ fileExtension });

        const response = await fetch(data.url, {
          method: "PUT",
          body: thumbnailFile,
          headers: {
            "Content-Type": thumbnailFile.type,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to upload thumbnail");
        }
        thumbnailUploadData = data;
        thumbnailUrl = data.fileName;
      }

      const createCourse = httpsCallable(functions, "createCourse");
      await createCourse({
        ...values,
        thumbnailUrl,
      });

      if (thumbnailFile && thumbnailUploadData) {
        const response = await fetch(thumbnailUploadData.url, {
          method: "PUT",
          body: thumbnailFile,
          headers: {
            "Content-Type": thumbnailFile.type,
          },
        });

        if (!response.ok) {
          console.warn("Thumbnail upload failed, but course was created");
          toast({
            variant: "warning",
            title: "Course created, but thumbnail upload failed",
            description:
              "You can edit the course to try uploading a thumbnail again.",
          });
        }
      }

      toast({
        variant: "success",
        title: "Course created successfully!",
      });
      router.push("/admin/course");
    } catch (error) {
      console.error("Error creating course:", error);
      toast({
        variant: "destructive",
        title: "Failed to create course",
        description: error instanceof Error ? error.message : "Unknown Error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="my-6 w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Course</CardTitle>
        <CardDescription>
          Fill in the details to create a new learning course
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
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course title" {...field} />
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
                      placeholder="Enter course description"
                      className="resize-none min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Duration (seconds)</FormLabel>
                    <FormControl>
                      <Input type="number" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel>Course Thumbnail</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
              </FormControl>
              <FormDescription>
                Upload a thumbnail image for your course
              </FormDescription>
            </FormItem>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Course"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
