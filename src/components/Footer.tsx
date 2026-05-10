import { Divider, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import LOGO from '@/assets/Header/logo.png'

export default function Footer() {
  return (
    <footer className='bg-white'>
      {/* Divider xanh */}
      <Divider className='!border-none !bg-[#2b2f84] !h-7 !my-0' />

      <div className='max-w-7xl mx-auto px-4 py-8'>
        <Row gutter={[24, 32]}>
          {/* Cột 1: Logo + Thông tin */}
          <Col xs={24} md={6}>
            <div className='px-4 lg:px-8'>
              <img src={LOGO} alt='83MEC' className='h-12 mb-6' />
              <p className='text-[#0a0a0a] text-base leading-relaxed mb-6'>
                Công ty chúng tôi hoạt động trong lĩnh vực gia công, sản xuất các sản phẩm bằng kim loại; lắp ráp và chế
                tạo các sản phẩm công nghiệp; xuất nhập khẩu
              </p>
              <ul className='space-y-3 text-[#0a0a0a] text-sm'>
                <li>
                  <strong>Văn phòng đại diện:</strong> 16 Nguyễn Khắc Nhu - Ba Đình - Hà Nội
                </li>
                <li>
                  <strong>Hotline:</strong>{' '}
                  <a href='#' className='hover:underline'>
                    (+84) 2163.825.772
                  </a>
                </li>
                <li>
                  <strong>Mail:</strong>{' '}
                  <a href='#' className='hover:underline'>
                    info@hevtech.vn
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          {/* Cột 2: Điều khoản */}
          <Col xs={24} md={5}>
            <div className='px-4 lg:px-6'>
              <p className='text-[#0a0a0a] text-xl font-bold mb-4'>ĐIỀU KHOẢN</p>
              <ul className='space-y-3 text-[#0a0a0a]'>
                <li>
                  <Link to='/introduction' className='hover:underline'>
                    Về chúng tôi - 83MEC
                  </Link>
                </li>
                <li>
                  <Link to='/working-process' className='hover:underline'>
                    Quy trình làm việc
                  </Link>
                </li>
                <li>
                  <Link to='/terms' className='hover:underline'>
                    Chính sách bán hàng
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          {/* Cột 3: Fanpage Facebook */}
          <Col xs={24} md={6}>
            <div className='px-2 lg:px-4'>
              <p className='text-[#0a0a0a] text-xl font-bold mb-4'>THEO DÕI FANPAGE</p>
              <iframe
                height='300'
                width='100%'
                src='https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/profile.php?id=100091385380622&tabs=timeline&width=340&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling='no'
                frameBorder='0'
                allowFullScreen
              />
            </div>
          </Col>

          {/* Cột 4: Google Map */}
          <Col xs={24} md={7}>
            <div className='px-2 lg:px-4'>
              <p className='text-[#0a0a0a] text-xl font-bold mb-4'>ĐỊA CHỈ GOOGLE MAP</p>
              <iframe
                height='300'
                width='100%'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5393.517489125593!2d104.8446964850254!3d21.771688249931923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3133501fcbc10123:0xf55e8e0fab4d4f68!2zTmjDoCBNw6F5IFoxODM!5e0!3m2!1svi!2ssg!4v1653105330650!5m2!1svi!2ssg'
                style={{ border: '0' }}
                allowFullScreen
                loading='lazy'
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* Copyright */}
      <div className='bg-black py-4 text-center text-white/60 text-sm'>
        Copyright 2026 © <strong className='text-white'>83 MEC</strong>
      </div>

      {/* Nút Back to Top */}
      <a
        href='#top'
        className='fixed bottom-6 right-6 bg-[#b71414] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-xl hover:scale-110 transition-transform z-50'
        aria-label='Go to top'
      >
        ↑
      </a>
    </footer>
  )
}
