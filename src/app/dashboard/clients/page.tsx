import ClientManager from "@/components/clients/ClientManager"
import { clients } from "@/data/clients"

export default function ClientsPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-950">Clients</h1>
        <p className="mt-2 text-zinc-900">
          View and track client hair notes and products used.
        </p>
      </div>

      <ClientManager initialClients={clients} />
    </>
  )
}