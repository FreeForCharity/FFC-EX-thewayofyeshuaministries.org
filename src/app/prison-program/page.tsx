import type { Metadata } from 'next'
import CausePage from '@/components/cause-page'

export const metadata: Metadata = {
  title: 'Prison Outreach Program',
  description:
    'Donate to support our prison outreach. We send communion supplies and Holy Day supplies to those in need.',
}

export default function PrisonProgram() {
  return (
    <CausePage
      heading="Prison Outreach Program"
      subheading="Join Us"
      body="Donate to support our prison outreach. We send communion supplies and Holy Day supplies to those in need."
      image="/Images/yeshua/prison-program-hero.jpg"
      imageAlt="Hands clasped together behind blue prison bars, symbolizing confinement"
    />
  )
}
