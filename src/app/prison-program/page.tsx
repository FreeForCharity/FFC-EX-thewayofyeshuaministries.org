import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'

export const metadata: Metadata = {
  title: 'Prison Outreach Program',
  description:
    'Communion supplies, Holy Day supplies, and the Word of God for those who are incarcerated. Support our prison outreach.',
}

export default function PrisonProgram() {
  return (
    <CausePage
      heading="Prison Outreach Program"
      subheading="Join Us"
      body={
        <>
          <p>
            Yeshua told us plainly: <em>“I was in prison and you came to Me.”</em> (Matthew 25:36).
            Behind every set of bars there is a person made in the image of God, often forgotten by
            the world and hungry for hope.
          </p>
          <p>
            Through our Prison Outreach Program, <strong>The Way of Yeshua Ministries</strong> sends{' '}
            <strong>communion supplies</strong>, <strong>Holy Day supplies</strong>, and
            Scripture-based encouragement to incarcerated brothers and sisters so they can keep the
            appointed times of the Lord even from inside a cell. For a believer behind bars, a small
            package can be the difference between an ordinary Friday and a real Shabbat — between a
            long Sunday and a real Passover.
          </p>
          <p>
            We send what each correctional facility’s rules allow: small portions of grape juice,
            unleavened bread, candles where permitted, devotional materials, and letters of prayer
            and Scripture from our community. Every package is a quiet reminder that they are not
            forgotten and that the Lord sees them where they are.
          </p>
          <p>
            <strong>How you can help:</strong>
          </p>
          <ul>
            <li>
              <strong>Give financially</strong> — every dollar covers postage, supplies, and
              materials that go directly into a package
            </li>
            <li>
              <strong>Donate supplies in kind</strong> — small Bibles, devotionals, paper, stamps;
              contact us first so we can confirm what each facility accepts
            </li>
            <li>
              <strong>Pray</strong> with us for those we write to — the families on the outside as
              well as the prisoners themselves
            </li>
          </ul>
          <p>
            <em>“Remember those who are in prison, as though in prison with them.”</em> — Hebrews
            13:3
          </p>
          <p>
            To partner with this program, give using the button below or reach out by phone at{' '}
            <a href="tel:5203024034" className="text-[#C9A24B] hover:underline">
              (520) 302-4034
            </a>{' '}
            or email{' '}
            <a
              href="mailto:Info@thewayofyeshuaministries.org"
              className="text-[#C9A24B] hover:underline"
            >
              Info@thewayofyeshuaministries.org
            </a>
            .
          </p>
        </>
      }
      image="/Images/yeshua/prison-program-hero.jpg"
      imageAlt="Hands clasped together behind blue prison bars, symbolizing confinement"
    />
  )
}
