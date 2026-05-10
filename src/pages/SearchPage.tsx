// src/pages/SearchPage.tsx
import { useSearchParams, Link } from 'react-router-dom'
import { Spin, Empty } from 'antd'
import { AppstoreOutlined, FileTextOutlined } from '@ant-design/icons'
import { useSearchQuery } from '@/services/productsApi'
import { ROUTES } from '@/utils/routes'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const { data, isFetching } = useSearchQuery(q, {
    skip: q.trim().length === 0,
  })

  return (
    <div className='max-w-5xl mx-auto px-4 py-10 min-h-screen'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-800'>Kết quả tìm kiếm</h1>
        {q && !isFetching && (
          <p className='text-gray-400 text-sm mt-1'>
            Tìm thấy <span className='font-medium text-gray-600'>{data?.total ?? 0}</span> kết quả cho từ khóa{' '}
            <span className='font-medium text-gray-600'>"{q}"</span>
          </p>
        )}
      </div>

      {/* Loading */}
      {isFetching && (
        <div className='flex justify-center py-24'>
          <Spin size='large' />
        </div>
      )}

      {/* Không có gì */}
      {!isFetching && data?.total === 0 && (
        <Empty description={`Không tìm thấy kết quả nào cho "${q}"`} className='py-24' />
      )}

      {/* Kết quả */}
      {!isFetching && data && data.total > 0 && (
        <div className='space-y-10'>
          {/* Sản phẩm */}
          {data.products.length > 0 && (
            <section>
              <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
                <AppstoreOutlined className='text-[#2d2f84]' />
                <h2 className='text-base font-semibold text-[#2d2f84]'>Sản phẩm ({data.products.length})</h2>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {data.products.map((p) => (
                  <Link
                    key={p.id}
                    to={ROUTES.product.detail(p.categorySlug, p.slug)}
                    className='group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-[#2d2f84] transition-all'
                  >
                    <div className='overflow-hidden'>
                      <img
                        src={p.image}
                        alt={p.title}
                        className='w-full h-36 object-contain group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                    <div className='p-3'>
                      <p className='text-sm font-medium text-gray-800 line-clamp-2 leading-snug'>{p.title}</p>
                      <p className='text-xs text-gray-400 mt-1'>{p.categoryName}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Tin tức */}
          {data.articles.length > 0 && (
            <section>
              <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
                <FileTextOutlined className='text-[#2d2f84]' />
                <h2 className='text-base font-semibold text-[#2d2f84]'>Tin tức ({data.articles.length})</h2>
              </div>
              <div className='flex flex-col gap-3'>
                {data.articles.map((a) => (
                  <Link
                    key={a.id}
                    to={ROUTES.news.detail(a.slug)}
                    className='flex gap-4 p-3 border border-gray-200 rounded-lg hover:shadow-md hover:border-[#2d2f84] transition-all'
                  >
                    <img src={a.thumbnail} alt={a.title} className='w-24 h-20 object-cover rounded flex-shrink-0' />
                    <div className='min-w-0'>
                      <p className='text-sm font-semibold text-gray-800 line-clamp-2'>{a.title}</p>
                      <p className='text-xs text-gray-400 mt-1'>{a.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchPage
