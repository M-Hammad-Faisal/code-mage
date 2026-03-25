import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-8xl font-heading font-bold text-gray-200 dark:text-gray-800 mb-4">404</p>
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
          404 — Page Not Found
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          This page doesn&apos;t exist. Maybe it was automated away.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
