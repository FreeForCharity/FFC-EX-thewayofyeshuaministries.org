import React from 'react'
import PayPalButton from '@/components/ui/PayPalButton'

const SupportMinistry = () => {
  return (
    <section id="support" className="py-[52px]">
      <div className="w-[90%] mx-auto max-w-[1280px]">
        <h2
          className="font-[400] text-[32px] lg:text-[40px] leading-[110%] text-center mb-[10px]"
          id="faustina-font"
        >
          Support This Ministry
        </h2>
        <p
          className="font-[500] text-[18px] lg:text-[20px] leading-[150%] text-center max-w-[760px] mx-auto mb-[40px]"
          id="lato-font"
        >
          Your support and contributions enable us to meet our goals and fund our mission. Give
          online with a credit card, or scan the QR code with your phone&rsquo;s camera.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-[1000px] mx-auto">
          <div className="bg-white border border-[#E5DFD3] rounded-lg p-8 shadow-md flex flex-col items-center">
            <img
              src="/Images/yeshua/donation-qr.png"
              alt="QR code linking to the Zeffy donation form for The Way of Yeshua Ministries Inc."
              className="w-[260px] max-w-full"
            />
            <p className="text-[14px] text-center text-gray-600 mt-3" id="lato-font">
              Scan to give securely via Zeffy (100% fee-free)
            </p>
          </div>

          <div className="space-y-6">
            <a
              href="https://www.zeffy.com/en-US/donation-form/donate-for-our-ministry"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-[27px] px-[24px] py-[16px] bg-[#C9A24B] text-black text-[20px] font-[500] hover:bg-[#a87f2d] transition-colors"
              id="lato-font"
            >
              Give Online (Zeffy)
            </a>

            <div className="flex flex-col items-center gap-2">
              <p className="text-[14px] text-gray-500" id="lato-font">
                Or give with PayPal / Venmo
              </p>
              <PayPalButton hostedButtonId="HAM5646L3JSBW" />
            </div>

            <div className="bg-[#F8F5F0] rounded-lg p-6 text-[16px]" id="lato-font">
              <p className="font-[700] mb-2">Mail a check to:</p>
              <p>
                The Way of Yeshua Ministries
                <br />
                PO Box 1153
                <br />
                Sun City, AZ 85372
              </p>
            </div>

            <p className="text-[14px] text-gray-600" id="lato-font">
              The Way of Yeshua Ministries Inc. is a registered 501(c)(3) nonprofit. Contributions
              are tax-deductible to the extent allowed by law.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportMinistry
