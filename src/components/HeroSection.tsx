import { Button } from 'antd'
import BG1 from '@/assets/Home/bg1.jpg'
import NANGLUC from '@/assets/Home/nanglucsanxuat.jpg'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/utils/routes'

const HeroSection = () => {
  return (
    <section className='relative w-full min-h-[600px] flex items-center mb-4 mt-4'>
      {/* BACKGROUND */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url(${BG1})`,
        }}
      >
        <div className='absolute inset-0 bg-black/60' />
      </div>

      {/* CONTENT */}
      <div className='relative z-10 w-full max-w-[1600px] mx-auto px-4'>
        <div className='flex flex-col lg:flex-row items-center gap-8'>
          {/* LEFT - TEXT */}
          <div className='w-full lg:w-1/2 text-white'>
            <h1 className='uppercase text-[1.7em] font-normal tracking-wider mb-4'>
              <strong>GIA CÔNG CƠ KHÍ CHÍNH XÁC</strong>
            </h1>

            <p className='mb-4 leading-relaxed'>
              ✅ Gia công CNC | Rèn | Dập | Đúc | Hàn | Nhiệt luyện | Xử lý bề mặt | Kiểm tra đo lường.
            </p>

            <p className='mb-4'>✅ Đạt chuẩn ISO 9001:2015 & ISO 14001:2015</p>

            <p className='mb-6 leading-relaxed'>✅ Đáp ứng yêu cầu kỹ thuật cao, quy mô công nghiệp</p>

            <div className='flex flex-col sm:flex-row gap-3'>
              <Link to={ROUTES.introduction}>
                <Button type='default' size='large' className='!h-[48px] uppercase font-bold'>
                  Năng lực công nghệ
                </Button>
              </Link>

              <Link to={ROUTES.contact}>
                <Button type='primary' danger size='large' className='!h-[48px] uppercase font-bold'>
                  Liên hệ ngay
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT - IMAGE */}
          <div className='w-full lg:w-1/2'>
            <img src={NANGLUC} alt='' className='w-full h-[300px] lg:h-[450px] object-fill rounded-lg shadow-xl' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
