import { motion } from 'framer-motion'
import { useState } from 'react'
import { HeroSection } from './components/HeroSection'
import { TheoryDeck } from './components/TheoryDeck'
import { TheoryModal } from './components/TheoryModal'
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
  const handleFlip = (id) => {
    setFlippedCards((current) =>
      current.includes(id) ? current : [...current, id],
    )
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
      </motion.div>

      <TheoryModal theory={selectedTheory} onClose={() => setSelectedTheory(null)} />
    </main>
  )
}
