import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'

const THOUGHTS = [
  "How will I get there?",
  "What if I'm late?",
  "Should I even go?",
  "What if it gets awkward?",
  "What if something goes wrong?",
  "Do I really have to go?",
  "What will people think?",
  "What if I forget something?",
  "Maybe I should just cancel.",
  "What if no one talks to me?",
  "I should have planned this better.",
  "What if it's too much?",
]

const DURATION = 5000

export function TwoContainersGame({ onBack }) {
  const [phase, setPhase] = useState('intro')
  const [idx, setIdx] = useState(0)
  const [grabbed, setGrabbed] = useState([])
  const [bubbles, setBubbles] = useState([])
  const [bubbleIdx, setBubbleIdx] = useState(0)

  // Auto-advance timer during game
  useEffect(() => {
    if (phase !== 'game' || idx >= THOUGHTS.length) return
    const currentIdx = idx
    const t = setTimeout(() => {
      const next = currentIdx + 1
      if (next >= THOUGHTS.length) {
        setIdx(next)
        setTimeout(() => setPhase('filled'), 300)
      } else {
        setIdx(next)
      }
    }, DURATION)
    return () => clearTimeout(t)
  }, [phase, idx])

  // Bubble reveal
  useEffect(() => {
    if (phase !== 'reveal') return
    if (bubbleIdx >= THOUGHTS.length) {
      const t = setTimeout(() => setPhase('reflection'), 1000)
      return () => clearTimeout(t)
    }
    const id = `${bubbleIdx}-${Date.now()}`
    const x = 10 + Math.random() * 68
    setBubbles(b => [...b, { id, text: THOUGHTS[bubbleIdx], x }])
    setTimeout(() => setBubbles(b => b.filter(bbl => bbl.id !== id)), 2400)
    const t = setTimeout(() => setBubbleIdx(i => i + 1), 650)
    return () => clearTimeout(t)
  }, [phase, bubbleIdx])

  const grab = () => {
    setGrabbed(g => [...g, THOUGHTS[idx]])
    const next = idx + 1
    if (next >= THOUGHTS.length) {
      setIdx(next)
      setTimeout(() => setPhase('filled'), 300)
    } else {
      setIdx(next)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-almond text-ink">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-60" />

      <button
        onClick={onBack}
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-2 text-sm text-ink/70 shadow-paper backdrop-blur hover:bg-white/70 transition"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <Intro key="intro" onStart={() => setPhase('game')} />
        )}
        {phase === 'game' && idx < THOUGHTS.length && (
          <Game
            key="game"
            thought={THOUGHTS[idx]}
            thoughtKey={idx}
            grabbed={grabbed}
            total={THOUGHTS.length}
            onGrab={grab}
          />
        )}
        {phase === 'filled' && (
          <Filled
            key="filled"
            grabbed={grabbed}
            onContinue={() => setPhase('reveal')}
          />
        )}
        {phase === 'reveal' && (
          <Reveal key="reveal" bubbles={bubbles} />
        )}
        {phase === 'reflection' && (
          <Reflection key="reflection" grabbed={grabbed} onBack={onBack} />
        )}
      </AnimatePresence>
    </div>
  )
}

function Intro({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="inline-flex rounded-full border border-white/60 bg-white/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-ink/60 shadow-paper backdrop-blur"
      >
        30 Psychological Principles
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-6 font-serif text-5xl leading-tight tracking-tight text-ink sm:text-6xl"
      >
        The Two Containers
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-5 max-w-sm text-base leading-8 text-ink/68"
      >
        You have somewhere to go.<br />
        Thoughts will surface one at a time.<br />
        <span className="text-ink/85 font-medium">Grab what feels natural to hold.</span><br />
        Let the rest drift past.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex flex-col items-center gap-3"
      >
        <button
          onClick={onStart}
          className="rounded-full border border-white/70 bg-white/60 px-10 py-4 text-base font-medium text-ink/80 shadow-paper backdrop-blur transition hover:bg-white/85 hover:-translate-y-0.5"
        >
          Begin
        </button>
        <p className="text-xs text-ink/38">Each thought stays for 5 seconds</p>
      </motion.div>
    </motion.div>
  )
}

