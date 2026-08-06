"use client"

import { useEffect, useState } from "react"
import AddClientForm from "@/components/clients/AddClientForm"
import ClientList from "@/components/clients/ClientList"
import type { Client } from "@/types/client"

type ClientManagerProps = {
  initialClients: Client[]
}

export default function ClientManager({
  initialClients,
}: ClientManagerProps) {
  const [clients, setClients] = useState(initialClients)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setClients(initialClients)
  }, [initialClients])

  function handleAddClient(client: Client) {
    setClients((currentClients) => [
      client,
      ...currentClients,
    ])
  }

  const search = searchTerm.trim().toLowerCase()

  const filteredClients = clients.filter((client) => {
    const name = client.name.toLowerCase()
    const phone = client.phone?.toLowerCase() ?? ""
    const curlType =
      client.curl_type?.toLowerCase() ?? ""
    const porosity =
      client.porosity?.toLowerCase() ?? ""
    const notes = client.notes?.toLowerCase() ?? ""

    return (
      name.includes(search) ||
      phone.includes(search) ||
      curlType.includes(search) ||
      porosity.includes(search) ||
      notes.includes(search)
    )
  })

  return (
    <>
      <AddClientForm onAddClient={handleAddClient} />

      <div className="mb-6">
        <label
          htmlFor="client-search"
          className="text-sm font-medium text-zinc-700"
        >
          Search Clients
        </label>

        <input
          id="client-search"
          type="search"
          className="mt-2 w-full rounded-lg border p-3"
          placeholder="Search by name, phone, curl type, porosity, or notes..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />
      </div>

      <ClientList clients={filteredClients} />
    </>
  )
}