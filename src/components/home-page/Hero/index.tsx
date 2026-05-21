import React from 'react'

const YeshuaHero = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[640px] lg:min-h-[760px] overflow-hidden pt-[80px]"
    >
      {/* Full-bleed photographic hero */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/Images/yeshua/hero-dove-cross.jpg)' }}
        aria-hidden="true"
      />
      {/* Soft dark overlay so text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/70" />

      <div className="relative z-10 w-[90%] max-w-[1100px] mx-auto pt-[60px] pb-[120px] text-center text-white flex flex-col items-center">
        <h1
          className="text-[40px] sm:text-[52px] lg:text-[68px] font-[500] leading-[110%] mb-[24px] drop-shadow-md"
          id="faustina-font"
        >
          The Way of Yeshua Ministries
        </h1>
        <p
          className="text-[20px] lg:text-[24px] font-[400] leading-[150%] mb-[40px] max-w-[760px] drop-shadow"
          id="lato-font"
        >
          Christian Teachings and Community Inspiration &mdash; spreading the Word of God and
          fostering a vibrant faith community.
        </p>
        <div className="flex flex-wrap gap-[12px] justify-center">
          <a
            href="#mission"
            className="rounded-[27px] px-[30px] py-[15px] bg-[#C9A24B] text-black text-[18px] font-[600] hover:bg-[#b18d39] transition-colors"
            id="lato-font"
          >
            Our Mission
          </a>
          <a
            href="#areas"
            className="rounded-[27px] px-[30px] py-[15px] bg-white text-black text-[18px] font-[600] hover:bg-gray-100 transition-colors"
            id="lato-font"
          >
            Areas of Ministry
          </a>
          <a
            href="#support"
            className="rounded-[27px] px-[30px] py-[15px] border-2 border-white text-white text-[18px] font-[600] hover:bg-white hover:text-black transition-colors"
            id="lato-font"
          >
            Support Us
          </a>
        </div>
      </div>
    </section>
  )
}

export default YeshuaHero
