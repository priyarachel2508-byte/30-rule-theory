import { useState } from 'react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = [
  {
    text: "When you wake up with a heavy heart, you usually...",
    options: [
      "Make tea and sit in silence",
      "Reach for my journal",
      "Call a friend who listens",
      "Step outside for fresh air",
    ],
  },
  {
    text: "Right now, your heart most needs...",
    options: [
      "Peace and gentle healing",
      "Deeper human connection",
      "Clarity and direction",
      "Space to create freely",
    ],
  },
  {
    text: "When facing a hard decision, you...",
    options: [
      "Trust your gut first",
      "Write out every option",
      "Ask someone you trust",
      "Wait for it to feel right",
    ],
  },
  {
    text: "Your relationship with rest feels like...",
    options: [
      "Something I always crave",
      "A reward I haven't earned",
      "Something I'm slowly learning",
      "Sacred and non-negotiable",
    ],
  },
  {
    text: "To you, personal growth feels...",
    options: [
      "Quiet and barely visible",
      "Messy but meaningful",
      "Slow like seasons turning",
      "Sudden, like a bloom",
    ],
  },
]

const RESULTS = [
  {
    id: "still",
    title: "The Still Waters",
    subtitle: "Your path is inner peace",
    affirmation:
      "You are a reservoir of quiet wisdom. Your stillness is not emptiness — it is depth. The world needs your kind of calm. Trust the peace you carry.",
    journalPrompt:
      "Write about a moment this week when silence felt like the most honest answer you could give yourself.",
  },
  {
    id: "rooted",
    title: "The Rooted Oak",
    subtitle: "Your strength is steadiness",
    affirmation:
      "You grow slowly and deeply. While others rush toward the light, you anchor. That steadiness — that refusal to be swept away — is your greatest gift.",
    journalPrompt:
      "What is one thing you've been nurturing quietly that deserves more of your attention and trust?",
  },
  {
    id: "blooming",
    title: "The Blooming Field",
    subtitle: "You are in full becoming",
    affirmation:
      "You are in full flourishing, even when it doesn't feel that way. Every part of you is mid-bloom, mid-becoming. Beauty is already here in you.",
    journalPrompt:
      "Name three small things that brought you unexpected joy in the past two days. Sit with each one.",
  },
]

function getResult(answers) {
  if (!answers.length) return RESULTS[0]
  const avg = answers.reduce((a, b) => a + b, 0) / answers.length
  if (avg < 1.5) return RESULTS[0]
  if (avg < 2.5) return RESULTS[1]
  return RESULTS[2]
}

function CardAccent() {
  return (
    <svg viewBox="0 0 90 90" style={{ width: 90, height: 90 }} aria-hidden="true">
      <defs>
        <radialGradient id="qAcc" cx="62%" cy="38%" r="52%">
          <stop offset="0%" stopColor="#e8a07a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c4a882" stopOpacity="0" />
        </radialGradient>
        <filter id="qBlur">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <circle cx="58" cy="32" r="44" fill="url(#qAcc)" filter="url(#qBlur)" />
      <path
        d="M44 52 C36 38 22 30 10 26"
        stroke="#8a7858"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <ellipse
        cx="27"
        cy="34"
        rx="11"
        ry="4"
        transform="rotate(-22 27 34)"
        fill="#8a7858"
        opacity="0.3"
      />
      <path
        d="M44 52 C54 36 68 28 80 22"
        stroke="#8a7858"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <ellipse
        cx="63"
        cy="32"
        rx="10"
        ry="3.8"
        transform="rotate(18 63 32)"
        fill="#8a7858"
        opacity="0.28"
      />
      <circle cx="44" cy="52" r="4" fill="#e8a07a" opacity="0.5" />
    </svg>
  )
}

