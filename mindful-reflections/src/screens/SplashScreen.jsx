import { motion } from 'framer-motion'

function WatercolorSun() {
  return (
    <div
      style={{
        width: 300,
        height: 300,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 42% 42%, #f5c49a 0%, #e8a07a 38%, #d4845a 62%, #c4674a 80%, transparent 100%)',
        filter: 'blur(22px)',
        opacity: 0.72,
      }}
    />
  )
}

function BotanicalBranch() {
  return (
    <svg
      viewBox="0 0 160 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 160, height: 520 }}
    >
      {/* Main stem */}
      <path
        d="M80 510 C78 460 82 410 76 360 C70 310 84 260 80 200 C76 140 82 90 78 30"
        stroke="#5a3e30"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Branch left low */}
      <path
        d="M76 370 C60 355 35 345 12 338"
        stroke="#5a3e30"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* Branch right low */}
      <path
        d="M78 330 C96 316 120 308 148 302"
        stroke="#5a3e30"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* Branch left mid */}
      <path
        d="M80 240 C62 226 40 218 18 212"
        stroke="#5a3e30"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* Branch right mid */}
      <path
        d="M80 195 C100 180 128 172 152 168"
        stroke="#5a3e30"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* Branch left upper */}
      <path
        d="M79 130 C60 116 36 108 14 104"
        stroke="#5a3e30"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Branch right upper */}
      <path
        d="M79 90 C98 76 124 68 148 64"
        stroke="#5a3e30"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Leaves on left low branch */}
      <ellipse cx="40" cy="340" rx="11" ry="5.5" transform="rotate(-15 40 340)" fill="#7a6248" opacity="0.45" />
      <ellipse cx="18" cy="334" rx="9" ry="4.5" transform="rotate(-10 18 334)" fill="#7a6248" opacity="0.4" />

      {/* Leaves on right low branch */}
      <ellipse cx="118" cy="304" rx="11" ry="5" transform="rotate(12 118 304)" fill="#7a6248" opacity="0.45" />
      <ellipse cx="146" cy="298" rx="9" ry="4.5" transform="rotate(8 146 298)" fill="#7a6248" opacity="0.4" />

      {/* Leaves on left mid branch */}
      <ellipse cx="42" cy="214" rx="11" ry="5" transform="rotate(-18 42 214)" fill="#7a6248" opacity="0.45" />
      <ellipse cx="18" cy="208" rx="9" ry="4.5" transform="rotate(-12 18 208)" fill="#7a6248" opacity="0.4" />

      {/* Leaves on right mid branch */}
      <ellipse cx="120" cy="170" rx="10" ry="4.5" transform="rotate(14 120 170)" fill="#7a6248" opacity="0.4" />
      <ellipse cx="150" cy="164" rx="8" ry="4" transform="rotate(8 150 164)" fill="#7a6248" opacity="0.38" />

      {/* Leaves on left upper */}
      <ellipse cx="38" cy="106" rx="10" ry="4.5" transform="rotate(-20 38 106)" fill="#7a6248" opacity="0.38" />
      <ellipse cx="16" cy="100" rx="8" ry="4" transform="rotate(-14 16 100)" fill="#7a6248" opacity="0.35" />

      {/* Leaves on right upper */}
      <ellipse cx="122" cy="66" rx="9" ry="4" transform="rotate(16 122 66)" fill="#7a6248" opacity="0.38" />
      <ellipse cx="148" cy="60" rx="8" ry="4" transform="rotate(10 148 60)" fill="#7a6248" opacity="0.35" />

      {/* Tiny leaf at very top */}
      <ellipse cx="78" cy="32" rx="5" ry="9" fill="#7a6248" opacity="0.35" />
      <ellipse cx="72" cy="48" rx="4.5" ry="8" transform="rotate(-20 72 48)" fill="#7a6248" opacity="0.3" />
      <ellipse cx="86" cy="45" rx="4.5" ry="8" transform="rotate(20 86 45)" fill="#7a6248" opacity="0.3" />
    </svg>
  )
}

function LandscapeHills() {
  return (
    <svg
      viewBox="0 0 390 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 390, height: 160 }}
      preserveAspectRatio="none"
    >
      {/* Back hills */}
      <path
        d="M0 110 C40 80 90 60 140 70 C190 80 220 55 270 65 C320 75 360 58 390 70 L390 160 L0 160 Z"
        fill="#c4a882"
        opacity="0.28"
      />
      {/* Mid hills */}
      <path
        d="M0 130 C30 105 75 90 120 100 C165 110 200 88 250 95 C300 102 345 85 390 95 L390 160 L0 160 Z"
        fill="#b89870"
        opacity="0.35"
      />
      {/* Front hills */}
      <path
        d="M0 148 C50 128 100 115 155 122 C210 129 250 112 300 118 C340 123 368 110 390 118 L390 160 L0 160 Z"
        fill="#a8885e"
        opacity="0.4"
      />
      {/* Tree silhouette */}
      <rect x="218" y="88" width="2" height="30" fill="#8a6850" opacity="0.55" />
      <ellipse cx="219" cy="84" rx="8" ry="12" fill="#8a6850" opacity="0.45" />
    </svg>
  )
}

export default function SplashScreen({ onBegin }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-cream">
      {/* Watercolor sun top-left */}
      <div className="pointer-events-none absolute" style={{ top: -80, left: -80 }}>
        <WatercolorSun />
      </div>

      {/* Small dot accent */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 14,
          height: 14,
          background: '#e8a07a',
          opacity: 0.85,
          right: 52,
          top: '42%',
        }}
      />

      {/* Botanical branch right side */}
      <div className="pointer-events-none absolute" style={{ right: 0, top: '14%' }}>
        <BotanicalBranch />
      </div>

      {/* Landscape hills at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0">
        <LandscapeHills />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col px-8">
        {/* Spacer to push title down */}
        <div style={{ flex: '0 0 38%' }} />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            className="font-serif leading-none text-ink"
            style={{ fontSize: 52, fontWeight: 600, letterSpacing: '-0.5px' }}
          >
            Mindful
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>reflections</em>
          </h1>

          {/* Divider */}
          <div
            className="my-4 bg-muted"
            style={{ width: 28, height: 1.5, opacity: 0.5 }}
          />

          <p
            className="font-sans leading-snug text-ink"
            style={{ fontSize: 15.5, fontWeight: 500, opacity: 0.88 }}
          >
            Pause. Reflect.
            <br />
            See life with new eyes.
          </p>

          <p
            className="mt-3 font-sans leading-relaxed text-muted"
            style={{ fontSize: 13.5, maxWidth: 220 }}
          >
            A space for self-awareness, affirmations and everyday moments of light.
          </p>
        </motion.div>

        {/* Push buttons to bottom */}
        <div className="flex-1" />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={onBegin}
            className="w-full rounded-full bg-terra py-4 font-sans text-base font-semibold tracking-wide text-white transition-opacity active:opacity-80"
            style={{ fontSize: 15.5 }}
          >
            Begin your journey
          </button>

          <p
            className="mt-5 text-center font-sans text-sm text-muted"
            style={{ fontSize: 13 }}
          >
            Already have an account?{' '}
            <span className="font-semibold text-terra">Sign in</span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
