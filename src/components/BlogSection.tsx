import { useState } from 'react'
import { Card, Button, Typography, Divider, Row, Col, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useGetNewsListQuery } from '@/services/newsApi'

const { Title } = Typography

const BLOG_SIZE = 6

interface Video {
  id: number
  title: string
  thumbnail: string
  videoId: string
}

const videos: Video[] = [
  {
    id: 1,
    title: 'Phim tài liệu - Hành trình Con tàu 83MEC vươn ra biển lớn',
    thumbnail: 'https://i.ytimg.com/vi/-1zbzfb2ois/hqdefault.jpg',
    videoId: '-1zbzfb2ois',
  },
  {
    id: 2,
    title: 'Hội Nghị Khách Hàng PCCC 2025 | 83MEC – Kết Nối Đồng Hành, Vươn Tầm Phát Triển',
    thumbnail: 'https://i.ytimg.com/vi/VJLGIXcIKG0/hqdefault.jpg',
    videoId: 'VJLGIXcIKG0',
  },
]

export default function BlogSection() {
  const [playing, setPlaying] = useState<Record<number, boolean>>({})

  const { data, isLoading } = useGetNewsListQuery({ page: 1, limit: BLOG_SIZE })
  const articles = data?.data ?? []

  const togglePlay = (id: number) => {
    setPlaying((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className='w-full bg-white py-12 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* BLOG */}
        <div className='mb-8'>
          <Title level={1} className='!text-[#b71414] !font-normal !text-[1.7rem] !leading-[1.3] !mb-0 tracking-tight'>
            <Link to='/news' className='hover:underline text-inherit'>
              <b>BLOG</b>
            </Link>
          </Title>
          <Divider className='!border-none !bg-[#2b2f84] !h-[5px] !my-6 max-w-[25%]' />
        </div>

        {isLoading ? (
          <div className='flex justify-center py-20'>
            <Spin size='large' />
          </div>
        ) : (
          <Row gutter={[24, 32]}>
            {articles.map((article) => {
              const date = new Date(article.published_at)
              const day = String(date.getDate()).padStart(2, '0')
              const month = date.toLocaleString('en', { month: 'short' })

              return (
                <Col key={article.id} xs={24} md={12} lg={8}>
                  <Card
                    hoverable
                    className='h-full overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
                    cover={
                      <div className='relative'>
                        <img src={article.thumbnail} alt={article.title} className='w-full aspect-[2/1] object-cover' />
                        <div className='absolute left-[-8px] top-[7%] z-20'>
                          <div className='bg-[#0a0a0a] text-white w-[2.8rem] h-[2.8rem] rounded-full flex flex-col items-center justify-center text-center shadow-md'>
                            <span className='text-lg font-bold leading-none'>{day}</span>
                            <span className='text-[10px] font-medium'>{month}</span>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <div className='p-5'>
                      <Title
                        level={5}
                        className='!text-[#b71414] !text-sm !font-normal uppercase tracking-[0.05em] !mb-3 leading-tight line-clamp-2'
                      >
                        <Link to={`/news/${article.slug}`} className='hover:underline text-inherit'>
                          {article.title}
                        </Link>
                      </Title>
                      <Divider className='!my-3 !h-[2px] !bg-white/30' />
                      <p className='text-[#0a0a0a] text-[0.9rem] line-clamp-2 mb-6'>{article.excerpt}</p>
                      <Button
                        type='primary'
                        size='middle'
                        className='bg-[#0a0a0a] hover:bg-black border-none text-white uppercase text-sm font-bold tracking-widest rounded-none'
                      >
                        <Link to={`/news/${article.slug}`}>Read More</Link>
                      </Button>
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        )}

        {/* VIDEO */}
        <div className='mt-20'>
          <Title level={1} className='!text-[#b71414] !font-normal !text-[1.7rem] !leading-[1.3] !mb-0 tracking-tight'>
            <b>VIDEO</b>
          </Title>
          <Divider className='!border-none !bg-[#2b2f84] !h-[5px] !my-6 max-w-[25%]' />

          <Row gutter={[24, 32]} className='items-stretch'>
            {videos.map((video) => (
              <Col key={video.id} xs={24} lg={12}>
                <Card
                  hoverable
                  className='h-full overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col'
                >
                  <div className='relative w-full aspect-video bg-black'>
                    {playing[video.id] ? (
                      <iframe
                        className='absolute inset-0 w-full h-full'
                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                        title={video.title}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img src={video.thumbnail} alt={video.title} className='w-full h-full object-cover' />
                        <div
                          onClick={() => togglePlay(video.id)}
                          className='absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-300'
                        >
                          <div className='w-[72px] h-[72px] bg-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='40'
                              height='40'
                              viewBox='0 0 24 24'
                              fill='#b71414'
                            >
                              <path d='M8 5.14v14.28l11-7.14z' />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className='p-5 flex-1 flex flex-col'>
                    <p className='text-[#0a0a0a] font-medium text-base leading-tight line-clamp-3'>{video.title}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}
