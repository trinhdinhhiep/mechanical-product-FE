import { Row, Col, Button, Card } from 'antd'
import { Link } from 'react-router-dom'

const stats = [
  {
    value: '+40',
    label: 'Năm kinh nghiệm',
    icon: 'https://hevtech.vn/uploads/images/common/kinh-nghiem.png',
  },
  {
    value: '+840',
    label: 'Nhân lực',
    icon: 'https://hevtech.vn/uploads/images/common/nhan-luc.png',
  },
  {
    value: '+1.000',
    label: 'Máy móc thiết bị',
    icon: 'https://hevtech.vn/uploads/images/common/thiet-bi.png',
  },
  {
    value: '+170',
    label: 'Hecta nhà xưởng',
    icon: 'https://hevtech.vn/uploads/images/common/nha-xuong.png',
  },
]
const values = [
  {
    title: 'Chất lượng',
    desc: 'Gắn với những thành tựu thực sự, đi từ bài toán công nghệ, thành phẩm đạt tiêu chuẩn quốc tế.',
    img: 'https://hevtech.vn/uploads/images/common/chat-luong.jpg',
  },
  {
    title: 'Chuyên nghiệp',
    desc: 'Đáp ứng yêu cầu của thời đại trong chuỗi giá trị hội nhập, toàn cầu hóa.',
    img: 'https://hevtech.vn/uploads/images/common/chuyen-nghiep.jpg',
  },
  {
    title: 'Sáng tạo',
    desc: 'Là động lực cho sự phát triển bền vững, khuyến khích đổi mới và cải tiến liên tục.',
    img: 'https://hevtech.vn/uploads/images/common/sang-tao.jpeg',
  },
  {
    title: 'Trách nhiệm',
    desc: 'Tận tâm – tận lực – hết mình vì mục tiêu phát triển bền vững và tạo giá trị xã hội.',
    img: 'https://hevtech.vn/uploads/images/common/trach-nhiem.jpg',
  },
  {
    title: 'Hội nhập',
    desc: 'Hướng tới hợp tác quốc tế, trở thành thương hiệu mạnh được công nhận toàn cầu.',
    img: 'https://hevtech.vn/uploads/images/common/hoi-nhap.jpeg',
  },
]

