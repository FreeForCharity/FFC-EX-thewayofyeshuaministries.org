import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'You are offline',
  description: 'Please check your connection and try again.',
}

export default function OfflinePage() {
  return (
    <main className="pt-[120px] pb-[80px]">
      <div className="w-[90%] mx-auto max-w-[600px] text-center">
        <p className="text-[60px] mb-4" aria-hidden="true">
          ✝
        </p>
        <h1
          className="font-[400] text-[36px] lg:text-[44px] leading-[110%] mb-4"
          id="faustina-font"
        >
          You&rsquo;re offline
        </h1>
        <p className="text-[18px] leading-[160%] text-gray-700 mb-8" id="lato-font">
          It looks like you&rsquo;ve lost your internet connection. Pages you&rsquo;ve already
          visited are available below. Check your connection and try again when you&rsquo;re ready.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/blog/"
            className="rounded-[27px] px-[24px] py-[12px] bg-[#C9A24B] text-black text-[16px] font-[500] hover:bg-[#a87f2d] transition-colors"
            id="lato-font"
          >
            Browse Teachings
          </Link>
          <Link
            href="/"
            className="rounded-[27px] px-[24px] py-[12px] border border-[#C9A24B] text-[#C9A24B] text-[16px] font-[500] hover:bg-[#C9A24B] hover:text-black transition-colors"
            id="lato-font"
          >
            Go Home
          </Link>
        </div>
        <p className="text-[14px] text-gray-500 mt-10" id="lato-font">
          &ldquo;I am with you always, to the end of the age.&rdquo; &mdash; Matthew 28:20
        </p>
      </div>
    </main>
  )
}
