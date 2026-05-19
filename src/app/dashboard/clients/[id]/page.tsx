type ClientDetailsPageProps = {
  params: 
  Promise<{ id: string }>
}

export default async function ClientDetailsPage(
  props: ClientDetailsPageProps
) {
  const params = await props.params

  return (
    <>
      <h1 className="text-3xl font-bold">
        Client ID: {params.id}
      </h1>

      <p className="mt-2 text-zinc-600">
        Individual client profile page.
      </p>
    </>
  )
}