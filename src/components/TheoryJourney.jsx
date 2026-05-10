import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { TwoContainersGame } from '../game/TwoContainersGame'

export function TheoryJourney({ theory, onClose }) {
  const [phase, setPhase] = useState('story') // 'story' | 'game'

  if (!theory) return null

  return (
    <AnimatePresence>
      <motion.div
        key="journey-overlay"
        className="fixed inset-0 z-50 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'oklch(96% 0.018 75)' }}
      >
        <AnimatePresence mode="wait">
          {phase === 'story' && (
            <StoryScreen
              key="story"
              theory={theory}
              onPlay={() => setPhase('game')}
              onClose={onClose}
            />
          )}
          {phase === 'game' && (
            <TwoContainersGame
              key="game"
              theory={theory}
              onBack={() => setPhase('story')}
              onReadStory={() => setPhase('story')}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

function StoryScreen({ theory, onPlay, onClose }) {
  const story = theory.story
  if (!story) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      className="relative flex min-h-screen flex-col items-center overflow-y-auto px-6 py-10 sm:px-10"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/55 text-ink/55 shadow-paper backdrop-blur transition hover:bg-white/80 hover:text-ink/80"
      >
        <X size={16} />
      </button>

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-4 text-[10px] uppercase tracking-[0.26em] text-ink/40"
      >
        {theory.title}
      </motion.p>

      {/* Story title */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-5 text-center font-serif text-[clamp(28px,4vw,46px)] font-light leading-[1.1] text-ink"
      >
        {story.title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 h-px w-8 bg-ink/20"
      />

      {/* Story body */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-8 w-full max-w-[520px] space-y-5"
      >
        {story.paragraphs.map((para, i) => (
          <p key={i} className="text-[15px] font-light leading-[1.8] text-ink/72">
            {para}
          </p>
        ))}
      </motion.div>

      {/* Highlighted insight */}
      {story.highlight && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="my-8 w-full max-w-[520px] rounded-[1.2rem] border-l-[3px] bg-white/50 py-5 pl-6 pr-5 shadow-paper backdrop-blur"
          style={{ borderLeftColor: '#88a59a' }}
        >
          <p className="font-serif text-[17px] font-light italic leading-[1.6] text-ink/80">
            {story.highlight}
          </p>
        </motion.div>
      )}

      {/* Final question */}
      {story.question && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-10 w-full max-w-[520px] text-center font-serif text-[16px] font-light italic leading-[1.7] text-ink/60"
        >
          {story.question}
        </motion.p>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mb-12 flex flex-col items-center gap-4"
      >
        <button
          onClick={onPlay}
          className="rounded-full border border-white/70 bg-white/65 px-10 py-4 text-sm font-medium text-ink/70 shadow-float backdrop-blur transition hover:bg-white/90 hover:text-ink hover:-translate-y-0.5 active:scale-95"
        >
          Play the Mindful Minute →
        </button>
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink/35">
          An interactive experience
        </p>
      </motion.div>
    </motion.div>
  )
}
