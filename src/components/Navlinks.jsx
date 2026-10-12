"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ categories }) {
  const pathname = usePathname();

  return (
    <nav aria-label="পণ্যের ক্যাটাগরি"className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2">
      {categories.map((category) => {
        const href = `/category/${category.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category.id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2 rounded-lg
                        px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-green-100 font-semibold text-green-700"
                : "text-gray-700 hover:bg-green-50"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
}