import React from 'react'
import Link from 'next/link'

export interface CausePageProps {
  heading: string
  subheading?: string
  body: string | React.ReactNode
  image: string
  imageAlt: string
  donateHref?: string
}

const CausePage: React.FC<CausePageProps> = ({
  heading,
  subheading,
  body,
  image,
  imageAlt,
  donateHref = 'https://pay.thewayofyeshuaministries.org',
}) => {
  return (
    <main className="pt-[80px]">
      <section className="relative w-full h-[420px] lg:h-[520px] overflow-hidden">
        <img src={image} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </section>

      <section className="w-[90%] mx-auto max-w-[900px] py-[60px] text-center">
        {subheading && (
          <h2
            className="text-[18px] tracking-[0.18em] uppercase text-[#2E6F8E] mb-3"
            id="lato-font"
          >
            {subheading}
          </h2>
        )}
        <h1
          className="font-[400] text-[36px] lg:text-[48px] leading-[110%] mb-[24px]"
          id="faustina-font"
        >
          {heading}
        </h1>
        <div
          className="text-[18px] lg:text-[20px] leading-[160%] text-gray-800 space-y-4"
          id="lato-font"
        >
          {typeof body === 'string' ? <p>{body}</p> : body}
        </div>

        <div className="mt-[40px] flex flex-wrap justify-center gap-3">
          <a
            href={donateHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[27px] px-[28px] py-[14px] bg-[#2E6F8E] text-white text-[18px] font-[500] hover:bg-[#235673] transition-colors"
            id="lato-font"
          >
            Donate
          </a>
          <Link
            href="/#contact"
            className="rounded-[27px] px-[28px] py-[14px] border border-[#2E6F8E] text-[#2E6F8E] text-[18px] font-[500] hover:bg-[#2E6F8E] hover:text-white transition-colors"
            id="lato-font"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}

export default CausePage
