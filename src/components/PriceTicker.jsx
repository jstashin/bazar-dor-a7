export default function PriceTicker({ products }) {
  const units = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };

  if (!products.length) {
    return null;
  }

  return (
    <div
      className="price-ticker overflow-hidden border-t
                 border-[#e5ebe7] bg-[#f8fbf9]"
      tabIndex={0}
      aria-label="আজকের পণ্যের দাম"
    >
      <div className="ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {products.map((product) => {
              const direction = product.change.dir;

              const symbol =
                direction === "up"
                  ? "▲"
                  : direction === "down"
                    ? "▼"
                    : "—";

              const color =
                direction === "up"
                  ? "text-green-600"
                  : direction === "down"
                    ? "text-red-600"
                    : "text-gray-500";

              return (
                <div
                  key={product.id}
                  className="flex shrink-0 items-center gap-2
                             whitespace-nowrap px-5 py-3 text-sm"
                >
                  <span>{product.image}</span>

                  <span>{product.nameBn}</span>

                  <span>
                    {Number(product.today).toLocaleString("bn-BD")}
                    {" "}টাকা/{units[product.unit] || product.unit}
                  </span>

                  <span className={`font-semibold ${color}`}>
                    {symbol}{" "}
                    {Math.abs(product.change.pct).toLocaleString(
                      "bn-BD",
                      {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      }
                    )}
                    %
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}