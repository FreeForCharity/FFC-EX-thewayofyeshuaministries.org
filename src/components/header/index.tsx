'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { FiMenu, FiChevronDown } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'
import { motion, AnimatePresence } from 'framer-motion'

interface SubItem {
  label: string
  path: string
}

interface MenuItem {
  label: string
  path?: string
  children?: SubItem[]
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  const menuItems: MenuItem[] = useMemo(
    () => [
      { label: 'Home', path: '/' },
      { label: 'Mission', path: '/#mission' },
      { label: 'Prison Program', path: '/prison-program' },
      {
        label: 'More',
        children: [
          { label: 'Build the Church', path: '/build-the-church' },
          { label: 'Sponsor a Tiny Home', path: '/sponsor-a-tiny-home' },
          { label: 'Automobile Program', path: '/automobile-program' },
          { label: 'Support This Ministry', path: '/support-this-ministry' },
        ],
      },
      { label: 'Blog', path: '/blog' },
      { label: 'Contact', path: '/#contact' },
    ],
    []
  )

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsIOS(
      /iPhone|iPad|iPod/.test(navigator.userAgent) &&
        !(window as unknown as Record<string, unknown>).MSStream
    )
    setIsInstalled(
      window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as unknown as { standalone?: boolean }).standalone === true
    )
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallPrompt = async () => {
    if (!deferredPrompt) return
    const prompt = deferredPrompt as unknown as {
      prompt: () => void
      userChoice: Promise<{ outcome: string }>
    }
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setIsInstalled(true)
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
  }

  return (
    <header
      id="header"
      className={`w-full bg-black text-white fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300 ${
        isScrolled ? 'h-[56px] shadow-lg' : 'h-[80px]'
      }`}
    >
      <div className="w-full">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex items-center justify-between px-4 lg:px-6 transition-all duration-300">
            {/* Logo */}
            <Link href="/" onClick={handleLinkClick} className="block flex-shrink-0">
              <img
                src="/Images/yeshua/logo.jpg"
                alt="The Way of Yeshua Ministries"
                className={`transition-all duration-300 rounded-full border border-[#C9A24B] ${
                  isScrolled ? 'h-9 w-9' : 'h-12 w-12'
                } object-cover`}
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center" ref={dropdownRef}>
              <ul className="flex items-center gap-1">
                {menuItems.map((item) => {
                  const hasChildren = item.children && item.children.length > 0
                  return (
                    <li key={item.label} className="relative">
                      {hasChildren ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenDropdown(openDropdown === item.label ? null : item.label)
                            }
                            className="flex items-center gap-1 px-3 py-2 text-[15px] font-[500] text-white hover:text-[#C9A24B] transition-colors"
                            aria-haspopup="menu"
                            aria-expanded={openDropdown === item.label}
                          >
                            {item.label}
                            <FiChevronDown className="h-4 w-4" />
                          </button>
                          {openDropdown === item.label && (
                            <ul
                              role="menu"
                              className="absolute top-full right-0 mt-1 w-[240px] bg-black border border-[#C9A24B]/40 rounded shadow-lg py-2 z-50"
                            >
                              {item.children!.map((child) => (
                                <li key={child.label}>
                                  <Link
                                    href={child.path}
                                    onClick={handleLinkClick}
                                    className="block px-4 py-2 text-[15px] text-white hover:bg-[#C9A24B] hover:text-black transition-colors"
                                    role="menuitem"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.path!}
                          onClick={handleLinkClick}
                          className="block px-3 py-2 text-[15px] font-[500] text-white hover:text-[#C9A24B] transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#C9A24B]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <RxCross2 className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`lg:hidden absolute left-0 w-full overflow-hidden z-40 bg-black border-t border-[#C9A24B]/40 ${
              isScrolled ? 'top-[56px]' : 'top-[80px]'
            }`}
          >
            <div className="px-6 py-4 max-h-[80vh] overflow-auto">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const hasChildren = item.children && item.children.length > 0
                  if (hasChildren) {
                    return (
                      <li key={item.label}>
                        <p className="px-3 py-2 text-[14px] font-[600] uppercase tracking-wider text-[#C9A24B]">
                          {item.label}
                        </p>
                        <ul className="ml-3 border-l border-[#C9A24B]/30 pl-3 space-y-1">
                          {item.children!.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.path}
                                onClick={handleLinkClick}
                                className="block px-3 py-2 text-[15px] text-white hover:text-[#C9A24B]"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                  }
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.path!}
                        onClick={handleLinkClick}
                        className="block px-3 py-2 text-[16px] font-[500] text-white hover:text-[#C9A24B]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Install App section */}
              {isInstalled ? (
                <div className="mt-4 pt-4 border-t border-[#C9A24B]/30">
                  <p className="px-3 py-2 text-[14px] text-[#C9A24B]" id="lato-font">
                    ✓ App installed on this device
                  </p>
                </div>
              ) : deferredPrompt ? (
                <div className="mt-4 pt-4 border-t border-[#C9A24B]/30">
                  <button
                    onClick={handleInstallPrompt}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#C9A24B] text-black text-[15px] font-[600] active:bg-[#a87f2d] transition-colors"
                    id="lato-font"
                  >
                    <span aria-hidden="true">📲</span>
                    Add App to Home Screen
                  </button>
                </div>
              ) : isIOS ? (
                <div className="mt-4 pt-4 border-t border-[#C9A24B]/30">
                  <div className="rounded-lg bg-[#C9A24B]/10 border border-[#C9A24B]/30 px-4 py-3">
                    <p className="text-[13px] font-[600] text-[#C9A24B] mb-1" id="lato-font">
                      📲 Add to Home Screen
                    </p>
                    <p className="text-[13px] text-gray-300 leading-[150%]" id="lato-font">
                      Tap the <strong className="text-white">Share</strong> button in Safari, then
                      tap <strong className="text-white">&ldquo;Add to Home Screen&rdquo;</strong>
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
