export default function Loading() {
  return (
    <div className="min-h-screen py-12">
      <div className="container-max">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
          <div className="h-3 w-56 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
          <div className="h-9 w-2/3 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
          <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-xl mb-8" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
