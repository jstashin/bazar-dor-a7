import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";

export default async function CategoryPage({ params }) {
  const { categoryId } = await params;

  const categories = await getCategories();

  const category = categories.find(
    (item) => item.slug === categoryId
  );

  if (!category) {
    notFound();
  }

  const products = await getProducts(categoryId);

  if (!products.length) {
    notFound();
  }

  return (
    <section className="py-8">
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#e5ebe7] bg-[#f8fbf9] p-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eef4ef] text-3xl">
          {category.icon}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#202820]">
            {category.nameBn}
          </h1>

          <p className="mt-1 text-sm text-[#687169]">
            এই বিভাগের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProducts products={products} />
    </section>
  );
}