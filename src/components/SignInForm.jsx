"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInForm({ reason }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (reason === "protected") {
      toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন", {
        id: "protected-route",
      });
    }
  }, [reason]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email").trim();
    const password = formData.get("password");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("সঠিক ইমেইল লিখুন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md py-12 sm:py-16">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-[#202820]">
          সাইন ইন
        </h1>

        <p className="mt-2 text-sm text-[#687169]">
          বিস্তারিত দাম ও বাজারের তথ্য দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="rounded-2xl border border-[#e5ebe7] bg-[#f8fbf9] p-6 text-[#202820]">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="input w-full border-[#e5ebe7] bg-white text-[#202820] placeholder:text-gray-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="আপনার পাসওয়ার্ড"
              required
              className="input w-full border-[#e5ebe7] bg-white text-[#202820] placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-[#008b3e] bg-[#008b3e] text-white hover:bg-[#007534]"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                সাইন ইন হচ্ছে...
              </>
            ) : (
              "সাইন ইন"
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[#687169]">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-[#008b3e]">
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </div>

      <div className="mt-5 text-center">
        <Link href="/" className="text-sm text-[#687169] hover:text-[#008b3e]">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}