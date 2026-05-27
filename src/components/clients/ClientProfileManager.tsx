"use client"

import { useState } from "react"
import type { Client } from "@/types/client"

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
      <h1 className="text-3xl font-bold">
        {props.client.name}
      </h1>

      <p className="mt-2 text-zinc-600">
        {props.client.phone}
      </p>

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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Products Used
          </h2>
        </div>

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
            className="rounded-lg bg-zinc-950 px-4 py-2 text-white"
          >
            Add
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {/* {products.map((product) => (
            <span
              key={product}
              className="rounded-full bg-zinc-950 px-3 py-1 text-sm text-white"
            >
              {product}
            </span>
          ))} */}

          {products.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No products added yet.
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product}
                className="flex items-centerr gap-2 rounded-full bg-zinc-950 px-3 py-1 text-sm text-white"
                >
                  <span>{product}</span>

                  <button
                    onClick={() => handleRemoveProduct(product)}
                    className="text-xs text-zinc-300 hover:text-white"
                    >
                      X
                    </button>
                    </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}