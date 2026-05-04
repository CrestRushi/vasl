"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { switchRoleThunk } from "@/store/slices/authSlice";
import { toast } from "sonner";

export default function ImpersonateOrgPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(switchRoleThunk({ role: "organization" })).unwrap();
        toast.message("Viewing as Organization");
        router.replace("/dashboard");
      } catch {
        toast.error("Could not switch portal");
        router.replace("/dashboard");
      }
    })();
  }, [dispatch, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas text-mid">
      Switching portal…
    </div>
  );
}
