import type { Client } from "@/types/client"

export const clients: Client[] = [
  {
    id: "1",
    name: "Maria Johnson",
    phone: "803-555-0142",
    curlType: "3B",
    porosity: "Low",
    notes: "Prefers lightweight products. Avoid heavy creams.",
    productsUsed: ["Hydrating Curl Cream", "Leave-In Conditioner"],
  },
  {
    id: "2",
    name: "Tasha Williams",
    phone: "803-555-0188",
    curlType: "4A",
    porosity: "High",
    notes: "Needs extra moisture and gentle detangling.",
    productsUsed: ["Curl Defining Gel", "Deep Conditioner"],
  },
]