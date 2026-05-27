"use client"

import { useState } from "react"
import type { Client } from "@/types/client"
import Link from "next/link"

type ClientProfileManagerProps = {
  client: Client
}

export default function ClientProfileManager(
  props: ClientProfileManagerProps
) {
  const [products, setProducts] = useState(
    props.client.productsUsed
  )

  const [newProduct, setNewProduct] = useState("")

  const [notes, setNotes] = useState(props.client.notes)

  const [curlType, setCurlType] = useState(
    props.client.curlType
  )

  const [porosity, setPorosity] = useState(
    props.client.porosity
  )

  function handleRemoveProduct(productToRemove: string) {
    const updatedProducts = products.filter(
      (product) => product !== productToRemove
    )

    setProducts(updatedProducts)
  }

  function handleAddProduct() {
    if (!newProduct.trim()) return

    setProducts([...products, newProduct])

    setNewProduct("")
  }

  return (
    <>
      <Link
        href="/dashboard/clients"
        className="mb-4 inline-flex text-sm font-medium text-zinc-900 hover:text-zinc-950"
      >
        ← Back to Clients
      </Link>

      <h1 className="text-3xl font-bold text-zinc-950">
        {props.client.name}
      </h1>

      <p className="mt-2 text-zinc-900">
        {props.client.phone}
      </p>

      {/* 
      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">
          Hair Profile
        </h2>

        <p className="mt-4">
          <strong>Curl Type:</strong>{" "}
          {props.client.curlType}
        </p>

        <p className="mt-2">
          <strong>Porosity:</strong>{" "}
          {props.client.porosity}
        </p>

        <p className="mt-2">
          <strong>Notes:</strong>{" "}
          {props.client.notes}
        </p>
      </div>

      <div className="mt-6 rounded-xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">
          Products Used
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {products.map((product) => (
            <span
              key={product}
              className="rounded-full bg-zinc-950 px-3 py-1 text-sm text-white"
            >
              {product}
            </span>
          ))}
        </div>
      </div>

      */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-zinc-700">
            Hair Profile
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-zinc-500">
                Curl Type
              </label>

              <input
                value={curlType}
                onChange={(event) =>
                  setCurlType(event.target.value)
                }
                className="mt-2 w-full rounded-lg border p-3"
                placeholder="3A, 3B, 4C..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-500">
                Porosity
              </label>

              <input
                value={porosity}
                onChange={(event) =>
                  setPorosity(event.target.value)
                }
                className="mt-2 w-full rounded-lg border p-3"
                placeholder="Low, Medium, High"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-zinc-700">
            Products Used
          </h2>

          <div className="mt-4 flex gap-2">
            <input
              value={newProduct}
              onChange={(event) =>
                setNewProduct(event.target.value)
              }
              placeholder="Add product"
              className="flex-1 rounded-lg border p-3"
            />

            <button
              onClick={handleAddProduct}
              className="rounded-lg bg-zinc-950 px-4 py-2 text-white hover:bg-zinc-800"
            >
              Add
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {products.length === 0 ? (
              <p className="text-sm text-zinc-900">
                No products added yet.
              </p>
            ) : (
              products.map((product) => (
                <div
                  key={product}
                  className="flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-sm text-white"
                >
                  <span>{product}</span>

                  <button
                    onClick={() =>
                      handleRemoveProduct(product)
                    }
                    className="text-xs text-zinc-900 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-zinc-700">
          Client Notes
        </h2>

        <textarea
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
          className="mt-4 min-h-32 w-full rounded-lg border p-3"
          placeholder="Add client notes..."
        />
      </div>
    </>
  )
}