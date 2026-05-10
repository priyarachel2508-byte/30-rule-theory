import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const FEEDBACK_CORRECT = [
  'This thought completes its purpose.',
  'Yes — it found its place.',
  'There is a settling quality to that.',
  'Something in you already knew.',
]
const FEEDBACK_GENTLE = [
  'This one might still be circling…',
  'Notice any resistance in letting it rest.',
  "It wants to move, but isn’t ready.",
  "That’s okay. Some thoughts take longer.",
]

const BUBBLE_LAYOUTS = [
  [{ x: 50, y: 50, w: 72 }],
  [{ x: 32, y: 42, w: 62 }, { x: 68, y: 55, w: 58 }],
  [{ x: 28, y: 35, w: 56 }, { x: 68, y: 32, w: 52 }, { x: 48, y: 70, w: 54 }],
  [{ x: 25, y: 30, w: 52 }, { x: 68, y: 28, w: 50 }, { x: 22, y: 70, w: 48 }, { x: 68, y: 68, w: 50 }],
]
const DRIFTS = [
  { dx1: '5px', dy1: '-7px', dx2: '-4px', dy2: '6px', dx3: '6px', dy3: '4px' },
  { dx1: '-6px', dy1: '5px', dx2: '5px', dy2: '-6px', dx3: '-4px', dy3: '-5px' },
  { dx1: '4px', dy1: '8px', dx2: '-7px', dy2: '-4px', dx3: '5px', dy3: '-7px' },
  { dx1: '-5px', dy1: '-6px', dx2: '7px', dy2: '5px', dx3: '-6px', dy3: '7px' },
]
const DRIFT_DURS = ['7s', '9s', '8s', '10s']
const DRIFT_DELAYS = ['0s', '0.6s', '1.1s', '0.3s']
const BUBBLE_CLASSES = ['tc-bubble-0', 'tc-bubble-1', 'tc-bubble-2', 'tc-bubble-3']

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

// ── Pod colors (oklch — can't be expressed as Tailwind) ──────────────────────
const LOOP_POD = {
  background: 'oklch(89% 0.055 54 / 0.5)',
  border: '1.5px solid oklch(72% 0.07 52 / 0.35)',
  tagColor: 'oklch(40% 0.07 50)',
  titleColor: 'oklch(30% 0.06 52)',
  subtitleColor: 'oklch(42% 0.06 52)',
  dividerColor: 'oklch(60% 0.07 52)',
  dragOver: 'oklch(85% 0.07 54 / 0.7)',
  dragBorder: '3px solid oklch(65% 0.09 52 / 0.3)',
}
const PROC_POD = {
  background: 'oklch(91% 0.05 148 / 0.48)',
  border: '1.5px solid oklch(68% 0.08 150 / 0.3)',
  tagColor: 'oklch(38% 0.08 150)',
  titleColor: 'oklch(28% 0.07 152)',
  subtitleColor: 'oklch(40% 0.07 150)',
  dividerColor: 'oklch(58% 0.08 150)',
  dragOver: 'oklch(87% 0.07 148 / 0.7)',
  dragBorder: '3px solid oklch(60% 0.09 150 / 0.3)',
}

// ── Bubble in loop pod ────────────────────────────────────────────────────────
function LoopBubble({ text, index, total }) {
  const layouts = BUBBLE_LAYOUTS[Math.min(total - 1, BUBBLE_LAYOUTS.length - 1)]
  const slot = layouts[index] || layouts[layouts.length - 1]
  const drift = DRIFTS[index % DRIFTS.length]
  const dur = DRIFT_DURS[index % DRIFT_DURS.length]
  const delay = DRIFT_DELAYS[index % DRIFT_DELAYS.length]
  const cls = BUBBLE_CLASSES[index % 4]
  const fs = slot.w > 55 ? '13px' : '11px'

  return (
    <div
      className={`${cls} absolute flex items-center justify-center rounded-full text-center`}
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        width: `${slot.w}%`,
        height: `${slot.w}%`,
        fontSize: fs,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontStyle: 'italic',
        fontWeight: 300,
        lineHeight: 1.3,
        padding: '14px',
        wordBreak: 'break-word',
        hyphens: 'auto',
        animation: `tcBubbleIn 0.65s cubic-bezier(0.34,1.5,0.64,1) forwards, tcBubbleDrift ${dur} ease-in-out ${delay} infinite`,
        '--dx1': drift.dx1, '--dy1': drift.dy1,
        '--dx2': drift.dx2, '--dy2': drift.dy2,
        '--dx3': drift.dx3, '--dy3': drift.dy3,
      }}
    >
      {text.length > 36 ? text.slice(0, 33) + '…' : text}
    </div>
  )
}

