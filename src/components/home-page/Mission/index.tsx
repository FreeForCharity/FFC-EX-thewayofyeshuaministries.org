import React from 'react'

const Mission = () => {
  return (
    <div id="mission" className="py-[52px]">
      <div className="w-[90%] mx-auto py-[27px] mb-[60px] max-w-[1280px]">
        <h1
          className="font-[400] text-[40px] lg:text-[48px] leading-[100%] tracking-[0] text-center w-full lg:w-[906px] mx-auto mb-[50px]"
          id="faustina-font"
        >
          About Our Ministry
        </h1>
        <p
          className="font-[700] text-[25px] leading-[150%] tracking-[0] text-center mb-[30px]"
          id="lato-font"
        >
          Our Mission
        </p>
        <p
          className="font-[500] text-[22px] leading-[150%] tracking-[0] text-center max-w-[900px] mx-auto"
          id="lato-font"
        >
          We are dedicated to spreading the Bible teachings and fostering a vibrant faith
          community. Our mission is to inspire individuals through inspirational videos to deepen
          their relationship with God and actively live out their faith.
        </p>
        <div className="mt-[50px] flex justify-center">
          <div className="w-full max-w-[800px] aspect-video rounded-lg shadow-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/8YYBFKrrvMA"
              title="Jesus is God and the Bible is final - The Way of Yeshua"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="w-[95%] mt-[50px] mx-auto border border-[#2B627B]"></div>
    </div>
  )
}

export default Mission
