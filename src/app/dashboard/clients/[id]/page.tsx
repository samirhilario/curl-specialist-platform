import ClientProfileManager from "@/components/clients/ClientProfileManager"
import { clients } from "@/data/clients"

type ClientDetailsPageProps = {
  params: Promise<{ id: string }>
}

export default async function ClientDetailsPage(props: ClientDetailsPageProps) {
  const params = await props.params

  const client = clients.find(
    (client) => client.id === params.id
  )

  if(!client) {
    return (
      <h1 className="text-3xl font-bold">
        Client not found
      </h1>
    )
  }

  return (
    <ClientProfileManager client={client} />
  )
}