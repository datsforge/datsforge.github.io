# Changelog

All notable changes to this project will be documented in this file.  
This project adheres to [Semantic Versioning](https://semver.org/).

---

## [1.1.0] – 2025-06-20

### Added
- Complete HTML structure using semantic elements for better SEO and accessibility
- Responsive dark/light theme toggle
- Animated navigation bar:
  - Automatically hides on scroll down, shows on scroll up
  - Scrolls to page sections: `Projects`, `Skills`, `Tools`, `About`, `Contact`
- Modular component loading for:
  - Navbar
  - Footer
  - SVG icon sprites
- Animated hero section with decorative fireflies and falling leaves based on page selected theme dark/light
- Intro section with animated skill slider and strong branding message
- Projects section with placeholder (`#projects-container`) for dynamic insertion
- Skills section divided into:
  - Game Development (LibGDX, Tiled, Aseprite)
  - App Development (Java, Kotlin, Firebase, Jetpack Compose, AdMob)
  - Visual/UI Design (pixel art, minimalist UI, iconography)
- Tools section categorizing languages, dev tools, and graphics tools
- Contact section with:
  - Email + GitHub contact links
  - Accessible contact form (Name, Email, Message)
  - Honeypot anti-spam field
  - Form submission feedback status
- Error banner for failed component loading
- Scroll-based animation on first show using `animateOnShow()`
- Hover proximity effect with `autoHover()` for mobile experience.
- ARIA labels and roles for all critical interactive regions
- SEO meta tags: `description`, `author`, `viewport`
- Improved modular JavaScript initialization using `try/catch` guards
- Optimized script loading with `defer` for non-blocking execution

### Changed
- N/A (First stable version with full feature set)

### Removed
- N/A (First stable version with full feature set)

---

## [1.0.0] – 2025-05-25

### Added
- Initial website for **datsforge**
- Custom GitHub Pages domain: [https://datsforge.com](https://datsforge.com)
- Minimalist pixel-style homepage with tagline
- Dark theme with monospace aesthetic
- Favicon and brand assets included

### Security
- Added `SECURITY.md` with vulnerability reporting guidelines
- Secret scanning enabled via GitHub
- GitHub Pages locked to `datsforge.com` only (via `CNAME`)

---

## [0.1.0] – 2025-05-20 *(pre-release)*

### Prototype
- Laid out initial repo structure
- Hosted prototype on `datsforge.github.io`
