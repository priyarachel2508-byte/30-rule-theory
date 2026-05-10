import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Shuffle } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TheoryCard } from './TheoryCard'

function randomRotation(index) {
  const base = [-5, 3, -2, 4, -4, 2]
  return base[index % base.length]
}

function shuffleArray(items) {
  const next = [...items]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }
  return next
}

export function TheoryDeck({
  theories,
  flippedCards,
  onFlip,
  onOpen,
  activeId,
  setActiveId,
}) {
  const [deckOrder, setDeckOrder] = useState(() => shuffleArray(theories))
  const cardRefs = useRef(new Map())
  const scrollRef = useRef(null)

  const cards = useMemo(
    () =>
      deckOrder.map((theory, index) => ({
        theory,
        style: {
          rotate: randomRotation(index),
        },
      })),
    [deckOrder],
  )

  useEffect(() => {
    const element = cardRefs.current.get(activeId)
    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeId])

  const moveDeck = (direction) => {
    if (!scrollRef.current) return

    scrollRef.current.scrollBy({
      left: direction * 280,
      behavior: 'smooth',
    })
  }

  const shuffleDeck = () => {
    setDeckOrder((current) => shuffleArray(current))
  }

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-ink/48">
          A calm shuffled stack
        </p>
        <p className="mt-3 text-sm leading-7 text-ink/66 sm:text-base">
          Move through the cards from right to left or left to right. Click a
          card to bring it forward and reveal its back, then click again to open
          the full reading.
        </p>
      </div>

      <div className="mb-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => moveDeck(-1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/55 text-ink/70 shadow-paper transition hover:-translate-x-0.5 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose/40"
          aria-label="Move cards to the left"
        >
          <ArrowLeft size={17} />
        </button>
        <button
          type="button"
          onClick={shuffleDeck}
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-3 text-sm text-ink/70 shadow-paper transition hover:-translate-y-0.5 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose/40"
        >
          <Shuffle size={16} />
          Shuffle
        </button>
        <button
          type="button"
          onClick={() => moveDeck(1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/55 text-ink/70 shadow-paper transition hover:translate-x-0.5 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose/40"
          aria-label="Move cards to the right"
        >
          <ArrowRight size={17} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar scroll-smooth overflow-x-auto px-[18vw] pb-6 sm:px-[20vw] lg:px-[24vw]"
      >
        <motion.div
          layout
          className="flex min-w-max items-center py-6"
        >
          <AnimatePresence initial={false}>
            {cards.map(({ theory, style }, index) => (
              <div
                key={theory.id}
                ref={(node) => {
                  if (node) cardRefs.current.set(theory.id, node)
                }}
                className={index === 0 ? '' : '-ml-28 sm:-ml-36'}
              >
                <TheoryCard
                  theory={theory}
                  style={{
                    rotate: style.rotate,
                    zIndex: theory.id === activeId ? 30 : index + 1,
                  }}
                  isFlipped={flippedCards.includes(theory.id)}
                  onFlip={() => {
                    setDeckOrder((current) => [
                      ...current.filter((item) => item.id !== theory.id),
                      theory,
                    ])
                    onFlip(theory.id)
                    setActiveId(theory.id)
                  }}
                  onOpen={() => onOpen(theory)}
                  isActive={activeId === theory.id}
                />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
