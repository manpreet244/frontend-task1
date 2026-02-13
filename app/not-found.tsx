import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h2 className="text-xl font-semibold">Page Not Found</h2>
      <p className="text-gray-600">Could not find the requested page</p>
      <Link 
        href="/"
        className="px-4 py-2 border rounded hover:bg-gray-100"
      >
        Go Home
      </Link>
    </div>
  )
}
