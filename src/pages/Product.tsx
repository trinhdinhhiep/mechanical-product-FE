import ProductCategory from '@/components/ProductCategory'
import { Row, Col, Button, Skeleton } from 'antd'
import { useGetAllCategoriesQuery } from '@/services/productsApi'
import { Link } from 'react-router-dom'
import { CarOutlined, SafetyCertificateOutlined, DollarOutlined } from '@ant-design/icons'
import { ReactNode } from 'react'

export interface Category {
  title: string
  link: string
  alt: string
  image: string
}

const features = [
  {
    icon: <CarOutlined className='text-5xl' />,
    title: 'Đảm bảo thời gian giao hàng',
  },
  {
    icon: <SafetyCertificateOutlined className='text-5xl' />,
    title: 'Đảm bảo chất lượng sản phẩm',
  },
  {
    icon: <DollarOutlined className='text-5xl' />,
    title: 'Chi phí giá thành cạnh tranh',
  },
]

const Product = () => {
  const { data: categoriesData = [], isLoading } = useGetAllCategoriesQuery()
  const categories = categoriesData.map((cat) => ({
    title: cat.name,
    link: `/product/${cat.slug}`,
    alt: cat.name,
    image: cat.banner_image,
  }))
  const CategoryItem = ({ title, link }: { title: string; link: string }) => {
    return (
      <div className='mb-3'>
        <h2 className='text-[1.4rem] font-normal leading-snug'>
          <a href={link} className='text-black hover:text-red-700 transition'>
            {title}
          </a>
        </h2>
      </div>
    )
  }

  const VideoSection = () => {
    return (
      <div className='relative w-full pt-[56.25%]'>
        <iframe
          className='absolute inset-0 w-full h-full'
          src='https://www.youtube.com/embed/gQjH4etQEZA'
          title='YouTube video'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
    )
  }

  const FeatureItem = ({ icon, title }: { icon: ReactNode; title: string }) => {
    return (
      <div className='flex items-center gap-4'>
        {icon}
        <h3 className='text-[1.4rem] md:text-[1.6rem] font-normal text-[#b71414] leading-snug'>{title}</h3>
      </div>
    )
  }

  const productIntroRender = () => {
    return (
      <div className='max-w-[1800px] mx-auto px-6 py-12'>
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          <Row gutter={[24, 24]}>
            {/* LEFT */}
            <Col xs={24} lg={8}>
              <div className='flex flex-col'>
                {/* Categories */}
                {categories.map((item, index) => (
                  <CategoryItem key={index} {...item} />
                ))}

                {/* Buttons */}
                <div className='mt-6 flex flex-col gap-3'>
                  <a href='https://hevtech.vn/uploads/files/Catalogue-san-pham-PCCC.pdf'>
                    <Button type='primary' size='large' className='w-full !bg-[#2d2f84]'>
                      Tải catalogue sản phẩm
                    </Button>
                  </a>

                  <Link to='/contact'>
                    <Button danger size='large' className='w-full'>
                      Liên hệ →
                    </Button>
                  </Link>

                  <a href='#'>
                    <Button size='large' className='w-full !bg-black !text-white'>
                      Gọi ngay
                    </Button>
                  </a>
                </div>
              </div>
            </Col>

            {/* RIGHT */}
            <Col xs={24} lg={16}>
              <VideoSection />
            </Col>
          </Row>
        )}
      </div>
    )
  }

  const renderFeatures = () => {
    return (
      <div className='bg-white py-8'>
        <div className='max-w-[1800px] mx-auto px-4'>
          <Row gutter={[24, 24]}>
            {features.map((item, index) => (
              <Col key={index} xs={24} md={12} lg={8}>
                <FeatureItem {...item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    )
  }

  return (
    <>
      {productIntroRender()}
      {renderFeatures()}
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 6 }} className='p-8' />
      ) : (
        <ProductCategory categories={categories} />
      )}
    </>
  )
}
export default Product
