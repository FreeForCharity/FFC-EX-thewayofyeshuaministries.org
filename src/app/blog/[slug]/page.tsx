import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getPost, formatDate } from '@/data/blog-posts'

export const dynamicParams = false

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
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
          className="text-[#2E6F8E] hover:underline text-[15px] font-[500] inline-block mb-6"
          id="lato-font"
        >
          &larr; Back to Blog
        </Link>

        <p className="text-[14px] uppercase tracking-[0.15em] text-[#2E6F8E] mb-3" id="lato-font">
          {formatDate(post.date)}
        </p>

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
            className="rounded-[27px] px-[24px] py-[12px] border border-[#2E6F8E] text-[#2E6F8E] text-[16px] font-[500] hover:bg-[#2E6F8E] hover:text-white transition-colors"
            id="lato-font"
          >
            More Posts
          </Link>
          <Link
            href="/#support"
            className="rounded-[27px] px-[24px] py-[12px] bg-[#2E6F8E] text-white text-[16px] font-[500] hover:bg-[#235673] transition-colors"
            id="lato-font"
          >
            Support This Ministry
          </Link>
        </div>
      </article>
    </main>
  )
}
