'use client'

import { useEffect, useRef } from 'react'

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

  useEffect(() => {
    if (rendered.current) return

    const renderButton = () => {
      if (window.paypal && document.getElementById(containerId)) {
        rendered.current = true
        window.paypal.HostedButtons({ hostedButtonId }).render(`#${containerId}`)
      }
    }

    // If SDK already loaded, render immediately
    if (window.paypal) {
      renderButton()
      return
    }

    // Otherwise inject the script
    const existing = document.querySelector(`script[src="${PAYPAL_SDK_URL}"]`)
    if (existing) {
      existing.addEventListener('load', renderButton)
      return
    }

    const script = document.createElement('script')
    script.src = PAYPAL_SDK_URL
    script.onload = renderButton
    document.body.appendChild(script)
  }, [containerId, hostedButtonId])

  return <div id={containerId} className="w-full max-w-[300px] mx-auto" />
}
