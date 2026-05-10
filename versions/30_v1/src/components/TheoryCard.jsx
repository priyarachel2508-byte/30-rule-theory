import { motion } from 'framer-motion'
import { ArrowUpRight, CornerDownRight } from 'lucide-react'

export function TheoryCard({
  theory,
  isFlipped,
  onFlip,
  onOpen,
  style,
  isActive,
}) {
  return (
    <motion.article
      layout
      style={style}
      initial={false}
      animate={{
        rotate: style.rotate,
        y: isActive ? -14 : 0,
        scale: isActive ? 1.04 : 0.985,
        opacity: isActive ? 1 : 0.78,
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      className="group relative h-[390px] w-[230px] shrink-0 [perspective:1200px] sm:h-[440px] sm:w-[275px]"
    >
      <motion.button
        type="button"
        onClick={isFlipped ? onOpen : onFlip}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.985 }}
        className="relative h-full w-full rounded-[2rem] text-left focus:outline-none focus:ring-2 focus:ring-rose/40"
        aria-label={
          isFlipped
            ? `Open full theory for ${theory.title}`
            : `Flip card for ${theory.title}`
        }
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full rounded-[2rem] [transform-style:preserve-3d]"
        >
          <CardFront theory={theory} />
          <CardBack theory={theory} />
        </motion.div>
      </motion.button>
    </motion.article>
  )
}

function CardFront({ theory }) {
  return (
    <div className="paper-noise absolute inset-0 overflow-hidden rounded-[2rem] border border-white/70 bg-parchment/85 shadow-float [backface-visibility:hidden]">
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(61, 52, 47, 0.06), rgba(61, 52, 47, 0.3)),
            radial-gradient(circle at 20% 18%, rgba(255,255,255,0.46), transparent 24%),
            linear-gradient(160deg, ${theory.palette.imageFrom}, ${theory.palette.imageTo})
          `,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.7), 0 16px 30px ${theory.palette.glow}`,
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-paper opacity-20" />
        <div
          className="absolute left-8 top-8 h-20 w-20 rounded-full blur-2xl"
          style={{ backgroundColor: theory.palette.glow }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/35 via-ink/10 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-sm italic text-white/72">
          {theory.imageLabel}
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-4">
        <div className="rounded-[1.55rem] border border-white/25 bg-white/12 p-5 shadow-paper backdrop-blur-md">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/78">
            Theory card
          </p>
          <h2 className="mt-3 font-serif text-[1.95rem] leading-none text-white sm:text-[2.1rem]">
            {theory.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/80">{theory.subtitle}</p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/76">
            <CornerDownRight size={15} />
            Turn me over
          </div>
        </div>
      </div>
    </div>
  )
}

function CardBack({ theory }) {
  return (
    <div className="paper-noise absolute inset-0 overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 px-5 py-5 shadow-float [backface-visibility:hidden] [transform:rotateY(180deg)] sm:px-6 sm:py-6">
      <div
        className="absolute inset-x-0 top-0 h-24 opacity-80"
        style={{
          background: `linear-gradient(180deg, ${theory.palette.glow}, transparent)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.24em] text-ink/50">
            Teaser
          </p>
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: theory.palette.accent }}
          />
        </div>

        <div className="mt-8">
          <h3 className="font-serif text-[1.95rem] leading-none text-ink sm:text-[2.1rem]">
            {theory.title}
          </h3>
          <p className="mt-5 text-[15px] leading-7 text-ink/72 sm:text-base sm:leading-8">
            {theory.teaser}
          </p>
        </div>

        <div className="mt-auto rounded-[1.4rem] border border-white/70 bg-parchment/80 p-4">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-ink/70">
            <ArrowUpRight size={15} />
            Open the full thought
          </div>
        </div>
      </div>
    </div>
  )
}
