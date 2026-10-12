"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import  google from "../../public/google.png"
import github from "../../public/github.png"


export default function SocialLogin() {
  const [loading, setLoading] = useState("");

  const handleSocialLogin = async (provider) => {
    setLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/auth/success",
        errorCallbackURL: "/signin?reason=social-error",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
        setLoading("");
      }
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoading("");
    }
  };

  return (
    <div className="mt-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#e5ebe7]" />
        <span className="text-xs text-[#687169]">অথবা</span>
        <div className="h-px flex-1 bg-[#e5ebe7]" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
  <button
    type="button"
    onClick={() => handleSocialLogin("google")}
    disabled={Boolean(loading)}
    className="btn h-auto min-h-12 border-[#e5ebe7] bg-white px-3 py-3 text-[#202820]"
  >
    {loading === "google" ? (
      <span className="loading loading-spinner loading-sm" />
    ) : (
      <Image
        src={google}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 shrink-0 object-contain"
      />
    )}

    <span>Google দিয়ে চালিয়ে যান</span>
  </button>

  <button
    type="button"
    onClick={() => handleSocialLogin("github")}
    disabled={Boolean(loading)}
    className="btn h-auto min-h-12 border-[#e5ebe7] bg-white px-3 py-3 text-[#202820]"
  >
    {loading === "github" ? (
      <span className="loading loading-spinner loading-sm" />
    ) : (
      <Image
        src={github}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 shrink-0 object-contain"
      />
    )}

    <span>GitHub দিয়ে চালিয়ে যান</span>
  </button>
</div>
    </div>
  );
}