function StillWatersIllustration() {
  return (
    <svg viewBox="0 0 340 170" fill="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="sw_sun" cx="35%" cy="38%" r="42%">
          <stop offset="0%" stopColor="#f5d4a8" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#e8b888" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e8a07a" stopOpacity="0" />
        </radialGradient>
        <filter id="sw_blur">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id="sw_soft">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width="340" height="170" fill="#f0e8d8" />
      <circle cx="120" cy="65" r="75" fill="url(#sw_sun)" filter="url(#sw_blur)" />
      {/* Moon */}
      <circle cx="108" cy="55" r="20" fill="#f5ddb8" opacity="0.85" />
      <circle cx="116" cy="50" r="17" fill="#f0e8d8" opacity="0.9" />
      {/* Stars */}
      <circle cx="175" cy="35" r="1.2" fill="#d4b888" opacity="0.7" />
      <circle cx="220" cy="45" r="1.4" fill="#d4b888" opacity="0.65" />
      <circle cx="285" cy="18" r="1.3" fill="#d4b888" opacity="0.6" />
      <circle cx="310" cy="38" r="0.9" fill="#d4b888" opacity="0.5" />
      <circle cx="248" cy="28" r="1" fill="#d4b888" opacity="0.55" />
      {/* Distant hills */}
      <path
        d="M0 105 C40 88 90 80 145 90 C200 100 248 82 295 92 C310 96 325 88 340 92 L340 170 L0 170 Z"
        fill="#c4a882"
        opacity="0.22"
      />
      {/* Water surface */}
      <path
        d="M0 120 C45 115 100 118 160 116 C220 114 280 118 340 114 L340 170 L0 170 Z"
        fill="#b89878"
        opacity="0.18"
      />
      {/* Ripples */}
      <ellipse cx="170" cy="148" rx="70" ry="8" stroke="#a08868" strokeWidth="0.7" opacity="0.2" fill="none" />
      <ellipse cx="170" cy="148" rx="50" ry="5.5" stroke="#a08868" strokeWidth="0.7" opacity="0.18" fill="none" />
      <ellipse cx="170" cy="148" rx="30" ry="3.5" stroke="#a08868" strokeWidth="0.6" opacity="0.15" fill="none" />
      {/* Lotus petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return (
          <ellipse
            key={i}
            cx={170 + Math.cos(rad) * 16}
            cy={148 + Math.sin(rad) * 7}
            rx="8"
            ry="12"
            transform={`rotate(${angle} ${170 + Math.cos(rad) * 16} ${148 + Math.sin(rad) * 7})`}
            fill="#f8f4ee"
            stroke="#e0d8cc"
            strokeWidth="0.5"
            opacity="0.92"
          />
        )
      })}
      <circle cx="170" cy="148" r="7" fill="#e8c07a" opacity="0.85" />
      <circle cx="170" cy="148" r="4.5" fill="#d4a85a" opacity="0.8" />
      {/* Lily pad */}
      <ellipse cx="195" cy="158" rx="14" ry="6" fill="#9a8858" opacity="0.25" />
      <path d="M195 152 L195 158" stroke="#9a8858" strokeWidth="0.8" opacity="0.3" />
      {/* Ground */}
      <path
        d="M0 162 C60 158 130 155 200 160 C270 165 310 158 340 162 L340 170 L0 170 Z"
        fill="#a88858"
        opacity="0.28"
      />
    </svg>
  )
}

