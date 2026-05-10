import { Bell, Menu, Bookmark, ChevronRight, Leaf, Circle, BookOpen } from 'lucide-react'
import BottomNav from '../components/BottomNav'

function DailyReflectionCard({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="w-full overflow-hidden rounded-2xl text-left"
      style={{
        background: 'linear-gradient(145deg, #c4a882 0%, #b89468 50%, #a8805a 100%)',
        minHeight: 148,
        position: 'relative',
      }}
    >
      {/* Mini landscape illustration */}
      <svg
        viewBox="0 0 340 148"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Sun watercolor */}
        <circle cx="68" cy="44" r="26" fill="#e8a07a" opacity="0.45" />
        <circle cx="68" cy="44" r="16" fill="#f0b896" opacity="0.5" />
        {/* Small orange dot */}
        <circle cx="272" cy="32" r="9" fill="#e8a07a" opacity="0.7" />
        {/* Hills */}
        <path d="M0 100 C40 72 90 58 150 68 C210 78 260 55 310 65 C325 68 340 64 340 64 L340 148 L0 148 Z" fill="#8a6848" opacity="0.32" />
        <path d="M0 118 C50 98 105 85 165 95 C225 105 270 88 320 98 L340 100 L340 148 L0 148 Z" fill="#7a5838" opacity="0.38" />
        {/* Tree */}
        <rect x="195" y="70" width="2.5" height="28" fill="#6a4830" opacity="0.55" />
        <ellipse cx="196" cy="66" rx="10" ry="14" fill="#6a4830" opacity="0.45" />
      </svg>

      {/* Text content */}
      <div className="relative z-10 flex h-full flex-col p-5" style={{ minHeight: 148 }}>
        <p
          className="font-serif leading-snug text-parchment"
          style={{ fontSize: 18, fontWeight: 500, maxWidth: 200 }}
        >
          Give yourself permission to grow at your own pace.
        </p>
        <div className="flex-1" />
        <div className="flex items-center justify-between">
          <div className="bg-parchment/40" style={{ height: 1, width: 24 }} />
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-xs font-medium text-parchment/80">Take a moment</span>
            <ChevronRight size={13} color="rgba(250,245,238,0.8)" />
          </div>
        </div>
      </div>
    </button>
  )
}

function ExploreItem({ icon: Icon, label, color, bgColor }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: bgColor }}
      >
        {Icon === 'sun' ? (
          <div
            className="rounded-full"
            style={{
              width: 28,
              height: 28,
              background: 'radial-gradient(circle at 40% 40%, #f5c49a, #e8a07a 55%, #d4845a)',
              opacity: 0.9,
            }}
          />
        ) : (
          <Icon size={20} strokeWidth={1.5} color={color} />
        )}
      </div>
      <span className="text-center font-sans text-[11px] text-muted leading-tight" style={{ maxWidth: 58 }}>
        {label}
      </span>
    </div>
  )
}

