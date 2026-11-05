export default function RecipeLoading() {
  return (
    <div className="container-app space-y-6 py-6 md:py-8">
      <div className="skeleton h-4 w-64 rounded-full" />
      <div className="skeleton h-64 w-full rounded-3xl md:h-96" />
      <div className="skeleton h-10 w-2/3 rounded-2xl" />
      <div className="flex gap-3">
        <div className="skeleton h-12 w-56 rounded-2xl" />
        <div className="skeleton h-12 w-32 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="skeleton h-96 rounded-2xl" />
        <div className="skeleton h-96 rounded-2xl lg:col-span-2" />
      </div>
    </div>
  );
}