"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    toast.success("সফলভাবে সাইন ইন হয়েছে", {
      id: "social-login-success",
    });

    router.replace("/");
    router.refresh();
  }, [router]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center gap-3">
      <span className="loading loading-spinner text-green-700" />
      <p>হোম পেজে নিয়ে যাওয়া হচ্ছে...</p>
    </div>
  );
}