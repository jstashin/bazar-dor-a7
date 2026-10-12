"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function UserInfo() {
  const { data: session, isPending } = authClient.useSession();
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();
  const user = session?.user;

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

  if (isPending) {
    return <div className="skeleton h-10 w-32 rounded-lg" />;
  }

  if (!user) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/signin"
          className="rounded-lg px-3 py-2 text-sm text-[#202820] hover:bg-green-50"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-[#008b3e] px-4 py-2 text-sm text-white hover:bg-[#007534]"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg p-2 text-[#202820] hover:bg-green-50 [&::-webkit-details-marker]:hidden">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 font-semibold text-green-700">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "প্রোফাইল"}
              width={36}
              height={36}
              unoptimized
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          ) : (
            user.name?.trim().slice(0, 1) || "👤"
          )}
        </span>

        <span className="max-w-24 truncate text-sm font-medium">
          {user.name}
        </span>

        <span className="text-xs transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>

      <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-[#e5ebe7] bg-white p-3 text-[#202820] shadow-lg">
        <div className="border-b border-[#e5ebe7] px-2 pb-3">
          <p className="truncate text-sm font-semibold">{user.name}</p>

          <p className="mt-1 break-all text-xs text-[#687169]">
            {user.email}
          </p>
        </div>

        <Link
          href="/profile"
          onClick={(e) => {
            e.currentTarget.closest("details")?.removeAttribute("open");
          }}
          className="mt-2 block rounded-lg px-3 py-2 text-sm hover:bg-green-50"
        >
          আমার প্রোফাইল
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={loggingOut}
          className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          {loggingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
        </button>
      </div>
    </details>
  );
}