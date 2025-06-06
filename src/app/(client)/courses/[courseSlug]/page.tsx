"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  User,
  ArrowLeft,
  Play,
  Download,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Video,
} from "lucide-react";
import { Lesson, mockChapters, mockCourse, mockLessons } from "@/lib/data";

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

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const getStatusColor = (status: string) => {
  return status === "processed"
    ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
    : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
};

export default function CourseDetailsPage() {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(["1"])
  );
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.status === "processed") {
      setCurrentLesson(lesson);
    }
  };

  const getChapterLessons = (chapterId: string) => {
    return mockLessons
      .filter((lesson) => lesson.chapterId === chapterId)
      .sort((a, b) => a.order - b.order);
  };

  const getTotalLessons = () => {
    return mockLessons.length;
  };

  const getProcessedLessons = () => {
    return mockLessons.filter((lesson) => lesson.status === "processed").length;
  };

  if (currentLesson) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setCurrentLesson(null)}
                className="hover:bg-accent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <div className="aspect-video bg-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-white mb-4 mx-auto" />
                    <p className="text-white text-lg">Video Player</p>
                    <p className="text-white/60 text-sm">
                      {currentLesson.filename}
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">
                      {currentLesson.title}
                    </h1>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(currentLesson.status)}
                    >
                      {currentLesson.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {currentLesson.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    Duration: {formatDuration(currentLesson.duration)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Content</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-96 overflow-y-auto">
                    {mockChapters.map((chapter) => {
                      const chapterLessons = getChapterLessons(chapter.id!);
                      const isExpanded = expandedChapters.has(chapter.id!);

                      return (
                        <div
                          key={chapter.id}
                          className="border-b border-border last:border-b-0"
                        >
                          <button
                            onClick={() => toggleChapter(chapter.id!)}
                            className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-2" />
                              <span className="font-medium text-sm">
                                {chapter.title}
                              </span>
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="pb-2">
                              {chapterLessons.map((lesson) => (
                                <button
                                  key={lesson.id}
                                  onClick={() => handleLessonClick(lesson)}
                                  className={`w-full px-8 py-2 text-left text-sm hover:bg-accent transition-colors flex items-center justify-between ${
                                    currentLesson?.id === lesson.id
                                      ? "bg-accent"
                                      : ""
                                  } ${
                                    lesson.status === "processing"
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                  disabled={lesson.status === "processing"}
                                >
                                  <div className="flex items-center">
                                    <Video className="w-3 h-3 mr-2" />
                                    <span className="truncate">
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground ml-2">
                                    {formatDuration(lesson.duration)}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <Badge
                variant="secondary"
                className={getLevelColor(mockCourse.level)}
              >
                {mockCourse.level.toUpperCase()}
              </Badge>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                <span>{mockCourse.hours} hours</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>{mockChapters.length} chapters</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Video className="w-4 h-4 mr-2" />
                <span>{getTotalLessons()} lessons</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">{mockCourse.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">
              {mockCourse.description}
            </p>

            <div className="flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Created by {mockCourse.createdBy}</span>
              </div>
              <div>
                <span>Updated {formatDate(mockCourse.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Course Thumbnail */}
          <div className="lg:col-span-1">
            {mockCourse.thumbnailUrl && (
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={mockCourse.thumbnailUrl}
                  alt={mockCourse.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {getProcessedLessons()} of {getTotalLessons()} lessons
                    completed
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(
                      (getProcessedLessons() / getTotalLessons()) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (getProcessedLessons() / getTotalLessons()) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Chapters */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Course Content</h2>
              {mockChapters.map((chapter) => {
                const chapterLessons = getChapterLessons(chapter.id!);
                const isExpanded = expandedChapters.has(chapter.id!);

                return (
                  <Card key={chapter.id}>
                    <CardHeader
                      className="cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => toggleChapter(chapter.id!)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="text-sm font-medium text-muted-foreground mr-4">
                              Chapter {chapter.order}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {chapterLessons.length} lessons
                            </span>
                          </div>
                          <CardTitle className="text-lg">
                            {chapter.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {chapter.description}
                          </CardDescription>
                        </div>
                        <div className="ml-4">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="pt-0">
                        {chapter.starterCodeUrl && (
                          <div className="flex gap-2 mb-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Starter Code
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Final Code
                            </Button>
                          </div>
                        )}

                        <div className="space-y-2">
                          {chapterLessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className={`flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors ${
                                lesson.status === "processed"
                                  ? "cursor-pointer"
                                  : "opacity-50"
                              }`}
                              onClick={() => handleLessonClick(lesson)}
                            >
                              <div className="flex items-center">
                                <div className="flex items-center mr-4">
                                  {lesson.status === "processed" ? (
                                    <Play className="w-4 h-4 text-primary" />
                                  ) : (
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium">
                                    {lesson.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {lesson.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant="secondary"
                                  className={getStatusColor(lesson.status)}
                                >
                                  {lesson.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {formatDuration(lesson.duration)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Course Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>

                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resources
                </Button>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-3">Course Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Duration:
                      </span>
                      <span>{mockCourse.hours} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Chapters:</span>
                      <span>{mockChapters.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lessons:</span>
                      <span>{getTotalLessons()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <Badge
                        variant="secondary"
                        className={getLevelColor(mockCourse.level)}
                      >
                        {mockCourse.level}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
