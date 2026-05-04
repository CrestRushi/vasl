import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "At least 6 characters").required("Password is required"),
});

export const registerSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Use at least 8 characters")
    .required("Password is required"),
});

export const verifySchema = yup.object({
  code: yup
    .string()
    .length(6, "Enter the 6-digit code")
    .required("Verification code is required"),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
});
