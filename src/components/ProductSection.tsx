import { Link } from 'react-router-dom'

export default function ProductSection() {
  const products = [
    {
      title: 'THIẾT BỊ PHÒNG CHÁY CHỮA CHÁY',
      img: 'https://hevtech.vn/uploads/images/products/Banner-thiet-bi-pccc-bqp.jpg',
      link: '/product/thiet-bi-pccc-bqp',
    },
    {
      title: 'TRỤ CỨU HỎA',
      img: 'https://hevtech.vn/uploads/images/products/Banner-tru-cuu-hoa-3-cua-Bo-Quoc-Phong-1.jpg',
      link: '/product/tru-cuu-hoa-BQP',
    },
    {
      title: 'BÌNH CHỮA CHÁY',
      img: 'https://hevtech.vn/uploads/images/products/Decription-binh-chua-chay-83MEC-1.jpeg',
      link: '/product/binh-chua-chay-BQP',
    },
  ]

  return (
    <section className='w-full py-16'>
      <div className='max-w-[1700px] mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {products.map((item, index) => (
            <div key={index} className='group relative overflow-hidden rounded-[55px] cursor-pointer'>
              {/* IMAGE (VUÔNG) */}
              <div className='relative pt-[100%]'>
                <img
                  src={item.img}
                  alt={item.title}
                  className='absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110'
                />
              </div>

              {/* OVERLAY */}
              <div className='absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500' />

              {/* TEXT */}
              <div className='absolute bottom-0 left-0 w-full p-6 text-white 	text-center'>
                <h3 className='text-lg md:text-xl font-semibold leading-snug'>{item.title}</h3>
              </div>

              <Link to={item.link} className='absolute inset-0' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
