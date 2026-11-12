// Analytics ID helpers.
//
// Unlike the current template, this fork does not centralize its tracking
// IDs here: the GTM container ID is set in src/components/google-tag-manager,
// and the cookie-consent component reads its GA/Meta/Clarity IDs from
// NEXT_PUBLIC_* environment variables with placeholder fallbacks. This
// module only provides the placeholder guard those loaders share.

// The placeholder fallbacks the cookie-consent component ships:
// 'G-XXXXXXXXXX' (GA4), 'XXXXXXXXXXXXXXX' (Meta Pixel), and 'XXXXXXXXXX'
// (Microsoft Clarity). Loaders check against this list so that "leave a
// value as its placeholder to keep that integration effectively inert" is
// actually honored; the anchored X-run regex below also catches any other
// all-X variant.
const PLACEHOLDER_IDS: readonly string[] = ['G-XXXXXXXXXX', 'XXXXXXXXXXXXXXX', 'XXXXXXXXXX']

/**
 * True when an analytics ID has been replaced with a real value. A falsy
 * or whitespace-only value, one of the shipped placeholders, or any
 * obviously-templated value (an optional uppercase/digit/dash prefix
 * ending in six or more X's, matched against the WHOLE string so a real
 * ID that merely contains consecutive X's is not rejected) counts as NOT
 * configured, so the integration it belongs to stays inert.
 */
export function isConfigured(id: string | undefined | null): boolean {
  if (!id) return false
  const trimmed = id.trim()
  if (!trimmed) return false
  if (PLACEHOLDER_IDS.includes(trimmed)) return false
  if (/^[A-Z0-9-]*X{6,}$/.test(trimmed)) return false
  return true
}
