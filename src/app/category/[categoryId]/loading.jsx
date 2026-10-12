export default function Loading() {
  return (
    <div className="py-8">
      <div className="skeleton mb-6 h-24 rounded-2xl" />

      <div className="mb-5 flex justify-end">
        <div className="skeleton h-12 w-56 rounded-xl" />
      </div>

      <div className="skeleton mb-4 h-4 w-48" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="skeleton h-40 rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
}