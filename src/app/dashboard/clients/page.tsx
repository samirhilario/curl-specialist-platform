import ClientManager from "@/components/clients/ClientManager"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export default async function ClientsPage() {
  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)

    return (
      <h1 className="text-3xl font-bold text-zinc-950">
        Error loading clients.
      </h1>
    )
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-950">
          Clients
        </h1>

        <p className="mt-2 text-zinc-900">
          View and track client hair notes and products used.
        </p>
      </div>

      <ClientManager initialClients={clients ?? []} />
    </>
  )
}