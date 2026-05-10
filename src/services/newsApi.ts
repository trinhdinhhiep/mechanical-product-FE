// services/newsApi.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import type { Article, CreateArticlePayload } from '@/types/article'
import { baseQuery } from './base'

// ── Types ────────────────────────────────────────────────────
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface NewsListResponse {
  data: Article[]
  pagination: PaginationMeta
}

export interface NewsDetailResponse {
  data: Article
}

export interface NewsListParams {
  page?: number
  limit?: number
  category?: string
  tag?: string
}

// BE trả về shape này
interface BeNewsListResponse {
  data: Article[]
  meta: PaginationMeta
}

// ── RTK Query API ────────────────────────────────────────────
export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: baseQuery,
  tagTypes: ['Articles'], // 👈 định nghĩa tag để tự refetch sau khi mutate
  endpoints: (builder) => ({
    getNewsList: builder.query<NewsListResponse, NewsListParams>({
      query: ({ page = 1, limit = 5, category } = {}) => ({
        url: '/articles',
        params: { page, limit, ...(category && { category }) },
      }),
      // map meta → pagination để FE không cần đổi gì
      transformResponse: (res: BeNewsListResponse): NewsListResponse => ({
        data: res.data,
        pagination: res.meta,
      }),
      providesTags: ['Articles'], // 👈 gắn tag để tự refetch sau khi mutate
    }),

    getNewsBySlug: builder.query<NewsDetailResponse, string>({
      query: (slug) => `/articles/${slug}`,
    }),

    createArticle: builder.mutation<void, CreateArticlePayload>({
      query: (body) => ({ url: '/articles', method: 'POST', body }),
    }),

    // DELETE /articles/:id
    deleteArticle: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/articles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'], // 👈 tự refetch getNewsList sau khi xóa
    }),
  }),
})

export const { useGetNewsListQuery, useGetNewsBySlugQuery, useCreateArticleMutation, useDeleteArticleMutation } =
  newsApi
