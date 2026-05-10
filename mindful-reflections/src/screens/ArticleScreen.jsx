import { ArrowLeft, Bookmark, Share2, Clock } from 'lucide-react'
import { useState } from 'react'

function ArticleIllustration() {
  const petals = Array.from({ length: 8 }, (_, i) => (i * 360) / 8)
  return (
    <svg viewBox="0 0 340 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="artSun" cx="58%" cy="42%" r="48%">
          <stop offset="0%" stopColor="#f5c49a" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#e8a07a" stopOpacity="0.7" />
          <stop offset="72%" stopColor="#d4845a" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#c4674a" stopOpacity="0.04" />
        </radialGradient>
        <filter id="artBlur">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* Background fill */}
      <rect width="340" height="210" fill="#ede5d8" />

      {/* Watercolor sun */}
      <circle cx="210" cy="80" r="90" fill="url(#artSun)" filter="url(#artBlur)" />
      <circle cx="204" cy="75" r="55" fill="#f0b896" opacity="0.18" filter="url(#artBlur)" />

      {/* Ground / earth layers */}
      <path d="M0 148 C50 138 110 132 170 142 C230 152 285 140 340 148 L340 210 L0 210 Z" fill="#c4a882" opacity="0.38" />
      <path d="M0 162 C60 154 125 148 185 158 C245 168 295 155 340 162 L340 210 L0 210 Z" fill="#b89068" opacity="0.44" />
      <path d="M0 178 C70 170 140 165 200 174 C260 183 305 170 340 178 L340 210 L0 210 Z" fill="#a87858" opacity="0.5" />

      {/* Crack lines in earth */}
      <path d="M55 152 C60 162 58 172 63 182" stroke="#8a6848" strokeWidth="0.8" opacity="0.28" />
      <path d="M140 158 C136 168 139 176 135 186" stroke="#8a6848" strokeWidth="0.8" opacity="0.28" />
      <path d="M260 162 C265 172 262 180 267 190" stroke="#8a6848" strokeWidth="0.8" opacity="0.28" />
      <path d="M55 165 C48 170 44 176" stroke="#8a6848" strokeWidth="0.6" opacity="0.2" />
      <path d="M140 170 C148 175 152 180" stroke="#8a6848" strokeWidth="0.6" opacity="0.2" />

      {/* Stem */}
      <path d="M170 148 C168 132 166 115 170 95" stroke="#8a7858" strokeWidth="2.8" strokeLinecap="round" opacity="0.68" />

      {/* Leaves */}
      <path d="M169 128 C150 120 135 124 122 118" stroke="#8a7858" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="144" cy="122" rx="16" ry="6" transform="rotate(-12 144 122)" fill="#9a8858" opacity="0.32" />

      <path d="M170 112 C190 104 205 108 218 102" stroke="#8a7858" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="196" cy="105" rx="15" ry="5.5" transform="rotate(10 196 105)" fill="#9a8858" opacity="0.3" />

      {/* Flower petals */}
      {petals.map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 170 + Math.cos(rad) * 34
        const cy = 80 + Math.sin(rad) * 34
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="14"
            ry="21"
            transform={`rotate(${angle} ${cx} ${cy})`}
            fill="#f8f4ee"
            stroke="#e8ddd0"
            strokeWidth="0.5"
            opacity="0.95"
          />
        )
      })}

      {/* Flower center */}
      <circle cx="170" cy="80" r="16" fill="#e8c07a" opacity="0.9" />
      <circle cx="170" cy="80" r="11" fill="#d4a85a" opacity="0.85" />
      {[...Array(14)].map((_, i) => {
        const a = (i * (360 / 14) * Math.PI) / 180
        return <circle key={i} cx={170 + Math.cos(a) * 7} cy={80 + Math.sin(a) * 7} r="1.3" fill="#b8902a" opacity="0.5" />
      })}
    </svg>
  )
}

export default function ArticleScreen({ onBack }) {
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <div className="flex h-full flex-col bg-cream">
      {/* Status bar */}
      <div className="px-6 pt-3 pb-1">
        <span className="font-sans text-[12px] font-semibold text-ink">9:41</span>
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-parchment shadow-soft"
        >
          <ArrowLeft size={18} strokeWidth={1.8} color="#2c1f18" />
        </button>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setBookmarked(b => !b)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-parchment shadow-soft"
          >
            <Bookmark
              size={17}
              strokeWidth={1.8}
              color={bookmarked ? '#c4674a' : '#2c1f18'}
              fill={bookmarked ? '#c4674a' : 'none'}
            />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-parchment shadow-soft">
            <Share2 size={17} strokeWidth={1.8} color="#2c1f18" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="hide-scrollbar flex-1 overflow-y-auto" style={{ paddingBottom: 88 }}>
        {/* Header */}
        <div className="px-6 pt-2 pb-4">
          <p className="font-sans font-semibold text-terra" style={{ fontSize: 11.5, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Reflection
          </p>
          <h1 className="mt-1.5 font-serif text-ink" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.18 }}>
            The flower on the wall
          </h1>
          <p className="mt-2 font-sans leading-snug text-muted" style={{ fontSize: 14 }}>
            Finding hope in the most unexpected places.
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <Clock size={13} strokeWidth={1.5} color="#9a8880" />
            <span className="font-sans text-muted" style={{ fontSize: 12 }}>
              5 min read &nbsp;·&nbsp; May 12, 2024
            </span>
          </div>
        </div>

        {/* Illustration */}
        <div className="mx-5 overflow-hidden rounded-2xl shadow-card" style={{ height: 210 }}>
          <ArticleIllustration />
        </div>

        {/* Article body */}
        <div className="px-6 pt-5">
          <h2 className="font-serif text-ink" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.25 }}>
            A small flower.
            <br />
            A loud reminder.
          </h2>
          <div className="my-3 bg-terra" style={{ width: 24, height: 2, borderRadius: 1 }} />

          <p className="font-sans leading-relaxed text-muted" style={{ fontSize: 13.5 }}>
            In the busiest days, we often miss the smallest signs of beauty. But sometimes, that's exactly where hope hides.
          </p>

          <p className="mt-3 font-sans leading-relaxed text-muted" style={{ fontSize: 13.5 }}>
            A single flower pushing through cracked stone doesn't ask for permission. It simply grows — quiet, persistent, full of light.
          </p>
        </div>
      </div>

      {/* Read full story button */}
      <div className="absolute bottom-0 left-0 right-0 bg-cream px-5 pb-8 pt-3" style={{ borderTop: '1px solid #e8ddd4' }}>
        <button
          className="flex w-full items-center justify-center gap-2 rounded-full bg-terra py-4 font-sans font-semibold text-white"
          style={{ fontSize: 15 }}
        >
          <span>Read full story</span>
          <span style={{ fontSize: 18 }}>→</span>
        </button>
      </div>
    </div>
  )
}
