"use client"

import { useState } from "react"
import type { Client } from "@/types/client"

type AddClientFormProps = {
  onAddClient: (client: Client) => void
}

export default function AddClientForm(
  props: AddClientFormProps
) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [curlType, setCurlType] = useState("")
  const [porosity, setPorosity] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (!name.trim()) {
      setError("Client name is required.")
      return
    }

    setError("")

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
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="text-xl font-semibold">
        Add New Client
      </h2>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/*
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <input
          className="rounded-lg border p-3"
          placeholder="Client name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="rounded-lg border p-3"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="rounded-lg border p-3"
          placeholder="Curl type"
          value={curlType}
          onChange={(e) => setCurlType(e.target.value)}
        />

        <input
          className="rounded-lg border p-3"
          placeholder="Porosity"
          value={porosity}
          onChange={(e) => setPorosity(e.target.value)}
        />
      </div>
      */}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">
            Client Name
          </label>

          <input
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="Maria Johnson"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Phone
          </label>

          <input
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="803-555-0142"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Curl Type
          </label>

          <input
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="3A, 3B, 4C..."
            value={curlType}
            onChange={(event) =>
              setCurlType(event.target.value)
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Porosity
          </label>

          <input
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="Low, Medium, High"
            value={porosity}
            onChange={(event) =>
              setPorosity(event.target.value)
            }
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium">
          Notes
        </label>

        <textarea
          className="mt-2 min-h-32 w-full rounded-lg border p-3"
          placeholder="Add client notes..."
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button className="rounded-lg bg-zinc-950 px-4 py-2 text-white hover:bg-zinc-800">
          Save Client
        </button>
      </div>
    </form>
  )
}