import ProductCard from "./ProductCard";

export default function ProductSection({
  title,
  products,
  id,
  subtitle,
  direction,
}) {
  return (
    <section id={id} className="scroll-mt-6 py-5">
      <h2 className="flex items-center gap-2 text-xl font-bold text-[#202820]">
        {direction && (
          <span
            className={`text-sm ${
              direction === "up" ? "text-red-600" : "text-green-600"
            }`}
          >
            {direction === "up" ? "▲" : "▼"}
          </span>
        )}

        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm text-[#687169]">{subtitle}</p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!products.length && (
        <p className="mt-4 text-sm text-[#687169]">
          এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}