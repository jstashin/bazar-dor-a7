"use client";

import Link from "next/link";

export default function ErrorPage({ reset }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
        ⚠️
      </div>

      <h1 className="mt-5 text-2xl font-bold text-[#202820]">
        তথ্য লোড করা যায়নি
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-[#687169]">
        ইন্টারনেট সংযোগ বা সার্ভারে সমস্যা হতে পারে। আবার চেষ্টা করুন।
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="btn border-[#008b3e] bg-[#008b3e] text-white hover:bg-[#007534]"
        >
          আবার চেষ্টা করুন
        </button>

        <Link
          href="/"
          className="btn border-[#e5ebe7] bg-white text-[#202820]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}