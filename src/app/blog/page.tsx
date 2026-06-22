import type { Metadata } from 'next'
import { getPublishedPosts } from '@/data/blog-posts'
import BlogIndexClient from './BlogIndexClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Reflections, sermons, and statements of faith from The Way of Yeshua Ministries.',
}

export default function BlogIndex() {
  const posts = getPublishedPosts().sort((a, b) => b.date.localeCompare(a.date))
  return <BlogIndexClient posts={posts} />
}
