import Image from "next/image";
import hero from "../../public/bazar-hero.png"

export default function Hero() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <section
      className="my-6 flex flex-col items-center justify-between
                 gap-8 rounded-3xl border border-[#e5ebe7]
                 bg-[#f8fbf9] p-6 sm:p-8 md:flex-row"
    >
      <div className="w-full md:w-2/3">
        <p
          className="inline-block rounded-full bg-[#e1f3e7]
                     px-3 py-1 text-xs font-medium text-[#008b3e]"
        >
          {date}
        </p>

        <h1
          className="mt-4 text-3xl font-bold leading-tight
                     text-[#202820] sm:text-4xl"
        >
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-[#687169] sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দর —
          বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ দামের
          পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#সব-পণ্য"
          className="mt-5 inline-block rounded-lg bg-[#008b3e]
                     px-5 py-3 text-sm font-semibold text-white
                     shadow-sm transition-colors hover:bg-[#007534]"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="flex w-full justify-center md:w-1/3">
        <Image
        src={hero}
          alt="বাজারের পণ্যে ভরা ঝুড়ি"
          width={280}
          height={240}
          priority
          className="h-auto w-full max-w-[240px] object-contain"
        />
      </div>
    </section>
  );
}