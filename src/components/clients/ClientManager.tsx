"use client"

import { useState } from "react"
import AddClientForm from "@/components/clients/AddClientForm"
import ClientList from "@/components/clients/ClientList"
import type { Client } from "@/types/client"

type ClientManagerProps = {
  initialClients: Client[]
}

export default function ClientManager(props: ClientManagerProps) {
  const [clients, setClients] = useState(props.initialClients)
  const [searchTerm, setSearchTerm] = useState("")

  function handleAddClient(newClient: Client) {
    setClients([...clients, newClient])
  }

  const filteredClients = clients.filter((client) => {
    const search = searchTerm.toLowerCase()

    return (
      client.name.toLowerCase().includes(search) ||
      client.phone.toLowerCase().includes(search) ||
      client.curlType.toLowerCase().includes(search)
    )
  })

  return (
    <>
      <AddClientForm onAddClient={handleAddClient} />

      <div className="mb-6 rounded-xl bg-white p-4 shadow">
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search clients by name, phone, or curl type..."
          className="w-full rounded-lg border p-3"
        />
      </div>

      <ClientList clients={filteredClients} />
    </>
  )
}