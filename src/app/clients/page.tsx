import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"

export default function ClientsPage() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <section className="flex-1 bg-zinc-100">
        <Topbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="mt-2 text-zinc-600">
            Client tracking will be built here.
          </p>
        </div>
      </section>
    </main>
  )
}
