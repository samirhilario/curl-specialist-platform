import ClientCard from "@/components/clients/ClientCard"
import type { Client } from "@/types/client"

type ClientListProps = {
  clients: Client[]
}

export default function ClientList({ clients }: ClientListProps) {
  if (clients.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center">
        <h2 className="text-xl font-semibold text-zinc-900">
          No clients yet
        </h2>

        <p className="mx-auto mt-2 max-w-md text-zinc-600">
          Add your first client using the form above. Their hair profile,
          notes, and products will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  )
}