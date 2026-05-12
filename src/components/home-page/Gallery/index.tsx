'use client'

import React, { useState, useEffect } from 'react'

const images = [
  { src: '/Images/yeshua/gallery-1.jpg', alt: 'Open Bible illuminated by candlelight' },
  { src: '/Images/yeshua/gallery-2.jpg', alt: 'Hands joined in prayer' },
  { src: '/Images/yeshua/gallery-3.jpg', alt: 'Stained glass window with cross motif' },
  { src: '/Images/yeshua/gallery-4.jpg', alt: 'A wooden cross against a bright sky' },
  { src: '/Images/yeshua/gallery-5.jpg', alt: 'A devout moment of worship' },
  { src: '/Images/yeshua/hero-dove-cross.jpg', alt: 'White dove near a cross and open Bible' },
]

const Gallery = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [])

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <section id="gallery" className="py-[52px] bg-[#F8F5F0]">
      <div className="w-[90%] mx-auto max-w-[1280px]">
        <h2
          className="font-[400] text-[32px] lg:text-[40px] leading-[110%] text-center mb-[40px]"
          id="faustina-font"
        >
          Through the Eyes of the Devout: A Gallery of Religious Experiences
        </h2>

        <div className="relative w-full max-w-[1000px] mx-auto aspect-[16/9] rounded-lg overflow-hidden shadow-lg bg-black">
          {images.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#000000] w-10 h-10 rounded-full flex items-center justify-center shadow"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#000000] w-10 h-10 rounded-full flex items-center justify-center shadow"
          >
            &#8250;
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === index ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
