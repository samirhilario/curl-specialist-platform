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

  function handleAddClient(newClient: Client) {
    setClients([...clients, newClient])
  }

  return (
    <>
      <AddClientForm onAddClient={handleAddClient} />
      <ClientList clients={clients} />
    </>
  )
}