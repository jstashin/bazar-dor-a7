"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

export default function CategoryProducts({ products }) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <label className="flex items-center gap-3 text-sm text-[#687169]">
          সাজান:

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered w-48 bg-white text-[#202820]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}