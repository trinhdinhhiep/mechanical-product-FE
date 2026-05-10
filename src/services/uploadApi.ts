import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base'

export interface UploadImageResponse {
  url: string
}

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery,
  endpoints: (builder) => ({
    uploadProductImage: builder.mutation<UploadImageResponse, FormData>({
      query: (body) => ({
        url: '/upload/product',
        method: 'POST',
        body,
        formData: true,
      }),
    }),

    uploadArticleImage: builder.mutation<UploadImageResponse, FormData>({
      query: (body) => ({
        url: '/upload/article',
        method: 'POST',
        body,
        formData: true,
      }),
    }),
  }),
})

export const { useUploadProductImageMutation, useUploadArticleImageMutation } = uploadApi
