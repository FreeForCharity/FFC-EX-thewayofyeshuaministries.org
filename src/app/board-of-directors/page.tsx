import type { Metadata } from 'next'
import Link from 'next/link'
import { assetPath } from '@/lib/assetPath'
import { boardMembers, getInitials } from '@/data/leadership'

export const metadata: Metadata = {
  title: 'Board of Directors',
  description:
    'Meet the board of directors of The Way of Yeshua Ministries, a 501(c)(3) nonprofit based in Sun City, Arizona. Learn who leads the ministry and what we do.',
}

export default function BoardOfDirectors() {
  return (
    <main className="pt-[80px]">
      {/* Page header */}
      <section className="bg-black text-white">
        <div className="w-[90%] mx-auto max-w-[900px] py-[70px] text-center">
          <h2
            className="text-[18px] tracking-[0.18em] uppercase text-[#C9A24B] mb-3"
            id="lato-font"
          >
            About Us
          </h2>
          <h1 className="font-[400] text-[36px] lg:text-[48px] leading-[110%]" id="faustina-font">
            Our Board of Directors
          </h1>
        </div>
      </section>

      {/* Who we are */}
      <section className="w-[90%] mx-auto max-w-[900px] py-[60px]">
        <h2 className="font-[400] text-[28px] lg:text-[34px] mb-[20px]" id="faustina-font">
          Who We Are
        </h2>
        <div
          className="text-[18px] lg:text-[20px] leading-[160%] text-gray-800 space-y-4"
          id="lato-font"
        >
          <p>
            <strong>The Way of Yeshua Ministries Inc.</strong> is a registered 501(c)(3) nonprofit
            based in Sun City, Arizona. We teach the Scriptures, keep the appointed times of the
            Lord, and put that faith to work through practical outreach &mdash; sending communion
            and Holy Day supplies to people in prison, repairing donated vehicles for families who
            need transportation, and working toward dignified housing for unhoused neighbors.
          </p>
          <p>
            The ministry is led by a volunteer board of directors. We are a young organization and
            we would rather tell you plainly what we are doing than overstate it. You can see
            exactly which of our programs are serving people today and which are still being built
            on our{' '}
            <Link href="/#programs" className="text-[#C9A24B] hover:underline">
              program status
            </Link>{' '}
            list.
          </p>
        </div>
      </section>

      {/* Board members */}
      <section className="bg-[#F8F5F0] py-[60px]">
        <div className="w-[90%] mx-auto max-w-[1100px]">
          <h2
            className="font-[400] text-[28px] lg:text-[34px] mb-[40px] text-center"
            id="faustina-font"
          >
            Board of Directors
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 list-none p-0">
            {boardMembers.map((member) => (
              <li
                key={member.name}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
              >
                {member.photo ? (
                  <img
                    src={assetPath(member.photo)}
                    alt={`${member.name}, ${member.role}`}
                    className="w-[140px] h-[140px] rounded-full object-cover border-2 border-[#C9A24B] mb-4"
                  />
                ) : (
                  <div
                    className="w-[140px] h-[140px] rounded-full border-2 border-[#C9A24B] bg-black text-[#C9A24B] flex items-center justify-center text-[42px] font-[500] mb-4"
                    id="faustina-font"
                    aria-hidden="true"
                  >
                    {getInitials(member.name)}
                  </div>
                )}

                <h3 className="text-[24px] font-[500]" id="faustina-font">
                  {member.name}
                </h3>
                {member.role && (
                  <p className="text-[17px] text-[#C9A24B] font-[600] mt-1" id="lato-font">
                    {member.role}
                  </p>
                )}
                {member.bio.length > 0 && (
                  <div
                    className="text-[16px] leading-[160%] text-gray-700 mt-4 space-y-3 text-left"
                    id="lato-font"
                  >
                    {member.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="w-[90%] mx-auto max-w-[900px] py-[60px] text-center">
        <h2 className="font-[400] text-[28px] lg:text-[34px] mb-[16px]" id="faustina-font">
          Questions for the Board?
        </h2>
        <p className="text-[18px] leading-[160%] text-gray-800 mb-[28px]" id="lato-font">
          We are glad to talk with donors, volunteers, and anyone considering partnering with the
          ministry.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="mailto:Info@thewayofyeshuaministries.org"
            className="rounded-[27px] px-[28px] py-[14px] bg-[#C9A24B] text-black text-[18px] font-[500] hover:bg-[#a87f2d] transition-colors"
            id="lato-font"
          >
            Email Us
          </a>
          <Link
            href="/#contact"
            className="rounded-[27px] px-[28px] py-[14px] border border-[#C9A24B] text-[#C9A24B] text-[18px] font-[500] hover:bg-[#C9A24B] hover:text-black transition-colors"
            id="lato-font"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}
