import { Product } from '@/components/ProductCard'

// types/product.ts

interface BasePageData {
  bannerImage: string
  title: string
  subtitle: string
  features: { icon: string; title: string; bg: string; border: string; iconColor: string }[]
  descriptionImage: string
  descriptionText: string[]
  products: Product[]
}

export type CategoryData = BasePageData

export interface ProductData extends BasePageData {
  videoId: string
  details: {
    code: string
    points: string[]
  }
  specs: string[]
}
