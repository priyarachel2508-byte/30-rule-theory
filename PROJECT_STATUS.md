# Project Status Sheet

Master reference for both projects in this repository. Updated after every working session.

---

## Projects Overview

| Project | Type | Status | Live URL |
|---------|------|--------|----------|
| 30 Rule Theory | Web app (desktop + mobile) | Active | https://priyarachel2508-byte.github.io/30-rule-theory/ |
| Mindful Reflections | Mobile UI prototype | Active | Not deployed (local only) |

---

## 1. 30 Rule Theory — Theory Card Deck

**Folder:** `/` (root)  
**Stack:** React 19, Vite 6, Tailwind CSS 3, Framer Motion 12  
**Deploy:** GitHub Pages via `.github/workflows/deploy.yml` — auto-deploys on push to `main`

### What's Done

| Area | Status | Notes |
|------|--------|-------|
| Project setup | Done | Vite + React + Tailwind + Framer Motion |
| GitHub Pages deploy pipeline | Done | Auto-deploys on push to `main` |
| Tailwind design tokens | Done | Colors: almond, parchment, clay, rose, moss, ink, bark |
| Custom fonts | Done | Cormorant Garamond + Manrope |
| Animated hero section | Done | Fade + slide in on load |
| Ambient background | Done | Floating particles + paper grain texture |
| Theory data | Done | 11 theories in `src/data/theories.js` |
| TheoryDeck (card grid) | Done | Responsive grid layout |
| TheoryCard (flip mechanic) | Done | Cards flip to show teaser, then open on tap |
| TheoryModal | Done | Full reflection layout: observation / insight / conclusion / permission / question |
| TheoryJourney | Done | Story + game view for theories with `hasJourney: true` |
| TwoContainersGame | Done | Interactive thought-sorting game (loop vs process containers) |
| Deep-link support | Done | `?theory=<id>` auto-opens a theory on load |
| Responsive layout | Done | Works mobile → desktop |

### Theories in the Deck

| # | Title | Has Journey |
|---|-------|-------------|
| 1 | Ray of Hope | No |
| 2 | The 30% Rule | No |
| 3 | The Two Containers | **Yes** (story + sorting game) |
| 4 | Quiet Progress Theory | No |
| 5 | Rest Isn't Failure Theory | No |
| 6 | The Borrowed Deadline | No |
| 7 | The Soft No Theory | No |
| 8 | The Waiting Room Theory | No |
| 9 | The Small Proof Theory | No |
| 10 | The Open Door Theory | No |
| 11 | The Gentle Return Theory | No |

### Pending / Ideas

- [ ] Add `hasJourney` content and games to more theories
- [ ] Add more theories to the deck (content in `src/data/theories.js`)
- [ ] Persist flipped-card state via localStorage
- [ ] Share button per theory (copies deep-link URL to clipboard)
- [ ] Accessibility pass (keyboard nav, ARIA labels on cards)
- [ ] Dark mode variant
- [ ] Progress tracker ("X of 11 theories explored")

### Key Files to Know

```
src/App.jsx                  ← screen state + deep-link logic
src/data/theories.js         ← ADD/EDIT theory content here
src/components/TheoryDeck.jsx
src/components/TheoryCard.jsx
src/components/TheoryModal.jsx
src/components/TheoryJourney.jsx
src/game/TwoContainersGame.jsx
```

---

## 2. Mindful Reflections — Wellness App

**Folder:** `mindful-reflections/`  
**Stack:** React 19, Vite 6, Tailwind CSS 3, Framer Motion 12  
**Deploy:** Not deployed — local prototype only

### What's Done

| Area | Status | Notes |
|------|--------|-------|
| Project setup | Done | Separate Vite project inside `mindful-reflections/` |
| iPhone shell rendering | Done | 390×844px, 44px border-radius, centered on taupe bg |
| Tailwind design tokens | Done | Colors: cream, parchment, terra, sun, ink, muted, stone |
| Custom fonts | Done | Cormorant Garamond + Manrope |
| Animated screen transitions | Done | Framer Motion `AnimatePresence` slide transitions |
| Splash screen | Done | Botanical watercolor art, "Begin your journey" CTA |
| Home screen | Done | Daily reflection card, Explore grid, Continue reading |
| Card detail screen | Done | Flower illustration, like/share, price (₹299), add to cart |
| Article / blog screen | Done | Illustration, article body, "Read full story" CTA |
| Bottom navigation | Done | 5 tabs: Home, Cards, Journal, Blog, Profile |
| Scrollbar hiding | Done | `.hide-scrollbar` utility class |

### Screen Flow

```
SplashScreen → HomeScreen → ArticleScreen (daily reflection / continue reading)
                          → CardDetailScreen (not yet wired from UI)
```

### Pending / Ideas

- [ ] Wire `CardDetailScreen` from home feed (currently unreachable from UI — only in App.jsx state)
- [ ] Create real affirmation card data (array, not hardcoded)
- [ ] Build Journal screen content
- [ ] Build Blog listing screen
- [ ] Build Profile screen
- [ ] Sign in / account flow (button exists on splash, not wired)
- [ ] Favourite / bookmark persistence
- [ ] Swipeable card carousel on CardDetailScreen (dot indicators already built)
- [ ] Notification panel (bell icon exists, not wired)
- [ ] Deploy to GitHub Pages (needs its own `base` config in vite.config.js)

### Key Files to Know

```
mindful-reflections/src/App.jsx                 ← screen state + transitions
mindful-reflections/src/screens/HomeScreen.jsx  ← main feed layout
mindful-reflections/src/screens/SplashScreen.jsx
mindful-reflections/src/screens/CardDetailScreen.jsx
mindful-reflections/src/screens/ArticleScreen.jsx
mindful-reflections/src/components/BottomNav.jsx
```

---

## Session Log

| Date | What Was Done |
|------|--------------|
| 2026-05-11 | Initial commit — 30 Rule Theory React app with GitHub Pages deploy workflow |
| 2026-05-11 | Created README.md for both projects and this PROJECT_STATUS.md |

---

## Where to Start Next Session

**30 Rule Theory:**
- The main app is live at https://priyarachel2508-byte.github.io/30-rule-theory/
- Next most impactful thing: add `hasJourney` content to a second theory, or add a new theory card to `src/data/theories.js`
- Branch: work on feature branches, merge to `main` to deploy

**Mindful Reflections:**
- Run `cd mindful-reflections && npm install && npm run dev` to see the prototype
- Most important gap: `CardDetailScreen` is built but unreachable from the UI — wire it from the home card grid
- All screens and navigation are in place; the next phase is real data and more screen content
