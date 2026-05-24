Smile4Me by Richter Digital — AdMob Landing Page (One-Page)

# Overview

A single-page landing page for **Smile4Me**, a social media / entertainment mobile app by **Richter Digital**, a German app and web development studio. The page serves as the official "developer presence" required by AdMob/Google Play, providing company info, app showcase, contact details, and legally compliant privacy policy and impressum (legal notice) pages.

The page is deployed to **richterdigital.pro**.

**Language:** English (with German legal pages as required by German law).

# Page Structure

The site is a **single-page** layout with 5 main sections, plus separate routes for legal pages:

```
Home (/) ─────────────────────────────
  ├── Navigation
  ├── Hero (Company + App Intro)
  ├── About / Mission
  ├── App Showcase (Smile4Me)
  ├── Contact
  └── Footer

Privacy Policy (/privacy)
Impressum (/impressum)
```

# Design Tokens

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Dark BG | `#070A12` | Page background |
| Card BG | `#0B1022` | Cards, sections |
| Electric Blue | `#2D62FF` | Primary accent, buttons, links |
| Electric Light | `#5B85FF` | Hover states |
| White | `#F4F6FF` | Headings |
| Muted | `#A7B0C8` | Body text, descriptions |
| Border | `rgba(244,246,255,0.08)` | Card borders |

## Typography

- **Headings:** `Sora`, weight 700-800, sizes: H1: 48-64px, H2: 32-40px
- **Body:** `Inter`, weight 400, 16px, line-height 1.6
- **Labels:** `IBM Plex Mono`, uppercase, letter-spacing 0.12em, 12px

## Spacing

- Page padding: `px-6 lg:px-12`
- Section padding: `py-16 lg:py-24`
- Max-width: `max-w-6xl mx-auto`
- Card border-radius: `20px`
- Button border-radius: `14px`

# Dependencies

- `react-router-dom` (multi-page routing for legal pages)
- `lucide-react` (icons)

# Navigation

- **Logo:** Richter Digital text + small icon
- **Links:** Home, Privacy Policy, Impressum
- **Layout:** Fixed top bar, transparent on hero, solid dark on scroll
- **Mobile:** Hamburger menu

# Section 1: Hero

**Height:** `min-h-[70vh]`, centered content

**Content:**
- Label: "RUGHTER DIGITAL" (mono, muted)
- Headline: "App & Web Development from Germany"
- Subline: "We build apps and web experiences that people love."
- App highlight card:
  - Smile4Me logo (512x512)
  - "Smile4Me — Our first app"
  - Short description: "A fun social media app with emoji filters and effects. Share moments, express yourself."
  - Link: "Learn more" (scrolls to App Showcase)

**Visual:**
- Background: Dark solid `#070A12` with subtle radial gradient
- Large blurred decorative circle behind content: `radial-gradient(circle, rgba(45,98,255,0.12) 0%, transparent 70%)`

# Section 2: About / Mission

**Layout:** Two-column on desktop (text left, visual right), stacked on mobile

**Content:**
- Label: "ABOUT US"
- Headline: "Building Digital Products That Matter"
- Body text:
  > "Richter Digital is a small but passionate development studio based in Bad Driburg, Germany. We specialize in building mobile apps and web applications that focus on user experience, performance, and clean design. Our goal is simple: create products people enjoy using every day."
- Mission line: "We believe great software should be fun, fast, and accessible to everyone."

**Visual right:**
- Abstract decorative element: 3 floating circles (CSS) with blur and gradient fills in blue/purple
- Or: simple illustration of phone + code brackets

# Section 3: App Showcase — Smile4Me

**Layout:** Full-width card, dark card background `#0B1022`, rounded-2xl

**Content:**
- Label: "OUR APP"
- Headline: "Smile4Me"
- Subline: "Express yourself with emoji filters and effects"
- Description:
  > "Smile4Me is a social entertainment app that lets you add fun emoji filters and effects to your photos and videos. Share your moments with friends, go live with interactive reactions, and make every memory more fun."
- Feature list (with small check icons):
  - Fun emoji filters & face effects
  - Live streaming with reactions
  - Share photos & videos with friends
  - Easy to use, fast & lightweight
- CTA: "Get it on Google Play" (button style, disabled/placeholder)
- App Store badge placeholder (optional)

**Screenshots:**
- Two phone mockup images side by side (screenshot1 + screenshot2)
- Displayed in phone frames (CSS rounded rectangle with border)
- Hover: slight scale up

