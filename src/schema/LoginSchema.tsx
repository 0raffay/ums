import { z } from "zod";

export const LoginSchema = z.object({
  password: z.string().min(8, {
    message: "Username must be at least 8 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid Email Address"
  }),
});