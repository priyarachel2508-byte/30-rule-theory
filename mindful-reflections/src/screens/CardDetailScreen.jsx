import { ArrowLeft, Heart, Share2, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

function FlowerIllustration() {
  const petals = Array.from({ length: 8 }, (_, i) => (i * 360) / 8)
  return (
    <svg viewBox="0 0 280 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="sunGrad" cx="52%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#f5c49a" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#e8a07a" stopOpacity="0.65" />
          <stop offset="75%" stopColor="#d4845a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c4674a" stopOpacity="0.05" />
        </radialGradient>
        <filter id="sunBlur">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* Watercolor sun */}
      <circle cx="155" cy="105" r="85" fill="url(#sunGrad)" filter="url(#sunBlur)" />
      <circle cx="148" cy="98" r="52" fill="#f0b896" opacity="0.22" filter="url(#softBlur)" />

      {/* Cracked earth / ground texture */}
      <path d="M0 220 C40 210 90 205 140 215 C190 225 240 215 280 220 L280 300 L0 300 Z" fill="#c4a882" opacity="0.35" />
      <path d="M0 235 C50 226 110 220 165 230 C220 240 258 228 280 235 L280 300 L0 300 Z" fill="#b89068" opacity="0.4" />
      <path d="M0 252 C60 244 120 238 180 248 C240 258 268 244 280 250 L280 300 L0 300 Z" fill="#a87858" opacity="0.45" />

      {/* Crack lines */}
      <path d="M65 228 C70 238 68 248 72 258" stroke="#8a6848" strokeWidth="0.8" opacity="0.3" />
      <path d="M120 235 C115 245 118 252 114 262" stroke="#8a6848" strokeWidth="0.8" opacity="0.3" />
      <path d="M200 240 C205 250 202 258 206 268" stroke="#8a6848" strokeWidth="0.8" opacity="0.3" />

      {/* Stem */}
      <path d="M140 210 C138 195 136 175 140 155" stroke="#8a7858" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      {/* Leaf left */}
      <path d="M139 185 C122 178 108 182 98 176" stroke="#8a7858" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="118" cy="180" rx="14" ry="5.5" transform="rotate(-15 118 180)" fill="#9a8858" opacity="0.35" />
      {/* Leaf right */}
      <path d="M140 172 C157 164 170 168 180 162" stroke="#8a7858" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="162" cy="165" rx="13" ry="5" transform="rotate(12 162 165)" fill="#9a8858" opacity="0.35" />

      {/* Flower petals */}
      {petals.map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 140 + Math.cos(rad) * 32
        const cy = 132 + Math.sin(rad) * 32
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="13"
            ry="20"
            transform={`rotate(${angle} ${cx} ${cy})`}
            fill="#f8f4ee"
            stroke="#e8ddd0"
            strokeWidth="0.5"
            opacity="0.95"
          />
        )
      })}
      {/* Petal veins */}
      {petals.map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 140 + Math.cos(rad) * 32
        const cy = 132 + Math.sin(rad) * 32
        const ex = cx + Math.cos(rad) * 16
        const ey = cy + Math.sin(rad) * 16
        return (
          <line key={`v${i}`} x1={cx} y1={cy} x2={ex} y2={ey} stroke="#d8cfc4" strokeWidth="0.6" opacity="0.6" />
        )
      })}

      {/* Flower center */}
      <circle cx="140" cy="132" r="14" fill="#e8c07a" opacity="0.92" />
      <circle cx="140" cy="132" r="10" fill="#d4a85a" opacity="0.85" />
      {/* Center texture dots */}
      {[...Array(12)].map((_, i) => {
        const a = (i * 30 * Math.PI) / 180
        return <circle key={i} cx={140 + Math.cos(a) * 6} cy={132 + Math.sin(a) * 6} r="1.2" fill="#b8902a" opacity="0.5" />
      })}
    </svg>
  )
}

export default function CardDetailScreen({ onBack }) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="flex h-full flex-col bg-cream">
      {/* Status bar */}
      <div className="px-6 pt-3 pb-1">
        <span className="font-sans text-[12px] font-semibold text-ink">9:41</span>
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-2">
        <button onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-parchment shadow-soft">
          <ArrowLeft size={18} strokeWidth={1.8} color="#2c1f18" />
        </button>
        <div className="flex items-center gap-2.5">
          <button onClick={() => setLiked(l => !l)} className="flex h-9 w-9 items-center justify-center rounded-full bg-parchment shadow-soft">
            <Heart size={17} strokeWidth={1.8} color={liked ? '#c4674a' : '#2c1f18'} fill={liked ? '#c4674a' : 'none'} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-parchment shadow-soft">
            <Share2 size={17} strokeWidth={1.8} color="#2c1f18" />
          </button>
        </div>
      </div>

      {/* Card illustration */}
      <div className="flex justify-center px-8 pt-2">
        <div
          className="overflow-hidden rounded-3xl bg-parchment shadow-float"
          style={{ width: 240, height: 300 }}
        >
          <FlowerIllustration />
          <div
            className="px-5 pb-5 pt-2 text-center"
            style={{ marginTop: -8 }}
          >
            <p className="font-serif text-ink" style={{ fontSize: 18, fontWeight: 600 }}>
              Ray of Hope
            </p>
            <p className="mt-0.5 font-sans text-muted" style={{ fontSize: 12 }}>
              The flower on the wall
            </p>
            <div className="mx-auto mt-2 bg-stone" style={{ width: 24, height: 1 }} />
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex justify-center gap-2">
        <div className="rounded-full bg-terra" style={{ width: 8, height: 8 }} />
        <div className="rounded-full bg-stone" style={{ width: 8, height: 8 }} />
        <div className="rounded-full bg-stone" style={{ width: 8, height: 8 }} />
      </div>

      {/* Product info */}
      <div className="hide-scrollbar flex-1 overflow-y-auto px-6 pt-4" style={{ paddingBottom: 100 }}>
        <h2 className="font-serif text-ink" style={{ fontSize: 28, fontWeight: 600 }}>
          Ray of Hope
        </h2>

        <div className="mt-1 flex items-center gap-2">
          <span className="font-sans font-semibold text-terra" style={{ fontSize: 13 }}>
            Affirmation Card
          </span>
          <span className="font-sans text-terra" style={{ fontSize: 13 }}>·</span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="font-sans text-ink" style={{ fontSize: 18, fontWeight: 600 }}>
            ₹299
          </span>
          <span
            className="rounded-full px-3 py-0.5 font-sans text-xs font-medium"
            style={{ background: '#e8f0e0', color: '#5a7040', fontSize: 12 }}
          >
            In stock
          </span>
        </div>

        <p className="mt-3 font-sans leading-relaxed text-muted" style={{ fontSize: 13.5 }}>
          A reminder that beauty and hope can blossom anywhere, even in the most unexpected places.
        </p>
      </div>

      {/* Add to cart */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-3 bg-cream px-5 pb-8 pt-3" style={{ borderTop: '1px solid #e8ddd4' }}>
        <button
          className="flex-1 rounded-full bg-terra py-3.5 font-sans font-semibold text-white"
          style={{ fontSize: 15 }}
        >
          Add to cart
        </button>
        <button className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-stone bg-parchment shadow-soft">
          <ShoppingCart size={18} strokeWidth={1.8} color="#2c1f18" />
        </button>
      </div>
    </div>
  )
}
