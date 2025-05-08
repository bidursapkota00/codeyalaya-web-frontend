export interface Course {
  id?: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  hours: number;
  level: "easy" | "medium" | "hard";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
