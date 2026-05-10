import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

const sections = [
  ['Observation', 'observation'],
  ['Insight', 'insight'],
  ['Short Conclusion', 'conclusion'],
  ['Permission to Act', 'permission'],
  ['Final Question', 'question'],
]

export function TheoryModal({ theory, onClose }) {
  useEffect(() => {
    if (!theory) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, theory])

  return (
    <AnimatePresence>
      {theory ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/35 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="theory-modal-title"
            className="paper-noise relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/60 bg-parchment shadow-float"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="absolute inset-x-0 top-0 h-44"
              style={{
                background: `linear-gradient(180deg, ${theory.palette.glow}, transparent)`,
              }}
            />

            <div className="relative z-10 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-clay/80">
                    Full theory
                  </p>
                  <h2
                    id="theory-modal-title"
                    className="mt-3 font-serif text-4xl leading-none text-ink sm:text-5xl"
                  >
                    {theory.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-ink/72">
                    {theory.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/60 bg-white/55 p-3 text-ink/75 transition hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose/40"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {sections.map(([label, key], index) => (
                  <motion.section
                    key={key}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.05 }}
                    className={`rounded-[1.6rem] border border-white/70 bg-white/55 p-5 shadow-paper ${
                      key === 'question' ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-ink/45">
                      {label}
                    </p>
                    <p className="mt-3 text-base leading-8 text-ink/78">
                      {theory.modal[key]}
                    </p>
                  </motion.section>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
