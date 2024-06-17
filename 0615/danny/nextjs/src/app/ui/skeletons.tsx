// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";
export function ToDoListSkeleton() {
  return (
    <div className={`${shimmer} space-y-4`}>
      <div className="flex items-center justify-between">
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
