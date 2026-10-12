import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import NavLinks from "./Navlinks";
import PriceTicker from "./PriceTicker";
import UserInfo from "./UserInfo";
import Image from "next/image";
import logo from "../../public/logo-icon.png"


export default async function Header() {
  const [categoryResult, productResult] = await Promise.allSettled([
  getCategories(),
  getProducts(),
]);

const categories =
  categoryResult.status === "fulfilled" ? categoryResult.value : [];

const products =
  productResult.status === "fulfilled" ? productResult.value : [];

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <header className="border-b border-[#e5ebe7] bg-[#f8fbf9]">
     <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
  <Link href="/" className="flex items-center gap-3">
  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#3f9638]">
    <Image
  src={logo}
  alt="বাজার দর"
  width={40}
  height={40}
  priority
  className="h-10 w-10 rounded-xl object-contain"
/>
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
<UserInfo />
</div>

      <div className="border-t border-[#e5ebe7]">
  {categoryResult.status === "fulfilled" ? (
    <NavLinks categories={categories} />
  ) : (
    <p className="px-4 py-3 text-center text-sm text-[#687169]">
      ক্যাটাগরি লোড করা যায়নি। পেজটি রিফ্রেশ করুন।
    </p>
  )}
</div>

<PriceTicker products={products} />

    </header>
  );
}