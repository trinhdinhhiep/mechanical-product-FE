import { Button } from 'antd'
import BG2 from '@/assets/Home/bg2.jpg'
import BCC from '@/assets/Home/binhchuachay.jpg'
import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/routes'

const FireProtectionSection = () => {
  return (
    <section className='relative w-full min-h-[600px] flex items-center py-8 mt-4 mb-4'>
      {/* BACKGROUND */}
      <div
        className='absolute inset-0 bg-cover bg-no-repeat bg-[position:98%_60%]'
        style={{
          backgroundImage: `url(${BG2})`,
        }}
      >
        <div className='absolute inset-0 bg-black/60' />
        <div className='absolute inset-0  pointer-events-none' />
      </div>

      {/* CONTENT */}
      <div className='relative z-10 w-full max-w-[1600px] mx-auto px-4'>
        <div className='flex flex-col lg:flex-row items-center gap-8'>
          {/* LEFT */}
          <div className='w-full lg:w-1/2 text-white'>
            <h2 className='text-[1.6em] font-normal mb-2'>
              <strong>BÌNH CHỮA CHÁY</strong>
            </h2>

            <h2 className='text-[1.6em] font-normal mb-4'>
              <strong>83MEC – BỘ QUỐC PHÒNG</strong>
            </h2>

            <p className='mb-3'>✅ Đa dạng mẫu mã</p>
            <p className='mb-3'>✅ Được kiểm định bởi Cục PCCC</p>
            <p className='mb-3'>✅ Công nghệ sản xuất hiện đại, linh hoạt</p>
            <p className='mb-6'>✅ Sản xuất tại 83MEC – Bộ Quốc Phòng</p>

            <div className='flex flex-col sm:flex-row gap-3'>
              <Button
                type='primary'
                danger
                size='large'
                className='!h-[48px] uppercase font-bold'
                href='https://hevtech.vn/uploads/files/Catalogue-san-pham-PCCC.pdf'
              >
                Danh mục sản phẩm
              </Button>

              <Link to={ROUTES.contact}>
                <Button
                  size='large'
                  className='!h-[48px] uppercase font-bold !bg-[#2d2f84] !text-white hover:!bg-[#1f2160]'
                >
                  Liên hệ ngay
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT - BANNER IMAGE */}
          <div className='w-full lg:w-1/2'>
            <img
              src={BCC}
              alt='Banner khuyến mãi PCCC'
              className='w-full h-[300px] lg:h-[450px] object-fill rounded-xl shadow-2xl'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FireProtectionSection
