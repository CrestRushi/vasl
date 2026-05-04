import type { Metadata } from "next";
import { RegisterScreen } from "@/components/auth/RegisterScreen";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return <RegisterScreen />;
}
