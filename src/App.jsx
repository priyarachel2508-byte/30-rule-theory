import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HeroSection } from './components/HeroSection'
import { TheoryDeck } from './components/TheoryDeck'
import { TheoryModal } from './components/TheoryModal'
import { TheoryJourney } from './components/TheoryJourney'
import { theories } from './data/theories'

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
  const [flippedCards, setFlippedCards] = useState([])
  const [selectedTheory, setSelectedTheory] = useState(null)
  const [activeId, setActiveId] = useState(theories[0]?.id ?? null)

  // Deep link: ?theory=id auto-opens that theory's journey
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('theory')
    if (!id) return
    const theory = theories.find((t) => t.id === id)
    if (!theory) return
    setFlippedCards((c) => (c.includes(id) ? c : [...c, id]))
    setSelectedTheory(theory)
    setActiveId(id)
    // Clean the URL so refreshing doesn't re-trigger
    window.history.replaceState({}, '', window.location.pathname)
  }, [])

  const handleFlip = (id) => {
    setFlippedCards((current) =>
      current.includes(id) ? current : [...current, id],
    )
  }

  const handleOpen = (theory) => {
    setSelectedTheory(theory)
  }

  const handleClose = () => {
    setSelectedTheory(null)
  }

  const journeyTheory = selectedTheory?.hasJourney ? selectedTheory : null
  const modalTheory = selectedTheory?.hasJourney ? null : selectedTheory

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
          onOpen={handleOpen}
          activeId={activeId}
          setActiveId={setActiveId}
        />

        <section className="mx-auto max-w-4xl px-5 pb-24 pt-4 text-center sm:px-8 lg:px-10">
          <div className="rounded-[2rem] border border-white/60 bg-white/40 px-8 py-10 shadow-paper backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink/50">
              Pocket Philosophy
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Flip a card.<br />Feel the thought.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-8 text-ink/65">
              Each theory is a doorway. The story lives on the other side. Flip any card to begin.
            </p>
          </div>
        </section>
      </motion.div>

      {/* Journey (story + game) for theories that have it */}
      {journeyTheory && (
        <TheoryJourney theory={journeyTheory} onClose={handleClose} />
      )}

      {/* Regular modal for other theories */}
      <TheoryModal theory={modalTheory} onClose={handleClose} />
    </main>
  )
}