// ── Process bubble (pops and disappears) ─────────────────────────────────────
function ProcessBubble({ text, key }) {
  return (
    <div
      key={key}
      className="absolute flex items-center justify-center rounded-full text-center pointer-events-none"
      style={{
        width: 140,
        height: 140,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 13,
        fontStyle: 'italic',
        fontWeight: 300,
        color: 'oklch(32% 0.07 152)',
        background: 'oklch(90% 0.06 148 / 0.75)',
        border: '1.5px solid oklch(65% 0.08 150 / 0.5)',
        lineHeight: 1.35,
        boxShadow: '0 4px 20px oklch(60% 0.08 150 / 0.15), inset 0 1px 0 oklch(100% 0 0 / 0.6)',
        animation: 'tcBubblePop 1.6s cubic-bezier(0.34,1.4,0.64,1) forwards',
      }}
    >
      {text.length > 40 ? text.slice(0, 36) + '…' : text}
    </div>
  )
}

// ── Loop Pod ──────────────────────────────────────────────────────────────────
function LoopPod({ thoughts, isDragOver, onDragOver, onDragLeave, onDrop, onClick }) {
  return (
    <div
      onClick={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        background: isDragOver ? LOOP_POD.dragOver : LOOP_POD.background,
        border: isDragOver ? LOOP_POD.dragBorder : LOOP_POD.border,
        backdropFilter: 'blur(14px)',
        borderRadius: 28,
        marginRight: 16,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background 0.3s ease, border 0.2s ease',
        transform: isDragOver ? 'scale(1.025)' : 'scale(1)',
      }}
    >
      <div style={{ padding: '22px 24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: LOOP_POD.tagColor }}>↻ Circling</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px, 2.8vw, 34px)', fontWeight: 300, textAlign: 'center', lineHeight: 1.15, color: LOOP_POD.titleColor }}>
          Looping<br />Thoughts
        </h2>
        <p style={{ fontSize: 12, fontWeight: 300, textAlign: 'center', opacity: 0.65, marginTop: 4, lineHeight: 1.5, color: LOOP_POD.subtitleColor }}>
          Thoughts that circle without end
        </p>
      </div>
      <div style={{ height: 1, margin: '0 24px', background: LOOP_POD.dividerColor, opacity: 0.25 }} />
      {/* bubble field */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: 8 }}>
        {thoughts.map((t, i) => (
          <LoopBubble key={i} text={t} index={i} total={thoughts.length} />
        ))}
        {thoughts.length === 0 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.28 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 14, color: 'oklch(40% 0.07 50)' }}>
              drag or tap ←
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Process Pod ───────────────────────────────────────────────────────────────
function ProcessPod({ thoughts, processedCount, isDragOver, onDragOver, onDragLeave, onDrop, onClick }) {
  const latest = thoughts[thoughts.length - 1]
  return (
    <div
      onClick={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        background: isDragOver ? PROC_POD.dragOver : PROC_POD.background,
        border: isDragOver ? PROC_POD.dragBorder : PROC_POD.border,
        backdropFilter: 'blur(14px)',
        borderRadius: 28,
        marginLeft: 16,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background 0.3s ease, border 0.2s ease',
        transform: isDragOver ? 'scale(1.025)' : 'scale(1)',
      }}
    >
      <div style={{ padding: '22px 24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: PROC_POD.tagColor }}>◎ Finishing</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px, 2.8vw, 34px)', fontWeight: 300, textAlign: 'center', lineHeight: 1.15, color: PROC_POD.titleColor }}>
          Processing<br />Thoughts
        </h2>
        <p style={{ fontSize: 12, fontWeight: 300, textAlign: 'center', opacity: 0.65, marginTop: 4, lineHeight: 1.5, color: PROC_POD.subtitleColor }}>
          Thoughts that reach their conclusion
        </p>
      </div>
      <div style={{ height: 1, margin: '0 24px', background: PROC_POD.dividerColor, opacity: 0.25 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '12px 20px', overflow: 'hidden', position: 'relative' }}>
        {latest && <ProcessBubble key={thoughts.length} text={latest} />}
        {thoughts.length === 0 && (
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 14, color: 'oklch(38% 0.08 150)', opacity: 0.28 }}>
            drag or tap →
          </span>
        )}
        {processedCount > 0 && (
          <div style={{ position: 'absolute', bottom: 18, fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', color: 'oklch(50% 0.06 150 / 0.7)', textAlign: 'center', pointerEvents: 'none', transition: 'opacity 0.4s ease' }}>
            {processedCount} {processedCount === 1 ? 'thought' : 'thoughts'} released
          </div>
        )}
      </div>
    </div>
  )
}

