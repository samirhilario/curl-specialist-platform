"use client"

import { useState } from "react"
import Link from "next/link"
import type { Client } from "@/types/client"
import { supabase } from "@/lib/supabase"

type ClientProduct = {
  id: string
  name: string
}

type ClientProfileManagerProps = {
  initialClient: Client
  initialProducts: ClientProduct[]
}

export default function ClientProfileManager({
  initialClient,
  initialProducts,
}: ClientProfileManagerProps) {
  const [products, setProducts] =
    useState<ClientProduct[]>(initialProducts)

  const [newProduct, setNewProduct] = useState("")
  const [productMessage, setProductMessage] = useState("")
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const [notes, setNotes] = useState(
    initialClient.notes ?? ""
  )

  const [curlType, setCurlType] = useState(
    initialClient.curl_type ?? ""
  )

  const [porosity, setPorosity] = useState(
    initialClient.porosity ?? ""
  )

  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  async function handleSaveClient() {
    setIsSaving(true)
    setSaveMessage("")

    const { error } = await supabase
      .from("clients")
      .update({
        curl_type: curlType.trim() || null,
        porosity: porosity.trim() || null,
        notes: notes.trim() || null,
      })
      .eq("id", initialClient.id)

    if (error) {
      console.error(error)
      setSaveMessage("Failed to save changes.")
      setIsSaving(false)
      return
    }

    setSaveMessage("Changes saved.")
    setIsSaving(false)
  }

  async function handleAddProduct() {
    const trimmedProduct = newProduct.trim()

    if (!trimmedProduct) {
      return
    }

    setIsAddingProduct(true)
    setProductMessage("")

    const { data: product, error } = await supabase
      .from("client_products")
      .insert({
        client_id: initialClient.id,
        name: trimmedProduct,
      })
      .select("id, name")
      .single()

    if (error) {
      console.error(error)
      setProductMessage("Failed to add product.")
      setIsAddingProduct(false)
      return
    }

    setProducts([...products, product])
    setNewProduct("")
    setProductMessage("Product added.")
    setIsAddingProduct(false)
  }

  async function handleRemoveProduct(
    productToRemove: ClientProduct
  ) {
    setProductMessage("")

    const { error } = await supabase
      .from("client_products")
      .delete()
      .eq("id", productToRemove.id)

    if (error) {
      console.error(error)
      setProductMessage("Failed to remove product.")
      return
    }

    const updatedProducts = products.filter(
      (product) => product.id !== productToRemove.id
    )

    setProducts(updatedProducts)
    setProductMessage("Product removed.")
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
        {initialClient.name}
      </h1>

      <p className="mt-2 text-zinc-900">
        {initialClient.phone || "No phone number provided"}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-zinc-900">
            Hair Profile
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-zinc-900">
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
              <label className="text-sm font-medium text-zinc-900">
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
          <h2 className="text-xl font-semibold text-zinc-900">
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
              type="button"
              onClick={handleAddProduct}
              disabled={isAddingProduct}
              className="rounded-lg bg-zinc-950 px-4 py-2 text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAddingProduct ? "Adding..." : "Add"}
            </button>
          </div>

          {productMessage && (
            <p className="mt-3 text-sm text-zinc-900">
              {productMessage}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {products.length === 0 ? (
              <p className="text-sm text-zinc-900">
                No products added yet.
              </p>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-2 rounded-full bg-zinc-950 px-3 py-1 text-sm text-white"
                >
                  <span>{product.name}</span>

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveProduct(product)
                    }
                    className="text-xs text-zinc-300 hover:text-white"
                    aria-label={`Remove ${product.name}`}
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
        <h2 className="text-xl font-semibold text-zinc-900">
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

        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={handleSaveClient}
            disabled={isSaving}
            className="rounded-lg bg-zinc-950 px-4 py-2 text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>

          {saveMessage && (
            <p className="text-sm text-zinc-900">
              {saveMessage}
            </p>
          )}
        </div>
      </div>
    </>
  )
}