import { ROUTES } from '@/utils/routes'
import { Row, Col, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title } = Typography

interface PolicyItem {
  src: string
  alt: string
  href: string
}

const policies: PolicyItem[][] = [
  [
    {
      src: 'https://hevtech.vn/uploads/images/terms/quy-dinh-chung.jpg',
      alt: 'Chính sách và quy định chung',
      href: ROUTES.terms.generalPolicy,
    },
    {
      src: 'https://hevtech.vn/uploads/images/terms/van-chuyen.jpg',
      alt: 'Chính sách vận chuyển giao nhận',
      href: ROUTES.terms.shippingPolicy,
    },
  ],
  [
    {
      src: 'https://hevtech.vn/uploads/images/terms/thanh-toan.jpg',
      alt: 'Chính sách thanh toán',
      href: ROUTES.terms.paymentPolicy,
    },
    {
      src: 'https://hevtech.vn/uploads/images/terms/doi-tra.jpg',
      alt: 'Chính sách đổi trả',
      href: ROUTES.terms.returnPolicy,
    },
  ],
  [
    {
      src: 'https://hevtech.vn/uploads/images/terms/bao-hanh.jpg',
      alt: 'Chính sách bảo hành',
      href: ROUTES.terms.warrantyPolicy,
    },
    {
      src: 'https://hevtech.vn/uploads/images/terms/bao-mat.jpg',
      alt: 'Chính sách bảo mật thông tin',
      href: ROUTES.terms.privacyPolicy,
    },
  ],
]

const Terms = () => {
  return (
    <main className='bg-white'>
      {/* BANNER */}
      <div className='w-full px-[45px] py-8'>
        <img
          src='https://hevtech.vn/uploads/images/terms/banner.jpg'
          alt='Chính sách bán hàng'
          className='w-full h-auto object-cover'
        />
      </div>

      {/* CONTENT */}
      <div className='max-w-[1080px] mx-auto px-4 pb-8'>
        {/* TITLE */}
        <Title level={2} className='!text-[#b71414] !font-normal !text-[1.6em] flex items-center gap-4 uppercase'>
          <span className='flex-1 h-[2px] bg-current opacity-10 block' />
          Chính sách bán hàng của 83MEC
          <span className='flex-1 h-[2px] bg-current opacity-10 block' />
        </Title>

        {/* POLICY GRID */}
        <Row gutter={[24, 24]}>
          {policies.map((col, colIndex) => (
            <Col xs={24} md={8} key={colIndex}>
              <div className='flex flex-col gap-[10px]'>
                {col.map((item, itemIndex) => (
                  <Link to={item.href} key={itemIndex}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className='w-full h-auto object-cover hover:opacity-90 transition-opacity duration-300'
                    />
                  </Link>
                ))}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </main>
  )
}

export default Terms
