import React from 'react'
import Link from 'next/link'
import { sponsors as defaultSponsors, type Sponsor } from '@/data/sponsors'
import { assetPath } from '@/lib/assetPath'

interface BusinessSponsorsProps {
  sponsors?: Sponsor[]
}

const BusinessSponsors = ({ sponsors = defaultSponsors }: BusinessSponsorsProps) => {
  return (
    <section id="sponsors" className="py-[52px]">
      <div className="w-[90%] mx-auto max-w-[1280px]">
        <h2
          className="font-[400] text-[32px] lg:text-[40px] leading-[110%] text-center mb-[10px]"
          id="faustina-font"
        >
          Our Business Sponsors
        </h2>
        <p
          className="font-[500] text-[18px] lg:text-[20px] leading-[150%] text-center max-w-[760px] mx-auto mb-[40px]"
          id="lato-font"
        >
          We are grateful for the businesses that give to The Way of Yeshua Ministries. Please visit
          them and thank them for supporting this work.
        </p>

        {sponsors.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-[40px] list-none p-0">
            {sponsors.map((sponsor) => (
              <li key={sponsor.url}>
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  aria-label={`${sponsor.name} website (opens in a new tab)`}
                  className="h-full flex flex-col items-center text-center bg-white border border-[#E5DFD3] rounded-lg p-6 shadow-md transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
                >
                  {sponsor.logo && (
                    <img
                      src={assetPath(sponsor.logo)}
                      alt={`${sponsor.name} logo`}
                      className="h-[80px] w-auto max-w-full object-contain mb-4"
                    />
                  )}
                  <p className="font-[500] text-[20px] leading-[140%]" id="lato-font">
                    {sponsor.name}
                  </p>
                  {sponsor.description && (
                    <p className="text-[16px] leading-[150%] text-gray-600 mt-2" id="lato-font">
                      {sponsor.description}
                    </p>
                  )}
                  <span className="text-[16px] text-[#C9A24B] mt-3" id="lato-font">
                    Visit website
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="text-[18px] leading-[150%] text-center" id="lato-font">
          Is your business interested in sponsoring this ministry?{' '}
          <Link href="/#contact" className="text-[#C9A24B] hover:underline">
            Contact us
          </Link>{' '}
          and we will gladly list you here.
        </p>
      </div>
    </section>
  )
}

export default BusinessSponsors
