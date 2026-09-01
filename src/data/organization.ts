/**
 * Public registration facts for The Way of Yeshua Ministries Inc.
 *
 * Every value here comes from a public record a donor can check for
 * themselves -- the Arizona Corporation Commission's business search and the
 * IRS Tax Exempt Organization Search. Do not add a claim to this file that
 * cannot be verified from one of those sources.
 */

export const organization = {
  /** Legal name exactly as registered with the Arizona Corporation Commission. */
  legalName: 'The Way of Yeshua Ministries Inc',
  /** Arizona Corporation Commission business ID. */
  accBusinessId: '23922383',
  /** Entity type on file with the ACC. */
  entityType: 'Domestic Nonprofit Corporation',
  /** Date the ACC authorized the corporation to conduct affairs in Arizona. */
  authorizedDate: 'December 16, 2025',
  /**
   * Date of the most recent ACC Certificate of Good Standing. Good standing is
   * stated as of the issue date, so the date is always shown alongside it and
   * readers are pointed at the ACC's own search to check the current status.
   */
  goodStandingAsOf: 'April 15, 2026',
  /**
   * Where anyone can verify the above. This is the address printed on the
   * Certificate of Good Standing itself -- use whatever the current
   * certificate names rather than a remembered URL, which can go stale.
   */
  accVerifyUrl: 'https://arizonabusinesscenter.azcc.gov',
  /** IRS Tax Exempt Organization Search. */
  irsVerifyUrl: 'https://apps.irs.gov/app/eos/',
} as const
