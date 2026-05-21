import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'

export const metadata: Metadata = {
  title: 'Building a Church',
  description:
    'We are building a permanent home for The Way of Yeshua Ministries — a place of worship, fellowship, and Scripture for our community. Stand with us.',
}

export default function BuildTheChurch() {
  return (
    <CausePage
      heading="Help Us Build the Church"
      subheading="Our Vision"
      body={
        <>
          <p>
            <em>
              &ldquo;Unless the Lord builds the house, those who build it labor in vain.&rdquo;
            </em>{' '}
            &mdash; Psalm 127:1
          </p>
          <p>
            From the beginning, the people of God have set apart a place to gather, to worship, to
            study the Scriptures, and to share life together.{' '}
            <strong>The Way of Yeshua Ministries</strong> is praying for and working toward a
            permanent home &mdash; a building of our own where our community can come together for
            teaching, prayer, fellowship meals, the appointed times of the Lord, and outreach to
            those around us.
          </p>
          <p>
            <strong>What we&rsquo;re building toward:</strong>
          </p>
          <ul>
            <li>
              A <strong>worship space</strong> for Shabbat and the feasts of the Lord
            </li>
            <li>
              <strong>Study and classroom space</strong> for Scripture teaching, youth, and adult
              learning
            </li>
            <li>
              <strong>A fellowship hall</strong> for shared meals, community gatherings, and hosting
              visitors
            </li>
            <li>
              <strong>Operational space</strong> for our Prison Outreach, Tiny Home, and Automobile
              programs &mdash; somewhere to receive, sort, and prepare what we send out
            </li>
            <li>
              <strong>A food pantry</strong> for neighbors in need (opening shortly)
            </li>
          </ul>
          <p>
            Every contribution &mdash; large or small &mdash; brings this closer. Building funds go
            toward land, construction, utilities, and the practical work of preparing a place that
            will outlast any one of us and serve generations to come.
          </p>
          <p>
            <em>
              &ldquo;Each one must give as he has decided in his heart, not reluctantly or under
              compulsion, for God loves a cheerful giver.&rdquo;
            </em>{' '}
            &mdash; 2 Corinthians 9:7
          </p>
          <p>
            To give toward the building, use the button below. To talk through a larger gift, a
            material donation, or how to help in person, please reach out:{' '}
            <a href="tel:5203024034" className="text-[#C9A24B] hover:underline">
              (520) 302-4034
            </a>{' '}
            &middot;{' '}
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
      image="/Images/yeshua/build-church-hero.jpg"
      imageAlt="Open Bible in front of a stained glass window in a dimly lit church"
    />
  )
}
