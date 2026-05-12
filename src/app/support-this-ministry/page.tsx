import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'

export const metadata: Metadata = {
  title: 'Support This Ministry',
  description:
    'Your support and contributions will enable us to meet our goals and fund our mission.',
}

export default function SupportThisMinistry() {
  return (
    <CausePage
      heading="Help Our Cause"
      subheading="Support This Ministry"
      body="Your support and contributions will enable us to meet our goals and fund our mission."
      image="/Images/yeshua/ministry-2.jpg"
      imageAlt="The Way of Yeshua Ministries"
    />
  )
}
