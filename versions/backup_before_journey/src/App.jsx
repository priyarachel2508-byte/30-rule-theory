import { motion } from 'framer-motion'
import { useState } from 'react'
import { HeroSection } from './components/HeroSection'
import { TheoryDeck } from './components/TheoryDeck'
import { TheoryModal } from './components/TheoryModal'
import { theories } from './data/theories'
import { TwoContainersGame } from './game/TwoContainersGame'

function AmbientBackground() {
  const particles = [
    { left: '8%', top: '12%', size: 'h-20 w-20', delay: '0s' },
    { left: '26%', top: '64%', size: 'h-10 w-10', delay: '1.8s' },
    { left: '72%', top: '10%', size: 'h-24 w-24', delay: '2.6s' },
    { left: '88%', top: '56%', size: 'h-14 w-14', delay: '1.1s' },
    { left: '54%', top: '30%', size: 'h-8 w-8', delay: '3.1s' },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-80" />
      {particles.map((particle, index) => (
        <span
          key={index}
          className={`absolute rounded-full bg-white/35 blur-2xl ${particle.size} animate-drift`}
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('deck')
  const [flippedCards, setFlippedCards] = useState([])
  const [selectedTheory, setSelectedTheory] = useState(null)
  const [activeId, setActiveId] = useState(theories[0]?.id ?? null)

  const handleFlip = (id) => {
    setFlippedCards((current) =>
      current.includes(id) ? current : [...current, id],
    )
  }

  if (view === 'containers') {
    return <TwoContainersGame onBack={() => setView('deck')} />
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-almond text-ink">
      <AmbientBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <HeroSection />
        <TheoryDeck
          theories={theories}
          flippedCards={flippedCards}
          onFlip={handleFlip}
          onOpen={setSelectedTheory}
          activeId={activeId}
          setActiveId={setActiveId}
        />

        {/* 30 Principles Game Entry */}
        <section className="mx-auto max-w-4xl px-5 pb-20 pt-4 text-center sm:px-8 lg:px-10">
          <div className="rounded-[2rem] border border-white/60 bg-white/40 px-8 py-10 shadow-paper backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink/50">
              Interactive Experience
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              30 Psychological Principles
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-8 text-ink/65">
              Stories you don't just read — you play through them. Each principle becomes a small game that you feel, not only understand.
            </p>
            <button
              onClick={() => setView('containers')}
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/60 px-8 py-4 text-sm font-medium text-ink/75 shadow-paper backdrop-blur transition hover:bg-white/85 hover:-translate-y-0.5"
            >
              Play: The Two Containers
              <span className="text-clay/70">→</span>
            </button>
          </div>
        </section>
      </motion.div>

      <TheoryModal theory={selectedTheory} onClose={() => setSelectedTheory(null)} />
    </main>
  )
}