**Visual:**
- Card background: `#0B1022`
- Subtle gradient overlay
- Screenshot frames: `border: 1px solid rgba(255,255,255,0.1)`, `border-radius: 24px`, overflow hidden

# Section 4: Contact

**Layout:** Centered, single column

**Content:**
- Label: "CONTACT"
- Headline: "Get in Touch"
- Subline: "Questions about Smile4Me or interested in working together? We'd love to hear from you."
- Email: `hello@richterdigital.pro` (mailto link, clickable, electric blue)
- Location: "Richter Digital, Bad Driburg, Germany"
- Response time note: "We typically respond within 1-2 business days."

**Visual:**
- Icon: Mail icon (Lucide) above email
- Card layout with subtle border

# Footer

**Layout:** Simple, centered or two-column

**Content:**
- Left: "© 2025 Richter Digital. All rights reserved."
- Right: Links — Privacy Policy, Impressum
- Center: "Made with ❤️ in Germany"

**Visual:**
- Top border: `1px solid rgba(255,255,255,0.05)`
- Padding: `py-8`
- Text: muted color, small size

# Privacy Policy Page (/privacy)

**Layout:** Simple text page, max-width `max-w-3xl`, left-aligned

**Required content:**
- Title: "Privacy Policy"
- Subtitle: "Datenschutzerklärung"
- Last updated: "May 2025"
- Sections:
  1. **Introduction** — "This privacy policy applies to the Smile4Me app and the richterdigital.pro website."
  2. **Data Controller** — "Richter Digital, Bad Driburg, Germany. Contact: hello@richterdigital.pro"
  3. **What Data We Collect** — List: App usage data (analytics), Device info (OS version, model), Ad data (for AdMob personalized ads), Crash logs (for stability)
  4. **How We Use Data** — Improve app, show relevant ads (AdMob), fix bugs, analyze usage
  5. **Advertising** — "We use Google AdMob to display ads. AdMob may use your device's advertising ID to show personalized ads. You can opt out in your device settings."
  6. **Third Parties** — Google AdMob, Google Firebase (analytics/crashlytics)
  7. **Your Rights** — GDPR rights: access, deletion, portability
  8. **Contact** — "hello@richterdigital.pro"

**Back link:** "← Back to Home"

# Impressum Page (/impressum)

**Layout:** Same as Privacy Policy

**Required content (German law):**
- Title: "Impressum" (Legal Notice)
- **Angaben gemäß § 5 TMG:**
  - Richter Digital
  - [Your full name / responsible person]
  - [Street address]
  - Bad Driburg
  - Germany
- **Contact:**
  - Email: hello@richterdigital.pro
- **Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:**
  - [Your name]
- **Hinweis:** "Diese Website dient als Entwickler-Präsenz für die Smile4Me App."

**Placeholder note:** User must fill in their actual name and street address before publishing.

**Back link:** "← Zurück zur Startseite"

# Animations & Interactions

- **Scroll-triggered fade-in:** Each section fades in + translateY(20px→0) on scroll into view
- **Duration:** 600ms, ease-out
- **Hover on buttons:** `translateY(-2px)`, glow effect on primary buttons
- **Hover on links:** Color transition to electric blue
- **Screenshot hover:** `scale(1.03)`, transition 300ms

# Responsive Notes

- **Mobile:** Single column, stacked layout
- **Screenshots:** Side by side on desktop, stacked on mobile
- **Nav:** Hamburger menu on mobile
- **Legal pages:** Full-width text with comfortable padding

# Assets

**Images (already generated/uploaded):**

| Asset | Path | Type | Description |
|-------|------|------|-------------|
| smile4me-logo | `/images/smile4me-logo.png` | PNG (transparent) | App logo, neon smiley |
| smile4me-screenshot1 | `/images/smile4me-screenshot1.png` | PNG | Phone mockup with party selfie |
| smile4me-screenshot2 | `/images/smile4me-screenshot2.png` | PNG | Phone mockup with festival/DJ |

# Notes

- **No fake reviews** — Remove all star ratings and review counts
- **No fake stats** — No "+300% leads" or fabricated numbers
- **Be honest** — This is a real developer presence page
- **German legal pages** — Privacy Policy and Impressum must remain in German or bilingual to comply with German law
- **Main page in English** — As requested by user for international audience
- **AdMob compliance** — This page structure meets AdMob's minimum requirements for a developer website