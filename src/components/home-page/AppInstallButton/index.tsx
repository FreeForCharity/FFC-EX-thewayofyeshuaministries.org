'use client'

import { useState, useEffect } from 'react'

export default function AppInstallButton() {
  const [show, setShow] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSHint, setShowIOSHint] = useState(false)
  const [prompt, setPrompt] = useState<Event | null>(null)

  useEffect(() => {
    const ua = navigator.userAgent
    const ios =
      /iPhone|iPad|iPod/.test(ua) && !(window as unknown as Record<string, unknown>).MSStream
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true

    if (standalone) return

    if (ios) {
      setIsIOS(true)
      setShow(true)
      return
    }

    const early = (window as unknown as Record<string, unknown>).__beforeInstallPrompt as
      Event | undefined
    if (early) {
      setPrompt(early)
      setShow(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleClick = async () => {
    if (isIOS) {
      setShowIOSHint((v) => !v)
      return
    }
    if (!prompt) return
    const p = prompt as unknown as {
      prompt: () => void
      userChoice: Promise<{ outcome: string }>
    }
    p.prompt()
    const { outcome } = await p.userChoice
    if (outcome === 'accepted') setShow(false)
  }

  if (!show) return null

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="rounded-[27px] px-[30px] py-[15px] bg-white/20 border-2 border-white/60 text-white text-[18px] font-[600] hover:bg-white/30 transition-colors backdrop-blur-sm"
        id="lato-font"
        aria-expanded={isIOS ? showIOSHint : undefined}
      >
        📲 Install App
      </button>

      {/* iOS instructions tooltip */}
      {isIOS && showIOSHint && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[240px] bg-black/90 text-white text-[13px] rounded-lg px-4 py-3 shadow-xl z-50"
          role="tooltip"
        >
          <p className="font-[600] mb-1">Add to Home Screen</p>
          <p className="leading-[150%] text-gray-300">
            Tap the <strong className="text-white">Share</strong> button in Safari, then tap{' '}
            <strong className="text-white">&ldquo;Add to Home Screen&rdquo;</strong>.
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black/90" />
        </div>
      )}
    </div>
  )
}
