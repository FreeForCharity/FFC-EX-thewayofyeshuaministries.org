import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'

export const metadata: Metadata = {
  title: 'Automobile Donation Program',
  description: 'Donate vehicles or cash to help us repair and gift cars to people in need.',
}

// TODO(content): swap `image` below for a real program photo when the ministry
// can provide one (a recipient receiving keys, a volunteer mechanic, a family
// with their donated car, etc.). The previous hero was a Honda model catalog
// image that read like a dealership — not a charity. Using a ministry-themed
// placeholder until a real photo lands.
export default function AutomobileProgram() {
  return (
    <CausePage
      heading="Help someone that needs a car"
      subheading="Our Program"
      body={
        <>
          <p>
            For many families, the gap between &ldquo;getting by&rdquo; and &ldquo;falling
            behind&rdquo; is one broken-down car. A reliable vehicle means a job kept, a child
            picked up on time, a doctor&rsquo;s appointment made, a grocery run that doesn&rsquo;t
            take three bus transfers.
          </p>
          <p>
            Our <strong>Automobile Program</strong> bridges that gap. We accept donated vehicles,
            our volunteer mechanics repair them, and we gift the repaired cars to people in our
            community who need transportation but can&rsquo;t afford it.
          </p>
          <p>
            <strong>How it works:</strong>
          </p>
          <ul>
            <li>
              <strong>You donate a vehicle</strong> &mdash; running or in need of repair, sedan,
              hatchback, SUV, or van
            </li>
            <li>
              <strong>Our mechanics restore it</strong> &mdash; safety, reliability, and the
              essentials
            </li>
            <li>
              <strong>We place it with a family in need</strong> &mdash; identified through our
              ministry and community connections
            </li>
          </ul>
          <p>
            <strong>Cash donations are also accepted</strong> for parts, labor, registration, and
            keeping placed vehicles roadworthy.
          </p>
          <p>
            <em>
              &ldquo;Whoever is generous to the poor lends to the Lord, and He will repay him for
              his deed.&rdquo;
            </em>{' '}
            &mdash; Proverbs 19:17
          </p>
          <p>
            If you have a vehicle to donate, or want to support the program financially, please
            reach out:{' '}
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
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-[24px] font-[500] mb-3" id="faustina-font">
              Vehicles we accept
            </h2>
            <p className="text-[16px] text-gray-700 mb-6" id="lato-font">
              We work with a range of donated vehicles. Below are examples of the makes and models
              we&rsquo;ve received and placed in the past &mdash; if your car isn&rsquo;t shown,
              reach out anyway. We can usually find a way to put it to use.
            </p>
            <img
              src="/Images/yeshua/automobile-program.png"
              alt="Examples of vehicles received and placed through the Automobile Program: sedans, hatchbacks, SUVs, and vans"
              className="w-full max-w-[800px] mx-auto rounded-lg shadow-md"
            />
          </div>
        </>
      }
      image="/Images/yeshua/ministry-6.jpg"
      imageAlt="Hands holding an open Bible — symbolizing service and ministry to our community"
    />
  )
}
