import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "At least 6 characters"),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Use at least 8 characters"),
});

export const verifySchema = z.object({
  code: z
    .string()
    .min(1, "Verification code is required")
    .length(6, "Enter the 6-digit code"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Enter a valid email" }),
});
