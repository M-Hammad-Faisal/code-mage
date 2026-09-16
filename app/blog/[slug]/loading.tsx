export default function Loading() {
  return (
    <div className="min-h-screen py-12">
      <div className="container-max">
        <div className="max-w-2xl mx-auto animate-pulse">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
          <div className="h-9 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
          <div className="h-5 w-full bg-gray-200 dark:bg-gray-800 rounded mb-2" />
          <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
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
