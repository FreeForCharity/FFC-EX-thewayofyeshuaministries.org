'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  formatDate,
  getCategory,
  type BlogPost,
  type BlogCategory,
  ALL_CATEGORIES,
} from '@/data/blog-posts'

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null)

  const filtered = activeCategory
    ? posts.filter((p) => getCategory(p.slug) === activeCategory)
    : posts

  const featured = !activeCategory && posts.length > 0 ? posts[0] : null
  const list = featured ? filtered.slice(1) : filtered

  return (
    <main className="pt-[100px] pb-[60px]">
      <div className="w-[90%] mx-auto max-w-[900px]">
        <h1
          className="font-[400] text-[36px] lg:text-[48px] leading-[110%] mb-[12px]"
          id="faustina-font"
        >
          Blog
        </h1>
        <p className="text-[18px] text-gray-700 mb-[32px]" id="lato-font">
          Reflections, sermons, and statements of faith from The Way of Yeshua Ministries.
        </p>

        {/* Category Filter */}
        <div
          className="flex flex-wrap gap-2 mb-[40px]"
          role="group"
          aria-label="Filter posts by category"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-[16px] py-[8px] rounded-full text-[14px] font-[500] transition-colors cursor-pointer ${
              !activeCategory
                ? 'bg-[#C9A24B] text-black'
                : 'border border-gray-300 text-gray-600 hover:border-[#C9A24B] hover:text-[#C9A24B]'
            }`}
            id="lato-font"
            aria-pressed={!activeCategory}
          >
            All
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-[16px] py-[8px] rounded-full text-[14px] font-[500] transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C9A24B] text-black'
                  : 'border border-gray-300 text-gray-600 hover:border-[#C9A24B] hover:text-[#C9A24B]'
              }`}
              id="lato-font"
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featured && (
          <div className="bg-[#F8F5F0] rounded-lg p-8 mb-[48px]">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span
                className="text-[12px] uppercase tracking-[0.12em] font-[600] px-[10px] py-[3px] rounded-full bg-[#C9A24B] text-black"
                id="lato-font"
              >
                Latest Teaching
              </span>
              <p className="text-[14px] uppercase tracking-[0.15em] text-[#C9A24B]" id="lato-font">
                {formatDate(featured.date)}
              </p>
            </div>
            <h2
              className="font-[400] text-[28px] lg:text-[36px] leading-[120%] mb-3"
              id="faustina-font"
            >
              <Link
                href={`/blog/${featured.slug}`}
                className="hover:text-[#C9A24B] transition-colors"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="text-[17px] leading-[160%] text-gray-700 mb-5" id="lato-font">
              {featured.excerpt}
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="inline-block rounded-[27px] px-[24px] py-[10px] bg-[#C9A24B] text-black text-[15px] font-[500] hover:bg-[#a87f2d] transition-colors"
              id="lato-font"
            >
              Read this week&rsquo;s teaching &rarr;
            </Link>
          </div>
        )}

        {/* Post List */}
        {list.length > 0 && (
          <ul className="space-y-8">
            {list.map((post) => (
              <li key={post.slug} className="border-b border-gray-200 pb-8 last:border-b-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <p
                    className="text-[14px] uppercase tracking-[0.15em] text-[#C9A24B]"
                    id="lato-font"
                  >
                    {formatDate(post.date)}
                  </p>
                  <span
                    className="text-[12px] px-[10px] py-[3px] rounded-full bg-[#F3ECE0] text-[#6B5A3A] font-[500]"
                    id="lato-font"
                  >
                    {getCategory(post.slug)}
                  </span>
                </div>
                <h2
                  className="font-[500] text-[26px] lg:text-[30px] leading-[120%] mb-3"
                  id="faustina-font"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-[#C9A24B] transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-[17px] leading-[160%] text-gray-700 mb-4" id="lato-font">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[#C9A24B] hover:underline text-[16px] font-[500]"
                  id="lato-font"
                >
                  Continue reading &rarr;
                </Link>
              </li>
            ))}
          </ul>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12 text-[17px]" id="lato-font">
            No posts in this category yet.
          </p>
        )}
      </div>
    </main>
  )
}
