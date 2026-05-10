// pages/News.tsx
import { useSearchParams } from 'react-router-dom'
import { Pagination, Skeleton, Alert } from 'antd'
import { PostItem } from '@/components/PostItem'
import { RecentlyNews } from '@/components/RecentlyNews'
import { useGetNewsListQuery } from '@/services/newsApi'

const PAGE_SIZE = 5
const SIDEBAR_SIZE = 5

const News = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page') ?? '1')

  // ── Fetch danh sách chính ──────────────────────────────────
  const {
    data: listData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetNewsListQuery({ page: currentPage, limit: PAGE_SIZE })

  // ── Fetch sidebar ───────────────────────
  const { data: recentData } = useGetNewsListQuery({ page: 1, limit: SIDEBAR_SIZE })

  const articles = listData?.data ?? []
  const pagination = listData?.pagination ?? null

  const recentPosts = (recentData?.data ?? []).map((a) => ({
    title: a.title,
    href: `/news/${a.slug}`,
  }))

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* LEFT - POSTS */}
        <div className='w-full lg:w-[70%]'>
          {/* Error */}
          {isError && (
            <Alert
              type='error'
              message='Không thể tải bài viết'
              description={(error as Error)?.message ?? 'Đã có lỗi xảy ra'}
              showIcon
              className='mb-4'
              action={
                <button className='text-sm text-red-600 underline' onClick={refetch}>
                  Thử lại
                </button>
              }
            />
          )}

          {/* Loading skeleton */}
          {isLoading &&
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className='flex gap-4 mb-4 p-3 border border-gray-100 rounded-xl'>
                <Skeleton.Image active className='!w-32 !h-24 !rounded-lg flex-shrink-0' />
                <div className='flex-1'>
                  <Skeleton active paragraph={{ rows: 2 }} title={{ width: '80%' }} />
                </div>
              </div>
            ))}

          {/* List */}
          {!isLoading &&
            !isError &&
            articles.map((article) => (
              <PostItem
                key={article.id}
                post={{
                  title: article.title,
                  href: `/news/${article.slug}`,
                  image: article.thumbnail,
                  excerpt: article.excerpt,
                }}
              />
            ))}

          {/* Pagination */}
          {!isLoading && !isError && pagination && pagination.totalPages > 1 && (
            <div className='flex justify-center mt-6'>
              <Pagination
                current={pagination.page}
                pageSize={pagination.limit}
                total={pagination.total}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>

        {/* RIGHT - SIDEBAR */}
        <div className='w-[30%] relative'>
          <div className='sticky top-24'>
            {isLoading ? <Skeleton active paragraph={{ rows: 5 }} /> : <RecentlyNews posts={recentPosts} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default News
