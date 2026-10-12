export default function Footer() {
  return (
    <footer className="border-t border-[#e5ebe7] bg-[#f8fbf9]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs leading-6 text-[#687169] md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-semibold text-[#202820]">বাজার দর</span>
          {" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="md:max-w-md md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}