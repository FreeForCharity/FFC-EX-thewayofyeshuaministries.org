'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer: React.FC = () => {
  const currentYear = React.useMemo(() => new Date().getFullYear(), [])
  const socialLinks = [
    {
      icon: FaFacebookF,
      href: 'https://www.facebook.com/share/17jNKWp2ym/',
      label: 'Facebook',
    },
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/thewayofyeshuaministries',
      label: 'Instagram',
    },
    {
      icon: FaLinkedinIn,
      href: 'https://www.linkedin.com/in/the-way-of-yeshua-ministries-3b6677393',
      label: 'LinkedIn',
    },
    {
      icon: FaXTwitter,
      href: 'https://www.x.com/BearupPatr47212',
      label: 'X (Twitter)',
    },
    {
      icon: FaYoutube,
      href: 'https://www.youtube.com/@thewayofyeshuaministries',
      label: 'YouTube',
    },
  ]
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-12 px-4 md:px-6 lg:px-8">
        {/* Column 1: About */}
        <div className="space-y-6 px-4 sm:px-0">
          <h3 className="text-[28px] text-white">The Way of Yeshua Ministries</h3>
          <p className="font-[500] text-[16px] leading-[150%]" id="aria-font">
            Spreading the Bible teachings and fostering a vibrant faith community through
            inspirational videos and outreach.
          </p>
          <p className="font-[500] text-[16px] italic leading-[150%]" id="aria-font">
            &ldquo;I press on towards the mark for the prize of the high calling of YHWH in Yeshua
            HaMashiach.&rdquo;
            <br />
            <span className="not-italic">— Philippians 3:14</span>
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-6 px-4 sm:px-0">
          <h3 className="text-[28px] text-white">Quick Links</h3>

          <ul className="space-y-2 text-sm" id="lato-font">
            {[
              { name: 'Home', href: '/#hero' },
              { name: 'Our Mission', href: '/#mission' },
              { name: 'Areas of Ministry', href: '/#areas' },
              { name: 'Blog', href: '/blog' },
              { name: 'Support', href: '/#support' },
              { name: 'Contact', href: '/#contact' },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-[#F58C23] hover:tracking-widest transition-all text-[16px] font-[500]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <h4 className="text-[28px] text-white">Policies</h4>
            <ul className="space-y-1 text-sm" id="lato-font">
              {[
                {
                  name: 'Privacy Policy',
                  href: '/privacy-policy',
                },
                {
                  name: 'Cookie Policy',
                  href: '/cookie-policy',
                },
                {
                  name: 'Terms of Service',
                  href: '/terms-of-service',
                },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-[#F58C23] hover:tracking-widest transition-all text-[16px] font-[500]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 3: Contact Us */}
        <div className="space-y-6 px-4 sm:px-0">
          <h3 className="text-[28px] text-white">Contact Us</h3>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-10 h-10 text-[#C9A24B] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-[500] text-[22px]">Email</p>
                <a
                  href="mailto:Info@thewayofyeshuaministries.org"
                  className="font-[500] text-[15px] hover:text-[#C9A24B] transition-colors break-all"
                  id="aria-font"
                >
                  Info@thewayofyeshuaministries.org
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-10 h-10 text-[#C9A24B] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-[500] text-[22px]">Phone</p>
                <a
                  href="tel:5203024034"
                  className="font-[500] text-[16px] hover:text-[#C9A24B] transition-colors"
                  id="aria-font"
                >
                  (520) 302-4034
                </a>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=9802+W+Bell+Road+%231153+Sun+City+AZ+85351"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open mailing address in Google Maps"
              className="flex items-start gap-3 hover:opacity-80 transition-opacity"
            >
              <MapPin className="w-10 h-10 text-[#C9A24B] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-[500] text-[22px]">Mailing Address</p>
                <p className="font-[500] text-[16px]" id="aria-font">
                  9802 W. Bell Road #1153
                  <br />
                  Sun City, AZ 85351
                </p>
              </div>
            </a>

            <div className="flex items-start gap-3">
              <MapPin className="w-10 h-10 text-[#C9A24B] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-[500] text-[22px]">PO Box</p>
                <p className="font-[500] text-[16px]" id="aria-font">
                  PO Box 1153
                  <br />
                  Sun City, AZ 85372
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 flex-wrap">
              {socialLinks.map(({ icon: Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="bg-[#C9A24B] p-2 rounded-full hover:bg-[#a87f2d] transition-colors"
                >
                  <Icon className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="mt-12 py-6 px-4 border-t border-gray-800 text-center text-[18px] font-[500] w-full space-y-2"
        id="aria-font"
      >
        <p>
          © {currentYear} The Way of Yeshua Ministries — All Rights Reserved. | Supported by{' '}
          <Link
            href="https://freeforcharity.org"
            className="underline text-[#2EA3F2] hover:text-[#2EA3F2] transition-colors"
          >
            Free For Charity
          </Link>{' '}
          |{' '}
          <Link
            href="https://freeforcharity.org/hub/"
            className="underline text-[#2EA3F2] hover:text-[#2EA3F2] transition-colors"
          >
            Supported Charity Login
          </Link>
        </p>
        <p className="text-[14px] text-gray-400">
          The Way of Yeshua Ministries Inc. is a registered 501(c)(3) nonprofit.
        </p>
      </div>
    </footer>
  )
}

export default Footer