function RootedOakIllustration() {
  return (
    <svg viewBox="0 0 340 170" fill="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="ro_sun" cx="72%" cy="32%" r="48%">
          <stop offset="0%" stopColor="#f5c49a" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#e8a07a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e8a07a" stopOpacity="0" />
        </radialGradient>
        <filter id="ro_blur">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <rect width="340" height="170" fill="#eee6d4" />
      <circle cx="265" cy="55" r="80" fill="url(#ro_sun)" filter="url(#ro_blur)" />
      {/* Ground layers */}
      <path
        d="M0 115 C45 105 95 98 150 108 C205 118 255 105 305 112 C320 115 330 110 340 112 L340 170 L0 170 Z"
        fill="#b89878"
        opacity="0.32"
      />
      <path
        d="M0 128 C55 120 115 114 175 124 C235 134 285 122 340 128 L340 170 L0 170 Z"
        fill="#a88858"
        opacity="0.4"
      />
      <path
        d="M0 142 C65 136 130 130 195 140 C260 150 300 138 340 143 L340 170 L0 170 Z"
        fill="#987848"
        opacity="0.45"
      />
      {/* Tree trunk */}
      <path
        d="M170 115 C168 100 166 80 168 55 C170 30 168 18 170 10"
        stroke="#5a3e28"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M170 115 C168 100 166 80 168 55 C170 30 168 18 170 10"
        stroke="#7a5a3a"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Roots */}
      <path d="M170 115 C160 118 145 122 128 130" stroke="#5a3e28" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
      <path d="M128 130 C118 135 108 138 95 145" stroke="#5a3e28" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <path d="M170 115 C178 120 192 125 208 132" stroke="#5a3e28" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" />
      <path d="M208 132 C220 138 232 142 248 148" stroke="#5a3e28" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <path d="M170 115 C165 122 162 130 158 142" stroke="#5a3e28" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      <path d="M170 115 C175 122 178 130 182 142" stroke="#5a3e28" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      {/* Branches */}
      <path d="M168 70 C148 58 128 52 108 50" stroke="#5a3e28" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
      <path d="M168 55 C188 42 210 36 230 34" stroke="#5a3e28" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <path d="M169 40 C155 28 138 22 120 20" stroke="#5a3e28" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path d="M169 35 C182 22 198 16 214 14" stroke="#5a3e28" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Sage leaf canopy */}
      <ellipse cx="108" cy="46" rx="28" ry="20" fill="#7a8a5a" opacity="0.38" />
      <ellipse cx="92" cy="52" rx="20" ry="14" fill="#8a9a68" opacity="0.32" />
      <ellipse cx="118" cy="38" rx="22" ry="16" fill="#6a7a4a" opacity="0.35" />
      <ellipse cx="170" cy="20" rx="30" ry="22" fill="#7a8a5a" opacity="0.4" />
      <ellipse cx="155" cy="15" rx="24" ry="18" fill="#8a9a68" opacity="0.35" />
      <ellipse cx="185" cy="14" rx="26" ry="19" fill="#6a7a4a" opacity="0.35" />
      <ellipse cx="230" cy="30" rx="26" ry="18" fill="#7a8a5a" opacity="0.38" />
      <ellipse cx="218" cy="22" rx="20" ry="14" fill="#6a7a4a" opacity="0.32" />
    </svg>
  )
}

