import { Card } from 'antd'

type Post = {
  title: string
  href: string
  image: string
  excerpt: string
}

export function PostItem({ post }: { post: Post }) {
  return (
    <Card className='mb-6 shadow-sm hover:shadow-lg transition'>
      <div className='flex flex-col md:flex-row gap-4'>
        {/* IMAGE */}
        <a href={post.href} className='md:w-[40%] w-full'>
          <div className='relative w-full pt-[56%] overflow-hidden rounded'>
            <img src={post.image} alt={post.title} className='absolute inset-0 w-full h-full object-cover' />
          </div>
        </a>

        {/* CONTENT */}
        <div className='md:w-[60%] w-full flex flex-col justify-center'>
          <h3 className='text-red-700 text-lg font-medium leading-snug hover:underline'>
            <a href={post.href}>{post.title}</a>
          </h3>

          <div className='w-8 h-[2px] bg-gray-300 my-2' />

          <p className='text-gray-600 text-sm'>{post.excerpt}</p>
        </div>
      </div>
    </Card>
  )
}
