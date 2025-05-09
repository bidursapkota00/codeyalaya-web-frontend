import { z } from "zod";

const generateThumbnailUploadUrlRequestSchema = z.object({
  fileExtension: z.string(),
});
export type generateThumbnailUploadUrlRequest = z.infer<
  typeof generateThumbnailUploadUrlRequestSchema
>;

const generateThumbnailUploadUrlResponseSchema = z.object({
  url: z.string(),
  fileName: z.string(),
});
export type generateThumbnailUploadUrlResponse = z.infer<
  typeof generateThumbnailUploadUrlResponseSchema
>;

export type generateCodeFileUploadUrlRequest =
  generateThumbnailUploadUrlRequest;

export type generateCodeFileUploadUrlResponse =
  generateThumbnailUploadUrlResponse;
