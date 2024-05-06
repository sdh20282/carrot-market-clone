import { z } from "zod";

export const productEditSchema = z.object({
  photo: z.string({
    required_error: "Photo is required!",
    invalid_type_error: "Photo is required!",
  }),
  title: z.string({
    required_error: "Title is required!",
  }),
  description: z.string({
    required_error: "Description is required!",
  }),
  price: z.coerce.number({
    required_error: "Price is required!",
  }),
});

// export type ProductEditType = z.infer<typeof productEditSchema>;