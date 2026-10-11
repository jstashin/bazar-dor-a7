import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import NavLinks from "./Navlinks";
import PriceTicker from "./PriceTicker";


export default async function Header() {
  const [categories, products] = await Promise.all([
  getCategories(),
  getProducts(),
]);

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <header className="border-b border-[#e5ebe7] bg-[#f8fbf9]">
      {/* প্রথম row: logo, date ও auth buttons */}
      <div
        className="mx-auto flex max-w-6xl flex-wrap items-center
                   justify-between gap-3 px-4 py-4"
      >
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center
                       justify-center rounded-xl bg-[#008b3e] text-xl"
          >
            🛒
          </div>

          <div>
            <h1 className="text-lg font-bold text-[#202820] sm:text-xl">
              বাজার দর
            </h1>

            <p className="mt-1 text-[10px] text-[#687169] sm:text-xs">
              {date}
            </p>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/signin"
            className="rounded-lg px-2 py-2 text-xs font-medium
                       text-[#202820] hover:bg-green-50
                       sm:px-4 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-[#008b3e] px-3 py-2
                       text-xs font-medium text-white
                       hover:bg-[#007534] sm:px-4 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* দ্বিতীয় row: category links */}
      <div className="border-t border-[#e5ebe7]">
        <NavLinks categories={categories} />
      </div>
    {/* দ্বিতীয় row: category links */}
<div className="border-t border-[#e5ebe7]">
  <NavLinks categories={categories} />
</div>

{/* তৃতীয় row: price ticker */}
<PriceTicker products={products} />
    </header>
  );
}