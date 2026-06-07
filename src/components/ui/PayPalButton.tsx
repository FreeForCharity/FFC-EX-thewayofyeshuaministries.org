'use client'

import Script from 'next/script'
import { useRef } from 'react'

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (opts: { hostedButtonId: string }) => { render: (selector: string) => void }
    }
  }
}

const PAYPAL_SDK_URL =
  'https://www.paypal.com/sdk/js?client-id=BAAKZs1na6t7YhDm4AL11b5DhKbuSHByRjwmZSxIRyEnshIT1XpiGg5cYinaIwWgBagmKfz7CkTBNOjeH8&components=hosted-buttons&enable-funding=venmo&currency=USD'

export default function PayPalButton({ hostedButtonId }: { hostedButtonId: string }) {
  const containerId = `paypal-container-${hostedButtonId}`
  const rendered = useRef(false)

  const handleLoad = () => {
    if (rendered.current) return
    if (!window.paypal) return
    rendered.current = true
    window.paypal.HostedButtons({ hostedButtonId }).render(`#${containerId}`)
  }

  return (
    <>
      <Script src={PAYPAL_SDK_URL} strategy="afterInteractive" onLoad={handleLoad} />
      <div id={containerId} className="w-full max-w-[300px] mx-auto" />
    </>
  )
}
