import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api`,
})
