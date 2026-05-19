import ClientList from "@/components/clients/ClientList"
import { clients } from "@/data/clients"

export default function ClientsPage() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="mt-2 text-zinc-600">
            View and track client hair notes and products used.
          </p>
        </div>

        <button className="rounded-lg bg-zinc-950 px-4 py-2 text-white hover:bg-zinc-800">
          Add Client
        </button>
      </div>

      <ClientList clients={clients} />
    </>
  )
}