import { Suspense } from "react";
import { Noto_Serif_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">
      <body
        className={`${notoSerifBengali.className} flex min-h-screen flex-col bg-white text-[#202820]`}
      >
        <Suspense
          fallback={
            <div className="mx-auto w-full max-w-6xl px-4 py-5">
              <div className="skeleton h-24 rounded-xl" />
            </div>
          }
        >
          <Header />
        </Suspense>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4">
          <Suspense
            fallback={
              <div className="flex min-h-[40vh] items-center justify-center">
                <span className="loading loading-spinner text-green-700" />
              </div>
            }
          >
            {children}
          </Suspense>
        </main>

        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}