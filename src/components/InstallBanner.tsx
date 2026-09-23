'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RxCross2 } from 'react-icons/rx'

const DISMISS_KEY = 'installBannerDismissed'
const DISMISS_DAYS = 7

export default function InstallBanner() {
  const [show, setShow] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [prompt, setPrompt] = useState<Event | null>(null)

  useEffect(() => {
    try {
      const ts = localStorage.getItem(DISMISS_KEY)
      if (ts && Date.now() - parseInt(ts) < DISMISS_DAYS * 86400000) return
    } catch {}

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

    // Check for a prompt captured before React mounted
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

  const handleInstall = async () => {
    if (!prompt) return
    const p = prompt as unknown as {
      prompt: () => void
      userChoice: Promise<{ outcome: string }>
    }
    p.prompt()
    const { outcome } = await p.userChoice
    if (outcome === 'accepted') setShow(false)
  }

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString())
    } catch {}
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[200] bg-black border-t border-[#C9A24B]/50 px-4 py-3 flex items-center gap-3 shadow-2xl"
          role="banner"
          aria-label="Install app prompt"
        >
          <img
            src="/Images/yeshua/logo.jpg"
            alt=""
            aria-hidden="true"
            className="h-10 w-10 rounded-full border border-[#C9A24B] flex-shrink-0 object-cover"
          />
          <div className="flex-1 min-w-0">
            {isIOS ? (
              <>
                <p className="text-white text-[13px] font-[600]">Add to Home Screen</p>
                <p className="text-gray-400 text-[12px] leading-snug">
                  Tap <strong className="text-white">Share</strong> then{' '}
                  <strong className="text-white">Add to Home Screen</strong>
                </p>
              </>
            ) : (
              <>
                <p className="text-white text-[13px] font-[600]">Install Our App</p>
                <p className="text-gray-400 text-[12px]">
                  Add to your home screen for quick access
                </p>
              </>
            )}
          </div>
          {!isIOS && (
            <button
              onClick={handleInstall}
              className="flex-shrink-0 bg-[#C9A24B] text-black text-[13px] font-[700] px-3 py-2 rounded-lg active:bg-[#a87f2d] transition-colors"
            >
              Install
            </button>
          )}
          <button
            onClick={handleDismiss}
            aria-label="Dismiss install prompt"
            className="flex-shrink-0 text-gray-500 hover:text-white transition-colors"
          >
            <RxCross2 className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
