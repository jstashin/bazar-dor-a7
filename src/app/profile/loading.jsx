export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl py-12">
      <div className="skeleton h-8 w-40" />
      <div className="skeleton mt-3 h-4 w-64" />
      <div className="skeleton mt-6 h-56 rounded-2xl" />
    </div>
  );
}