// ── Personalized reflection content ──────────────────────────────────────────
function getReflectionContent(loopCount, processCount) {
  if (loopCount === 0) return {
    profile: 'You let everything complete.',
    title: 'Something in you already knows how to release.',
    body: "Every thought found its ending today. That's rare — and worth sitting with.",
    question: 'What does it feel like to have nothing circling right now?',
  }
  if (processCount === 0) return {
    profile: 'Everything is still in motion.',
    title: 'Your mind is full of unfinished circles.',
    body: "That's okay. Noticing that a thought is looping is itself a kind of beginning.",
    question: 'Which one of these circling thoughts feels closest to being ready to end?',
  }
  if (loopCount > processCount * 2) return {
    profile: 'Mostly circling.',
    title: 'Many of your thoughts are still looking for their ending.',
    body: 'The mind holds on to what feels unresolved. But some of these may be ready to close.',
    question: 'Of the thoughts still circling — which one have you actually already answered?',
  }
  if (processCount > loopCount * 2) return {
    profile: 'Mostly released.',
    title: 'You have a gift for letting thoughts complete.',
    body: 'Most of what came up today found its end in you. The few still circling deserve gentle attention.',
    question: 'What made it easy to release the ones you did?',
  }
  return {
    profile: 'Evenly balanced.',
    title: 'You hold both — what circles and what completes.',
    body: "That balance is very human. Some thoughts need more time. Others were already finished — you just hadn't noticed yet.",
    question: 'Which circling thought might already have its answer, if you listened quietly?',
  }
}

// ── Framework reveal (5-section) ─────────────────────────────────────────────
const FRAMEWORK_SECTIONS = [
  { label: 'Observation', key: 'observation' },
  { label: 'Insight', key: 'insight' },
  { label: 'Conclusion', key: 'conclusion' },
  { label: 'Permission', key: 'permission' },
  { label: 'Final Question', key: 'question' },
]

