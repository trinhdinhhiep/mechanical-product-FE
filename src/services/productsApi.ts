import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base'

export interface ProductItem {
  id: string
  slug: string
  title: string
  image: string
  link: string
}

export interface Feature {
  icon: string
  title: string
  bg: string
  border: string
  iconColor: string
}

export interface CategoryDetail {
  id: string
  slug: string
  name: string
  subtitle: string
  banner_image: string
  description_image: string
  description_text: string[]
  features: Feature[]
  products: ProductItem[]
}

export interface ProductDetail {
  id: string
  slug: string
  title: string
  image: string
  description_image: string
  video_id: string | null
  specs: string[]
  detail: {
    code: string
    points: string[]
    description_text: string[]
  } | null
  related_products: ProductItem[]
  category: CategoryDetail
}

export interface CategoryNavItem {
  banner_image: string
  id: string
  slug: string
  name: string
  products: Pick<ProductItem, 'id' | 'slug' | 'title'>[]
}

export interface CreateProductPayload {
  title: string
  slug: string
  image: string
  description_image: string
  link: string
  category_id: string
  specs: string[]
  detail: {
    code: string
    points: string[]
    description_text: string[]
  }
}

export interface CreateProductResponse {
  data: ProductDetail
}

export interface CreateCategoryPayload {
  name: string
  slug: string
  subtitle: string
  banner_image: string
  description_image: string
  description_text: string[]
  features: Feature[]
}
export interface SearchProduct {
  id: string
  slug: string
  title: string
  image: string
  categorySlug: string
  categoryName: string
}

export interface SearchArticle {
  id: number
  slug: string
  title: string
  thumbnail: string
  category: string
  publishedAt: string
}

export interface SearchResult {
  products: SearchProduct[]
  articles: SearchArticle[]
  total: number
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQuery,
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    // GET /categories — dùng cho Navbar + all products section
    getAllCategories: builder.query<CategoryNavItem[], void>({
      query: () => '/categories',
      transformResponse: (res: { data: CategoryNavItem[] }) => res.data,
      providesTags: ['Categories'],
    }),

    // GET /categories/:slug — dùng cho ProductPage
    getCategoryBySlug: builder.query<CategoryDetail, string>({
      query: (slug) => `/categories/${slug}`,
      transformResponse: (res: { data: CategoryDetail }) => res.data,
    }),

    // GET /products/:slug — dùng cho ProductPage khi có productSlug
    getProductBySlug: builder.query<ProductDetail, string>({
      query: (slug) => `/products/${slug}`,
      transformResponse: (res: { data: ProductDetail }) => res.data,
    }),

    // GET /search?q=keyword
    search: builder.query<SearchResult, string>({
      query: (q) => ({ url: '/search', params: { q } }),
      transformResponse: (res: { data: SearchResult }) => res.data,
    }),

    createProduct: builder.mutation<CreateProductResponse, CreateProductPayload>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Categories'],
    }),

    createCategory: builder.mutation<{ data: CategoryDetail }, CreateCategoryPayload>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Categories'],
    }),

    // DELETE /products/:id
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),

    // DELETE /categories/:id
    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
})

export const {
  useGetAllCategoriesQuery,
  useGetCategoryBySlugQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useCreateCategoryMutation,
  useDeleteProductMutation,
  useDeleteCategoryMutation,
  useSearchQuery,
} = productsApi
