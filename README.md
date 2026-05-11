# 30 Rule Theory — Theory Card Deck

A quiet, animated web app built as a pocket philosophy card deck. Users flip cards to reveal small theories about hope, rest, timing, and the inner life — each card opening into a deeper reflection, story, or interactive experience.

**Live URL:** https://priyarachel2508-byte.github.io/30-rule-theory/

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| Vite | 6 | Build tool & dev server |
| Tailwind CSS | 3 | Styling |
| Framer Motion | 12 | Animations & transitions |
| Lucide React | 0.503 | Icons |

**Fonts:** Cormorant Garamond (serif) + Manrope (sans-serif) via Google Fonts

---

## Getting Started

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

**Deploy:** Automatic — pushing to `main` triggers GitHub Actions → GitHub Pages.

---

## Project Structure

```
30-rule-theory/
├── src/
│   ├── App.jsx                    # Root layout, screen state, deep-link logic
│   ├── main.jsx                   # React entry point
│   ├── index.css                  # Global styles, custom animations
│   ├── components/
│   │   ├── HeroSection.jsx        # Animated page header
│   │   ├── TheoryDeck.jsx         # Card grid with flip interactions
│   │   ├── TheoryCard.jsx         # Individual flippable card
│   │   ├── TheoryModal.jsx        # Deep-dive modal (standard theories)
│   │   └── TheoryJourney.jsx      # Story + game view (hasJourney theories)
│   ├── game/
│   │   └── TwoContainersGame.jsx  # Interactive thought-sorting game
│   └── data/
│       └── theories.js            # All theory content
├── .github/workflows/deploy.yml   # GitHub Pages auto-deploy
├── tailwind.config.js
├── vite.config.js                 # base: '/30-rule-theory/'
└── mindful-reflections/           # Separate sub-project (see its own README)
```

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `almond` | `#f5eee4` | Page background |
| `parchment` | `#f9f4ed` | Card surface |
| `clay` | `#b88c72` | Warm accent |
| `rose` | `#c99599` | Soft accent |
| `moss` | `#8a9b85` | Green accent |
| `ink` | `#3d342f` | Primary text |
| `bark` | `#645247` | Secondary text |

**Shadow scale:** `shadow-paper` → `shadow-float`  
**Background texture:** `bg-grain` (radial gradient overlay)  
**Animation:** `animate-drift` (floating particles, 8s loop)

---

## Theories (11 cards)

| # | ID | Title | Special |
|---|-----|-------|---------|
| 1 | `ray-of-hope` | Ray of Hope | — |
| 2 | `30-percent-rule` | The 30% Rule | — |
| 3 | `two-containers-theory` | The Two Containers | `hasJourney: true` → story + interactive game |
| 4 | `quiet-progress-theory` | Quiet Progress Theory | — |
| 5 | `rest-isnt-failure` | Rest Isn't Failure Theory | — |
| 6 | `borrowed-deadline` | The Borrowed Deadline | — |
| 7 | `soft-no-theory` | The Soft No Theory | — |
| 8 | `waiting-room-theory` | The Waiting Room Theory | — |
| 9 | `small-proof-theory` | The Small Proof Theory | — |
| 10 | `open-door-theory` | The Open Door Theory | — |
| 11 | `gentle-return-theory` | The Gentle Return Theory | — |

Each theory has: `observation` · `insight` · `conclusion` · `permission` · `question`

---

## Key Features Built

- [x] Animated hero section (Framer Motion fade + slide)
- [x] Flip-card interaction — cards reveal teaser on flip, open detail on tap
- [x] Theory modal — full observation / insight / conclusion / permission / question layout
- [x] TheoryJourney view — story + interactive game for `two-containers-theory`
- [x] TwoContainersGame — drag thoughts into "loop" vs "process" containers
- [x] Ambient background — animated floating particles + paper grain texture
- [x] Deep-link support — `?theory=<id>` auto-opens a specific theory on load
- [x] GitHub Actions deploy pipeline to GitHub Pages
- [x] Custom Tailwind palette, font setup, and shadow tokens
- [x] Responsive layout (mobile → desktop)

---

## What's Not Done Yet / Ideas to Explore

- [ ] Add `hasJourney: true` and journey content to more theories
- [ ] Add more theories to the deck
- [ ] Persisting flipped-card state (localStorage)
- [ ] Share button per theory (copy deep-link URL)
- [ ] Accessibility pass (keyboard navigation, ARIA labels)
- [ ] Dark mode variant
- [ ] Progress tracker ("you've read X of 11 theories")

---

## How Each Theory Card Works

1. **Unflipped** — shows title + subtitle + teaser
2. **Flipped** — card flips to reveal a short teaser prompt
3. **Opened** — clicks into either:
   - `TheoryModal` (most theories) — structured reflection layout
   - `TheoryJourney` (theories with `hasJourney: true`) — story paragraphs + interactive game

---

*Last updated: 2026-05-11*
