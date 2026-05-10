import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-4xl px-5 pb-10 pt-12 text-center sm:px-8 lg:px-10 lg:pt-16">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className="mx-auto inline-flex rounded-full border border-white/60 bg-white/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-ink/60 shadow-paper backdrop-blur"
      >
        Theory Card Deck
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.08, ease: 'easeOut' }}
        className="mt-6 font-serif text-5xl leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-7xl"
      >
        Pick a thought,
        <br />
        stay for the deeper story.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.16, ease: 'easeOut' }}
        className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ink/68 sm:text-lg"
      >
        A quiet collection of small theories about hope, timing, rest, and the
        inner life. Choose a card when something in you wants a gentler kind of
        clarity.
      </motion.p>
    </section>
  )
}
