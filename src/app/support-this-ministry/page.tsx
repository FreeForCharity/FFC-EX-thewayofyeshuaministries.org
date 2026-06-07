import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'
import PayPalButton from '@/components/ui/PayPalButton'

export const metadata: Metadata = {
  title: 'Support This Ministry',
  description:
    'Stand with The Way of Yeshua Ministries through your prayers, your gifts, and your time. Every contribution multiplies the work.',
}

export default function SupportThisMinistry() {
  return (
    <CausePage
      heading="Support The Way of Yeshua Ministries"
      subheading="Stand With Us"
      body={
        <>
          <p>
            Every Scripture lesson sent into a prison, every tiny home framed for a neighbor in
            need, every car handed to a family that couldn’t make it to work without one — all of it
            is funded by people like you who hear the Spirit and respond.
          </p>
          <p>
            <strong>The Way of Yeshua Ministries</strong> is a registered 501(c)(3) nonprofit run by
            a small, committed team. We keep overhead low so that as much of every gift as possible
            reaches the work itself.
          </p>
          <p>
            <strong>Where your giving goes:</strong>
          </p>
          <ul>
            <li>
              <strong>Prison Outreach</strong> — communion supplies, Holy Day packages, and
              Scripture sent to incarcerated brothers and sisters
            </li>
            <li>
              <strong>Build the Church</strong> — a permanent home for worship, study, and
              fellowship
            </li>
            <li>
              <strong>Sponsor a Tiny Home</strong> — dignified housing for neighbors in need
            </li>
            <li>
              <strong>Automobile Program</strong> — donated and repaired vehicles for families who
              need transportation
            </li>
            <li>
              <strong>Teaching ministry</strong> — videos, podcasts, blog posts, and fellowship
              gatherings that point people to Yeshua
            </li>
          </ul>
          <p>
            <em>
              “Each one must give as he has decided in his heart, not reluctantly or under
              compulsion, for God loves a cheerful giver.”
            </em>{' '}
            — 2 Corinthians 9:7
          </p>
          <p>
            <strong>Ways to give:</strong>
          </p>
          <ul>
            <li>
              <strong>Online via Zeffy</strong> (100% fee-free for the ministry) — use the Donate
              button below
            </li>
            <li>
              <strong>By mail</strong> — check payable to <em>The Way of Yeshua Ministries</em>, PO
              Box 1153, Sun City, AZ 85372
            </li>
            <li>
              <strong>Recurring gifts</strong> — the steadiest support; set this up through the
              Zeffy form
            </li>
            <li>
              <strong>Major gifts, in-kind donations, or estate planning</strong> — please contact
              us so we can talk about how best to apply your gift
            </li>
          </ul>
          <p>
            Contributions are tax-deductible to the extent allowed by law. For questions or to give
            in another way:{' '}
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
          <p>
            <em>Thank you for standing with us. May the Lord multiply what you give.</em>
          </p>
        </>
      }
      image="/Images/yeshua/ministry-2.jpg"
      imageAlt="The Way of Yeshua Ministries"
      footer={
        <div className="text-center">
          <p className="text-[16px] text-gray-500 mb-4" id="lato-font">
            Or donate securely with PayPal
          </p>
          <PayPalButton hostedButtonId="HAM5646L3JSBW" />
        </div>
      }
    />
  )
}
