import { Dayjs } from 'dayjs'

export type Block =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | ImageGalleryBlock
  | VideoBlock
  | TableOfContentsBlock
  | TableBlock
  | ListBlock
  | CalloutBlock
  | DividerBlock

export interface ParagraphBlock {
  type: 'paragraph'
  data: { text: string }
}

export interface HeadingBlock {
  type: 'heading'
  data: { level: 2 | 3; text: string; anchor: string }
}

export interface ImageBlock {
  type: 'image'
  data: {
    src: string // url sau khi upload (rỗng nếu chưa upload)
    alt: string
    caption: string
    _file?: File // local file, chỉ tồn tại trước khi submit
  }
}

export interface ImageGalleryBlock {
  type: 'image_gallery'
  data: { images: { src: string; caption?: string; alt: string; _file?: File }[] }
}

export interface VideoBlock {
  type: 'video'
  data: { url: string; caption?: string }
}

export interface TableOfContentsBlock {
  type: 'table_of_contents'
  data: { items: { label: string; anchor: string }[] }
}

export interface TableBlock {
  type: 'table'
  data: { caption?: string; columns: string[]; rows: string[][] }
}

export interface ListBlock {
  type: 'list'
  data: { style: 'ordered' | 'unordered'; items: string[] }
}

export interface CalloutBlock {
  type: 'callout'
  data: { variant: 'info' | 'success' | 'warning'; title?: string; text: string }
}

export interface DividerBlock {
  type: 'divider'
  data: Record<string, never>
}

export interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  thumbnail: string
  category: string
  tags: string[]
  author: string
  published_at: string
  content: Block[]
}

export interface ArticleFormValues {
  title: string
  slug: string
  excerpt: string
  thumbnail: File
  category: string
  tags: string
  author: string
  published_at: Dayjs
}

export interface CreateArticlePayload {
  title: string
  slug: string
  excerpt: string
  thumbnail: string
  category: string
  tags: string[]
  author: string
  content: Block[]
  published_at: string
}
