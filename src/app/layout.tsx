import type { Metadata } from 'next'
import './globals.css'
import Header from './../components/header'
import Footer from './../components/footer'
import CookieConsent from './../components/cookie-consent'
import GoogleTagManager, { GoogleTagManagerNoScript } from './../components/google-tag-manager'
import ServiceWorkerRegistration from './../components/ServiceWorkerRegistration'
import {
  openSans,
  lato,
  raleway,
  faustina,
  cantataOne,
  faunaOne,
  montserrat,
  cinzel,
} from '@/lib/fonts'

// Get basePath for GitHub Pages deployment
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  metadataBase: new URL('https://thewayofyeshuaministries.org'),
  title: {
    default: 'The Way of Yeshua Ministries | Christian Teachings and Community Inspiration',
    template: '%s | The Way of Yeshua Ministries',
  },
  description:
    'The Way of Yeshua Ministries is dedicated to spreading Bible teachings and fostering a vibrant faith community through inspirational videos, our Prison Program, and outreach.',
  keywords: [
    'ministry',
    'christian',
    'bible teachings',
    'faith community',
    'yeshua',
    'prison program',
    'Sun City AZ',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://thewayofyeshuaministries.org/',
    siteName: 'The Way of Yeshua Ministries',
    title: 'The Way of Yeshua Ministries | Christian Teachings and Community Inspiration',
    description:
      'Spreading Bible teachings and fostering a vibrant faith community through inspirational videos and outreach.',
    images: [
      {
        url: '/Images/yeshua/logo.jpg',
        width: 800,
        height: 800,
        alt: 'The Way of Yeshua Ministries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Way of Yeshua Ministries | Christian Teachings and Community Inspiration',
    description:
      'Spreading Bible teachings and fostering a vibrant faith community through inspirational videos and outreach.',
    images: ['/Images/yeshua/logo.jpg'],
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: '32x32' },
      { url: `${basePath}/icon.png`, type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: `${basePath}/apple-icon.png`, sizes: '180x180', type: 'image/png' }],
  },
  manifest: `${basePath}/site.webmanifest`,
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://ffcsites.org" />
        <link rel="preconnect" href="https://www.zeffy.com" />
        <link rel="preconnect" href="https://widgets.guidestar.org" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://ffcsites.org" />
        <link rel="dns-prefetch" href="https://www.zeffy.com" />
        <link rel="dns-prefetch" href="https://www.idealist.org" />

        {/* Preload critical LCP image */}
        <link
          rel="preload"
          as="image"
          href={`${basePath}/Images/yeshua/hero-dove-cross.jpg`}
          fetchPriority="high"
        />

        <GoogleTagManager />

        {/* PWA / Apple smart-banner meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Yeshua Min." />
      </head>
      <body
        className={[
          'antialiased',
          openSans.variable,
          lato.variable,
          raleway.variable,
          faustina.variable,
          cantataOne.variable,
          faunaOne.variable,
          montserrat.variable,
          cinzel.variable,
        ].join(' ')}
        suppressHydrationWarning={true}
      >
        <GoogleTagManagerNoScript />
        <ServiceWorkerRegistration />
        {/* <PopupProvider> */}
        <Header />
        {children}
        <Footer />
        <CookieConsent />
        {/* <PopupsRootClient /> */}
        {/* </PopupProvider> */}
      </body>
    </html>
  )
}
