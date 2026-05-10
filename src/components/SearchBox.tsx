import { useState, useRef, useEffect } from 'react'
import { Input } from 'antd'
import { SearchOutlined, AppstoreOutlined, FileTextOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSearchQuery } from '@/services/productsApi'
import { ROUTES } from '@/utils/routes'

interface Props {
  size?: 'small' | 'middle'
  onNavigate?: () => void
}

const SearchBox = ({ size = 'small', onNavigate }: Props) => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(value), 500)
    return () => clearTimeout(t)
  }, [value])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const { data, isFetching } = useSearchQuery(debouncedQ, {
    skip: debouncedQ.trim().length === 0,
  })

  const hasResults = data && data.total > 0

  const clear = () => {
    setValue('')
    setDebouncedQ('')
    setOpen(false)
  }

  const goToSearch = (q: string) => {
    if (!q.trim()) return
    navigate(`/search?q=${encodeURIComponent(q.trim())}`)
    clear()
    onNavigate?.()
  }

  const goToProduct = (categorySlug: string, slug: string) => {
    navigate(ROUTES.product.detail(categorySlug, slug))
    clear()
    onNavigate?.()
  }

  const goToArticle = (slug: string) => {
    navigate(ROUTES.news.detail(slug))
    clear()
    onNavigate?.()
  }

  return (
    <div ref={wrapperRef} className='relative'>
      <Input
        value={value}
        size={size}
        placeholder='Tìm kiếm...'
        className='w-[200px]'
        prefix={<SearchOutlined className='text-gray-400' />}
        allowClear
        onChange={(e) => {
          setValue(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onPressEnter={() => goToSearch(value)}
      />

      {open && debouncedQ.trim().length > 0 && (
        <div className='absolute top-full mt-2 right-0 w-80 bg-white rounded-lg border border-gray-200 shadow-lg z-[999] overflow-hidden'>
          {isFetching && <div className='py-6 text-center text-sm text-gray-400'>Đang tìm kiếm...</div>}

          {!isFetching && !hasResults && (
            <div className='py-6 text-center text-sm text-gray-400'>
              Không tìm thấy kết quả cho <span className='font-medium text-gray-600'>"{debouncedQ}"</span>
            </div>
          )}

          {!isFetching && hasResults && (
            <>
              <div className='max-h-96 overflow-y-auto divide-y divide-gray-100'>
                {data.products.length > 0 && (
                  <div>
                    <div className='flex items-center gap-1.5 px-3 py-2 bg-gray-50'>
                      <AppstoreOutlined className='text-xs text-gray-400' />
                      <span className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Sản phẩm</span>
                    </div>
                    {data.products.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => goToProduct(p.categorySlug, p.slug)}
                        className='flex items-center gap-3 w-full px-3 py-2.5 hover:bg-blue-50 transition-colors text-left'
                      >
                        <img
                          src={p.image}
                          alt={p.title}
                          className='w-9 h-9 object-cover rounded flex-shrink-0 border border-gray-100'
                        />
                        <div className='min-w-0'>
                          <p className='text-sm text-gray-800 truncate leading-snug'>{p.title}</p>
                          <p className='text-xs text-gray-400 mt-0.5'>{p.categoryName}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {data.articles.length > 0 && (
                  <div>
                    <div className='flex items-center gap-1.5 px-3 py-2 bg-gray-50'>
                      <FileTextOutlined className='text-xs text-gray-400' />
                      <span className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Tin tức</span>
                    </div>
                    {data.articles.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => goToArticle(a.slug)}
                        className='flex items-center gap-3 w-full px-3 py-2.5 hover:bg-blue-50 transition-colors text-left'
                      >
                        <img
                          src={a.thumbnail}
                          alt={a.title}
                          className='w-9 h-9 object-cover rounded flex-shrink-0 border border-gray-100'
                        />
                        <div className='min-w-0'>
                          <p className='text-sm text-gray-800 truncate leading-snug'>{a.title}</p>
                          <p className='text-xs text-gray-400 mt-0.5'>{a.category}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => goToSearch(debouncedQ)}
                className='w-full px-4 py-2.5 text-sm text-center text-[#2d2f84] font-medium hover:bg-gray-50 border-t border-gray-100 transition-colors'
              >
                Xem tất cả {data.total} kết quả →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBox
