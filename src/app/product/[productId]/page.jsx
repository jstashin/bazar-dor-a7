import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";
import { banglaNumber, unitLabel } from "@/lib/format";

export default async function ProductDetails({ params }) {
  const { productId } = await params;

  const products = await getProducts();

  const product = products.find(
    (item) => item.slug === productId
  );

  if (!product) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=protected");
  }

  const markets = product.markets || [];

  const minimumPrice = markets.length
    ? Math.min(...markets.map((item) => item.min))
    : null;

  const maximumPrice = markets.length
    ? Math.max(...markets.map((item) => item.max))
    : null;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, item) => total + (item.min + item.max) / 2,
        0
      ) / markets.length
    : null;

  const summaries = [
    { title: "সর্বনিম্ন দাম", value: minimumPrice },
    { title: "সর্বোচ্চ দাম", value: maximumPrice },
    { title: "গড় দাম", value: averagePrice },
  ];

  return (
    <div className="py-8">
      <section className="rounded-2xl border border-[#e5ebe7] bg-[#f8fbf9] p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#eef4ef] text-5xl">
            {product.image}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#202820] sm:text-3xl">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-sm text-[#687169]">
              {unitLabel(product.unit)}
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-[#687169]">
          বিভিন্ন বাজারে {product.nameBn}-এর আজকের সর্বনিম্ন,
          সর্বোচ্চ ও গড় দাম এক নজরে দেখুন।
        </p>

        <Link
          href={`/category/${product.category}`}
          className="mt-4 inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
        >
          {product.categoryNameBn}
        </Link>

        <div className="mt-6 border-t border-[#e5ebe7] pt-4">
          <p className="text-sm text-[#687169]">আজকের দাম</p>

          <p className="mt-1 text-3xl font-bold text-[#202820]">
            {banglaNumber(product.today)}
            <span className="ml-2 text-base font-normal">টাকা</span>
          </p>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summaries.map((summary) => (
          <div
            key={summary.title}
            className="rounded-2xl border border-[#e5ebe7] bg-[#f8fbf9] p-5"
          >
            <p className="text-sm text-[#687169]">
              {summary.title}
            </p>

            <p className="mt-3 text-2xl font-bold text-[#202820]">
              {summary.value === null
                ? "তথ্য নেই"
                : `${banglaNumber(
                    Math.round(summary.value * 100) / 100
                  )} টাকা`}
            </p>

            <p className="mt-1 text-xs text-[#687169]">
              {unitLabel(product.unit)}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-[#202820]">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length ? (
          <div className="overflow-x-auto rounded-2xl border border-[#e5ebe7]">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-[#eef4ef] text-[#202820]">
                <tr>
                  <th className="px-5 py-4">বাজার</th>
                  <th className="px-5 py-4">বিভাগ</th>
                  <th className="px-5 py-4">সর্বনিম্ন দাম</th>
                  <th className="px-5 py-4">সর্বোচ্চ দাম</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-[#e5ebe7]"
                  >
                    <td className="px-5 py-4 font-medium">
                      {market.market}
                    </td>

                    <td className="px-5 py-4 text-[#687169]">
                      {market.division}
                    </td>

                    <td className="px-5 py-4">
                      {banglaNumber(market.min)} টাকা
                    </td>

                    <td className="px-5 py-4">
                      {banglaNumber(market.max)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-[#687169]">
            বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}