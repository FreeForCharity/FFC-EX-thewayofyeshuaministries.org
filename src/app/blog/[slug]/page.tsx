import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublishedPosts, getPost, formatDate, getCategory } from '@/data/blog-posts'

export const dynamicParams = false

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) {
    return { title: 'Post not found' }
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <main className="pt-[100px] pb-[60px]">
      <article className="w-[90%] mx-auto max-w-[800px]">
        <Link
          href="/blog"
          className="text-[#C9A24B] hover:underline text-[15px] font-[500] inline-block mb-6"
          id="lato-font"
        >
          &larr; Back to Blog
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <p className="text-[14px] uppercase tracking-[0.15em] text-[#C9A24B]" id="lato-font">
            {formatDate(post.date)}
          </p>
          <span
            className="text-[12px] px-[10px] py-[3px] rounded-full bg-[#F3ECE0] text-[#6B5A3A] font-[500]"
            id="lato-font"
          >
            {getCategory(post.slug)}
          </span>
        </div>

        <h1
          className="font-[400] text-[34px] lg:text-[42px] leading-[115%] mb-[28px]"
          id="faustina-font"
        >
          {post.title}
        </h1>

        <div className="text-[18px] leading-[170%] text-gray-800 space-y-5" id="lato-font">
          {post.body.map((paragraph, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="rounded-[27px] px-[24px] py-[12px] border border-[#C9A24B] text-[#C9A24B] text-[16px] font-[500] hover:bg-[#C9A24B] hover:text-black transition-colors"
            id="lato-font"
          >
            More Posts
          </Link>
          <Link
            href="/#support"
            className="rounded-[27px] px-[24px] py-[12px] bg-[#C9A24B] text-black text-[16px] font-[500] hover:bg-[#a87f2d] transition-colors"
            id="lato-font"
          >
            Support This Ministry
          </Link>
        </div>
      </article>
    </main>
  )
}
