'use client'

import { useState } from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link2, Check } from 'lucide-react'

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-[15px] font-[500] text-gray-600" id="lato-font">
        Share this teaching:
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="bg-[#C9A24B] p-2 rounded-full hover:bg-[#a87f2d] transition-colors"
      >
        <FaFacebookF className="w-4 h-4 text-white" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="bg-[#C9A24B] p-2 rounded-full hover:bg-[#a87f2d] transition-colors"
      >
        <FaXTwitter className="w-4 h-4 text-white" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link to this post"
        className="bg-[#C9A24B] p-2 rounded-full hover:bg-[#a87f2d] transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <Link2 className="w-4 h-4 text-white" />
        )}
      </button>
      {copied && (
        <span className="text-[14px] text-[#C9A24B]" id="lato-font">
          Link copied!
        </span>
      )}
    </div>
  )
}