function ShareBundle({ theory }) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const shareUrl = `${window.location.origin}/?theory=${theory.id}`
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&bgcolor=f9f4ed&color=3d342f&qzone=2&data=${encodeURIComponent(shareUrl)}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.55 }}
      className="mt-6 w-full max-w-lg"
    >
      <div className="rounded-[1.6rem] border border-white/65 bg-white/50 px-6 py-6 shadow-paper backdrop-blur">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.24em] text-ink/40">
          Share the whole experience
        </p>
        <p className="mt-2 text-center font-serif text-[15px] font-light italic leading-[1.6] text-ink/65">
          Send a friend the card, the story, and the game.
        </p>

        <div className="mt-5 flex justify-center">
          <button
            onClick={() => setShowQR(q => !q)}
            className="rounded-full border border-white/70 bg-white/60 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-ink/60 backdrop-blur transition hover:bg-white/85 hover:-translate-y-0.5"
          >
            {showQR ? 'Hide QR code' : 'Show QR code'}
          </button>
        </div>

        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-5 flex flex-col items-center gap-3">
                <div
                  className="rounded-[16px] p-3"
                  style={{ background: '#f9f4ed', border: '1.5px solid rgba(136,165,154,0.35)' }}
                >
                  <img src={qrSrc} alt="Share QR code" width={150} height={150} style={{ display: 'block', borderRadius: 8 }} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/35">
                  scan to begin the journey
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex items-center gap-3 rounded-[1rem] border border-white/60 bg-white/40 px-4 py-3">
          <p className="flex-1 truncate text-[11px] text-ink/45">{shareUrl}</p>
          <button
            onClick={copyLink}
            className="shrink-0 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-[11px] font-medium text-ink/65 transition hover:bg-white/90"
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function FrameworkScreen({ theory, onReadStory, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center overflow-y-auto px-6 py-12"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-[10px] uppercase tracking-[0.24em] text-ink/50"
      >
        The philosophy behind this
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-center font-serif text-3xl leading-tight text-ink sm:text-4xl"
      >
        {theory.title}
      </motion.h2>

      <div className="mt-1 h-px w-8 bg-ink/20" />

      <div className="mt-8 w-full max-w-lg space-y-3">
        {FRAMEWORK_SECTIONS.map(({ label, key }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[1.4rem] border border-white/65 bg-white/55 px-6 py-5 shadow-paper backdrop-blur"
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-ink/40">
              {String(i + 1).padStart(2, '0')} — {label}
            </p>
            <p className="mt-2 text-sm leading-7 text-ink/78">{theory.modal[key]}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35 }}
        className="mt-10 flex flex-col items-center gap-3"
      >
        {theory.story && (
          <button
            onClick={onReadStory}
            className="rounded-full border border-white/70 bg-white/65 px-8 py-4 text-sm font-medium text-ink/75 shadow-paper backdrop-blur transition hover:bg-white/85 hover:-translate-y-0.5"
          >
            Read the full story →
          </button>
        )}
        <button
          onClick={onBack}
          className="text-xs uppercase tracking-[0.18em] text-ink/40 transition hover:text-ink/65"
        >
          Return to the deck
        </button>
      </motion.div>

      <ShareBundle theory={theory} />

      <div className="pb-12" />
    </motion.div>
  )
}

// ── Main game component ───────────────────────────────────────────────────────
export function TwoContainersGame({ theory, onBack, onReadStory }) {
  const THOUGHTS = theory.gameThoughts || []

  const [screen, setScreen] = useState('landing')
  const [thoughtIndex, setThoughtIndex] = useState(0)
  const [placed, setPlaced] = useState({ loop: [], process: [] })
  const [feedback, setFeedback] = useState('')
  const [feedbackKey, setFeedbackKey] = useState(0)
  const [dragOver, setDragOver] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [reflection, setReflection] = useState('')
  const processing = useRef(false)
  const touchStartX = useRef(null)
  const dragStartX = useRef(null)

  const currentThought = THOUGHTS[thoughtIndex]
  const isComplete = thoughtIndex >= THOUGHTS.length

  const restart = () => {
    setScreen('landing')
    setThoughtIndex(0)
    setPlaced({ loop: [], process: [] })
    setFeedback('')
    setFeedbackKey(0)
    setDragOver(null)
    setIsDragging(false)
    setShowInput(false)
    setReflection('')
    processing.current = false
  }

  const assignThought = useCallback(
    (zone) => {
      if (!currentThought || isComplete || processing.current) return
      processing.current = true
      const isCorrect = currentThought.type === zone
      setFeedback(isCorrect ? pick(FEEDBACK_CORRECT) : pick(FEEDBACK_GENTLE))
      setFeedbackKey((k) => k + 1)
      setPlaced((prev) => ({ ...prev, [zone]: [...prev[zone], currentThought.text] }))
      setTimeout(() => {
        const next = thoughtIndex + 1
        setThoughtIndex(next)
        processing.current = false
        if (next >= THOUGHTS.length) setTimeout(() => setScreen('reflection'), 700)
      }, 900)
    },
    [currentThought, isComplete, thoughtIndex, THOUGHTS.length],
  )

  const onDragStart = (e) => {
    setIsDragging(true)
    dragStartX.current = e.clientX
  }
  const onDragEnd = (e) => {
    setIsDragging(false)
    setDragOver(null)
    if (!dragStartX.current) return
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 55) assignThought(dx < 0 ? 'loop' : 'process')
    dragStartX.current = null
  }
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 48) assignThought(dx < 0 ? 'loop' : 'process')
    touchStartX.current = null
  }

  const refl = getReflectionContent(placed.loop.length, placed.process.length)

  const bgStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    background: `
      radial-gradient(ellipse 80% 80% at 15% 15%, oklch(90% 0.045 72 / 0.55) 0%, transparent 60%),
      radial-gradient(ellipse 65% 65% at 85% 85%, oklch(88% 0.045 148 / 0.4) 0%, transparent 55%),
      oklch(95% 0.022 78)
    `,
    animation: 'tcBreathe 14s ease-in-out infinite',
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-ink" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <div style={bgStyle} />

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-2 text-sm text-ink/70 shadow-paper backdrop-blur transition hover:bg-white/75"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="relative z-10">
        <AnimatePresence mode="wait">

          {/* ── LANDING ─────────────────────────────────────────────────────── */}
          {screen === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50"
              >
                A quiet exercise
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 font-serif text-[clamp(46px,7vw,84px)] font-light leading-[1.08] text-ink"
              >
                The <em className="font-light italic text-ink/55">Two</em>
                <br />Containers
              </motion.h1>
              <div className="mt-8 h-px w-10 bg-ink/25" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 max-w-xs font-serif text-[clamp(16px,2.2vw,21px)] font-light italic leading-[1.7] text-ink/55"
              >
                "Some thoughts stay…<br />because they were never finished."
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-10"
              >
                <button
                  onClick={() => setScreen('instructions')}
                  className="rounded-full border border-white/70 bg-white/55 px-11 py-3.5 text-[13px] uppercase tracking-[0.18em] text-ink/60 shadow-paper backdrop-blur transition hover:bg-white/80 hover:text-ink/80 hover:-translate-y-0.5"
                >
                  Begin
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ── INSTRUCTIONS ────────────────────────────────────────────────── */}
          {screen === 'instructions' && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-screen flex-col items-center justify-center px-6"
            >
              <div
                className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/60 px-12 py-12 text-center shadow-float backdrop-blur-2xl"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-7 font-serif text-[34px] font-light text-ink"
                >
                  How to play
                </motion.h2>

                <div className="mb-9 flex flex-col gap-[18px] text-left">
                  {[
                    ['1', <><strong className="font-medium text-ink">A thought card</strong> will appear in the centre. Read it slowly — don't rush.</>, 0.1],
                    ['2', <><strong className="font-medium text-ink">Feel into it.</strong> Does this thought circle endlessly, or does it feel complete?</>, 0.2],
                    ['3', <><strong className="font-medium text-ink">Drag</strong> the card left or right — or tap the buttons — to place it in the right container.</>, 0.3],
                    ['4', <>There is <strong className="font-medium text-ink">no wrong answer.</strong> This is about noticing, not judging.</>, 0.4],
                  ].map(([num, text, delay]) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium text-ink/55"
                        style={{ background: 'oklch(88% 0.04 65 / 0.6)', borderColor: 'oklch(72% 0.04 65 / 0.3)' }}
                      >
                        {num}
                      </div>
                      <p className="text-sm font-light leading-[1.65] text-ink/65">{text}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="mb-8 flex justify-center gap-4"
                >
                  <div
                    className="flex items-center gap-2 rounded-full px-[18px] py-2.5 text-[13px]"
                    style={{ background: 'oklch(88% 0.05 55 / 0.55)', border: '1.5px solid oklch(72% 0.07 52 / 0.4)', color: 'oklch(35% 0.06 52)' }}
                  >
                    ↻ Circling thoughts
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-full px-[18px] py-2.5 text-[13px]"
                    style={{ background: 'oklch(90% 0.05 148 / 0.5)', border: '1.5px solid oklch(65% 0.08 150 / 0.4)', color: 'oklch(32% 0.07 150)' }}
                  >
                    ◎ Finishing thoughts
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  onClick={() => setScreen('main')}
                  className="rounded-full bg-ink px-12 py-[15px] text-[13px] uppercase tracking-[0.16em] text-white/90 transition hover:bg-ink/85 hover:-translate-y-0.5"
                >
                  I'm ready
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── MAIN GAME ────────────────────────────────────────────────────── */}
          {screen === 'main' && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', height: '100vh', display: 'grid', gridTemplateColumns: '1fr 200px 1fr', padding: '32px 28px 28px', gap: 0 }}
            >
              {/* Left pod */}
              <LoopPod
                thoughts={placed.loop}
                isDragOver={dragOver === 'loop'}
                onDragOver={(e) => { e.preventDefault(); setDragOver('loop') }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => { e.preventDefault(); setDragOver(null); assignThought('loop') }}
                onClick={() => !isDragging && assignThought('loop')}
              />

              {/* Centre column */}
              <div className="flex flex-col items-center justify-center gap-[18px]" style={{ gridColumn: 2, zIndex: 10 }}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink/45">
                  {isComplete ? 'Complete' : `${thoughtIndex + 1} / ${THOUGHTS.length}`}
                </p>

                {!isComplete && currentThought && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={thoughtIndex}
                      initial={{ opacity: 0, y: 18, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      draggable
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                      onTouchStart={onTouchStart}
                      onTouchEnd={onTouchEnd}
                      className="cursor-grab select-none rounded-[22px] border border-white/80 bg-white/82 px-5 py-6 text-center shadow-float backdrop-blur-xl"
                      style={{
                        width: 190,
                        animation: 'tcCardFloat 4s ease-in-out infinite',
                      }}
                    >
                      <p
                        className="text-[16px] font-light italic leading-[1.6] text-ink"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        "{currentThought.text}"
                      </p>
                      <p className="mt-3.5 text-[10px] uppercase tracking-[0.1em] text-ink/45">
                        Feel into it
                      </p>
                    </motion.div>
                  </AnimatePresence>
                )}

                {isComplete && (
                  <p className="text-center font-serif text-base italic leading-[1.6] text-ink/50">
                    All thoughts<br />have found their place.
                  </p>
                )}

                {!isComplete && (
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => assignThought('loop')}
                      className="rounded-full border border-white/55 bg-white/50 px-3.5 py-2.5 text-[11px] uppercase tracking-[0.13em] text-ink/55 backdrop-blur transition hover:bg-white/80 hover:text-ink/80 hover:-translate-y-0.5"
                      style={{ borderColor: dragOver === 'loop' ? 'oklch(60% 0.08 52 / 0.5)' : undefined }}
                    >
                      ← Circling
                    </button>
                    <button
                      onClick={() => assignThought('process')}
                      className="rounded-full border border-white/55 bg-white/50 px-3.5 py-2.5 text-[11px] uppercase tracking-[0.13em] text-ink/55 backdrop-blur transition hover:bg-white/80 hover:text-ink/80 hover:-translate-y-0.5"
                      style={{ borderColor: dragOver === 'process' ? 'oklch(58% 0.08 150 / 0.5)' : undefined }}
                    >
                      Finishing →
                    </button>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {feedback && (
                    <motion.p
                      key={feedbackKey}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="min-h-[48px] max-w-[185px] text-center font-serif text-[15px] italic leading-[1.6] text-ink/55"
                    >
                      {feedback}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Right pod */}
              <ProcessPod
                thoughts={placed.process}
                processedCount={placed.process.length}
                isDragOver={dragOver === 'process'}
                onDragOver={(e) => { e.preventDefault(); setDragOver('process') }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => { e.preventDefault(); setDragOver(null); assignThought('process') }}
                onClick={() => !isDragging && assignThought('process')}
              />
            </motion.div>
          )}

          {/* ── REFLECTION ───────────────────────────────────────────────────── */}
          {screen === 'reflection' && (
            <motion.div
              key="reflection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-screen flex-col items-center overflow-y-auto px-6 py-10"
            >
              {/* Mini container summary */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-9 flex w-full max-w-[860px] gap-5"
                style={{ height: 240, flexShrink: 0 }}
              >
                {/* Mini loop pod */}
                <div className="relative flex flex-1 flex-col overflow-hidden rounded-[24px]"
                  style={{ background: 'oklch(89% 0.055 54 / 0.5)', border: '1.5px solid oklch(72% 0.07 52 / 0.35)', backdropFilter: 'blur(14px)' }}>
                  <div className="flex flex-col items-center gap-0.5 border-b px-5 py-4" style={{ borderColor: 'oklch(60% 0.04 65 / 0.15)' }}>
                    <span className="text-[9px] font-medium uppercase tracking-[0.2em]" style={{ color: 'oklch(40% 0.07 50)' }}>↻ Circling</span>
                    <span className="font-serif text-lg font-light" style={{ color: 'oklch(30% 0.06 52)' }}>Looping Thoughts</span>
                  </div>
                  <div className="relative flex-1 overflow-hidden">
                    {placed.loop.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <span className="font-serif text-[13px] italic" style={{ color: 'oklch(40% 0.07 50)' }}>empty</span>
                      </div>
                    )}
                    {placed.loop.map((t, i) => {
                      const layouts = BUBBLE_LAYOUTS[Math.min(placed.loop.length - 1, BUBBLE_LAYOUTS.length - 1)]
                      const slot = layouts[i] || layouts[layouts.length - 1]
                      const drift = DRIFTS[i % DRIFTS.length]
                      return (
                        <div
                          key={i}
                          className={`${BUBBLE_CLASSES[i % 4]} absolute flex items-center justify-center rounded-full text-center`}
                          style={{
                            left: `${slot.x}%`, top: `${slot.y}%`,
                            width: `${slot.w}%`, height: `${slot.w}%`,
                            fontSize: slot.w > 50 ? '11px' : '9.5px',
                            fontFamily: "'Cormorant Garamond', serif",
                            fontStyle: 'italic', fontWeight: 300, padding: 10,
                            animation: `tcBubbleIn 0.65s cubic-bezier(0.34,1.5,0.64,1) ${i * 0.12}s both, tcBubbleDrift ${DRIFT_DURS[i % 4]} ease-in-out ${DRIFT_DELAYS[i % 4]} infinite`,
                            '--dx1': drift.dx1, '--dy1': drift.dy1,
                            '--dx2': drift.dx2, '--dy2': drift.dy2,
                            '--dx3': drift.dx3, '--dy3': drift.dy3,
                          }}
                        >
                          {t.length > 30 ? t.slice(0, 27) + '…' : t}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Mini process pod */}
                <div className="flex flex-1 flex-col overflow-hidden rounded-[24px]"
                  style={{ background: 'oklch(91% 0.05 148 / 0.48)', border: '1.5px solid oklch(68% 0.08 150 / 0.3)', backdropFilter: 'blur(14px)' }}>
                  <div className="flex flex-col items-center gap-0.5 border-b px-5 py-4" style={{ borderColor: 'oklch(60% 0.04 65 / 0.15)' }}>
                    <span className="text-[9px] font-medium uppercase tracking-[0.2em]" style={{ color: 'oklch(38% 0.08 150)' }}>◎ Finishing</span>
                    <span className="font-serif text-lg font-light" style={{ color: 'oklch(28% 0.07 152)' }}>Processing Thoughts</span>
                  </div>
                  <div className="flex flex-1 flex-col items-center justify-center px-5 py-4">
                    <span className="font-serif text-[52px] font-light leading-none" style={{ color: 'oklch(50% 0.07 150 / 0.6)' }}>
                      {placed.process.length}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: 'oklch(50% 0.06 150 / 0.65)' }}>
                      thought{placed.process.length !== 1 ? 's' : ''} released
                    </span>
                    <span className="mt-3 text-center font-serif text-[13px] italic leading-[1.5]" style={{ color: 'oklch(50% 0.06 150 / 0.5)' }}>
                      Floated away…
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Personalized summary */}
              <div className="flex w-full max-w-[520px] flex-col items-center text-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="mb-5 h-9 w-px bg-gradient-to-b from-transparent via-ink/20 to-transparent" />

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="mb-5 flex gap-3.5">
                  <span className="rounded-full px-4 py-1.5 text-[12px]"
                    style={{ background: 'oklch(88% 0.05 54 / 0.5)', border: '1px solid oklch(72% 0.07 52 / 0.35)', color: 'oklch(36% 0.06 52)' }}>
                    {placed.loop.length} still circling
                  </span>
                  <span className="rounded-full px-4 py-1.5 text-[12px]"
                    style={{ background: 'oklch(90% 0.05 148 / 0.5)', border: '1px solid oklch(65% 0.08 150 / 0.35)', color: 'oklch(33% 0.07 150)' }}>
                    {placed.process.length} found their end
                  </span>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                  className="mb-4 text-[11px] uppercase tracking-[0.18em] text-ink/45">
                  {refl.profile}
                </motion.p>

                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                  className="mb-6 font-serif text-[clamp(18px,2vw,26px)] font-light leading-[1.35] text-ink">
                  {refl.title}
                </motion.h2>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
                  className="mb-6 text-[14px] font-light leading-[1.75] text-ink/60">
                  {refl.body}
                </motion.p>

                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                  className="mb-5 font-serif text-[clamp(15px,1.8vw,19px)] italic font-light leading-[1.6] text-ink/80">
                  "{refl.question}"
                </motion.p>

                {!showInput ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}
                    className="mb-8 flex gap-4">
                    <button
                      className="text-[12px] uppercase tracking-[0.14em] text-ink/40 transition hover:text-ink/60"
                      onClick={() => setScreen('framework')}
                    >
                      Sit with it quietly
                    </button>
                    <button
                      onClick={() => setShowInput(true)}
                      className="rounded-full border border-white/70 bg-white/50 px-7 py-3 text-[12px] uppercase tracking-[0.14em] text-ink/55 backdrop-blur transition hover:bg-white/80 hover:-translate-y-0.5"
                    >
                      Write it down
                    </button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 w-full">
                    <textarea
                      autoFocus
                      rows={4}
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Let it come slowly…"
                      className="mb-4 w-full resize-none rounded-[18px] border border-white/70 bg-white/55 px-5 py-4 font-serif text-[16px] italic font-light leading-[1.7] text-ink outline-none backdrop-blur placeholder:text-ink/35 focus:border-moss/40 focus:ring-4 focus:ring-moss/8"
                    />
                    <button
                      onClick={() => setScreen('framework')}
                      className="rounded-full border border-white/70 bg-white/50 px-7 py-3 text-[12px] uppercase tracking-[0.14em] text-ink/55 backdrop-blur transition hover:bg-white/80 hover:-translate-y-0.5"
                    >
                      Continue →
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── FRAMEWORK (5-section reveal) ─────────────────────────────────── */}
          {screen === 'framework' && (
            <FrameworkScreen
              key="framework"
              theory={theory}
              onReadStory={onReadStory}
              onBack={onBack}
            />
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
