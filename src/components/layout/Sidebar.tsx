import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-full md:min-h-screen md:w-64 bg-zinc-950 p-6 text-white">
      <h1 className="text-xl font-bold">Curl Specialist</h1>
      <p className="mt-1 text-sm text-zinc-400">Client Tracker</p>

      <nav className="mt-8 flex flex-col gap-2">
        <Link className="rounded-lg px-4 py-2 hover:bg-zinc-800" href="/dashboard">
          Dashboard
        </Link>

        <Link className="rounded-lg px-4 py-2 hover:bg-zinc-800" href="/dashboard/clients">
          Clients
        </Link>

        <Link className="rounded-lg px-4 py-2 hover:bg-zinc-800" href="/dashboard/products">
          Products
        </Link>

        <Link className="rounded-lg px-4 py-2 hover:bg-zinc-800" href="/dashboard/settings">
          Settings
        </Link>
      </nav>
    </aside>
  )
}
