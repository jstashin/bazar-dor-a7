import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />

      <section id="সব-পণ্য" className="scroll-mt-6 py-8">
        <h2 className="text-2xl font-bold text-[#202820]">
          সব পণ্য
        </h2>

        <p className="mt-2 text-sm text-[#687169]">
          প্রয়োজনীয় পণ্যের আজকের বাজার দর দেখুন।
        </p>
      </section>
    </div>
  );
}