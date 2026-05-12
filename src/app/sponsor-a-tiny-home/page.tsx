import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'

export const metadata: Metadata = {
  title: 'Sponsor a Tiny Home',
  description:
    'We are building affordable housing for people in need. We need sponsors to launch this project.',
}

export default function SponsorATinyHome() {
  return (
    <CausePage
      heading="Help Our Cause"
      subheading="Tiny Home Project"
      body="We're building affordable housing for people in need. We need sponsors to launch this project."
      image="/Images/yeshua/tiny-home-hero.jpg"
      imageAlt="Modern affordable housing project with sleek design and greenery"
    />
  )
}
