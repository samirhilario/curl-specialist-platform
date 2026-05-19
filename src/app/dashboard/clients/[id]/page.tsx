import { clients } from "@/data/clients"

type ClientDetailsPageProps = {
  params: 
  Promise<{ id: string }>
}

export default async function ClientDetailsPage(
  props: ClientDetailsPageProps
) {
  const params = await props.params
  const client = clients.find((client) => client.id === params.id)

  if(!client) {
    return (
        <>
            <h1 className="text-3xl font-bold">Client not found</h1>
            <p className = "mt-2 text-zinc-600">
                No client exists with ID: {params.id}
            </p>
        </>
    )
  }

  return (
    <>
      <h1 className="text-3xl font-bold">{client.name}</h1>
      <p className="mt-2 text-zinc-600">{client.phone}</p>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">Hair Profile</h2>

        <p className="mt-4">
            <strong>Curl Type:</strong> {client.curlType}
        </p>

        <p className="mt-2">
            <strong>Porosity:</strong> {client.porosity}
        </p>

        <p className="mt-2">
            <strong>Notes:</strong> {client.notes}
        </p>
      </div>

      <div className="mt-6 rounded-xl bg-white p-6 shoadow">
        <h2 className="text-xl font-semibold">Products Used</h2>

        <div className="mt-4 flex flex-wrap gap-2">
            {client.productsUsed.map((product) => (
                <span key={product}
                className="rounded-full bg-zinc-950 px-3 py-1 text-sm text-white">
                    {product}
                </span>
            ))}
        </div>
      </div>
    </>
  )
}