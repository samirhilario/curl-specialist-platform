import Link from "next/link"
import type { Client } from "@/types/client"

type ClientCardProps = {
    client: Client
}

export default function ClientCard({ client }: ClientCardProps) {
    return (
        <Link
            href={`/dashboard/clients/${client.id}`}
            className="block rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        > 
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex items-start justify=between">
                    <div>
                        <h2 className="text=xl font=smibold">{client.name}</h2>
                        <p className="mt-1 text-sm text-zinc-700">{client.phone}</p>
                    </div>

                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-900">
                        {client.curlType}
                    </span>
                </div>

                <div className="mt-4">
                    <p className="text=sm font-medium text-zinc-900">Porosity</p>
                    <p className="text-sm text-zinc-800">{client.porosity}</p>
                </div>

                <div className="mt-4">
                    <p className="text-sm font-medium text-zinc-900">Products Used</p>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                        {client.productsUsed.map((product) => (
                            <span key={product} className="rounded-full bg-zinc-950 px-3 py-1 text-xs text-white">
                                {product}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-sm font-medium text-zinc-900">Notes</p>
                    <p className="mt-1 text-sm text-zinc-800">{client.notes}</p>
                </div>
            </div>
        </Link>

    )
}