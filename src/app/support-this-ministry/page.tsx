import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'
import PayPalButton from '@/components/ui/PayPalButton'

export const metadata: Metadata = {
  title: 'Support This Ministry',
  description:
    'Stand with The Way of Yeshua Ministries through your prayers, your gifts, and your time. Every contribution multiplies the work.',
}

const impactTiers = [
  {
    amount: '$25 / month',
    label: 'Prison Outreach',
    description:
      'Provides communion supplies and a Holy Day package for an incarcerated brother or sister for a full month.',
    icon: '✝',
  },
  {
    amount: '$50',
    label: 'Scripture & Teaching',
    description:
      'Ships a set of Scripture books to five people in prison and helps fund weekly teaching content.',
    icon: '📖',
  },
  {
    amount: '$100 / month',
    label: 'Automobile Program',
    description:
      'Covers parts and labor for one vehicle repair, putting a family back on the road to work.',
    icon: '🚗',
  },
  {
    amount: '$250',
    label: 'Sponsor a Space',
    description:
      'Contributes toward building materials for a tiny home room, giving a neighbor a dignified place to live.',
    icon: '🏠',
  },
]

export default function SupportThisMinistry() {
  return (
    <CausePage
      heading="Support The Way of Yeshua Ministries"
      subheading="Stand With Us"
      body={
        <>
          <p>
            Every Scripture lesson sent into a prison, every tiny home framed for a neighbor in
            need, every car handed to a family that couldn&rsquo;t make it to work without one
            &mdash; all of it is funded by people like you who hear the Spirit and respond.
          </p>
          <p>
            <strong>The Way of Yeshua Ministries</strong> is a registered 501(c)(3) nonprofit run by
            a small, committed team. We keep overhead low so that as much of every gift as possible
            reaches the work itself.
          </p>

          {/* Monthly giving highlight */}
          <div className="my-6 rounded-lg border border-[#C9A24B] bg-[#FBF7EF] p-6 text-left">
            <p
              className="text-[14px] uppercase tracking-[0.12em] text-[#C9A24B] font-[600] mb-1"
              id="lato-font"
            >
              The most impactful way to give
            </p>
            <p className="text-[20px] font-[500] mb-2" id="faustina-font">
              Set up a monthly gift
            </p>
            <p className="text-[16px] text-gray-700 mb-4" id="lato-font">
              Recurring gifts are the foundation of everything we do. A predictable monthly gift
              &mdash; even $25 &mdash; lets us plan ahead for prison outreach, keep vehicles in the
              shop, and build toward a permanent home for worship.
            </p>
            <a
              href="https://www.zeffy.com/en-US/donation-form/donate-for-our-ministry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-[27px] px-[22px] py-[10px] bg-[#C9A24B] text-black text-[15px] font-[500] hover:bg-[#a87f2d] transition-colors"
              id="lato-font"
            >
              Give monthly via Zeffy (fee-free) &rarr;
            </a>
          </div>

          {/* Impact tiers */}
          <p className="font-[600] mt-2">Your gift in action:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 text-left not-prose">
            {impactTiers.map((tier) => (
              <div
                key={tier.label}
                className="rounded-lg border border-[#E5DFD3] bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[28px] leading-none mt-[2px]" aria-hidden="true">
                    {tier.icon}
                  </span>
                  <div>
                    <p
                      className="text-[13px] uppercase tracking-[0.1em] text-[#C9A24B] font-[600] mb-[2px]"
                      id="lato-font"
                    >
                      {tier.amount}
                    </p>
                    <p className="text-[16px] font-[600] mb-1" id="lato-font">
                      {tier.label}
                    </p>
                    <p className="text-[14px] leading-[150%] text-gray-600" id="lato-font">
                      {tier.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p>
            <em>
              &ldquo;Each one must give as he has decided in his heart, not reluctantly or under
              compulsion, for God loves a cheerful giver.&rdquo;
            </em>{' '}
            &mdash; 2 Corinthians 9:7
          </p>

          <p>
            <strong>Ways to give:</strong>
          </p>
          <ul>
            <li>
              <strong>Online via Zeffy</strong> (100% fee-free for the ministry) &mdash; use the
              Donate button below
            </li>
            <li>
              <strong>By mail</strong> &mdash; check payable to{' '}
              <em>The Way of Yeshua Ministries</em>, PO Box 1153, Sun City, AZ 85372
            </li>
            <li>
              <strong>Recurring gifts</strong> &mdash; the steadiest support; set this up through
              the Zeffy form
            </li>
            <li>
              <strong>Major gifts, in-kind donations, or estate planning</strong> &mdash; please
              contact us so we can talk about how best to apply your gift
            </li>
          </ul>
          <p>
            Contributions are tax-deductible to the extent allowed by law. For questions or to give
            in another way:{' '}
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
