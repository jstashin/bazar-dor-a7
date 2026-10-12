"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialLogin from "@/components/SocialLogin";
import { HiArrowLeft } from "react-icons/hi";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!name || !email || !password || !confirmPassword) {
      toast.error("সব তথ্য পূরণ করুন");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("সঠিক ইমেইল লিখুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
      router.push("/signin");
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
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-2 text-sm text-[#687169]">
         বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="rounded-2xl border border-[#e5ebe7] bg-[#f8fbf9] p-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm">
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="আপনার নাম"
              required
              className="input w-full border-[#e5ebe7] bg-white"
            />
          </div>

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
              autoComplete="new-password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              minLength={8}
             className="input w-full border-[#e5ebe7] bg-white text-[#202820] placeholder:text-gray-400"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="আবার লিখুন"
              required
             className="input w-full border-[#e5ebe7] bg-white text-[#202820] placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-[#008b3e] bg-[#008b3e]
                       text-white hover:bg-[#007534]"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                তৈরি হচ্ছে...
              </>
            ) : (
              "অ্যাকাউন্ট তৈরি করুন"
            )}
          </button>
        </form>
        <SocialLogin />

        <p className="mt-5 text-center text-sm text-[#687169]">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-[#008b3e]">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <div className="mt-5 text-center">
        <Link
  href="/"
  className="inline-flex items-center gap-2 text-sm text-[#687169] hover:text-[#008b3e]"
>
  <HiArrowLeft size={18} />
  হোম পেজে ফিরে যান
</Link>
      </div>
    </section>
  );
}