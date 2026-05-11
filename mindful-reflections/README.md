# Mindful Reflections — Wellness App

A mobile wellness app UI prototype rendered as an iPhone shell in the browser. Designed around warmth, self-reflection, and everyday moments of calm — with affirmation cards, journal prompts, and blog-style reflections.

> This is a UI prototype only — no backend, no auth, no routing library. Screen state is managed locally in `App.jsx`.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| Vite | 6 | Build tool & dev server |
| Tailwind CSS | 3 | Styling |
| Framer Motion | 12 | Screen transitions |
| Lucide React | 0.503 | Icons |

**Fonts:** Cormorant Garamond (serif) + Manrope (sans-serif) via Google Fonts

---

## Getting Started

```bash
cd mindful-reflections
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
```

> This is a standalone Vite project — run commands from inside the `mindful-reflections/` folder.

---

## Project Structure

```
mindful-reflections/
├── src/
│   ├── App.jsx                       # Screen router (splash → home → card/article)
│   ├── main.jsx                      # React entry point
│   ├── index.css                     # Global styles, scrollbar hiding
│   ├── components/
│   │   └── BottomNav.jsx             # 5-tab bottom navigation bar
│   └── screens/
│       ├── SplashScreen.jsx          # Onboarding / welcome screen
│       ├── HomeScreen.jsx            # Main feed screen
│       ├── CardDetailScreen.jsx      # Affirmation card product view
│       └── ArticleScreen.jsx         # Blog / reflection article view
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `cream` | `#f7ede2` | App background |
| `parchment` | `#faf5ee` | Card / nav surface |
| `terra` | `#c4674a` | Primary CTA color |
| `terra-dark` | `#a8522e` | Hover / pressed state |
| `sun` | `#e8a07a` | Warm illustration accent |
| `ink` | `#2c1f18` | Primary text |
| `muted` | `#7a6659` | Secondary text |
| `stone` | `#d4c4b8` | Dividers, inactive nav |

**Shadow scale:** `shadow-soft` · `shadow-card` · `shadow-float`

**Illustration style:** Custom inline SVG — watercolor suns, botanical branches, layered earth hills, flowers with petals and centers

---

## Screens

### SplashScreen
- Watercolor sun (top-left, blurred radial gradient)
- Botanical branch SVG (right side, hand-drawn style)
- Layered landscape hills (bottom)
- Title: *"Mindful reflections"* (serif italic)
- Tagline: *"Pause. Reflect. See life with new eyes."*
- "Begin your journey" CTA button (terra color, full-width pill)
- "Already have an account? Sign in" link

### HomeScreen
- Status bar (9:41, signal icons)
- Header: *"Good morning, you"* greeting + bell icon + hamburger menu
- **Daily Reflection card** — gradient landscape card with quote, opens ArticleScreen
- **Explore grid** — 4 categories: Affirmation Cards, Journal, Reflections, Blog
- **Continue Reading card** — thumbnail + title + bookmark icon, opens ArticleScreen
- Bottom navigation

### CardDetailScreen
- Back button (pill icon)
- Like (heart toggle) + Share buttons
- Flower illustration card (240×300px, rounded, SVG)
- Dot indicators (carousel-style, 3 dots)
- Product info: title, category label, price (₹299), stock badge
- Description text
- "Add to cart" button + cart icon button

### ArticleScreen
- Back button + Bookmark (toggle) + Share buttons
- Category label: *"Reflection"*
- Article title: *"The flower on the wall"*
- Subtitle + read time (5 min · May 12, 2024)
- Full-width illustration (flower in landscape, 210px tall)
- Article body (2 paragraphs)
- "Read full story →" CTA button

---

## Navigation

`BottomNav` has 5 tabs:

| Tab | Icon | Active color |
|-----|------|-------------|
| Home | `Home` | terra `#c4674a` |
| Cards | `CreditCard` | terra |
| Journal | `BookMarked` | terra |
| Blog | `BookOpen` | terra |
| Profile | `User` | terra |

Active tab uses bold stroke weight (2) vs inactive (1.5).

---

## Screen Flow

```
SplashScreen
    └── "Begin your journey" → HomeScreen
            ├── Daily Reflection card → ArticleScreen → back → HomeScreen
            └── Continue Reading card → ArticleScreen → back → HomeScreen
            └── (future) Card grid → CardDetailScreen → back → HomeScreen
```

> `CardDetailScreen` is wired in `App.jsx` (`onOpenCard`) but not currently triggered from HomeScreen — the daily reflection and continue reading both open ArticleScreen.

---

## What's Built

- [x] Splash screen with watercolor botanical illustrations
- [x] Home screen feed (daily reflection, explore, continue reading)
- [x] Card detail screen with like/share, product pricing, add to cart
- [x] Article / blog reading screen with illustration
- [x] Bottom navigation (5 tabs, active state)
- [x] Animated screen transitions (Framer Motion `AnimatePresence`)
- [x] iPhone shell rendering (390×844px, 44px border-radius)
- [x] Custom Tailwind palette and shadow tokens
- [x] Scrollbar hiding utility

---

## What's Not Done Yet / Ideas to Explore

- [ ] Wire `CardDetailScreen` to a card in the home feed (currently unreachable from UI)
- [ ] Add real card data (array of affirmation cards with content)
- [ ] Journal screen content
- [ ] Blog listing screen
- [ ] Profile screen
- [ ] Sign in / account flow
- [ ] Favourite / bookmark persistence
- [ ] Swipeable card carousel on CardDetailScreen (dots already present)
- [ ] Notification panel (bell icon)
- [ ] "View all" in Explore section

---

*Last updated: 2026-05-11*
