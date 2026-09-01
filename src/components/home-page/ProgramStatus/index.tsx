import React from 'react'
import Link from 'next/link'
import { programs, statusLabels } from '@/data/programs'

const ProgramStatus = () => {
  return (
    <section id="programs" className="py-[52px]">
      <div className="w-[90%] mx-auto max-w-[1000px]">
        <h2
          className="font-[400] text-[32px] lg:text-[40px] leading-[110%] text-center mb-[10px]"
          id="faustina-font"
        >
          Where Our Programs Stand Today
        </h2>
        <p
          className="text-[18px] leading-[160%] text-gray-700 text-center max-w-[720px] mx-auto mb-[40px]"
          id="lato-font"
        >
          We are a young ministry, and we would rather be plain than impressive. Here is what is
          actually serving people right now, and what we are still building.
        </p>

        <ul className="space-y-4 list-none p-0">
          {programs.map((program) => {
            const status = statusLabels[program.status]
            return (
              <li
                key={program.name}
                className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-[22px] font-[500]" id="faustina-font">
                    {program.href ? (
                      <Link href={program.href} className="hover:text-[#C9A24B] transition-colors">
                        {program.name}
                      </Link>
                    ) : (
                      program.name
                    )}
                  </h3>
                  <span
                    className={`text-[13px] font-[600] uppercase tracking-wider rounded-full px-3 py-1 ${status.className}`}
                    id="lato-font"
                  >
                    {status.label}
                  </span>
                </div>
                <p className="text-[17px] leading-[160%] text-gray-700" id="lato-font">
                  {program.summary}
                </p>
              </li>
            )
          })}
        </ul>

        <p className="text-[16px] text-gray-600 text-center mt-[30px]" id="lato-font">
          Led by our{' '}
          <Link href="/board-of-directors" className="text-[#C9A24B] hover:underline">
            board of directors
          </Link>
          . The Way of Yeshua Ministries Inc. is a registered 501(c)(3) nonprofit in Sun City,
          Arizona.
        </p>
      </div>
    </section>
  )
}

export default ProgramStatus
