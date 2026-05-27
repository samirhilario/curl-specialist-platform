import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100">
      <div className="rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">Curl Specialist Platform</h1>
        <p className="mt-2 text-zinc-800">
          Phase 1: Client and product tracking.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-lg bg-zinc-950 px-4 py-2 text-white"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  )
}
