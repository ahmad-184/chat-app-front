import { z } from "zod";

export const loginValidation = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "invalid email address" }),
  password: z
    .string()
    .min(1, { message: "password is required." })
    .min(8, { message: "password must be at least 6 character." }),
});

export const registerValidation = z.object({
  firstname: z
    .string()
    .min(1, { message: "Firstname is required" })
    .max(50, { message: "wtf man?" }),
  lastname: z
    .string()
    .min(1, { message: "Lastname is required" })
    .max(50, { message: "wtf man?" }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "invalid email address" }),
  password: z
    .string()
    .min(1, { message: "password is required." })
    .min(6, { message: "password must be at least 6 character" }),
});

export const forgotPasswordValidation = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "invalid email address" }),
});

export const resetPasswordValidation = z
  .object({
    password: z
      .string()
      .min(1, { message: "password is required." })
      .min(6, { message: "password must be at least 6 character" }),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const createNewGroupValidator = z.object({
  group_name: z
    .string()
    .min(1, { message: "group name is required" })
    .max(50, { message: "wtf man?" }),
  members: z
    .string()
    .array()
    .min(2, { message: "At least 2 members required" }),
});

export const profileValidation = z.object({
  name: z.string().min(1, "name is required.").max(50, { message: "wtf man?" }),
  about: z.string().max(100, { message: "is too high" }),
  avatarUrl: z.string().optional(),
});
