import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
  });

  export const signUpSchema = z.object({
    firstName: z.string().trim().min(1,'First name cannot be empty'),
    lastName: z.string().trim().min(1,'Last name cannot be empty'),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
  });


  export const testSchema = z.object({
    fileUrl: z.string().url({ message: "File URL must be a valid link" }),
    questionNumber: z.string(),
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  });