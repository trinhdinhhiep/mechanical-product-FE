import { Button } from 'antd'
import { Link } from 'react-router-dom'

export default function AmmoBoxSection() {
  return (
    <section className='relative w-full py-24'>
      {/* BACKGROUND */}
      <div
        className='absolute inset-0 bg-cover bg-no-repeat bg-center'
        style={{
          backgroundImage: 'url("https://hevtech.vn/uploads/images/products/Banner-thiet-bi-pccc-bqp.jpg")',
        }}
      >
        <div className='absolute inset-0 bg-black/70' />
      </div>

      {/* WRAPPER */}
      <div className='relative z-10 max-w-[1600px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16'>
        {/* LEFT - IMAGE STACK */}
        <div className='w-full lg:w-1/2 relative h-[550px] lg:h-[650px]'>
          <img
            src='https://hevtech.vn/uploads/images/products/Decription-thiet-bi-PCCC.jpg'
            className='absolute top-1/2 left-1/2 w-[85%] h-[65%] object-cover rounded-xl shadow-2xl 
                       -translate-x-1/2 -translate-y-1/2'
          />
        </div>

        {/* RIGHT - TEXT */}
        <div className='w-full lg:w-1/2 text-white lg:pl-20 xl:pl-28'>
          <h2 className='text-3xl md:text-4xl font-semibold mb-6'>THIẾT BỊ PHÒNG CHÁY CHỮA CHÁY</h2>

          <div className='space-y-3 text-lg'>
            <p>✅ Tiêu chuẩn quốc tế, chất lượng hội nhập</p>
            <p>✅ Xuất khẩu US, UK, UAE,…</p>
            <p>✅ Sản xuất tại 83MEC – Bộ Quốc Phòng</p>
            <p>✅ Công nghệ hiện đại, công suất lớn</p>
            <p>✅ Đa dạng kiểu mẫu, linh hoạt</p>
          </div>

          <Link to='/product/thiet-bi-pccc-bqp'>
            <Button type='primary' danger size='large' className='mt-8 !h-[52px] uppercase font-bold'>
              Xem chi tiết
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
