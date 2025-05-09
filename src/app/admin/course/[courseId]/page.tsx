"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Clock, Play, BookOpen, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  order: number;
  chapterId: string;
  courseId: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  courseId: string;
  videos: Video[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  category: string;
  level: string;
  price: number;
  discountPrice?: number;
  totalDuration: number;
  totalVideos: number;
  createdAt: any;
  updatedAt: any;
  chapters: Chapter[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const getCourseWithContent = httpsCallable(
          functions,
          "getCourseWithContent"
        );
        const result = await getCourseWithContent({ courseId });
        setCourse(result.data as Course);

        // Set the first video as active if available
        if (
          (result.data as Course).chapters?.length > 0 &&
          (result.data as Course).chapters[0].videos?.length > 0
        ) {
          setActiveVideo((result.data as Course).chapters[0].videos[0]);
        }

        // Mock progress - in a real app, this would come from user data
        setProgress(Math.floor(Math.random() * 100));
      } catch (err) {
        setError("Failed to load course. Please try again later.");
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (loading) {
    return <CourseDetailSkeleton />;
  }

  if (error || !course) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-3xl">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Error</h2>
              <p className="text-muted-foreground mt-2">
                {error || "Course not found"}
              </p>
              <Button className="mt-4">Go Back</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalVideos = course.chapters.reduce(
    (total, chapter) => total + chapter.videos.length,
    0
  );

  return (
    <div className="container py-8">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground mb-4">{course.description}</p>

          <div className="flex flex-wrap gap-4 mb-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {course.level}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatDuration(course.totalDuration)}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Play className="h-4 w-4" />
              {totalVideos} lessons
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Updated{" "}
              {new Date(course.updatedAt.seconds * 1000).toLocaleDateString()}
            </Badge>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              {/* {course.instructor.charAt(0)} */}
            </div>
            <div>
              <p className="font-medium">{course.instructor}</p>
              <p className="text-sm text-muted-foreground">Instructor</p>
            </div>
          </div>
        </div>

        <Card className="md:w-1/3">
          <CardContent className="pt-6">
            <div className="mb-4">
              <h3 className="font-bold text-2xl mb-1">
                {course.discountPrice ? (
                  <>
                    ${course.discountPrice}{" "}
                    <span className="text-muted-foreground line-through text-sm">
                      ${course.price}
                    </span>
                  </>
                ) : (
                  `$${course.price}`
                )}
              </h3>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Your progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Button className="w-full">Continue Learning</Button>
          </CardContent>
        </Card>
      </div>

      {/* Course Content */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="info">Additional Information</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium mb-4">Course Modules</h3>
              <Accordion type="single" collapsible className="w-full">
                {course.chapters.map((chapter) => (
                  <AccordionItem key={chapter.id} value={chapter.id}>
                    <AccordionTrigger className="text-left">
                      <div>
                        <div>{chapter.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {chapter.videos.length} videos
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {chapter.videos.map((video) => (
                        <div
                          key={video.id}
                          className={`p-2 my-1 rounded-md cursor-pointer hover:bg-accent flex justify-between items-center ${
                            activeVideo?.id === video.id ? "bg-accent" : ""
                          }`}
                          onClick={() => setActiveVideo(video)}
                        >
                          <div className="flex items-center gap-2">
                            <Play className="h-4 w-4" />
                            <span className="text-sm">{video.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatDuration(video.duration)}
                          </span>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="md:col-span-2">
              {activeVideo ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-12 w-12 mx-auto" />
                      <p className="mt-2">Video Player: {activeVideo.title}</p>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold">{activeVideo.title}</h2>
                  <p className="text-muted-foreground">
                    {activeVideo.description}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                  <p className="text-muted-foreground">
                    Select a video to play
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="info">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    About This Course
                  </h3>
                  <p className="text-muted-foreground">{course.description}</p>

                  <h4 className="font-medium mt-6 mb-2">What you'll learn</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {course.chapters.map((chapter) => (
                      <li key={chapter.id}>{chapter.title}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Course Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Category</span>
                      <span>{course.category}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Level</span>
                      <span>{course.level}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">
                        Total Duration
                      </span>
                      <span>{formatDuration(course.totalDuration)}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">
                        Total Lessons
                      </span>
                      <span>{totalVideos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Last Updated
                      </span>
                      <span>
                        {new Date(
                          course.updatedAt.seconds * 1000
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Loading skeleton
function CourseDetailSkeleton() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/3">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-24 w-full mb-4" />

          <div className="flex flex-wrap gap-4 mb-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20 mt-1" />
            </div>
          </div>
        </div>

        <Card className="md:w-1/3">
          <CardContent className="pt-6">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-2 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Skeleton className="h-10 w-64" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Skeleton className="h-8 w-40 mb-4" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-4">
              <Skeleton className="h-12 w-full mb-2" />
              <div className="pl-4">
                <Skeleton className="h-8 w-full mb-1" />
                <Skeleton className="h-8 w-full mb-1" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2">
          <Skeleton className="aspect-video w-full rounded-lg mb-4" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full mt-1" />
        </div>
      </div>
    </div>
  );
}
