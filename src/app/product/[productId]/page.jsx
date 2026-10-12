import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { HiChevronRight } from "react-icons/hi";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";
import { banglaNumber, unitLabel } from "@/lib/format";

export default async function ProductDetails({ params }) {
  const { productId } = await params;

  const products = await getProducts();
  const product = products.find((item) => item.slug === productId);

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

  const minimum = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : null;

  const maximum = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : null;

  const average = markets.length
    ? markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0
      ) / markets.length
    : null;

  const formatPrice = (value) =>
    value === null
      ? "তথ্য নেই"
      : `${banglaNumber(Math.round(value * 100) / 100)} টাকা`;

  const difference = product.today - product.yesterday;

  const comparisonText =
    difference > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে: ${banglaNumber(difference)} টাকা`
      : difference < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে: ${banglaNumber(
            Math.abs(difference)
          )} টাকা`
        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  const direction = product.change.dir;

  const symbol =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  const changeColor =
    direction === "up"
      ? "text-red-600"
      : direction === "down"
        ? "text-green-600"
        : "text-gray-500";

  const percentage = Math.abs(product.change.pct).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const summaries = [
    {
      title: "সর্বনিম্ন দাম",
      value: minimum,
      color: "text-green-600",
      subtitle: "সবচেয়ে কম দামের বাজার",
    },
    {
      title: "সর্বোচ্চ দাম",
      value: maximum,
      color: "text-red-600",
      subtitle: "সবচেয়ে বেশি দামের বাজার",
    },
    {
      title: "গড় দাম",
      value: average,
      color: "text-green-700",
      subtitle:  "প্রতি কেজি-এর হিসাবে",
    },
  ];

  return (
    <div className="py-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#687169]"
      >
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>

        <HiChevronRight aria-hidden="true" />

        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>

        <HiChevronRight aria-hidden="true" />

        <span className="text-[#202820]">{product.nameBn}</span>
      </nav>

      <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#e5ebe7] bg-[#f8fbf9] p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#eef4ef] text-4xl">
            {product.image}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#202820]">
              {product.nameBn}
            </h1>

            <p className="mt-1 text-sm text-[#687169]">
              {unitLabel(product.unit)}
            </p>

            <p className="mt-2 text-sm leading-6 text-[#687169]">
              {comparisonText}
            </p>

            <Link
              href={`/category/${product.category}`}
              className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700"
            >
              {product.categoryNameBn}
            </Link>
          </div>
        </div>

        <div className="shrink-0 rounded-xl bg-[#eef4ef] px-6 py-4 text-center">
          <p className="text-xs text-[#687169]">আজকের দাম</p>

          <p className="mt-2 text-3xl font-bold text-[#202820]">
            {banglaNumber(product.today)}
          </p>

          <p className="mt-1 text-xs text-[#687169]">
            টাকা / {unitLabel(product.unit).replace("প্রতি ", "")}
          </p>

          <p className={`mt-2 text-xs font-semibold ${changeColor}`}>
            {symbol} {percentage}%
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#e5ebe7] bg-[#f8fbf9] p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-[#202820]">
          দামের সারসংক্ষেপ
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {summaries.map((summary) => (
            <div
              key={summary.title}
              className="rounded-xl border border-[#e5ebe7] p-4"
            >
              <p className="text-xs text-[#687169]">
                {summary.title}
              </p>

              <p className={`mt-2 text-xl font-bold ${summary.color}`}>
                {formatPrice(summary.value)}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#687169]">
                {summary.subtitle}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 mt-7 text-lg font-semibold text-[#202820]">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm text-[#202820]">
              <thead>
                <tr className="border-b border-[#dce5de] text-[#687169]">
                  <th scope="col" className="px-3 py-3 font-medium">
                    বাজার
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    বিভাগ
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    সর্বনিম্ন
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    সর্বোচ্চ
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-b border-[#dce5de] last:border-0"
                  >
                    <td className="px-3 py-3">{market.market}</td>
                    <td className="px-3 py-3">{market.division}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatPrice(market.min)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatPrice(market.max)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatPrice((market.min + market.max) / 2)}
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