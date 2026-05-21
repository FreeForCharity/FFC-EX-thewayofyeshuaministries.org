import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'

export const metadata: Metadata = {
  title: 'Sponsor a Tiny Home',
  description:
    'Affordable, dignified housing for neighbors in need. Sponsor a tiny home and put a roof over someone the world has overlooked.',
}

export default function SponsorATinyHome() {
  return (
    <CausePage
      heading="Sponsor a Tiny Home"
      subheading="Housing the Vulnerable"
      body={
        <>
          <p>
            <em>
              “I was a stranger and you welcomed Me … as you did it to one of the least of these My
              brothers, you did it to Me.”
            </em>{' '}
            — Matthew 25:35, 40
          </p>
          <p>
            In our own community, neighbors are sleeping in cars, on couches that aren’t theirs, or
            out in the open. The cost of housing has outpaced what many can earn — and behind every
            statistic is a person Yeshua died for.
          </p>
          <p>
            <strong>The Way of Yeshua Ministries Tiny Home Project</strong> is our practical answer:
            small, well-built, dignified homes that give a person or a family a real roof, a real
            door that locks, and a real starting point. Tiny homes are faster and more affordable to
            build than traditional housing, so every sponsorship moves someone off the street
            sooner.
          </p>
          <p>
            <strong>What your sponsorship covers:</strong>
          </p>
          <ul>
            <li>Materials and labor for one tiny home unit</li>
            <li>Site preparation, utilities, and permits</li>
            <li>
              A simple but complete interior — bed, basic kitchen, a place to read the Scriptures
              and pray
            </li>
            <li>
              Ongoing support so the resident has more than just a building — they have community
            </li>
          </ul>
          <p>
            <em>
              “If a brother or sister is poorly clothed and lacking in daily food, and one of you
              says to them, ‘Go in peace, be warmed and filled,’ without giving them the things
              needed for the body, what good is that?”
            </em>{' '}
            — James 2:15-16
          </p>
          <p>
            <strong>Ways to help:</strong>
          </p>
          <ul>
            <li>
              <strong>Sponsor a unit</strong> — in full or as part of a group
            </li>
            <li>
              <strong>Donate building materials</strong> — contact us first so we can confirm what’s
              usable
            </li>
            <li>
              <strong>Volunteer your skills</strong> — carpentry, plumbing, electrical, or just
              willing hands
            </li>
            <li>
              <strong>Give any amount</strong> — every dollar moves a unit closer to completion
            </li>
          </ul>
          <p>
            To sponsor or partner, use the Donate button below or reach out:{' '}
            <a href="tel:5203024034" className="text-[#C9A24B] hover:underline">
              (520) 302-4034
            </a>{' '}
            ·{' '}
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
      image="/Images/yeshua/tiny-home-hero.jpg"
      imageAlt="Modern affordable housing project with sleek design and greenery"
    />
  )
}