function BloomingFieldIllustration() {
  const petals = Array.from({ length: 8 }, (_, i) => (i * 360) / 8)
  return (
    <svg viewBox="0 0 340 170" fill="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="bf_sun" cx="52%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#f5c49a" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#e8a07a" stopOpacity="0.65" />
          <stop offset="75%" stopColor="#d4845a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#c4674a" stopOpacity="0" />
        </radialGradient>
        <filter id="bf_blur">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="bf_soft">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <rect width="340" height="170" fill="#ede5d6" />
      <circle cx="178" cy="58" r="92" fill="url(#bf_sun)" filter="url(#bf_blur)" />
      <circle cx="172" cy="52" r="38" fill="#f0b896" opacity="0.3" filter="url(#bf_soft)" />
      {/* Rolling hills */}
      <path
        d="M0 105 C40 85 90 75 145 86 C200 97 252 78 305 88 C320 92 330 85 340 88 L340 170 L0 170 Z"
        fill="#c4a882"
        opacity="0.3"
      />
      <path
        d="M0 120 C50 108 108 100 165 110 C222 120 270 108 320 116 L340 118 L340 170 L0 170 Z"
        fill="#b89878"
        opacity="0.38"
      />
      <path
        d="M0 138 C60 130 125 124 185 134 C245 144 295 132 340 138 L340 170 L0 170 Z"
        fill="#a88858"
        opacity="0.45"
      />
      {/* Small background flower — left */}
      <path d="M85 138 L85 118" stroke="#8a7858" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const r = (angle * Math.PI) / 180
        return (
          <ellipse
            key={`f1${i}`}
            cx={85 + Math.cos(r) * 12}
            cy={108 + Math.sin(r) * 7}
            rx="7"
            ry="10"
            transform={`rotate(${angle} ${85 + Math.cos(r) * 12} ${108 + Math.sin(r) * 7})`}
            fill="#f8f4ee"
            opacity="0.88"
          />
        )
      })}
      <circle cx="85" cy="108" r="6" fill="#e8c07a" opacity="0.9" />
      <circle cx="85" cy="108" r="4" fill="#d4a85a" opacity="0.85" />
      {/* Small background flower — right */}
      <path d="M268 132 L268 112" stroke="#8a7858" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const r = (angle * Math.PI) / 180
        return (
          <ellipse
            key={`f2${i}`}
            cx={268 + Math.cos(r) * 12}
            cy={102 + Math.sin(r) * 7}
            rx="7"
            ry="10"
            transform={`rotate(${angle} ${268 + Math.cos(r) * 12} ${102 + Math.sin(r) * 7})`}
            fill="#f8f4ee"
            opacity="0.85"
          />
        )
      })}
      <circle cx="268" cy="102" r="6" fill="#e8c07a" opacity="0.9" />
      <circle cx="268" cy="102" r="4" fill="#d4a85a" opacity="0.85" />
      {/* Main flower stem + leaves */}
      <path d="M178 155 C176 140 174 122 178 100" stroke="#8a7858" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M177 135 C158 126 142 130 128 124" stroke="#8a7858" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="150" cy="128" rx="16" ry="6" transform="rotate(-12 150 128)" fill="#9a8858" opacity="0.32" />
      <path d="M178 120 C198 110 214 114 228 108" stroke="#8a7858" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="205" cy="111" rx="14" ry="5.5" transform="rotate(10 205 111)" fill="#9a8858" opacity="0.3" />
      {/* Main flower petals */}
      {petals.map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 178 + Math.cos(rad) * 30
        const cy = 88 + Math.sin(rad) * 30
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
      {petals.map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 178 + Math.cos(rad) * 30
        const cy = 88 + Math.sin(rad) * 30
        return (
          <line
            key={`v${i}`}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(rad) * 14}
            y2={cy + Math.sin(rad) * 14}
            stroke="#d8cfc4"
            strokeWidth="0.6"
            opacity="0.6"
          />
        )
      })}
      <circle cx="178" cy="88" r="14" fill="#e8c07a" opacity="0.92" />
      <circle cx="178" cy="88" r="10" fill="#d4a85a" opacity="0.88" />
      {[...Array(12)].map((_, i) => {
        const a = (i * 30 * Math.PI) / 180
        return (
          <circle key={i} cx={178 + Math.cos(a) * 6} cy={88 + Math.sin(a) * 6} r="1.2" fill="#b8902a" opacity="0.5" />
        )
      })}
    </svg>
  )
}

function ResultIllustration({ result }) {
  if (result.id === 'still') return <StillWatersIllustration />
  if (result.id === 'rooted') return <RootedOakIllustration />
  return <BloomingFieldIllustration />
}

