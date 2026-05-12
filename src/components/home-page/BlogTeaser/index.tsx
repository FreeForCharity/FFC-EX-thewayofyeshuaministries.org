import React from 'react'
import Link from 'next/link'
import { blogPosts, formatDate } from '@/data/blog-posts'

const BlogTeaser = () => {
  const recent = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

  return (
    <section id="blog" className="py-[52px]">
      <div className="w-[90%] mx-auto max-w-[1280px]">
        <h2
          className="font-[400] text-[32px] lg:text-[40px] leading-[110%] text-center mb-[10px]"
          id="faustina-font"
        >
          From the Blog
        </h2>
        <p className="text-[18px] text-center text-gray-700 mb-[40px]" id="lato-font">
          Reflections, sermons, and statements of faith.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recent.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-[#E5DFD3] rounded-lg p-6 shadow-sm flex flex-col"
            >
              <p
                className="text-[13px] uppercase tracking-[0.15em] text-[#2E6F8E] mb-2"
                id="lato-font"
              >
                {formatDate(post.date)}
              </p>
              <h3 className="font-[500] text-[22px] leading-[125%] mb-3" id="faustina-font">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[#2E6F8E] transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-[15px] leading-[160%] text-gray-700 mb-4 flex-1" id="lato-font">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-[#2E6F8E] hover:underline text-[15px] font-[500] mt-auto"
                id="lato-font"
              >
                Continue reading &rarr;
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-[40px]">
          <Link
            href="/blog"
            className="inline-block rounded-[27px] px-[28px] py-[12px] border border-[#2E6F8E] text-[#2E6F8E] text-[16px] font-[500] hover:bg-[#2E6F8E] hover:text-white transition-colors"
            id="lato-font"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogTeaser
