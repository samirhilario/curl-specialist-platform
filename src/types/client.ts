{/*
export type Client = {
  id: string
  name: string
  phone: string
  curlType: string
  porosity: string
  notes: string
  productsUsed: string[]
} */}

export type Client = { 
  id: string
  name: string
  phone: string | null
  curl_type: string | null
  porosity: string | null
  notes: string | null
  created_at: string
}