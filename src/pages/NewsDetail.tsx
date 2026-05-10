import { useParams } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import ArticleDetail from '@/components/Article/ArticleDetail'
import { useGetNewsBySlugQuery } from '@/services/newsApi'

const NewsDetail = () => {
  const { newsDetailSlug } = useParams<{ newsDetailSlug: string }>()

  const { data, isLoading, isError } = useGetNewsBySlugQuery(newsDetailSlug ?? '', {
    skip: !newsDetailSlug,
  })

  const article = data?.data

  return (
    <ConfigProvider locale={viVN} theme={{ token: { colorPrimary: '#dc2626' } }}>
      <div className='min-h-screen bg-gray-50 font-sans'>
        {isLoading && <div className='flex justify-center items-center h-64 text-gray-400'>Đang tải bài viết...</div>}

        {isError && (
          <div className='flex justify-center items-center h-64 text-red-500'>
            Bài viết không tồn tại hoặc đã bị xóa.
          </div>
        )}

        {article && <ArticleDetail article={article} />}
      </div>
    </ConfigProvider>
  )
}

export default NewsDetail
