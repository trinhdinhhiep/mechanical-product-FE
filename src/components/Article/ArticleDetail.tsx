import { Breadcrumb, Tag } from 'antd'
import type { Article } from '@/types/article'
import BlockRenderer from './BlockRenderer'
import { Link } from 'react-router-dom'

interface Props {
  article: Article
}

const categoryColor: Record<string, string> = {
  'Tin tức': 'blue',
  'Sản phẩm': 'red',
  'Thông báo': 'orange',
}

export default function ArticleDetail({ article }: Props) {
  const formattedDate = new Date(article.published_at).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <div className='min-h-screen bg-white'>
      {/* ── Breadcrumb ─────────────────────────── */}
      <div className='max-w-4xl mx-auto px-4 pt-6'>
        <Breadcrumb items={[{ title: <Link to='/News'>Tin tức</Link> }, { title: article.category }]} />
      </div>

      {/* ── Hero thumbnail ─────────────────────── */}
      <div className='max-w-4xl mx-auto px-4 mt-4'>
        <div className='rounded-2xl overflow-hidden bg-gray-100 aspect-[16/7]'>
          <img
            src={article.thumbnail}
            alt={article.title}
            className='w-full h-full object-cover'
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = `https://picsum.photos/seed/${article.id}/1200/525`
            }}
          />
        </div>
      </div>

      {/* ── Article header ─────────────────────── */}
      <div className='max-w-4xl mx-auto px-4 mt-6'>
        {/* Category + tags */}
        <div className='flex flex-wrap items-center gap-2 mb-4'>
          <Tag color={categoryColor[article.category] ?? 'default'} className='font-medium'>
            {article.category}
          </Tag>
          {article.tags.map((tag) => (
            <Tag key={tag} className='text-gray-500'>
              {tag}
            </Tag>
          ))}
        </div>

        {/* Title */}
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4'>{article.title}</h1>

        {/* Meta */}
        <div className='flex items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-100'>
          <span className='flex items-center gap-1.5'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
            {article.author}
          </span>
          <span className='flex items-center gap-1.5'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            {formattedDate}
          </span>
        </div>
      </div>

      {/* ── Main content ───────────────────────── */}
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <BlockRenderer blocks={article.content} />
      </div>

      {/* ── Footer divider ─────────────────────── */}
      <div className='max-w-4xl mx-auto px-4 pb-16'>
        <div className='border-t border-gray-100 pt-6 flex flex-wrap gap-2'>
          <span className='text-sm text-gray-400'>Tags:</span>
          {article.tags.map((tag) => (
            <Tag key={tag} className='cursor-pointer hover:border-red-400 hover:text-red-500 transition-colors'>
              #{tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  )
}
