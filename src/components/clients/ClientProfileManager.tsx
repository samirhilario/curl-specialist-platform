"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  const router = useRouter()

  const [products, setProducts] =
    useState<ClientProduct[]>(initialProducts)

  const [newProduct, setNewProduct] = useState("")
  const [productMessage, setProductMessage] = useState("")
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const [phone, setPhone] = useState(
    initialClient.phone ?? ""
  )

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

  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState("")

  async function handleSaveClient() {
    setIsSaving(true)
    setSaveMessage("")

    const { error } = await supabase
      .from("clients")
      .update({
        phone: phone.trim() || null,
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

    setProducts((currentProducts) => [
      ...currentProducts,
      product,
    ])

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

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== productToRemove.id
      )
    )

    setProductMessage("Product removed.")
  }

  async function handleDeleteClient() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${initialClient.name}? This cannot be undone.`
    )

    if (!confirmed) {
      return
    }

    setIsDeleting(true)
    setDeleteMessage("")

    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", initialClient.id)

    if (error) {
      console.error(error)
      setDeleteMessage("Failed to delete client.")
      setIsDeleting(false)
      return
    }

    router.push("/dashboard/clients")
    router.refresh()
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

      <div className="mt-4 max-w-md">
        <label
          htmlFor="client-phone"
          className="text-sm font-medium text-zinc-900"
        >
          Phone Number
        </label>

        <input
          id="client-phone"
          type="tel"
          value={phone}
          onChange={(event) =>
            setPhone(event.target.value)
          }
          className="mt-2 w-full rounded-lg border border-zinc-400 bg-white p-3 text-zinc-950 placeholder:text-zinc-600"
          placeholder="803-555-0142"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-zinc-900">
            Hair Profile
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="curl-type"
                className="text-sm font-medium text-zinc-900"
              >
                Curl Type
              </label>

              <input
                id="curl-type"
                type="text"
                value={curlType}
                onChange={(event) =>
                  setCurlType(event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-zinc-400 bg-white p-3 text-zinc-950 placeholder:text-zinc-600"
                placeholder="3A, 3B, 4C..."
              />
            </div>

            <div>
              <label
                htmlFor="porosity"
                className="text-sm font-medium text-zinc-900"
              >
                Porosity
              </label>

              <input
                id="porosity"
                type="text"
                value={porosity}
                onChange={(event) =>
                  setPorosity(event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-zinc-400 bg-white p-3 text-zinc-950 placeholder:text-zinc-600"
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
              id="new-product"
              type="text"
              value={newProduct}
              onChange={(event) =>
                setNewProduct(event.target.value)
              }
              placeholder="Add product"
              className="min-w-0 flex-1 rounded-lg border border-zinc-400 bg-white p-3 text-zinc-950 placeholder:text-zinc-600"
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
          id="client-notes"
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
          className="mt-4 min-h-32 w-full rounded-lg border border-zinc-400 bg-white p-3 text-zinc-950 placeholder:text-zinc-600"
          placeholder="Add client notes..."
        />

        <div className="mt-4 flex flex-wrap items-center gap-4">
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

      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-xl font-semibold text-red-900">
          Delete Client
        </h2>

        <p className="mt-2 text-sm text-red-800">
          Permanently delete this client and all of their
          products. This action cannot be undone.
        </p>

        <button
          type="button"
          onClick={handleDeleteClient}
          disabled={isDeleting}
          className="mt-4 rounded-lg bg-red-700 px-4 py-2 font-medium text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete Client"}
        </button>

        {deleteMessage && (
          <p className="mt-3 text-sm text-red-800">
            {deleteMessage}
          </p>
        )}
      </div>
    </>
  )
}