import ClientCard from "@/components/clients/ClientCard"
import type { Client } from "@/types/client"

type ClientListProps = {
  clients: Client[]
}

export default function ClientList({ clients }: ClientListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  )
}