import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { mockCourses } from "@/lib/data";
import Link from "next/link";

const getLevelColor = (level: string) => {
  switch (level) {
    case "easy":
      return "bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 border-green-500/20";
    case "medium":
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20 border-yellow-500/20";
    case "hard":
      return "bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 border-red-500/20";
    default:
      return "bg-muted text-muted-foreground hover:bg-muted/80";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive collection of programming courses
            designed to help you level up your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`}>
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 group">
                {course.thumbnailUrl && (
                  <div className="w-full h-48 bg-muted overflow-hidden rounded-t-lg">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className={getLevelColor(course.level)}
                    >
                      {course.level.toUpperCase()}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.hours}h
                    </div>
                  </div>

                  <CardTitle className="text-xl font-semibold line-clamp-2">
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="mb-4 line-clamp-3">
                    {course.description}
                  </CardDescription>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-1" />
                      {course.createdBy}
                    </div>
                    <span className="text-sm text-muted-foreground/60">
                      {formatDate(course.createdAt)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
