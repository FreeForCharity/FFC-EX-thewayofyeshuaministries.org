import React from 'react'
import Image from 'next/image'

const YeshuaHero = () => {
  return (
    <div id="hero" className="relative w-full pb-[100px] overflow-hidden">
      {/* Base sky-blue layer */}
      <div className="absolute inset-0 bg-[#2E6F8E]" />
      {/* Subtle light diagonal strip */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          clipPath: 'polygon(0% 108%, 100% 32%, 100% 35%, 0% 111%)',
        }}
      />
      {/* Warm bottom-right section */}
      <div
        className="absolute inset-0 bg-[#C9A24B]"
        style={{
          clipPath: 'polygon(0% 111%, 100% 35%, 100% 100%, 0% 100%)',
        }}
      />

      <div className="hero-container flex flex-col lg:flex-row gap-[40px] lg:gap-[0px] items-center justify-between relative z-10 text-white pt-[130px] w-[90%] mx-auto max-w-[1280px] lg:px-[20px]">
        <div className="w-full lg:w-[565px]">
          <h1
            className="text-[44px] lg:text-[56px] font-[500] text-[#FFFFFF] leading-[120%] mb-[20px]"
            id="faustina-font"
          >
            The Way of Yeshua Ministries
          </h1>
          <p
            className="text-[22px] font-[400] leading-[140%] text-[#FFFFFF] mb-[30px]"
            id="lato-font"
          >
            Christian Teachings and Community Inspiration — spreading the Word of God and fostering
            a vibrant faith community.
          </p>
          <div className="flex flex-wrap gap-[10px]">
            <a
              href="#mission"
              className="w-[230px] h-[54px] rounded-[27px] px-[32px] py-[18px] flex items-center justify-center gap-[10px] bg-[#FFFFFF] text-[#113563] text-[20px] font-[500] leading-[100%] whitespace-nowrap"
              id="lato-font"
            >
              Our Mission
            </a>
            <a
              href="#contact"
              className="w-[230px] h-[54px] rounded-[27px] px-[32px] py-[18px] flex items-center justify-center gap-[10px] bg-[#FFFFFF] text-[#113563] text-[20px] font-[500] leading-[100%] whitespace-nowrap"
              id="lato-font"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Right side hero image */}
        <div className="relative w-full max-w-[445px] aspect-square bg-white rounded-full p-8 flex items-center justify-center">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/Images/yeshua/hero-dove-cross.jpg"
              alt="A white dove flying near a wooden cross and an open Bible"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 445px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default YeshuaHero
