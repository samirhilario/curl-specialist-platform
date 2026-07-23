import { notFound } from "next/navigation"
import ClientProfileManager from "@/components/clients/ClientProfileManager"
import { supabase } from "@/lib/supabase"

type ClientPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ClientPage({
  params,
}: ClientPageProps) {
  
  const { id } = await params

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single()

  if (clientError || !client) {
    notFound()
  }

  const { data: productRows, error: productsError } =
    await supabase
      .from("client_products")
      .select("id, name")
      .eq("client_id", id)
      .order("created_at", { ascending: true })

  if (productsError) {
    console.error(productsError)
  }

  return (
    <ClientProfileManager
      initialClient={client}
      initialProducts={productRows ?? []}
    />
  )
}