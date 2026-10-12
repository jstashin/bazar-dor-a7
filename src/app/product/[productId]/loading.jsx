export default function Loading() {
  return (
    <div className="py-8">
      <div className="skeleton h-64 rounded-2xl" />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="skeleton h-32 rounded-2xl" />
        ))}
      </div>

      <div className="skeleton mt-8 h-7 w-56" />
      <div className="skeleton mt-4 h-80 rounded-2xl" />
    </div>
  );
}