const Introduction = () => {
  const bannerRender = () => {
    return (
      <section className='relative w-full min-h-[500px] flex items-center py-8 text-gray-100 bg-gray-600 overflow-hidden'>
        {/* Background */}
        <div
          className='absolute inset-0 bg-cover bg-no-repeat bg-[position:52%_69%]'
          style={{
            backgroundImage: 'url("https://hevtech.vn/uploads/images/common/bg-introduction.jpg")',
          }}
        >
          {/* Overlay */}
          <div className='absolute inset-0 bg-black/25' />
        </div>

        {/* Content */}
        <div className='relative z-10 w-full max-w-7xl mx-auto px-4'>
          <Row>
            <Col span={24}>{/* Nội dung của mày đặt ở đây */}</Col>
          </Row>
        </div>
      </section>
    )
  }
  const statsSectionRender = () => {
    return (
      <section className='relative py-8'>
        {/* Background nếu cần */}
        <div className='absolute inset-0 bg-cover bg-center' />

        <div className='relative z-10 max-w-7xl mx-auto px-4'>
          <Row gutter={[16, 16]}>
            {stats.map((item, index) => (
              <Col key={index} xs={24} sm={12} lg={6}>
                <div className='relative bg-white text-center p-6 shadow-sm hover:shadow-md transition'>
                  {/* Border */}
                  <div className='absolute inset-0 border-2 border-gray-200 pointer-events-none' />

                  {/* Icon */}
                  <div className='mb-4 flex justify-center'>
                    <img src={item.icon} alt={item.label} className='w-[60px] h-auto object-contain' />
                  </div>

                  {/* Number */}
                  <h2 className='text-red-700 text-3xl font-normal mb-2'>{item.value}</h2>

                  {/* Label */}
                  <p className='text-red-700 text-lg'>{item.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    )
  }
  const introSectionRender = () => {
    return (
      <section className='relative py-8'>
        {/* Background */}
        <div className='absolute inset-0 bg-cover bg-center' />

        <div className='relative z-10 w-full max-w-full mx-auto px-8'>
          <Row gutter={[24, 24]} align='middle'>
            {/* LEFT - VIDEO */}
            <Col xs={24} lg={16}>
              <div className='w-full aspect-video relative overflow-hidden rounded'>
                <iframe
                  className='absolute inset-0 w-full h-full'
                  src='https://www.youtube.com/embed/O2dD_UeFFqQ'
                  title='83MEC video'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            </Col>

            {/* RIGHT - CONTENT */}
            <Col xs={24} lg={8}>
              <div className='lg:pl-6'>
                {/* Title */}
                <h1 className='text-center text-red-700 text-2xl font-semibold'>83MEC</h1>
                <h1 className='text-center text-red-700 text-2xl font-semibold mb-4'>Từ Giá Trị Đến Sức Mạnh</h1>

                {/* Description */}
                <p className='text-gray-900 text-base mb-4'>
                  <strong>83MEC – Đơn vị hàng đầu trong gia công cơ khí chính xác tại Việt Nam</strong>, với hơn 40 năm
                  kinh nghiệm và uy tín vững chắc trên thị trường. Chúng tôi cung cấp đa dạng sản phẩm cho thị trường
                  trong và ngoài nước, tập trung vào các lĩnh vực:
                </p>

                {/* List */}
                <div className='space-y-2 mb-4'>
                  <p>
                    🔧 <strong>Tư vấn công nghệ & chế tạo khuôn mẫu, chi tiết máy, chế tạo máy</strong>
                  </p>
                  <p>
                    🔧 <strong>Sản xuất đồ gá (Jig) theo yêu cầu kỹ thuật cao</strong>
                  </p>
                  <p>
                    🔧 <strong>Gia công cơ khí chính xác với độ chính xác và độ bền vượt trội</strong>
                  </p>
                </div>

                {/* Footer text */}
                <p className='text-gray-900 mb-6'>
                  Với hệ thống công nghệ hiện đại và đội ngũ kỹ sư giàu kinh nghiệm,{' '}
                  <strong>83MEC cam kết mang đến giải pháp cơ khí tối ưu, hiệu quả và chất lượng cao</strong> cho khách
                  hàng.
                </p>

                {/* CTA */}
                <Link to='/contact'>
                  <Button
                    type='primary'
                    size='large'
                    block
                    className='!bg-red-700 hover:!bg-red-800 !border-none uppercase font-semibold'
                  >
                    Liên hệ ngay
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    )
  }
  const coreValuesSectionRender = () => {
    return (
      <section className='py-10'>
        <div className='max-w-full mx-auto px-8'>
          <Row gutter={[16, 24]} justify='center'>
            {values.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={4} className='flex'>
                <Card
                  hoverable
                  cover={
                    <div className='relative pt-[60%] overflow-hidden'>
                      <img
                        src={item.img}
                        alt={item.title}
                        className='absolute inset-0 w-full h-full object-cover transition duration-300 hover:scale-105'
                      />
                    </div>
                  }
                  className='w-full text-center shadow-sm'
                  styles={{ body: { padding: '16px' } }}
                >
                  <h3 className='text-lg font-semibold text-red-700 mb-2'>{item.title}</h3>
                  <p className='text-sm text-gray-700 text-justify'>{item.desc}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    )
  }
  const factorySectionRender = () => {
    return (
      <section className='relative w-full py-10 text-white'>
        {/* Background */}
        <div className='absolute inset-0'>
          <img
            src='https://hevtech.vn/uploads/images/common/xuat-khau-1.jpg'
            alt='bg'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/50' />
          <div className='absolute top-0 left-0 right-0 border-t border-gray-200' />
        </div>

        {/* Content */}
        <div className='relative z-10 max-w-6xl mx-auto px-4'>
          <div className='flex flex-wrap items-center justify-center'>
            {/* LEFT */}
            <div className='w-full lg:w-1/2 p-4'>
              <Card className='shadow-lg'>
                <ul className='list-disc pl-5 space-y-4 text-black'>
                  <li>
                    <h4 className='font-normal'>
                      <strong>
                        Với hơn 40 năm kinh nghiệm trong ngành cơ khí, đặc biệt là cơ khí chính xác, 83MEC tự hào là một
                        trong những doanh nghiệp hàng đầu Việt Nam.
                      </strong>
                    </h4>
                  </li>

                  <li>
                    <h4 className='font-normal'>
                      83MEC sở hữu nhà máy 178ha, dây chuyền hiện đại, thiết bị đo lường đầy đủ, đáp ứng sản xuất chính
                      xác cao.
                    </h4>
                  </li>

                  <li>
                    <h4 className='font-normal'>
                      Quy trình đạt chuẩn ISO 9001:2015, vận hành theo 5S, đội ngũ kỹ sư chuyên môn cao đảm bảo chất
                      lượng và tiến độ.
                    </h4>
                  </li>
                </ul>
              </Card>
            </div>

            {/* RIGHT */}
            <div className='w-full lg:w-1/2 p-4 text-center'>
              <div className='space-y-4'>
                <Link to='/product'>
                  <Button type='primary' danger block size='large'>
                    Sản phẩm
                  </Button>
                </Link>

                <Button
                  type='primary'
                  danger
                  block
                  size='large'
                  href='https://hevtech.vn/uploads/files/Ho-so-nang-luc.pdf'
                >
                  Hồ sơ năng lực
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {bannerRender()}
      {statsSectionRender()}
      {introSectionRender()}
      {coreValuesSectionRender()}
      {factorySectionRender()}
    </>
  )
}

export default Introduction
