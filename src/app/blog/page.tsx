import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts, formatDate } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Reflections, sermons, and statements of faith from The Way of Yeshua Ministries.',
}

export default function BlogIndex() {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <main className="pt-[100px] pb-[60px]">
      <div className="w-[90%] mx-auto max-w-[900px]">
        <h1
          className="font-[400] text-[36px] lg:text-[48px] leading-[110%] mb-[12px]"
          id="faustina-font"
        >
          Blog
        </h1>
        <p className="text-[18px] text-gray-700 mb-[40px]" id="lato-font">
          Reflections, sermons, and statements of faith from The Way of Yeshua Ministries.
        </p>

        <ul className="space-y-8">
          {sorted.map((post) => (
            <li key={post.slug} className="border-b border-gray-200 pb-8 last:border-b-0">
              <p
                className="text-[14px] uppercase tracking-[0.15em] text-[#2E6F8E] mb-2"
                id="lato-font"
              >
                {formatDate(post.date)}
              </p>
              <h2
                className="font-[500] text-[26px] lg:text-[30px] leading-[120%] mb-3"
                id="faustina-font"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[#2E6F8E] transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-[17px] leading-[160%] text-gray-700 mb-4" id="lato-font">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-[#2E6F8E] hover:underline text-[16px] font-[500]"
                id="lato-font"
              >
                Continue reading &rarr;
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
