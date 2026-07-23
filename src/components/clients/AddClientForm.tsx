"use client"

import { useState } from "react"
import type { Client } from "@/types/client"
import { supabase } from "@/lib/supabase"

type AddClientFormProps = {
  onAddClient: (client: Client) => void
}

export default function AddClientForm({
  onAddClient,
}: AddClientFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [curlType, setCurlType] = useState("")
  const [porosity, setPorosity] = useState("")
  const [notes, setNotes] = useState("")

  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    // Prevent another submission while one is already running.
    if (isCreating) {
      return
    }

    if (!name.trim()) {
      setError("Client name is required.")
      setSuccessMessage("")
      return
    }

    // Clear old messages before starting a new request.
    setError("")
    setSuccessMessage("")
    setIsCreating(true)

    const { data, error: createError } = await supabase
      .from("clients")
      .insert({
        name: name.trim(),
        phone: phone.trim(),
        curl_type: curlType.trim(),
        porosity: porosity.trim(),
        notes: notes.trim(),
      })
      .select()
      .single()

    if (createError) {
      console.error(createError)
      setError("Failed to create client. Please try again.")
      setIsCreating(false)
      return
    }

    onAddClient(data)

    setName("")
    setPhone("")
    setCurlType("")
    setPorosity("")
    setNotes("")

    setSuccessMessage(`${data.name} was added successfully.`)
    setIsCreating(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="text-xl font-semibold text-zinc-700">
        Add New Client
      </h2>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {successMessage && (
        <p
          role="status"
          className="mt-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {successMessage}
        </p>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="client-name"
            className="text-sm font-medium text-zinc-500"
          >
            Client Name
          </label>

          <input
            id="client-name"
            name="clientName"
            type="text"
            className="mt-2 w-full rounded-lg border p-3 disabled:cursor-not-allowed disabled:bg-zinc-100"
            placeholder="Maria Johnson"
            value={name}
            disabled={isCreating}
            onChange={(event) => {
              setName(event.target.value)

              if (error) {
                setError("")
              }

              if (successMessage) {
                setSuccessMessage("")
              }
            }}
          />
        </div>

        <div>
          <label
            htmlFor="client-phone"
            className="text-sm font-medium text-zinc-500"
          >
            Phone
          </label>

          <input
            id="client-phone"
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-lg border p-3 disabled:cursor-not-allowed disabled:bg-zinc-100"
            placeholder="803-555-0142"
            value={phone}
            disabled={isCreating}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="curl-type"
            className="text-sm font-medium text-zinc-500"
          >
            Curl Type
          </label>

          <input
            id="curl-type"
            name="curlType"
            type="text"
            className="mt-2 w-full rounded-lg border p-3 disabled:cursor-not-allowed disabled:bg-zinc-100"
            placeholder="3A, 3B, 4C..."
            value={curlType}
            disabled={isCreating}
            onChange={(event) => setCurlType(event.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="porosity"
            className="text-sm font-medium text-zinc-500"
          >
            Porosity
          </label>

          <input
            id="porosity"
            name="porosity"
            type="text"
            className="mt-2 w-full rounded-lg border p-3 disabled:cursor-not-allowed disabled:bg-zinc-100"
            placeholder="Low, Medium, High"
            value={porosity}
            disabled={isCreating}
            onChange={(event) => setPorosity(event.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="client-notes"
          className="text-sm font-medium text-zinc-500"
        >
          Notes
        </label>

        <textarea
          id="client-notes"
          name="notes"
          className="mt-2 min-h-32 w-full rounded-lg border p-3 disabled:cursor-not-allowed disabled:bg-zinc-100"
          placeholder="Add client notes..."
          value={notes}
          disabled={isCreating}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={isCreating}
          className="rounded-lg bg-zinc-950 px-4 py-2 text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          {isCreating ? "Creating..." : "Save Client"}
        </button>
      </div>
    </form>
  )
}