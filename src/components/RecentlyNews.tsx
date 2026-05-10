import { useScrollDirection } from '@/hooks/useScrollDirection'
import clsx from 'clsx'

type RecentPost = {
  title: string
  href: string
}

export function RecentlyNews({ posts }: { posts: RecentPost[] }) {
  const scrollDir = useScrollDirection()
  return (
    <aside
      className={clsx('p-4 transition-all duration-300', scrollDir === 'down' ? 'lg:sticky lg:top-24' : 'relative')}
    >
      <h3 className='text-lg font-medium text-red-700 mb-4'>Recently News</h3>

      <ul className='space-y-3'>
        {posts.map((post, i) => (
          <li key={i}>
            <a href={post.href} className='text-gray-800 hover:text-red-600 text-sm transition'>
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
