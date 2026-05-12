'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get('name') || '').toString().trim()
    const email = (data.get('email') || '').toString().trim()
    const message = (data.get('message') || '').toString().trim()
    const subject = `Website inquiry from ${name || 'visitor'}`
    const body = `From: ${name} <${email}>\n\n${message}`
    const mailto = `mailto:Info@thewayofyeshuaministries.org?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-[52px] bg-[#F8F5F0]">
      <div className="w-[90%] mx-auto max-w-[1280px]">
        <h2
          className="font-[400] text-[32px] lg:text-[40px] leading-[110%] text-center mb-[40px]"
          id="faustina-font"
        >
          Contact Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6" id="lato-font">
            <div>
              <h3 className="text-[24px] font-[500] mb-2">Questions or Comments</h3>
              <p className="text-[17px] leading-[150%]">
                Feel free to send us a message or ask a question about Bible teachings or our faith
                community. We will do our best to respond soon with some inspirational videos or
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

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 shadow-md space-y-4"
            id="lato-font"
          >
            <h3 className="text-[24px] font-[500]">Get in Touch</h3>

            <div>
              <label htmlFor="contact-name" className="block text-[14px] font-[500] mb-1">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-[14px] font-[500] mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-[14px] font-[500] mb-1">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-[27px] px-6 py-3 bg-[#C9A24B] text-black text-[18px] font-[500] hover:bg-[#a87f2d] transition-colors"
            >
              Send
            </button>

            {submitted && (
              <p className="text-[14px] text-green-700">
                Your email client should have opened — finish sending the message from there.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
