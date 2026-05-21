import React from 'react'

const VerseBanner = () => {
  return (
    <section
      className="relative py-[80px] bg-cover bg-center"
      style={{
        backgroundImage: 'url(/Images/yeshua/gallery-3.jpg)',
      }}
      aria-label="Scripture banner"
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative w-[90%] mx-auto max-w-[1000px] text-center text-white">
        <p
          className="text-[24px] lg:text-[32px] leading-[140%] italic font-[400]"
          id="faustina-font"
        >
          &ldquo;I press on towards the mark for the prize of the high calling of YHWH in Yeshua
          HaMashiach.&rdquo;
        </p>
        <p className="mt-4 text-[18px] lg:text-[20px] tracking-[0.1em] uppercase" id="lato-font">
          Philippians 3:14
        </p>
      </div>
    </section>
  )
}

export default VerseBanner