function QuestionView({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)

  function handleSelect(idx) {
    if (selected !== null) return
    setSelected(idx)
    setTimeout(() => onAnswer(idx), 280)
  }

  return (
    <motion.div
      className="flex flex-1 flex-col justify-center px-5 pb-6"
      initial={{ opacity: 0, x: 22 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -22 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Question card */}
      <div className="relative mb-5 overflow-hidden rounded-3xl bg-parchment shadow-card">
        <div className="pointer-events-none absolute right-0 top-0 opacity-[0.2]">
          <CardAccent />
        </div>
        <div className="relative p-6 pb-7">
          <p className="font-serif text-ink" style={{ fontSize: 20, lineHeight: 1.44, maxWidth: 265 }}>
            {question.text}
          </p>
        </div>
      </div>

      {/* Option pills */}
      <div className="flex flex-col gap-2.5">
        {question.options.map((opt, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.07, duration: 0.22 }}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={`w-full rounded-full px-5 py-3.5 text-left font-sans transition-all duration-200 ${
              selected === i
                ? 'bg-terra text-white shadow-soft'
                : selected !== null
                ? 'bg-parchment text-ink opacity-40 shadow-soft'
                : 'bg-parchment text-ink shadow-soft'
            }`}
            style={{ fontSize: 13.5 }}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

function ResultView({ result, onRestart }) {
  return (
    <motion.div
      className="hide-scrollbar flex-1 overflow-y-auto"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Illustration */}
      <div className="mx-5 overflow-hidden rounded-2xl shadow-card" style={{ height: 170 }}>
        <ResultIllustration result={result} />
      </div>

      {/* Result content */}
      <div className="mx-5 mt-4 pb-8">
        <p
          className="font-sans font-medium text-terra"
          style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          Your reflection reveals...
        </p>

        <h2 className="mt-1.5 font-serif text-ink" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.15 }}>
          {result.title}
        </h2>
        <p className="mt-1 font-sans text-muted" style={{ fontSize: 13.5 }}>
          {result.subtitle}
        </p>

        <div className="my-3 rounded-full bg-terra" style={{ width: 24, height: 2 }} />

        <p className="font-serif italic text-ink" style={{ fontSize: 16, lineHeight: 1.62, opacity: 0.85 }}>
          "{result.affirmation}"
        </p>

        {/* Journal prompt */}
        <div className="mt-5 rounded-2xl px-5 py-4" style={{ background: '#f2e8d8' }}>
          <p
            className="mb-1.5 font-sans font-semibold text-terra"
            style={{ fontSize: 11.5, letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            Your journal prompt
          </p>
          <p className="font-sans leading-relaxed text-muted" style={{ fontSize: 13 }}>
            {result.journalPrompt}
          </p>
        </div>

        {/* Restart */}
        <button
          onClick={onRestart}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-stone bg-parchment py-3.5 font-sans font-medium text-muted shadow-soft transition-opacity active:opacity-70"
          style={{ fontSize: 13.5 }}
        >
          <RotateCcw size={15} strokeWidth={1.8} color="#7a6659" />
          <span>Try again</span>
        </button>
      </div>
    </motion.div>
  )
}

export default function DecisionGameScreen({ onBack }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const isDone = step >= QUESTIONS.length
  const progress = (step / QUESTIONS.length) * 100

  function handleAnswer(optionIndex) {
    setAnswers(prev => [...prev, optionIndex])
    setStep(s => s + 1)
  }

  function handleRestart() {
    setAnswers([])
    setStep(0)
  }

  return (
    <div className="flex h-full flex-col bg-cream">
      {/* Status bar */}
      <div className="px-6 pt-3 pb-1">
        <span className="font-sans text-[12px] font-semibold text-ink">9:41</span>
      </div>

      {/* Header */}
      <div className="flex items-center px-5 py-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-parchment shadow-soft"
        >
          <ArrowLeft size={18} strokeWidth={1.8} color="#2c1f18" />
        </button>
        <h1
          className="flex-1 text-center font-serif italic text-ink"
          style={{ fontSize: 18.5 }}
        >
          What Should I Do?
        </h1>
        {!isDone ? (
          <span className="w-9 text-right font-sans text-muted" style={{ fontSize: 12 }}>
            {step + 1}/{QUESTIONS.length}
          </span>
        ) : (
          <div className="w-9" />
        )}
      </div>

      {/* Progress bar */}
      {!isDone && (
        <div className="mx-5 mb-1">
          <div className="overflow-hidden rounded-full" style={{ height: 4, background: '#e8ddd4' }}>
            <div
              className="h-full rounded-full bg-terra transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Animated content */}
      <AnimatePresence mode="wait" initial={false}>
        {!isDone ? (
          <QuestionView key={step} question={QUESTIONS[step]} onAnswer={handleAnswer} />
        ) : (
          <ResultView key="result" result={getResult(answers)} onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </div>
  )
}
