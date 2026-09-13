'use client'

/**
 * Site helper -- "Ask a question, get a link."
 *
 * A visitor types a question in their own words and gets back the pages that
 * answer it. Matching happens in the browser against `src/data/site-index.ts`
 * (see `src/lib/siteSearch.ts`), so there is no server to run, no API key to
 * protect, and the question never leaves the visitor's device.
 *
 * When nothing matches, the helper hands over a phone number and an email
 * address rather than guessing -- a real person is a better answer than a
 * wrong link.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { MessageCircleQuestionMark, Search, X } from 'lucide-react'
import { getSiteIndex, suggestedQuestions, contactFallback } from '@/data/site-index'
import { searchSite, type SiteIndexEntry } from '@/lib/siteSearch'

const PANEL_ID = 'site-helper-panel'
const TITLE_ID = 'site-helper-title'
const INPUT_ID = 'site-helper-input'

/** One answer: the link, what is on it, and where it sits on the site. */
function ResultLink({ entry, onNavigate }: { entry: SiteIndexEntry; onNavigate: () => void }) {
  const content = (
    <>
      <span className="flex items-baseline justify-between gap-2">
        <span className="font-[600] text-[15px] text-black">{entry.title}</span>
        <span className="text-[11px] uppercase tracking-[0.08em] text-[#8A7331] flex-shrink-0">
          {entry.section}
        </span>
      </span>
      <span className="block text-[13px] leading-[150%] text-gray-600 mt-1">{entry.summary}</span>
    </>
  )

  const className =
    'block w-full text-left px-3 py-3 rounded-md border border-[#E5DFD3] bg-white hover:border-[#C9A24B] hover:bg-[#FDFBF6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] transition-colors'

  if (entry.external) {
    return (
      <a
        href={entry.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {content}
        <span className="block text-[11px] text-gray-500 mt-1">Opens in a new tab</span>
      </a>
    )
  }

  return (
    <Link href={entry.href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  )
}

const SiteHelper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const index = useMemo(() => getSiteIndex(), [])
  const results = useMemo(() => searchSite(query, index), [query, index])
  const hasQuery = query.trim().length > 0

  const close = useCallback(() => {
    setIsOpen(false)
    launcherRef.current?.focus()
  }, [])

  // Escape closes the panel, and a click anywhere outside dismisses it. The
  // panel is deliberately not modal: the page behind stays usable while a
  // visitor looks something up.
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (panelRef.current?.contains(target) || launcherRef.current?.contains(target)) return
      setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [isOpen, close])

  // Put the cursor where the visitor is expected to type.
  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const resultSummary = !hasQuery
    ? ''
    : results.length === 0
      ? 'No pages matched. Contact details are shown instead.'
      : `${results.length} ${results.length === 1 ? 'page' : 'pages'} found.`

  return (
    <div className="font-sans">
      {isOpen && (
        <div
          ref={panelRef}
          id={PANEL_ID}
          role="dialog"
          aria-labelledby={TITLE_ID}
          className="fixed z-40 bottom-[84px] right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[min(70vh,540px)] flex flex-col bg-white border border-[#E5DFD3] rounded-lg shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3 border-b border-[#E5DFD3]">
            <div>
              <h2 id={TITLE_ID} className="text-[17px] font-[600] text-black">
                Ask a question
              </h2>
              <p className="text-[13px] text-gray-600 mt-1">
                Type what you are looking for and we will point you to the right page.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close the question box"
              className="flex-shrink-0 p-1 rounded text-gray-500 hover:text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="px-4 py-3 border-b border-[#E5DFD3]">
            <label htmlFor={INPUT_ID} className="sr-only">
              Your question
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                id={INPUT_ID}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="How do I donate a car?"
                autoComplete="off"
                className="w-full pl-9 pr-3 py-2 text-[15px] rounded-md border border-[#D8D0C0] focus:outline-none focus:border-[#C9A24B] focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
              />
            </div>
          </div>

          <div className="overflow-y-auto px-4 py-3 flex-1">
            <p className="sr-only" role="status" aria-live="polite">
              {resultSummary}
            </p>

            {!hasQuery && (
              <div>
                <p className="text-[13px] text-gray-600 mb-2">People often ask:</p>
                <ul className="space-y-2">
                  {suggestedQuestions.map((question) => (
                    <li key={question}>
                      <button
                        type="button"
                        onClick={() => setQuery(question)}
                        className="w-full text-left text-[14px] px-3 py-2 rounded-md border border-[#E5DFD3] text-black hover:border-[#C9A24B] hover:bg-[#FDFBF6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] transition-colors"
                      >
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasQuery && results.length > 0 && (
              <ul className="space-y-2">
                {results.map((entry) => (
                  <li key={entry.id}>
                    <ResultLink entry={entry} onNavigate={() => setIsOpen(false)} />
                  </li>
                ))}
              </ul>
            )}

            {hasQuery && results.length === 0 && (
              <div className="text-[14px] leading-[160%] text-gray-700">
                <p className="mb-3">
                  Nothing on the site matches that yet — but we would rather answer you directly
                  than send you somewhere unhelpful.
                </p>
                <p>
                  Call{' '}
                  <a
                    href={contactFallback.phoneHref}
                    className="text-[#8A7331] underline hover:no-underline"
                  >
                    {contactFallback.phone}
                  </a>
                  , email{' '}
                  <a
                    href={contactFallback.emailHref}
                    className="text-[#8A7331] underline hover:no-underline break-all"
                  >
                    {contactFallback.email}
                  </a>
                  , or try different words.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        className="fixed z-40 bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 rounded-full pl-4 pr-5 py-3 bg-[#C9A24B] text-black text-[15px] font-[600] shadow-lg hover:bg-[#a87f2d] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-colors"
      >
        {isOpen ? (
          <X className="w-5 h-5" aria-hidden="true" />
        ) : (
          <MessageCircleQuestionMark className="w-5 h-5" aria-hidden="true" />
        )}
        <span>{isOpen ? 'Close' : 'Ask a question'}</span>
      </button>
    </div>
  )
}

export default SiteHelper
