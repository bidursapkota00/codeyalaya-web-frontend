"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, BookOpen, AlertCircle } from "lucide-react";
import { Course } from "@/lib/types";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import Link from "next/link";

const difficultyColorMap = {
  easy: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  hard: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
};

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const getCourses = httpsCallable(functions, "getCourses");
        const result = await getCourses();
        setCourses(result.data as Course[]);
        setError(null);
      } catch (err) {
        setError("Failed to load courses");
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 my-8 rounded-lg bg-red-50 dark:bg-red-900/20">
        <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>

      {loading ? (
        <div className="flex flex-col gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-64 md:h-auto relative bg-gray-200 dark:bg-gray-800">
                  <Skeleton className="h-48 md:h-full w-full md:absolute md:inset-0" />
                </div>
                <div className="flex-1">
                  <CardHeader>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-6 w-24 mr-2" />
                    <Skeleton className="h-6 w-24" />
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No courses available yet.</p>
            </div>
          ) : (
            courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-64 md:h-auto relative">
                    {course.thumbnailUrl ? (
                      <img
                        src={`https://storage.googleapis.com/${process.env.NEXT_PUBLIC_THUMBNAIL_BUCKET}/${course.thumbnailUrl}`}
                        alt={course.title}
                        className="w-full h-48 md:h-full md:absolute md:inset-0 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 md:h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Link href={`/admin/course/${course.id}`}>
                          <CardTitle className="text-xl">
                            {course.title}
                          </CardTitle>
                        </Link>
                        <Badge className={difficultyColorMap[course.level]}>
                          {course.level.charAt(0).toUpperCase() +
                            course.level.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-3">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{(course.hours / 3600).toFixed(1)} hours</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>By Bidur Sapkota</span>
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
