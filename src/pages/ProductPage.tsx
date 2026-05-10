import { Link, useParams } from 'react-router-dom'
import { Row, Col, Button, Tabs, Skeleton } from 'antd'
import ContactSection from '@/components/ContactSection'
import FeatureBox from '@/components/FeatureBox'
import ProductCard from '@/components/ProductCard'
import { getYoutubeEmbedUrl } from '@/utils/youtube'
import { useGetCategoryBySlugQuery, useGetProductBySlugQuery } from '@/services/productsApi'
import { ROUTES } from '@/utils/routes'

const { TabPane } = Tabs

const ProductPage = () => {
  const { categorySlug, productSlug } = useParams<{
    categorySlug: string
    productSlug?: string
  }>()
  const isDetail = !!productSlug

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useGetCategoryBySlugQuery(categorySlug!)

  const { data: productData, isLoading: productLoading } = useGetProductBySlugQuery(productSlug!, {
    skip: !isDetail,
  })

  if (categoryLoading) return <Skeleton active paragraph={{ rows: 10 }} className='p-8' />
  if (categoryError || !categoryData) return <div className='p-8 text-red-600'>Không tìm thấy danh mục</div>
  const displayData =
    isDetail && productData
      ? {
          banner_image: productData.image,
          name: productData.title,
          subtitle: productData.title, // ← title của category
          features: productData.category.features, // ← features của category
          description_image: productData.description_image ?? productData.image,
          description_text: productData.detail?.description_text ?? [],
        }
      : categoryData
        ? {
            banner_image: categoryData.banner_image,
            name: categoryData.name,
            subtitle: categoryData.subtitle,
            features: categoryData.features,
            description_image: categoryData.description_image,
            description_text: categoryData.description_text,
          }
        : null
  if (!displayData) return null
  const productIntroRender = () => (
    <div className='max-w-[1800px] mx-auto p-5'>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <img
            src={displayData.banner_image}
            alt={displayData.name}
            className='w-full h-auto rounded-lg object-cover'
          />
        </Col>
        <Col xs={24} md={8}>
          <div className='bg-white h-full flex flex-col'>
            <h1 className='text-center text-red-700 text-2xl font-normal mb-2'>{displayData.name}</h1>
            <h2 className='text-center text-red-700 text-xl font-semibold mb-4'>{displayData.subtitle}</h2>
            <div className='flex gap-3 justify-center mb-6'>
              <Link to={ROUTES.contact} className='w-full'>
                <Button type='primary' danger block size='large'>
                  Liên hệ báo giá
                </Button>
              </Link>
              <Button block size='large' href='#sanpham' className='!border-2'>
                Tìm hiểu thêm
              </Button>
            </div>
            <div className='flex flex-col gap-4'>
              {displayData.features.map((f, i) => (
                <FeatureBox key={i} icon={f.icon} title={f.title} bg={f.bg} border={f.border} iconColor={f.iconColor} />
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )

  const productDescriptionRender = () => (
    <div className='w-full max-w-[1800px] mx-auto p-5'>
      <Row gutter={[24, 24]} align='middle'>
        <Col xs={24} md={12}>
          <div className='relative w-full pt-[100%] overflow-hidden rounded-xl'>
            <img
              src={displayData.description_image}
              alt={displayData.name}
              className='absolute inset-0 w-full h-full object-cover hover:scale-105 transition duration-500'
            />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className='flex flex-col gap-4'>
            <h1 className='text-red-700 text-2xl md:text-3xl font-semibold'>{categoryData.name}</h1>
            <div className='text-base md:text-lg leading-relaxed text-gray-800 space-y-4'>
              {displayData.description_text.map((text, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: text }} />
              ))}
            </div>
            <Link to={ROUTES.contact} className='w-full mt-4'>
              <Button type='primary' danger size='large' block className='mt-2'>
                Liên hệ báo giá
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  )

  const productSectionRender = () => (
    <section id='sanpham' className='relative py-10 px-5'>
      <div className='hidden lg:block absolute inset-0 border-x-[20px] border-gray-200 pointer-events-none' />
      <div className='relative z-10 max-w-[1800px] mx-auto'>
        <Row gutter={[24, 24]}>
          {categoryData.products.map((product) => (
            <Col xs={24} sm={12} lg={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )

  const productTabsRender = () => {
    if (productLoading) return <Skeleton active paragraph={{ rows: 6 }} className='p-8' />
    if (!productData) return null

    return (
      <section className='mt-8'>
        <div className='max-w-[1800px] mx-auto px-4'>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='MÔ TẢ SẢN PHẨM' key='1'>
              <div className='border p-6 bg-white'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                  <div className='relative w-full aspect-video overflow-hidden rounded-lg'>
                    {productData.video_id ? (
                      <iframe
                        src={getYoutubeEmbedUrl(productData.video_id)}
                        title='Video sản phẩm'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        className='absolute inset-0 w-full h-full'
                      />
                    ) : (
                      <img
                        src={productData.description_image ?? productData.image}
                        alt={productData.title}
                        className='absolute inset-0 w-full h-full object-cover'
                      />
                    )}
                  </div>
                  <div className='text-base leading-relaxed'>
                    <p className='font-bold text-lg'>THÔNG TIN SẢN PHẨM</p>
                    {productData.detail && (
                      <>
                        <p className='font-semibold italic'>Mã sản phẩm {productData.detail.code}</p>
                        <ul className='list-disc pl-5 space-y-2 mt-4'>
                          {productData.detail.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabPane>

            <TabPane tab='THÔNG SỐ KỸ THUẬT' key='2'>
              <div className='border p-6 bg-white'>
                <ul className='list-disc pl-5 space-y-2'>
                  {productData.specs?.map((spec, i) => <li key={i}>{spec}</li>)}
                </ul>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </section>
    )
  }

  return (
    <>
      {productIntroRender()}
      {productDescriptionRender()}
      {productSectionRender()}
      {isDetail && (
        <>
          {productTabsRender()}
          <ContactSection />
        </>
      )}
    </>
  )
}

export default ProductPage
