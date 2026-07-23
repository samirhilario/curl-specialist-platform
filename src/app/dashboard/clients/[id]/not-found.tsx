import Link from "next/link"

export default function ClientNotFound() {
  return (
    <div className="rounded-xl bg-white p-8 text-center shadow">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        Client not found
      </p>

      <h1 className="mt-3 text-3xl font-bold text-zinc-950">
        This client does not exist
      </h1>

      <p className="mx-auto mt-3 max-w-md text-zinc-700">
        The client may have been deleted, or the address may be incorrect.
      </p>

      <Link
        href="/dashboard/clients"
        className="mt-6 inline-flex rounded-lg bg-zinc-950 px-4 py-2 font-medium text-white hover:bg-zinc-800"
      >
        Return to Clients
      </Link>
    </div>
  )
}