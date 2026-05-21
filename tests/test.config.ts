/**
 * Test Configuration
 *
 * Content-specific values used in E2E tests for The Way of Yeshua Ministries site.
 */

export const testConfig = {
  /**
   * Social Media Links Configuration
   * Used in: tests/social-links.spec.ts
   */
  socialLinks: {
    facebook: {
      url: 'facebook.com/share/17jNKWp2ym',
      ariaLabel: 'Facebook',
    },
    twitter: {
      url: 'x.com/BearupPatr47212',
      ariaLabel: 'X (Twitter)',
    },
    linkedin: {
      url: 'linkedin.com/in/the-way-of-yeshua-ministries-3b6677393',
      ariaLabel: 'LinkedIn',
    },
    instagram: {
      url: 'instagram.com/thewayofyeshuaministries',
      ariaLabel: 'Instagram',
    },
    youtube: {
      url: 'youtube.com/@thewayofyeshuaministries',
      ariaLabel: 'YouTube',
    },
  },

  /**
   * Copyright Configuration
   * Used in: tests/copyright.spec.ts
   */
  copyright: {
    text: 'The Way of Yeshua Ministries — All Rights Reserved',
    searchText: 'All Rights Reserved',
    linkUrl: 'https://freeforcharity.org',
    linkText: 'Free For Charity',
  },

  /**
   * Google Tag Manager Configuration
   * Used in: tests/google-tag-manager.spec.ts
   */
  googleTagManager: {
    id: 'GTM-TQ5H8HPR',
  },

  /**
   * Logo Configuration
   * Used in: tests/logo.spec.ts
   */
  logo: {
    headerAlt: 'The Way of Yeshua Ministries',
    heroAlt: 'A white dove flying near a wooden cross and an open Bible',
    navBarAriaLabel: 'The Way of Yeshua Ministries home',
  },

  /**
   * Cookie Consent Configuration
   * Used in: tests/cookie-consent.spec.ts
   */
  cookieConsent: {
    bannerHeading: 'We Value Your Privacy',
    modalHeading: 'Cookie Preferences',
    buttons: {
      acceptAll: 'Accept All',
      declineAll: 'Decline All',
      customize: 'Customize',
      savePreferences: 'Save Preferences',
      cancel: 'Cancel',
    },
  },
}
