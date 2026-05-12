import React from 'react'

const items = [
  'Videos of the development of our church building and property',
  'Podcasts available for download',
  'Our food pantry, opening shortly',
  'Way of Yeshua merchandise',
]

const ComingSoon = () => {
  return (
    <section id="coming-soon" className="py-[52px] bg-[#F8F5F0]">
      <div className="w-[90%] mx-auto max-w-[1280px]">
        <h2
          className="font-[400] text-[32px] lg:text-[40px] leading-[110%] text-center mb-[10px]"
          id="faustina-font"
        >
          Coming Soon
        </h2>
        <h3
          className="font-[500] text-[20px] lg:text-[24px] leading-[140%] text-center mb-[30px] text-[#2E6F8E]"
          id="lato-font"
        >
          Exploring Thewayofyeshuaministries.org
        </h3>

        <ul className="max-w-[700px] mx-auto space-y-3 text-[18px] text-center" id="lato-font">
          {items.map((item) => (
            <li key={item} className="leading-[150%]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ComingSoon
