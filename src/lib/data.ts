export interface Course {
  id?: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl?: string;
  hours: number;
  level: "easy" | "medium" | "hard";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data for demonstration
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    slug: "react-basics",
    description:
      "Learn the basics of React including components, props, state, and hooks. Perfect for beginners starting their React journey.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    hours: 12,
    level: "easy",
    createdBy: "John Doe",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "2",
    title: "TypeScript",
    slug: "typescript-basics",
    description:
      "Master advanced TypeScript concepts including generics, utility types, decorators, and advanced patterns for building robust applications.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    hours: 18,
    level: "hard",
    createdBy: "Jane Smith",
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-02-10T16:45:00Z",
  },
  {
    id: "3",
    title: "Node.js Basics",
    slug: "nodejs-basics",
    description:
      "Build scalable backend applications with Node.js, Express, and MongoDB. Learn authentication, API design, and deployment.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    hours: 24,
    level: "medium",
    createdBy: "Mike Johnson",
    createdAt: "2024-01-28T11:30:00Z",
    updatedAt: "2024-02-05T13:20:00Z",
  },
  {
    id: "4",
    title: "CSS Fundamentals",
    slug: "css-basics",
    description:
      "Master modern CSS layout techniques with Grid and Flexbox. Create responsive designs with confidence.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    hours: 8,
    level: "easy",
    createdBy: "Sarah Wilson",
    createdAt: "2024-02-12T08:00:00Z",
    updatedAt: "2024-02-15T10:30:00Z",
  },
  {
    id: "5",
    title: "GraphQL with Apollo",
    slug: "graphql-basics",
    description:
      "Learn GraphQL fundamentals and build full-stack applications using Apollo Client and Server with React.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    hours: 16,
    level: "medium",
    createdBy: "David Brown",
    createdAt: "2024-02-08T14:45:00Z",
    updatedAt: "2024-02-18T12:15:00Z",
  },
  {
    id: "6",
    title: "Docker & Kubernetes",
    slug: "docker-kubernetes-basics",
    description:
      "Containerize applications with Docker and orchestrate them with Kubernetes. Learn deployment strategies and best practices.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=250&fit=crop",
    hours: 22,
    level: "hard",
    createdBy: "Alex Chen",
    createdAt: "2024-01-22T16:20:00Z",
    updatedAt: "2024-02-01T09:40:00Z",
  },
];

export const mockCourse = mockCourses[2];
export const mockChapters: Chapter[] = [
  {
    id: "1",
    courseId: "1",
    title: "Introduction to Node.js",
    description:
      "Understanding Node.js fundamentals, runtime environment, and setting up your development workspace.",
    order: 1,
    starterCodeUrl: "https://github.com/example/nodejs-starter-ch1",
    finalCodeUrl: "https://github.com/example/nodejs-final-ch1",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-16T12:00:00Z",
  },
  {
    id: "2",
    courseId: "1",
    title: "Core Modules and File System",
    description:
      "Explore Node.js core modules, file system operations, and working with paths and streams.",
    order: 2,
    starterCodeUrl: "https://github.com/example/nodejs-starter-ch2",
    finalCodeUrl: "https://github.com/example/nodejs-final-ch2",
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-17T12:00:00Z",
  },
  {
    id: "3",
    courseId: "1",
    title: "HTTP Server and Routing",
    description:
      "Building HTTP servers, handling requests and responses, and implementing basic routing.",
    order: 3,
    starterCodeUrl: "https://github.com/example/nodejs-starter-ch3",
    finalCodeUrl: "https://github.com/example/nodejs-final-ch3",
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-18T12:00:00Z",
  },
  {
    id: "4",
    courseId: "1",
    title: "Express.js Framework",
    description:
      "Introduction to Express.js, middleware, routing, and building RESTful APIs.",
    order: 4,
    starterCodeUrl: "https://github.com/example/nodejs-starter-ch4",
    finalCodeUrl: "https://github.com/example/nodejs-final-ch4",
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-19T12:00:00Z",
  },
  {
    id: "5",
    courseId: "1",
    title: "Database Integration",
    description:
      "Working with databases, MongoDB with Mongoose, and implementing CRUD operations.",
    order: 5,
    starterCodeUrl: "https://github.com/example/nodejs-starter-ch5",
    finalCodeUrl: "https://github.com/example/nodejs-final-ch5",
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-20T12:00:00Z",
  },
  {
    id: "6",
    courseId: "1",
    title: "Authentication and Security",
    description:
      "Implementing user authentication, JWT tokens, password hashing, and security best practices.",
    order: 6,
    starterCodeUrl: "https://github.com/example/nodejs-starter-ch6",
    finalCodeUrl: "https://github.com/example/nodejs-final-ch6",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-21T12:00:00Z",
  },
];

