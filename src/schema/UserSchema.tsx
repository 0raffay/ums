import { z } from "zod";

export const UserSchema = z.object({
  firstName: z.string().min(1, {
    message: "This field is required",
  }),
  lastName: z.string().min(1, {
    message: "This field is required.",
  }),
  age: z.string().min(1, {
    message: "This field is required.",
  }),
  hobbies: z.string().min(1, {
    message: "This field is required.",
  }),
});
