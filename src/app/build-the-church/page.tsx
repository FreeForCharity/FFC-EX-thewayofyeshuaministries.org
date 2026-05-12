import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'

export const metadata: Metadata = {
  title: 'Building a Church',
  description:
    'We are building a church and need your support. Be part of the start of this ministry.',
}

export default function BuildTheChurch() {
  return (
    <CausePage
      heading="Help Our Cause"
      subheading="Build the Church"
      body="We are building a church and need your support. Be part of the start of this ministry."
      image="/Images/yeshua/build-church-hero.jpg"
      imageAlt="Open Bible in front of a stained glass window in a dimly lit church"
    />
  )
}
