import LOGO from '@/assets/Header/logo.png'
import CDVC from '@/assets/Header/congdichvucong.jpg'
import CTTDT from '@/assets/Header/congthongtindientu.jpg'
import BDHV from '@/assets/Header/binhdanhocvu.jpg'
const MainHeader = () => {
  return (
    <div className='w-full bg-white h-[92px] px-4 flex items-center justify-between'>
      {/* LOGO */}
      <div className='w-[220px]'>
        <a href='/' className='block'>
          <img src={LOGO} alt='Logo' className='h-[72px] object-contain' />
        </a>
      </div>

      {/* SPACER */}
      <div className='flex-1' />

      {/* RIGHT CONTENT */}
      <div className='flex items-center gap-4'>
        {/* BANNER 1 */}
        <a href='https://qlms.bqp.vn/'>
          <img src={BDHV} alt='' className='h-[60px] object-contain' />
        </a>

        {/* BANNER 2 + 3 */}
        <div className='flex items-center gap-2'>
          <a href='http://mod.gov.vn/'>
            <img src={CTTDT} alt='' className='h-[70px] object-contain' />
          </a>

          <a href='https://dichvucong.mod.gov.vn/'>
            <img src={CDVC} alt='' className='h-[70px] object-contain' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default MainHeader
