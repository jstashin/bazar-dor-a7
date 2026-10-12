import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
      <p className="text-7xl font-bold text-[#008b3e]">৪০৪</p>

      <h1 className="mt-5 text-2xl font-bold text-[#202820]">
        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
      </h1>

      <p className="mt-3 text-sm text-[#687169]">
        অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#008b3e] px-5 py-3 text-sm font-semibold text-white hover:bg-[#007534]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}