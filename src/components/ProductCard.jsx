import Link from "next/link";
import { banglaNumber, unitLabel } from "@/lib/format";

export default function ProductCard({ product }) {
  const direction = product.change.dir;

  const symbol =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  const badgeColor =
    direction === "up"
      ? "text-red-600"
      : direction === "down"
        ? "text-green-600"
        : "text-gray-600";

  const percentage = Math.abs(product.change.pct).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-[#e5ebe7]
                 bg-[#f8fbf9] p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center
                     justify-center rounded-xl bg-[#eef4ef] text-3xl"
        >
          {product.image}
        </div>

        <div>
          <h3 className="font-semibold text-[#202820]">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-[#687169]">
            {unitLabel(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-[#687169]">আজকের দাম</p>

          <p className="mt-1 text-xl font-bold text-[#202820]">
            {banglaNumber(product.today)}
            <span className="ml-1 text-sm font-normal">টাকা</span>
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full bg-[#eef4ef]
                      px-2 py-1 text-xs font-semibold ${badgeColor}`}
        >
          {symbol} {percentage}%
        </span>
      </div>
    </Link>
  );
}