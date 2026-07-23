export default function ClientProfileLoading() {
  return (
    <>
      {/* Back Button */}
      <div className="h-5 w-32 animate-pulse rounded bg-zinc-200" />

      {/* Client Name */}
      <div className="mt-4 h-9 w-64 animate-pulse rounded bg-zinc-200" />

      {/* Phone Number */}
      <div className="mt-3 h-5 w-40 animate-pulse rounded bg-zinc-200" />

      {/* Top Cards */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Hair Profile */}
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="h-7 w-32 animate-pulse rounded bg-zinc-200" />

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <div className="h-4 w-20 animate-pulse rounded bg-zinc-200" />
              <div className="mt-2 h-12 w-full animate-pulse rounded-lg bg-zinc-200" />
            </div>

            <div>
              <div className="h-4 w-20 animate-pulse rounded bg-zinc-200" />
              <div className="mt-2 h-12 w-full animate-pulse rounded-lg bg-zinc-200" />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="h-7 w-40 animate-pulse rounded bg-zinc-200" />

          <div className="mt-4 flex gap-2">
            <div className="h-12 flex-1 animate-pulse rounded-lg bg-zinc-200" />
            <div className="h-12 w-20 animate-pulse rounded-lg bg-zinc-300" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <div className="h-8 w-24 animate-pulse rounded-full bg-zinc-200" />
            <div className="h-8 w-32 animate-pulse rounded-full bg-zinc-200" />
            <div className="h-8 w-20 animate-pulse rounded-full bg-zinc-200" />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow">
        <div className="h-7 w-28 animate-pulse rounded bg-zinc-200" />

        <div className="mt-4 h-32 w-full animate-pulse rounded-lg bg-zinc-200" />

        <div className="mt-4 h-10 w-36 animate-pulse rounded-lg bg-zinc-300" />
      </div>

      {/* Delete Client */}
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="h-7 w-36 animate-pulse rounded bg-red-200" />

        <div className="mt-4 h-4 w-full animate-pulse rounded bg-red-100" />
        <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-red-100" />

        <div className="mt-6 h-10 w-40 animate-pulse rounded-lg bg-red-300" />
      </div>
    </>
  )
}