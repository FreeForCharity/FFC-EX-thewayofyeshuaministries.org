/**
 * Fetching the ministry's teachings into the browser, on demand.
 *
 * The corpus is a static file built by `src/app/teachings.json/route.ts`. It
 * is requested only when a visitor opens the helper, so nobody pays for the
 * blog on a page they are only reading, and unpublished drafts never leave the
 * build.
 */

import { assetPath } from '@/lib/assetPath'
import type { TeachingPayload } from '@/lib/teachings'

export type { TeachingPayload }

/**
 * Load the corpus. Resolves to null when it cannot be fetched -- offline, say,
 * on a first visit -- which leaves the helper searching the pages alone rather
 * than failing.
 */
export async function loadTeachings(): Promise<TeachingPayload | null> {
  try {
    const response = await fetch(assetPath('/teachings.json'))
    if (!response.ok) return null
    const payload: unknown = await response.json()
    if (
      typeof payload !== 'object' ||
      payload === null ||
      !Array.isArray((payload as TeachingPayload).entries) ||
      !Array.isArray((payload as TeachingPayload).teachings)
    ) {
      return null
    }
    return payload as TeachingPayload
  } catch {
    return null
  }
}