export const mockLessons: Lesson[] = [
  // Chapter 1 lessons
  {
    id: "1",
    chapterId: "1",
    courseId: "1",
    title: "What is Node.js?",
    description: "Understanding Node.js runtime and its use cases",
    filename: "what-is-nodejs.mp4",
    duration: 420,
    order: 1,
    status: "processed",
    url: "https://example.com/lessons/what-is-nodejs.mp4",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
  },
  {
    id: "2",
    chapterId: "1",
    courseId: "1",
    title: "Installing Node.js and npm",
    description:
      "Setting up Node.js development environment and package manager",
    filename: "nodejs-installation.mp4",
    duration: 600,
    order: 2,
    status: "processed",
    url: "https://example.com/lessons/nodejs-installation.mp4",
    createdAt: "2024-01-15T11:00:00Z",
    updatedAt: "2024-01-15T12:00:00Z",
  },
  {
    id: "3",
    chapterId: "1",
    courseId: "1",
    title: "Your First Node.js Application",
    description: "Creating and running your first Node.js script",
    filename: "first-nodejs-app.mp4",
    duration: 480,
    order: 3,
    status: "processed",
    url: "https://example.com/lessons/first-nodejs-app.mp4",
    createdAt: "2024-01-15T12:00:00Z",
    updatedAt: "2024-01-15T13:00:00Z",
  },
  {
    id: "4",
    chapterId: "1",
    courseId: "1",
    title: "Understanding the Event Loop",
    description: "How Node.js handles asynchronous operations",
    filename: "event-loop.mp4",
    duration: 540,
    order: 4,
    status: "processed",
    url: "https://example.com/lessons/event-loop.mp4",
    createdAt: "2024-01-15T13:00:00Z",
    updatedAt: "2024-01-15T14:00:00Z",
  },

  // Chapter 2 lessons
  {
    id: "5",
    chapterId: "2",
    courseId: "1",
    title: "Working with File System",
    description: "Reading and writing files using fs module",
    filename: "file-system.mp4",
    duration: 720,
    order: 1,
    status: "processed",
    url: "https://example.com/lessons/file-system.mp4",
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T11:00:00Z",
  },
  {
    id: "6",
    chapterId: "2",
    courseId: "1",
    title: "Path and URL Modules",
    description: "Working with file paths and URL manipulation",
    filename: "path-url-modules.mp4",
    duration: 360,
    order: 2,
    status: "processed",
    url: "https://example.com/lessons/path-url-modules.mp4",
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-16T12:00:00Z",
  },
  {
    id: "7",
    chapterId: "2",
    courseId: "1",
    title: "Streams and Buffers",
    description: "Understanding data streams and buffer operations",
    filename: "streams-buffers.mp4",
    duration: 660,
    order: 3,
    status: "processing",
    createdAt: "2024-01-16T12:00:00Z",
    updatedAt: "2024-01-16T13:00:00Z",
  },

  // Chapter 3 lessons
  {
    id: "8",
    chapterId: "3",
    courseId: "1",
    title: "Creating HTTP Server",
    description: "Building your first HTTP server with Node.js",
    filename: "http-server.mp4",
    duration: 600,
    order: 1,
    status: "processed",
    url: "https://example.com/lessons/http-server.mp4",
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T11:00:00Z",
  },
  {
    id: "9",
    chapterId: "3",
    courseId: "1",
    title: "Handling HTTP Requests",
    description: "Processing GET, POST, and other HTTP methods",
    filename: "http-requests.mp4",
    duration: 720,
    order: 2,
    status: "processed",
    url: "https://example.com/lessons/http-requests.mp4",
    createdAt: "2024-01-17T11:00:00Z",
    updatedAt: "2024-01-17T12:00:00Z",
  },
  {
    id: "10",
    chapterId: "3",
    courseId: "1",
    title: "URL Routing Basics",
    description: "Implementing basic routing without frameworks",
    filename: "url-routing.mp4",
    duration: 540,
    order: 3,
    status: "processed",
    url: "https://example.com/lessons/url-routing.mp4",
    createdAt: "2024-01-17T12:00:00Z",
    updatedAt: "2024-01-17T13:00:00Z",
  },

  // Chapter 4 lessons
  {
    id: "11",
    chapterId: "4",
    courseId: "1",
    title: "Introduction to Express.js",
    description: "Setting up Express.js and understanding its benefits",
    filename: "express-intro.mp4",
    duration: 480,
    order: 1,
    status: "processed",
    url: "https://example.com/lessons/express-intro.mp4",
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T11:00:00Z",
  },
  {
    id: "12",
    chapterId: "4",
    courseId: "1",
    title: "Express Middleware",
    description: "Understanding and creating custom middleware functions",
    filename: "express-middleware.mp4",
    duration: 660,
    order: 2,
    status: "processed",
    url: "https://example.com/lessons/express-middleware.mp4",
    createdAt: "2024-01-18T11:00:00Z",
    updatedAt: "2024-01-18T12:00:00Z",
  },
  {
    id: "13",
    chapterId: "4",
    courseId: "1",
    title: "Building RESTful APIs",
    description: "Creating REST endpoints with Express.js",
    filename: "restful-apis.mp4",
    duration: 780,
    order: 3,
    status: "processed",
    url: "https://example.com/lessons/restful-apis.mp4",
    createdAt: "2024-01-18T12:00:00Z",
    updatedAt: "2024-01-18T13:00:00Z",
  },

  // Chapter 5 lessons
  {
    id: "14",
    chapterId: "5",
    courseId: "1",
    title: "Introduction to MongoDB",
    description: "Understanding NoSQL databases and MongoDB basics",
    filename: "mongodb-intro.mp4",
    duration: 540,
    order: 1,
    status: "processed",
    url: "https://example.com/lessons/mongodb-intro.mp4",
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T11:00:00Z",
  },
  {
    id: "15",
    chapterId: "5",
    courseId: "1",
    title: "Mongoose ODM",
    description: "Using Mongoose for MongoDB object modeling",
    filename: "mongoose-odm.mp4",
    duration: 720,
    order: 2,
    status: "processed",
    url: "https://example.com/lessons/mongoose-odm.mp4",
    createdAt: "2024-01-19T11:00:00Z",
    updatedAt: "2024-01-19T12:00:00Z",
  },
  {
    id: "16",
    chapterId: "5",
    courseId: "1",
    title: "CRUD Operations",
    description: "Implementing Create, Read, Update, Delete operations",
    filename: "crud-operations.mp4",
    duration: 840,
    order: 3,
    status: "processing",
    createdAt: "2024-01-19T12:00:00Z",
    updatedAt: "2024-01-19T13:00:00Z",
  },

  // Chapter 6 lessons
  {
    id: "17",
    chapterId: "6",
    courseId: "1",
    title: "User Authentication Basics",
    description: "Understanding authentication concepts and implementation",
    filename: "auth-basics.mp4",
    duration: 600,
    order: 1,
    status: "processed",
    url: "https://example.com/lessons/auth-basics.mp4",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T11:00:00Z",
  },
  {
    id: "18",
    chapterId: "6",
    courseId: "1",
    title: "JWT Token Implementation",
    description: "Working with JSON Web Tokens for authentication",
    filename: "jwt-tokens.mp4",
    duration: 720,
    order: 2,
    status: "processed",
    url: "https://example.com/lessons/jwt-tokens.mp4",
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-01-20T12:00:00Z",
  },
  {
    id: "19",
    chapterId: "6",
    courseId: "1",
    title: "Password Hashing and Security",
    description: "Implementing secure password storage and validation",
    filename: "password-security.mp4",
    duration: 540,
    order: 3,
    status: "processed",
    url: "https://example.com/lessons/password-security.mp4",
    createdAt: "2024-01-20T12:00:00Z",
    updatedAt: "2024-01-20T13:00:00Z",
  },
  {
    id: "20",
    chapterId: "6",
    courseId: "1",
    title: "API Security Best Practices",
    description: "Implementing security measures for Node.js applications",
    filename: "api-security.mp4",
    duration: 660,
    order: 4,
    status: "processing",
    createdAt: "2024-01-20T13:00:00Z",
    updatedAt: "2024-01-20T14:00:00Z",
  },
];
export interface Chapter {
  id?: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  starterCodeUrl?: string;
  finalCodeUrl?: string;
  createdAt: string;
  updatedAt: string;
}
export interface Lesson {
  id?: string;
  chapterId: string;
  courseId: string;
  title: string;
  description: string;
  filename: string;
  duration: number; // in seconds
  order: number;
  status: "processing" | "processed";
  url?: string;
  createdAt: string;
  updatedAt: string;
}
