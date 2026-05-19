"use client"

import { useState } from "react"
import type { Client } from "@/types/client"

type AddClientFormProps = {
  onAddClient: (client: Client) => void
}

export default function AddClientForm(props: AddClientFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [curlType, setCurlType] = useState("")
  const [porosity, setPorosity] = useState("")
  const [notes, setNotes] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newClient: Client = {
      id: crypto.randomUUID(),
      name,
      phone,
      curlType,
      porosity,
      notes,
      productsUsed: [],
    }

    props.onAddClient(newClient)

    setName("")
    setPhone("")
    setCurlType("")
    setPorosity("")
    setNotes("")
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-semibold">Add New Client</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <input className="rounded-lg border p-3" placeholder="Client name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="rounded-lg border p-3" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="rounded-lg border p-3" placeholder="Curl type" value={curlType} onChange={(e) => setCurlType(e.target.value)} />
        <input className="rounded-lg border p-3" placeholder="Porosity" value={porosity} onChange={(e) => setPorosity(e.target.value)} />
      </div>

      <textarea
        className="mt-4 w-full rounded-lg border p-3"
        placeholder="Client notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button className="mt-4 rounded-lg bg-zinc-950 px-4 py-2 text-white hover:bg-zinc-800">
        Save Client
      </button>
    </form>
  )
}