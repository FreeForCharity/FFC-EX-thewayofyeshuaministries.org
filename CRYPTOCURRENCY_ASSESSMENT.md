# Cryptocurrency Assessment

**Status:** Decision document -- no code changes, nothing shipped to the live site.
**Audience:** Ministry leadership and board.
**Question asked:** _"Is it possible to create a cryptocurrency for the ministry?"_

> This document is a technical and operational assessment. It is **not legal or tax
> advice.** Nothing described here should be acted on without review by a nonprofit
> attorney and the ministry's CPA.

---

## Summary

Yes, it is technically possible -- and cheap. Minting a token on a modern blockchain
takes under an hour and costs a few dollars.

That is also the wrong question. The meaningful decision is between two very different
things that both get called "crypto for the ministry":

|                             | Issue our own token     | Accept crypto donations |
| --------------------------- | ----------------------- | ----------------------- |
| Technical difficulty        | Low                     | Low                     |
| Legal/regulatory risk       | **High**                | Low                     |
| Risk to 501(c)(3) status    | **Material**            | Negligible              |
| Raises money on its own     | No                      | Yes                     |
| Commonly done by nonprofits | Rare, and usually badly | Widespread              |

**Recommendation: do not issue a token. Accept crypto donations instead.**

---

## Option 1 -- Issue our own token

### What it would involve

Deploying a token contract on a chain such as Ethereum, Base, or Solana. The mechanics
are a solved problem; standard tooling handles it. There is no meaningful engineering
obstacle.

### Why it is not recommended

**Securities exposure.** If purchasers acquire the token expecting its value to rise
based on the ministry's efforts, it likely meets the SEC's _Howey_ test as an investment
contract -- an unregistered security. Enforcement risk attaches to the organization and
potentially to officers personally.

**Exempt-status risk.** Issuing and selling a token is not itself a charitable activity.
Depending on structure, the IRS could treat proceeds as unrelated business taxable income
(UBIT), or -- in a worse case -- view the arrangement as private benefit or inurement,
which puts the 501(c)(3) determination itself at risk.

**Money transmission.** Depending on how the token is sold, redeemed, or exchanged,
various states may treat the ministry as a money transmitter. That is a state-by-state
licensing regime with bonding requirements, not a one-time filing.

**State charity regulators.** State attorneys general have been active in this area.
A charitable organization operating a token market invites examination.

**Donor trust.** A ministry launching a coin reads to many donors -- and to local press --
as a warning sign regardless of intent. That perception is difficult to reverse once
formed, and the downside is asymmetric.

**It does not actually raise funds.** A token has no value unless someone buys it. Issuing
one means building a speculative market around the ministry's name and absorbing the
liability for anyone who loses money in it.

### When it might be revisited

Only with nonprofit counsel and securities counsel already engaged and affirmatively
advising in favor. Absent that, this option should stay closed.

---

## Option 2 -- Accept crypto donations (recommended)

This is legitimate, common, and low-risk. Many churches and nonprofits do it. Donors who
give appreciated crypto directly avoid capital gains tax they would owe on a sale, which
is why crypto gifts often run larger than cash gifts from the same donor.

### Current donation stack

The site currently routes giving through:

- **Zeffy** -- primary donation forms
  (`src/components/home-page/SupportMinistry/index.tsx`,
  `src/components/cause-page/index.tsx`,
  `src/app/support-this-ministry/page.tsx`)
- **PayPal** -- hosted button (`src/components/ui/PayPalButton.tsx`)

Neither processes crypto, so accepting it means adding a provider rather than
reconfiguring an existing one.

### Provider comparison

Fee figures below were current as of this writing and **must be re-verified at signup** --
these platforms change pricing.

| Provider              | Cost to ministry      | Notes                                                                                                                                      |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Every.org**         | Free                  | Acts as intermediary and grants cash to the ministry. Best fit alongside Zeffy's zero-fee model.                                           |
| **The Giving Block**  | ~3%                   | Most established nonprofit-specific platform. Auto-converts to USD. Strong receipting and reporting.                                       |
| **Engiven**           | ~3%                   | Comparable feature set; notably popular with churches. Embeddable widgets, giving dashboard.                                               |
| **Coinbase Commerce** | Lower processing cost | Cheapest on paper, but receipting, valuation, and compliance become the ministry's responsibility. Not recommended without staff capacity. |

Given the ministry already prioritizes zero-fee giving via Zeffy, **Every.org is the
closest philosophical match**; The Giving Block or Engiven are the stronger choices if
dedicated crypto donor support and reporting matter more than the fee.

### Tax and compliance mechanics

These apply regardless of provider and should be confirmed with the ministry's CPA:

- The IRS treats cryptocurrency as **noncash property**, not currency. The ministry's
  written acknowledgment describes the asset received and **does not state a dollar
  value** -- valuation is the donor's responsibility.
- Donors claiming more than **$5,000** need a **qualified appraisal** and the ministry's
  signature on **Form 8283, Section B**. Cryptocurrency does _not_ qualify for the
  publicly-traded-securities appraisal exemption (IRS CCA 202302012).
- If the ministry disposes of donated crypto within **three years**, it files
  **Form 8282**.
- **Liquidate to USD on receipt.** Holding crypto on the balance sheet is a volatility and
  fiduciary exposure that would require explicit board authorization. Every provider above
  supports automatic conversion; it should be enabled.
- A **gift acceptance policy** covering noncash and digital assets should be adopted by the
  board before the first crypto gift is received, not after.

### What implementation would touch

If leadership approves, the change is small and follows existing site patterns:

- Add a crypto giving option to `src/app/support-this-ministry/page.tsx`, reusing the
  existing `GeneralDonationCard` component pattern
  (`src/components/ui/General-Donation-Card.tsx`)
- Add the provider domain to the `preconnect` / `dns-prefetch` hints in
  `src/app/layout.tsx`, matching how Zeffy is handled
- Update `src/app/cookie-policy/page.tsx` and the privacy disclosures if the provider sets
  cookies or embeds a widget
- Add E2E coverage in `tests/support.spec.ts` alongside the existing donation assertions

---

## Option 3 -- Non-transferable recognition token or NFT

A badge or certificate issued to donors that cannot be resold. Lower legal risk than
Option 1 because there is no investment expectation and no market.

Not recommended on cost/benefit grounds: it is meaningful engineering and ongoing
maintenance to deliver something a mailed certificate or a PDF accomplishes better, for
donors who overwhelmingly do not hold crypto wallets.

---

## Recommended next steps

1. Board reviews this document and formally closes Option 1.
2. Board adopts a gift acceptance policy covering noncash and digital assets.
3. CPA confirms the Form 8283 / 8282 handling and receipting language.
4. Leadership selects a provider from the table above.
5. Implementation proceeds against the file list in Option 2.

---

## Sources

- [Best Ways to Accept Crypto Donations](https://blog.every.org/crypto-platforms/) -- Every.org
- [The Giving Block -- pricing and features](https://www.capterra.com/p/209190/The-Giving-Block/) -- Capterra
- [Engiven Cryptocurrency Donation Platform -- pricing](https://www.capterra.com/p/218787/Engiven-Cryptocurrency-Donation-Platform/) -- Capterra
- [The Best Crypto Fundraising Platforms for Nonprofits](https://thegivingblock.com/resources/the-best-crypto-fundraising-platforms-for-nonprofits/) -- The Giving Block
