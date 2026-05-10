import AmmoBoxSection from '@/components/AmmoBoxSection'
import BlogSection from '@/components/BlogSection'
import FireProtectionSection from '@/components/FireProtectionSection'
import HeroSection from '@/components/HeroSection'
import ParallaxSection from '@/components/ParallaxSection'
import ProductSection from '@/components/ProductSection'
import StatsSection from '@/components/StatsSection'

const Home = () => {
  return (
    <>
      <HeroSection />
      <FireProtectionSection />
      <AmmoBoxSection />
      <ParallaxSection />
      <ProductSection />
      <StatsSection />
      <BlogSection />
    </>
  )
}

export default Home
