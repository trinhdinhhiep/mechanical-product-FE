import { Card, Button } from 'antd'

export interface Product {
  id: number | string // ← accept cả 2
  title: string
  image: string
  link: string
}
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card hoverable bodyStyle={{ padding: 0 }} className='overflow-hidden group'>
      {/* Image */}
      <a href={product.link} className='block'>
        <div className='aspect-square overflow-hidden'>
          <img
            src={product.image}
            alt={product.title}
            loading='lazy'
            className='w-full h-full object-cover transition duration-500 group-hover:scale-105'
          />
        </div>
      </a>

      {/* Content */}
      <div className='p-4 text-center'>
        <Button
          type='primary'
          block
          href={product.link}
          className='!bg-black hover:!bg-gray-800 !border-none uppercase font-bold tracking-wide h-auto py-2'
        >
          {product.title}
        </Button>
      </div>
    </Card>
  )
}
export default ProductCard
