import React from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="py-[52px] bg-[#F8F5F0]">
      <div className="w-[90%] mx-auto max-w-[640px]">
        <h2
          className="font-[400] text-[32px] lg:text-[40px] leading-[110%] text-center mb-[40px]"
          id="faustina-font"
        >
          Contact Us
        </h2>

        <div className="space-y-6" id="lato-font">
          <div className="text-center">
            <h3 className="text-[24px] font-[500] mb-2">Questions or Comments</h3>
            <p className="text-[17px] leading-[150%]">
              Feel free to reach out by phone or email with questions about Bible teachings or our
              faith community. We will do our best to respond soon with some inspirational videos or
              useful information.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-7 h-7 text-[#C9A24B] flex-shrink-0 mt-1" />
            <div>
              <p className="font-[700]">Phone</p>
              <a
                href="tel:5203024034"
                className="text-[17px] hover:text-[#C9A24B] transition-colors"
              >
                (520) 302-4034
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-7 h-7 text-[#C9A24B] flex-shrink-0 mt-1" />
            <div>
              <p className="font-[700]">Email</p>
              <a
                href="mailto:Info@thewayofyeshuaministries.org"
                className="text-[17px] hover:text-[#C9A24B] transition-colors break-all"
              >
                Info@thewayofyeshuaministries.org
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-7 h-7 text-[#C9A24B] flex-shrink-0 mt-1" />
            <div>
              <p className="font-[700]">Mailing Address</p>
              <p className="text-[17px]">
                9802 W. Bell Road #1153
                <br />
                Sun City, AZ 85351
                <br />
                <span className="text-gray-600 text-[15px]">
                  Or PO Box 1153, Sun City, AZ 85372
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-7 h-7 text-[#C9A24B] flex-shrink-0 mt-1" />
            <div>
              <p className="font-[700]">Hours</p>
              <p className="text-[17px]">09:00 – 17:00 daily</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
