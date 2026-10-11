export default function Loading() {
  return (
    <div className="py-6">
      <div className="skeleton mb-8 h-64 w-full rounded-3xl" />

      <div className="skeleton mb-4 h-7 w-44" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="skeleton h-40 w-full rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
}