function Game({ thought, thoughtKey, grabbed, total, onGrab }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center px-6"
    >
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-ink/48">
          You have somewhere to go
        </p>
        <p className="mt-2 text-sm text-ink/36">
          {thoughtKey + 1} of {total}
        </p>
      </div>

      <div className="w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={thoughtKey}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="paper-noise rounded-[2rem] border border-white/70 bg-white/72 px-8 py-10 text-center shadow-float backdrop-blur-sm"
          >
            <p className="font-serif text-2xl leading-relaxed text-ink sm:text-3xl">
              "{thought}"
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-ink/8">
          <motion.div
            key={`timer-${thoughtKey}`}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: DURATION / 1000, ease: 'linear' }}
            className="h-full rounded-full bg-clay/50"
          />
        </div>
      </div>

      <motion.button
        key={`btn-${thoughtKey}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onGrab}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="mt-8 rounded-full border border-white/70 bg-white/65 px-10 py-4 text-base font-medium text-ink/75 shadow-paper backdrop-blur transition hover:bg-white/85"
      >
        Grab it
      </motion.button>

      <p className="mt-4 text-sm text-ink/38">or wait and let it drift past</p>

      {grabbed.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <div className="flex flex-wrap justify-center gap-1.5">
            {grabbed.map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="h-2 w-2 rounded-full bg-clay/55"
              />
            ))}
          </div>
          <p className="text-xs text-ink/38">{grabbed.length} held</p>
        </motion.div>
      )}
    </motion.div>
  )
}

function Filled({ grabbed, onContinue }) {
  const delay = grabbed.length * 0.06

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm uppercase tracking-[0.24em] text-ink/48"
      >
        This is what holding looks like
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="relative mt-8 w-64 rounded-[1.6rem] border-2 border-clay/30 bg-white/45 p-3 shadow-float backdrop-blur"
        style={{ minHeight: '200px' }}
      >
        {grabbed.length === 0 ? (
          <div className="flex h-full items-center justify-center py-10">
            <p className="text-sm italic text-ink/40">Nothing was held.</p>
          </div>
        ) : (
          <div className="flex flex-col-reverse gap-1.5">
            {grabbed.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="rounded-xl border border-white/60 bg-parchment/80 px-3 py-2 text-xs leading-5 text-ink/72 shadow-paper"
              >
                {t}
              </motion.div>
            ))}
          </div>
        )}

        {grabbed.length >= 7 && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 rounded-t-[1.6rem] bg-gradient-to-b from-clay/15 to-transparent" />
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.55 }}
        className="mt-5 max-w-xs text-sm leading-7 text-ink/60"
      >
        {grabbed.length === 0
          ? "You let everything pass through. The container stayed open."
          : `${grabbed.length} thought${grabbed.length > 1 ? 's' : ''} held — each one taking up space.`}
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.85 }}
        onClick={onContinue}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="mt-8 rounded-full border border-white/70 bg-white/60 px-8 py-4 text-sm font-medium text-ink/75 shadow-paper backdrop-blur transition hover:bg-white/80"
      >
        See what passing through looks like
      </motion.button>
    </motion.div>
  )
}

function Reveal({ bubbles }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm uppercase tracking-[0.24em] text-ink/48"
      >
        Now watch
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl"
      >
        The same thoughts,<br />passing through.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-sm text-ink/40"
      >
        They come. They serve. They leave.
      </motion.p>

      <AnimatePresence>
        {bubbles.map(({ id, text, x }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0.5, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: -40 }}
            exit={{ opacity: 0, scale: 0.2, y: -180 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute max-w-[150px] rounded-[1.4rem] border border-white/70 bg-white/65 px-4 py-3 text-xs leading-5 text-ink/70 shadow-paper backdrop-blur"
            style={{ left: `${x}%`, bottom: '28%', transform: 'translateX(-50%)' }}
          >
            {text}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

function Reflection({ grabbed, onBack }) {
  const passed = THOUGHTS.length - grabbed.length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid w-full max-w-xs grid-cols-2 gap-4"
      >
        <div className="rounded-[1.4rem] border border-clay/30 bg-white/50 p-5 shadow-paper">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink/45">Left Container</p>
          <p className="mt-2 font-serif text-4xl text-ink">{grabbed.length}</p>
          <p className="mt-1 text-xs text-ink/50">thoughts held</p>
        </div>
        <div className="rounded-[1.4rem] border border-moss/25 bg-white/50 p-5 shadow-paper">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink/45">Right Container</p>
          <p className="mt-2 font-serif text-4xl text-ink">{passed}</p>
          <p className="mt-1 text-xs text-ink/50">thoughts passed</p>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-sm uppercase tracking-[0.24em] text-ink/48"
      >
        Neither is wrong. Neither is right.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-4 max-w-sm font-serif text-3xl leading-snug text-ink sm:text-4xl"
      >
        The question is only how you hold them.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 max-w-sm text-base leading-8 text-ink/65"
      >
        Which thoughts did you grab?<br />
        Which ones are you still holding right now?
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        onClick={onBack}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 rounded-full border border-white/70 bg-white/60 px-8 py-4 text-sm font-medium text-ink/75 shadow-paper backdrop-blur transition hover:bg-white/80"
      >
        Return to the deck
      </motion.button>
    </motion.div>
  )
}
