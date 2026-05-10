import { Tag } from 'antd'
import type { Article } from '@/types/article'

interface Props {
  article: Article
  onClick?: (slug: string) => void
}

const categoryColor: Record<string, string> = {
  'Tin tức': 'blue',
  'Sản phẩm': 'red',
}

export default function ArticleCard({ article, onClick }: Props) {
  const formattedDate = new Date(article.published_at).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article
      onClick={() => onClick?.(article.slug)}
      className='group cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden
        hover:border-red-200 hover:shadow-lg hover:shadow-red-50 transition-all duration-300'
    >
      {/* Thumbnail */}
      <div className='overflow-hidden aspect-[16/9] bg-gray-100'>
        <img
          src={article.thumbnail}
          alt={article.title}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = `https://picsum.photos/seed/${article.id + 99}/640/360`
          }}
        />
      </div>

      {/* Content */}
      <div className='p-4'>
        <div className='flex items-center gap-2 mb-3'>
          <Tag color={categoryColor[article.category] ?? 'default'} className='text-xs'>
            {article.category}
          </Tag>
          <span className='text-xs text-gray-400'>{formattedDate}</span>
        </div>

        <h2 className='font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-red-600 transition-colors'>
          {article.title}
        </h2>

        <p className='text-sm text-gray-500 leading-relaxed line-clamp-2'>{article.excerpt}</p>

        <div className='mt-4 flex items-center justify-between'>
          <span className='text-xs text-gray-400'>{article.author}</span>
          <span className='text-xs font-medium text-red-600 group-hover:underline'>Đọc tiếp →</span>
        </div>
      </div>
    </article>
  )
}
