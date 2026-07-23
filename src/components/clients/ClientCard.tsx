import Link from "next/link"
import type { Client } from "@/types/client"

type ClientCardProps = {
  client: Client
}

export default function ClientCard({
  client,
}: ClientCardProps) {
  return (
    <Link
      href={`/dashboard/clients/${client.id}`}
      className="block rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-950">
            {client.name}
          </h2>

          <p className="mt-1 text-sm text-zinc-900">
            {client.phone || "No phone number provided"}
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-900">
          {client.curl_type || "Not provided"}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-zinc-900">
          Porosity
        </p>

        <p className="text-sm text-zinc-900">
          {client.porosity || "Not provided"}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-zinc-900">
          Notes
        </p>

        <p className="mt-1 text-sm text-zinc-900">
          {client.notes || "No notes added yet."}
        </p>
      </div>
    </Link>
  )
}