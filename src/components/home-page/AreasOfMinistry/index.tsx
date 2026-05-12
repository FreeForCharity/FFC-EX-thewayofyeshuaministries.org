import React from 'react'
import Link from 'next/link'

interface Tile {
  href: string
  image: string
  alt: string
  label: string
  external?: boolean
}

const tiles: Tile[] = [
  {
    href: '/prison-program',
    image: '/Images/yeshua/prison-program-hero.jpg',
    alt: 'Hands clasped behind prison bars',
    label: 'Prison Program',
  },
  {
    href: '/build-the-church',
    image: '/Images/yeshua/build-church-hero.jpg',
    alt: 'Open Bible in front of a stained glass window',
    label: 'Build the Church',
  },
  {
    href: '/sponsor-a-tiny-home',
    image: '/Images/yeshua/tiny-home-hero.jpg',
    alt: 'Modern affordable housing project',
    label: 'Sponsor a Tiny Home',
  },
  {
    href: '/automobile-program',
    image: '/Images/yeshua/automobile-program.png',
    alt: 'Cars donated to the ministry',
    label: 'Automobile Program',
  },
  {
    href: '/support-this-ministry',
    image: '/Images/yeshua/ministry-2.jpg',
    alt: 'Support our ministry',
    label: 'Support This Ministry',
  },
  {
    href: 'https://thewayofyeshuaministries.org/store',
    image: '/Images/yeshua/ministry-3.jpg',
    alt: 'Way of Yeshua merchandise',
    label: 'Store',
    external: true,
  },
  {
    href: '#support',
    image: '/Images/yeshua/stand-with-israel.jpg',
    alt: 'We stand with Israel',
    label: 'We Stand With Israel',
  },
  {
    href: '#support',
    image: '/Images/yeshua/donation-qr.png',
    alt: 'QR code for online payment to The Way of Yeshua Ministries Inc.',
    label: 'Donate by QR',
  },
]

const AreasOfMinistry = () => {
  return (
    <section id="areas" className="py-[52px]">
      <div className="w-[90%] mx-auto max-w-[1280px]">
        <h2
          className="font-[400] text-[32px] lg:text-[40px] leading-[110%] text-center mb-[40px]"
          id="faustina-font"
        >
          Tap each photo of our areas of ministry
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tiles.map((tile) => {
            const inner = (
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-md bg-black">
                <img
                  src={tile.image}
                  alt={tile.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-[16px] lg:text-[18px] font-[500]" id="lato-font">
                    {tile.label}
                  </p>
                </div>
              </div>
            )
            if (tile.external) {
              return (
                <a
                  key={tile.label}
                  href={tile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tile.label}
                >
                  {inner}
                </a>
              )
            }
            return (
              <Link key={tile.label} href={tile.href} aria-label={tile.label}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AreasOfMinistry
