import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DownOutlined, UserOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { ROUTES } from '@/utils/routes'
import { useGetAllCategoriesQuery } from '@/services/productsApi'
import SearchBox from '@/components/SearchBox'

interface MenuItem {
  id: number
  label: string
  href: string
  active?: boolean
  children?: MenuNode[]
  mega?: boolean
}

interface MenuChild {
  key: string
  title: string
  slug: string
}

interface MenuNode {
  key: string
  title: string
  slug: string
  children: MenuChild[]
}

const menuItems: MenuItem[] = [
  { id: 1, label: 'Trang chủ', href: ROUTES.home, active: true },
  { id: 2, label: 'Giới thiệu', href: ROUTES.introduction },
  { id: 3, label: 'Sản phẩm', href: ROUTES.product.index, children: [], mega: true },
  { id: 4, label: 'Thư viện kỹ thuật 2D, 3D', href: ROUTES.techLib },
  { id: 5, label: 'Tin tức', href: ROUTES.news.index },
  { id: 6, label: 'Liên hệ', href: ROUTES.contact },
]

const Navbar = () => {
  const { data: categoriesData = [] } = useGetAllCategoriesQuery()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState<number | null>(null)

  const toggleMobileMenu = (id: number) => {
    setOpenMobileMenu(openMobileMenu === id ? null : id)
  }
  const productMenu: MenuNode[] = categoriesData.map((cat) => ({
    key: cat.slug,
    title: cat.name,
    slug: cat.slug,
    children: cat.products.map((p) => ({
      key: p.slug,
      title: p.title,
      slug: p.slug,
    })),
  }))

  // thêm children vào đúng menu item có id = 3 (Sản phẩm)
  const dynamicMenuItems = menuItems.map((item) => (item.id === 3 ? { ...item, children: productMenu } : item))

  return (
    <>
      {/* ===== DESKTOP NAVBAR ===== */}
      <div className='sticky top-0 z-50 w-full bg-[#2d2f84] text-white'>
        {/* Desktop */}
        <div className='hidden lg:flex items-center justify-between px-4 h-11'>
          <div className='flex items-center gap-4 text-sm'>
            {dynamicMenuItems.map((item, index) => {
              const isActive =
                item.href === '/' ? location.pathname === item.href : location.pathname.startsWith(item.href)
              return (
                <div key={index} className='flex items-center'>
                  {item.mega ? (
                    <div className='relative group'>
                      <Link
                        to={item.href!}
                        className={`cursor-pointer flex items-center gap-1 px-2 ${isActive ? 'text-yellow-300' : ''}`}
                      >
                        {item.label}
                        <DownOutlined className='text-xs opacity-70' />
                      </Link>
                      <div
                        className='absolute top-full left-0 bg-white shadow-xl border-2 border-[#2D2F84] p-5
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50'
                      >
                        <div className='flex flex-col gap-4 min-w-[300px]'>
                          {item.children?.map((col: MenuNode, i: number) => (
                            <div key={i} className='pr-4'>
                              <Link
                                to={ROUTES.product.category(col.slug)}
                                className={`block font-bold text-xs uppercase mb-2 ${
                                  location.pathname.startsWith(ROUTES.product.category(col.slug))
                                    ? 'text-[#2D2F84]'
                                    : 'text-black'
                                }`}
                              >
                                {col.title}
                              </Link>
                              {col.children?.map((sub: MenuChild, j: number) => (
                                <Link
                                  key={j}
                                  to={ROUTES.product.detail(col.slug, sub.slug)}
                                  className={`block text-sm py-1 px-2 rounded ${
                                    location.pathname === ROUTES.product.detail(col.slug, sub.slug)
                                      ? 'text-[#2D2F84] bg-gray-100 font-semibold'
                                      : 'text-gray-600 hover:text-[#2D2F84] hover:bg-gray-100'
                                  }`}
                                >
                                  {sub.title}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link to={item.href!} className={`px-2 hover:text-yellow-300 ${isActive ? 'text-yellow-300' : ''}`}>
                      {item.label}
                    </Link>
                  )}
                  {index !== dynamicMenuItems.length - 1 && <span className='text-white/50'>|</span>}
                </div>
              )
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className='flex items-center gap-3'>
            <SearchBox size='small' />
            {/* <Link to='/login' className='flex items-center gap-1 hover:text-yellow-300'>
              <UserOutlined />
              <span>Đăng nhập</span>
            </Link> */}
          </div>
        </div>

        {/* ===== MOBILE TOPBAR ===== */}
        {!mobileOpen && (
          <div className='flex lg:hidden items-center justify-between px-4 h-12'>
            {/* Logo / Brand placeholder - thay bằng logo thật nếu có */}
            <Link to='/' className='text-white font-bold text-base tracking-wide'>
              PCCC
            </Link>

            <div className='flex items-center gap-3'>
              {/* Hamburger */}
              <button
                className='text-white hover:text-yellow-300'
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label='Toggle menu'
              >
                {<MenuOutlined style={{ fontSize: 20 }} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== MOBILE DRAWER ===== */}
      {/* Overlay */}
      {mobileOpen && <div className='fixed inset-0 bg-black/50 z-40 lg:hidden' onClick={() => setMobileOpen(false)} />}

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-[#2d2f84] z-50 lg:hidden
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header của drawer */}
        <div className='flex items-center justify-between px-4 h-12 border-b border-white/20'>
          <span className='text-white font-bold'>Menu</span>
          <button className='text-white' onClick={() => setMobileOpen(false)}>
            <CloseOutlined style={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Search trong drawer */}
        <div className='px-4 py-3 border-b border-white/20'>
          <SearchBox size='middle' onNavigate={() => setMobileOpen(false)} />
        </div>

        {/* Menu items */}
        <nav className='py-2'>
          {dynamicMenuItems.map((item) => {
            const isActive =
              item.href === '/' ? location.pathname === item.href : location.pathname.startsWith(item.href)
            return (
              <div key={item.id}>
                {item.mega ? (
                  <>
                    {/* Accordion trigger */}
                    <div className='flex items-center w-full'>
                      <Link
                        to={item.href!}
                        onClick={() => setMobileOpen(false)}
                        className={`flex-1 px-4 py-3 text-sm hover:bg-white/10 ${
                          location.pathname.startsWith(item.href!) ? 'text-yellow-300' : 'text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() => toggleMobileMenu(item.id)}
                        className='px-4 py-3 text-white hover:bg-white/10'
                      >
                        <DownOutlined
                          className={`text-xs opacity-70 transition-transform duration-200 ${
                            openMobileMenu === item.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Accordion content */}
                    {openMobileMenu === item.id && (
                      <div className='bg-white/5 px-4 pb-2'>
                        <div className='max-h-[300px] overflow-y-auto'>
                          {item.children?.map((col: MenuNode, i: number) => (
                            <div key={i} className='mt-2'>
                              <Link
                                to={ROUTES.product.category(col.slug)}
                                onClick={() => setMobileOpen(false)} // 👈 thêm
                                className={`text-xs font-bold uppercase mb-1 pt-1 ${
                                  location.pathname.startsWith(ROUTES.product.category(col.slug))
                                    ? 'text-yellow-300'
                                    : 'text-white/60'
                                }`}
                              >
                                {col.title}
                              </Link>
                              {col.children?.map((sub: MenuChild, j: number) => (
                                <Link
                                  key={j}
                                  to={ROUTES.product.detail(col.slug, sub.slug)}
                                  onClick={() => setMobileOpen(false)} // 👈 thêm
                                  className={`block text-sm py-1.5 pl-2 border-l hover:text-white ${
                                    location.pathname === ROUTES.product.detail(col.slug, sub.slug)
                                      ? 'text-yellow-300 border-yellow-300'
                                      : 'text-white/80 border-white/20 hover:border-yellow-300'
                                  }`}
                                >
                                  {sub.title}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href!}
                    className={`block px-4 py-3 text-sm hover:bg-white/10 ${isActive ? 'text-yellow-300' : 'text-white'}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        {/* Login */}
        <div className='px-4 py-3 border-t border-white/20 mt-2'>
          <Link to='/login' className='flex items-center gap-2 text-white hover:text-yellow-300 text-sm'>
            <UserOutlined />
            <span>Đăng nhập</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
