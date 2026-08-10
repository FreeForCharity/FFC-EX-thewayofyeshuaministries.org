import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'
import { assetPath } from '@/lib/assetPath'

export const metadata: Metadata = {
  title: 'Automobile Donation Program',
  description: 'Donate vehicles or cash to help us repair and gift cars to people in need.',
}

// Real photos from the ministry of vehicles repaired and handed to recipients.
// Faces are blurred in the source files themselves — the originals are not in
// the repo, so there is nothing to un-blur here.
const placedVehicles = [
  {
    src: '/Images/yeshua/automobile-program-suv.jpg',
    alt: 'A recipient standing beside the SUV he received through the Automobile Program',
    // portrait source: anchor low so the 4:3 tile keeps the subject, not sky
    position: 'object-bottom',
  },
  {
    src: '/Images/yeshua/automobile-program-pickup.jpg',
    alt: 'A family standing together beside the pickup truck they received through the Automobile Program',
    position: 'object-center',
  },
  {
    src: '/Images/yeshua/automobile-program-hatchback.jpg',
    alt: 'A recipient standing beside the hatchback she received through the Automobile Program',
    position: 'object-center',
  },
]

// TODO(content): swap `image` below for a real program photo when the ministry
// can provide one (a recipient receiving keys, a volunteer mechanic, a family
// with their donated car, etc.). Using a ministry-themed placeholder until a
// real hero photo lands.
export default function AutomobileProgram() {
  return (
    <CausePage
      heading="Help someone that needs a car"
      subheading="Our Program"
      body={
        <>
          <p>
            For many families, the gap between “getting by” and “falling behind” is one broken-down
            car. A reliable vehicle means a job kept, a child picked up on time, a doctor’s
            appointment made, a grocery run that doesn’t take three bus transfers.
          </p>
          <p>
            Our <strong>Automobile Program</strong> bridges that gap. We accept donated vehicles,
            our volunteer mechanics repair them, and we gift the repaired cars to people in our
            community who need transportation but can’t afford it.
          </p>
          <p>
            <strong>How it works:</strong>
          </p>
          <ul>
            <li>
              <strong>You donate a vehicle</strong> — running or in need of repair, sedan,
              hatchback, SUV, or van
            </li>
            <li>
              <strong>Our mechanics restore it</strong> — safety, reliability, and the essentials
            </li>
            <li>
              <strong>We place it with a family in need</strong> — identified through our ministry
              and community connections
            </li>
          </ul>
          <p>
            <strong>Cash donations are also accepted</strong> for parts, labor, registration, and
            keeping placed vehicles roadworthy.
          </p>
          <p>
            <em>
              “Whoever is generous to the poor lends to the Lord, and He will repay him for his
              deed.”
            </em>{' '}
            — Proverbs 19:17
          </p>
          <p>
            If you have a vehicle to donate, or want to support the program financially, please
            reach out:{' '}
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
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-[24px] font-[500] mb-3" id="faustina-font">
              Vehicles we accept
            </h2>
            <p className="text-[16px] text-gray-700 mb-6" id="lato-font">
              We work with a range of donated vehicles — sedans, hatchbacks, SUVs, minivans, and
              pickups, running or in need of repair. Below are a few we’ve repaired and placed with
              families in our community. If your car isn’t shown, reach out anyway. We can usually
              find a way to put it to use.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {placedVehicles.map((photo) => (
                <img
                  key={photo.src}
                  src={assetPath(photo.src)}
                  alt={photo.alt}
                  className={`w-full aspect-[4/3] object-cover ${photo.position} rounded-lg shadow-md`}
                />
              ))}
            </div>
            <p className="text-[13px] text-gray-500 mt-4" id="lato-font">
              Faces are blurred to protect the privacy of the families we serve.
            </p>
          </div>
        </>
      }
      image="/Images/yeshua/ministry-6.jpg"
      imageAlt="Hands holding an open Bible — symbolizing service and ministry to our community"
    />
  )
}