function ContinueReadingCard({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="flex w-full items-start gap-3 rounded-2xl bg-parchment p-3.5 text-left shadow-soft"
    >
      {/* Thumbnail */}
      <div
        className="flex-shrink-0 overflow-hidden rounded-xl"
        style={{ width: 72, height: 72 }}
      >
        <svg viewBox="0 0 72 72" style={{ width: 72, height: 72 }}>
          <rect width="72" height="72" fill="#e8ddd0" />
          {/* Mini sun */}
          <circle cx="44" cy="26" r="18" fill="#e8a07a" opacity="0.45" />
          <circle cx="44" cy="26" r="11" fill="#f0b896" opacity="0.5" />
          {/* Mini flower */}
          {[0,45,90,135,180,225,270,315].map((angle, i) => (
            <ellipse
              key={i}
              cx={36 + Math.cos((angle * Math.PI) / 180) * 9}
              cy={42 + Math.sin((angle * Math.PI) / 180) * 9}
              rx="4.5"
              ry="7"
              transform={`rotate(${angle} ${36 + Math.cos((angle * Math.PI) / 180) * 9} ${42 + Math.sin((angle * Math.PI) / 180) * 9})`}
              fill="#f5f0e8"
              opacity="0.88"
            />
          ))}
          <circle cx="36" cy="42" r="5" fill="#e8c87a" opacity="0.9" />
          {/* Stem */}
          <path d="M36 50 L36 68" stroke="#8a7a58" strokeWidth="1.5" />
          {/* Ground */}
          <path d="M0 62 C18 58 36 60 54 57 L72 60 L72 72 L0 72 Z" fill="#c4a882" opacity="0.4" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1 pt-0.5">
        <p className="font-serif text-ink" style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.3 }}>
          The flower on the wall
        </p>
        <p className="mt-1 font-sans text-muted" style={{ fontSize: 12, lineHeight: 1.4 }}>
          Finding hope in the most unexpected places.
        </p>
      </div>

      {/* Bookmark */}
      <Bookmark size={16} strokeWidth={1.5} color="#9a8880" className="mt-1 flex-shrink-0" />
    </button>
  )
}

export default function HomeScreen({ activeTab, setActiveTab, onOpenCard, onOpenArticle }) {
  return (
    <div className="flex h-full flex-col bg-cream">
      {/* Status bar */}
      <div className="px-6 pt-3 pb-1">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[12px] font-semibold text-ink">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="4" width="3" height="8" rx="0.5" fill="#2c1f18" opacity="0.7"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="0.5" fill="#2c1f18" opacity="0.7"/><rect x="9" y="0.5" width="3" height="11.5" rx="0.5" fill="#2c1f18" opacity="0.7"/><rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill="#2c1f18" opacity="0.3"/></svg>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-2 pb-3">
        <div className="flex items-center gap-4">
          <button>
            <Menu size={22} strokeWidth={1.5} color="#2c1f18" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-ink" style={{ fontSize: 19, fontWeight: 500 }}>
                Good morning, you
              </span>
              <span style={{ fontSize: 16 }}>🤎</span>
            </div>
            <p className="mt-0.5 font-sans text-muted" style={{ fontSize: 12.5, lineHeight: 1.4 }}>
              Take a breath. You're exactly
              <br />
              where you need to be.
            </p>
          </div>
        </div>
        <Bell size={21} strokeWidth={1.5} color="#2c1f18" />
      </div>

      {/* Scrollable content */}
      <div className="hide-scrollbar flex-1 overflow-y-auto px-5" style={{ paddingBottom: 88 }}>
        {/* Daily reflection */}
        <div className="mb-4">
          <p className="mb-2.5 font-sans text-[13px] font-semibold text-ink" style={{ letterSpacing: '0.01em' }}>
            Daily reflection
          </p>
          <DailyReflectionCard onOpen={onOpenArticle} />
        </div>

        {/* Explore */}
        <div className="mb-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-sans text-[13px] font-semibold text-ink">Explore</p>
            <span className="font-sans text-[12.5px] font-medium text-terra">View all</span>
          </div>
          <div className="flex justify-between px-1">
            <ExploreItem
              icon="sun"
              label="Affirmation Cards"
              bgColor="#f5e8d8"
            />
            <ExploreItem
              icon={Leaf}
              label="Journal"
              color="#8a6848"
              bgColor="#eee8dc"
            />
            <ExploreItem
              icon={Circle}
              label="Reflections"
              color="#8a7868"
              bgColor="#ece4d8"
            />
            <ExploreItem
              icon={BookOpen}
              label="Blog"
              color="#8a7060"
              bgColor="#ece4d8"
            />
          </div>
        </div>

        {/* Continue reading */}
        <div>
          <p className="mb-2.5 font-sans text-[13px] font-semibold text-ink">Continue reading</p>
          <ContinueReadingCard onOpen={onOpenArticle} />
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
