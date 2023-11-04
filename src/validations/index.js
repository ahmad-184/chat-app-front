import { z } from "zod";

export const loginValidation = (translate) =>
  z.object({
    email: z
      .string()
      .min(1, { message: translate("Email is required") })
      .email({ message: translate("Invalid email address") }),
    password: z
      .string()
      .min(1, { message: translate("Password is required") })
      .min(6, { message: translate("Password must be at least 6 character") }),
  });

export const registerValidation = (translate) =>
  z
    .object({
      firstname: z
        .string()
        .min(1, { message: translate("First name is required") })
        .max(50, { message: translate("Wtf man?") }),
      lastname: z
        .string()
        .min(1, { message: translate("Last name is required") })
        .max(50, { message: translate("Wtf man?") }),
      email: z
        .string()
        .min(1, { message: translate("Email is required") })
        .email({ message: translate("Invalid email address") }),
      password: z
        .string()
        .min(1, { message: translate("Password is required") })
        .min(6, {
          message: translate("Password must be at least 6 character"),
        }),
      confirmPassword: z
        .string()
        .min(1, { message: translate("Confirm password is required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translate("Passwords don't match"),
      path: ["confirmPassword"],
    });

export const forgotPasswordValidation = (translate) =>
  z.object({
    email: z
      .string()
      .min(1, { message: translate("Email is required") })
      .email({ message: translate("Invalid email address") }),
  });

export const resetPasswordValidation = (translate) =>
  z
    .object({
      password: z
        .string()
        .min(1, { message: translate("Password is required") })
        .min(6, {
          message: translate("Password must be at least 6 character"),
        }),
      confirmPassword: z
        .string()
        .min(1, { message: translate("Confirm password is required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translate("Passwords don't match"),
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

export const verifyCodeValidation = z.object({
  code1: z.string().length(1),
  code2: z.string().length(1),
  code3: z.string().length(1),
  code4: z.string().length(1),
  code5: z.string().length(1),
  code6: z.string().length(1),
});
