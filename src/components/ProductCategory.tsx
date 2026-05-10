import { Category } from '@/pages/Product'
import { ShoppingOutlined } from '@ant-design/icons'
type Props = {
  categories: Category[]
}
const ProductCategory = ({ categories }: Props) => {
  return (
    <section className='bg-white py-10'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Title */}
        <div className='flex items-center w-full mb-8'>
          <div className='flex-1 h-[2px] bg-black/10' />

          <h2 className='mx-4 flex items-center gap-2 uppercase text-[1.4rem] md:text-[1.6rem] font-normal text-[#b71414]'>
            <ShoppingOutlined className='opacity-60' />
            Nhóm sản phẩm của 83MEC
          </h2>

          <div className='flex-1 h-[2px] bg-black/10' />
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((item, index) => (
            <a key={index} href={item.link} className='block overflow-hidden rounded-xl group'>
              <img
                src={item.image}
                alt={item.alt}
                className='w-full h-full object-cover transition duration-500 group-hover:scale-105'
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
export default ProductCategory
