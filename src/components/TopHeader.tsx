import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
} from '@ant-design/icons'

const TopHeader = () => {
  return (
    <div className='w-full bg-[#2b2f84] text-white text-xs px-4 py-1.5'>
      {/* Mobile: chỉ hiện social icons căn giữa */}
      <div className='flex md:hidden justify-center items-center gap-4 text-white'>
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <FacebookOutlined className='hover:scale-110 transition text-sm' />
        </a>
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <InstagramOutlined className='hover:scale-110 transition text-sm' />
        </a>
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <TwitterOutlined className='hover:scale-110 transition text-sm' />
        </a>
        <a href='#'>
          <MailOutlined className='hover:scale-110 transition text-sm' />
        </a>
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <LinkedinOutlined className='hover:scale-110 transition text-sm' />
        </a>
      </div>

      {/* Desktop: layout 3 cột như cũ */}
      <div className='hidden md:flex items-center justify-between'>
        {/* LEFT (empty - giữ layout) */}
        <div className='flex-1' />

        {/* CENTER - CONTACT */}
        <div className='flex items-center gap-4 uppercase tracking-wide text-[12px]'>
          <a
            href='#'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1 text-white/80 hover:text-white transition'
          >
            <EnvironmentOutlined />
            <span>LaoCai, VietNam</span>
          </a>

          <a href='#' className='flex items-center gap-1 text-white/80 hover:text-white transition'>
            <MailOutlined />
            <span>info@hevtech.vn</span>
          </a>

          <a href='#' className='flex items-center gap-1 text-white/80 hover:text-white transition'>
            <PhoneOutlined />
            <span>(+84) 2163.825.772</span>
          </a>
        </div>

        {/* RIGHT - SOCIAL */}
        <div className='flex-1 flex justify-end items-center gap-3 text-white'>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <FacebookOutlined className='hover:scale-110 transition' />
          </a>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <InstagramOutlined className='hover:scale-110 transition' />
          </a>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <TwitterOutlined className='hover:scale-110 transition' />
          </a>
          <a href='#'>
            <MailOutlined className='hover:scale-110 transition' />
          </a>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <LinkedinOutlined className='hover:scale-110 transition' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
