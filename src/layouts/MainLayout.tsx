import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopHeader from '@/components/TopHeader'
import MainHeader from '@/components/MainHeader'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/commons/ScrollToTop'

export const MainLayout = () => {
  const [isSticky, setIsSticky] = useState(false)
  const navbarRef = useRef<HTMLDivElement>(null)
  const navbarOffsetRef = useRef(0)

  useEffect(() => {
    if (navbarRef.current) {
      navbarOffsetRef.current = navbarRef.current.offsetTop
    }

    const handleScroll = () => {
      setIsSticky(window.scrollY > navbarOffsetRef.current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='layout'>
      <ScrollToTop />
      <div className='header'>
        <TopHeader />
        <MainHeader />
        {isSticky && <div style={{ height: navbarRef.current?.offsetHeight }} />}
        <div ref={navbarRef} className={isSticky ? 'fixed top-0 left-0 w-full z-50 shadow-md' : ''}>
          <Navbar />
        </div>
      </div>

      <div className='main'>
        <Outlet />
      </div>

      <div className='footer'>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
