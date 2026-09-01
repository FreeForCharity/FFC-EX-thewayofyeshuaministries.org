import React from 'react'
import Hero from '@/components/home-page/Hero'
import Mission from '@/components/home-page/Mission'
import Gallery from '@/components/home-page/Gallery'
import AreasOfMinistry from '@/components/home-page/AreasOfMinistry'
import ProgramStatus from '@/components/home-page/ProgramStatus'
import BlogTeaser from '@/components/home-page/BlogTeaser'
import ComingSoon from '@/components/home-page/ComingSoon'
import SupportMinistry from '@/components/home-page/SupportMinistry'
import BusinessSponsors from '@/components/home-page/BusinessSponsors'
import Contact from '@/components/home-page/Contact'
import VerseBanner from '@/components/home-page/VerseBanner'

const index = () => {
  return (
    <div>
      <Hero />
      <Mission />
      <Gallery />
      <AreasOfMinistry />
      <ProgramStatus />
      <BlogTeaser />
      <ComingSoon />
      <SupportMinistry />
      <BusinessSponsors />
      <Contact />
      <VerseBanner />
    </div>
  )
}

export default index
