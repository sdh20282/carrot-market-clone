import { z } from "zod";

export const postSchema = z.object({
  comment: z.string({
    required_error: "comment is required!",
  }),
  postId: z.coerce.number({
    required_error: "postId is required!",
  }),
});