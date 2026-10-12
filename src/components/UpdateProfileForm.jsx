"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ user }) {
  const [updating, setUpdating] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();

    if (!name) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setUpdating(true);

    try {
      const { error } = await authClient.updateUser({ name });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি");
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-2xl py-12">
      <h1 className="text-2xl font-bold text-[#202820]">
        আমার প্রোফাইল
      </h1>

      <p className="mt-2 text-sm text-[#687169]">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e5ebe7] bg-[#f8fbf9] p-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-green-100 text-green-700">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "প্রোফাইল"}
                width={56}
                height={56}
                unoptimized
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            ) : (
              <FaUser size={24} aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="break-words font-semibold text-[#202820]">
              {user.name}
            </h2>

            <p className="mt-1 break-all text-sm text-[#687169]">
              {user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={loggingOut || updating}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          <FiLogOut size={16} aria-hidden="true" />
          {loggingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
        </button>
      </div>

      <form
        onSubmit={handleUpdate}
        noValidate
        className="mt-5 rounded-2xl border border-[#e5ebe7] bg-[#f8fbf9] p-6"
      >
        <h2 className="mb-5 font-semibold text-[#202820]">
          তথ্য
        </h2>

        <label
          htmlFor="name"
          className="mb-2 block text-sm text-[#687169]"
        >
          নাম
        </label>

        <input
          id="name"
          name="name"
          type="text"
          defaultValue={user.name}
          autoComplete="name"
          required
          disabled={updating || loggingOut}
          className="input w-full border-[#e5ebe7] bg-white text-[#202820]"
        />

        <button
          type="submit"
          disabled={updating || loggingOut}
          className="btn mt-5 w-full border-[#008b3e] bg-[#008b3e] text-white hover:bg-[#007534]"
        >
          {updating ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              আপডেট হচ্ছে...
            </>
          ) : (
            "আপডেট"
          )}
        </button>
      </form>
    </section>
  );
}