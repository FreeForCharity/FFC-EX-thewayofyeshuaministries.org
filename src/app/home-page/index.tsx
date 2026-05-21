import React from 'react'
import Hero from '@/components/home-page/Hero'
import Mission from '@/components/home-page/Mission'
import Gallery from '@/components/home-page/Gallery'
import AreasOfMinistry from '@/components/home-page/AreasOfMinistry'
import BlogTeaser from '@/components/home-page/BlogTeaser'
import ComingSoon from '@/components/home-page/ComingSoon'
import SupportMinistry from '@/components/home-page/SupportMinistry'
import Contact from '@/components/home-page/Contact'
import VerseBanner from '@/components/home-page/VerseBanner'

const index = () => {
  return (
    <div>
      <Hero />
      <Mission />
      <Gallery />
      <AreasOfMinistry />
      <BlogTeaser />
      <ComingSoon />
      <SupportMinistry />
      <Contact />
      <VerseBanner />
    </div>
  )
}

export default index
