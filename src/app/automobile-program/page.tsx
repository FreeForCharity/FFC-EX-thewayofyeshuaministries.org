import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'

export const metadata: Metadata = {
  title: 'Automobile Donation Program',
  description: 'Donate vehicles or cash to help us repair and gift cars to people in need.',
}

export default function AutomobileProgram() {
  return (
    <CausePage
      heading="Help someone that needs a car"
      subheading="Our Program"
      body={
        <>
          <p>
            We would like to help people in need of a car. With this mission, we are looking for
            vehicles that can be donated to the ministry. We have mechanics who can repair cars and
            then we can provide those cars to people in need.
          </p>
          <p>If you are interested please contact us on our links.</p>
          <p>Cash donations are also accepted for this program.</p>
        </>
      }
      image="/Images/yeshua/automobile-program.png"
      imageAlt="Various car types donated to the ministry"
    />
  )
}
