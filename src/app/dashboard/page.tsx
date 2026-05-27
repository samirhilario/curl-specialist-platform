import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen">
      {/* <Sidebar /> */}

      <section className="flex-1 bg-zinc-100">
        {/* <Topbar /> */}

        <div className="p-8">
          <h1 className="text-3xl font-bold text-zinc-950">Dashboard</h1>
          <p className="mt-2 text-zinc-900">
            Track clients and the products used on their hair.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-zinc-700">Total Clients</h2>
              <p className="mt-2 text-3xl font-bold text-zinc-500">0</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-zinc-700">Products Tracked</h2>
              <p className="mt-2 text-3xl font-bold text-zinc-500">0</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-zinc-700">Recent Visits</h2>
              <p className="mt-2 text-3xl font-bold text-zinc-500">0</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
