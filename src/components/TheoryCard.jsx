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

/* ─── Shared SVG filter defs (reused across all illustrations) ─── */
function SketchDefs() {
  return (
    <defs>
      <filter id="sk-wobble" x="-8%" y="-8%" width="116%" height="116%">
        <feTurbulence type="turbulence" baseFrequency="0.02 0.05" numOctaves="2" seed="5" result="t"/>
        <feDisplacementMap in="SourceGraphic" in2="t" scale="2.2" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="sk-light" x="-8%" y="-8%" width="116%" height="116%">
        <feTurbulence type="turbulence" baseFrequency="0.015 0.035" numOctaves="3" seed="12" result="t"/>
        <feDisplacementMap in="SourceGraphic" in2="t" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
  )
}

/* ─── Per-theory illustrations ─── */

function IllustrationRayOfHope({ accent }) {
  return (
    <svg width="110" height="100" viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <SketchDefs />
      {/* sun circle */}
      <circle cx="55" cy="54" r="16" stroke={accent} strokeWidth="2" filter="url(#sk-wobble)" opacity="0.85"/>
      {/* rays */}
      <g stroke={accent} strokeWidth="1.6" strokeLinecap="round" filter="url(#sk-wobble)" opacity="0.7">
        <line x1="55" y1="30" x2="55" y2="22"/>
        <line x1="74" y1="40" x2="80" y2="34"/>
        <line x1="80" y1="60" x2="88" y2="62"/>
        <line x1="70" y1="75" x2="74" y2="83"/>
        <line x1="40" y1="75" x2="36" y2="83"/>
        <line x1="30" y1="60" x2="22" y2="62"/>
        <line x1="36" y1="40" x2="30" y2="34"/>
      </g>
      {/* horizon line */}
      <path d="M18,82 C35,80 75,80 92,82" stroke={accent} strokeWidth="1.2" strokeLinecap="round" filter="url(#sk-light)" opacity="0.4"/>
    </svg>
  )
}

function IllustrationThirtyPercent({ accent }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <SketchDefs />
      {/* outer circle */}
      <circle cx="50" cy="50" r="30" stroke={accent} strokeWidth="1.8" filter="url(#sk-wobble)" opacity="0.5"/>
      {/* 30% arc — starts at top (−90°), goes 108° clockwise */}
      <path
        d="M50,20 A30,30 0 0,1 78.5,65"
        stroke={accent} strokeWidth="2.5" strokeLinecap="round" filter="url(#sk-wobble)" opacity="0.9"
      />
      {/* center dot */}
      <circle cx="50" cy="50" r="2.5" fill={accent} opacity="0.7"/>
      {/* spoke from center to arc start */}
      <line x1="50" y1="50" x2="50" y2="20" stroke={accent} strokeWidth="1.4" strokeLinecap="round" filter="url(#sk-light)" opacity="0.45"/>
      {/* "30" label */}
      <text x="50" y="55" textAnchor="middle" fontFamily="'Georgia', serif" fontSize="14" fill={accent} opacity="0.75">30</text>
    </svg>
  )
}

function IllustrationQuietProgress({ accent }) {
  return (
    <svg width="90" height="110" viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <SketchDefs />
      {/* main stem */}
      <path d="M45,95 C44,75 46,55 44,30" stroke={accent} strokeWidth="2" strokeLinecap="round" filter="url(#sk-wobble)" opacity="0.85"/>
      {/* left leaf */}
      <path d="M44,68 C35,62 24,64 22,72 C28,76 38,74 44,68 Z" stroke={accent} strokeWidth="1.6" fill="none" filter="url(#sk-wobble)" opacity="0.72"/>
      {/* right leaf */}
      <path d="M44,50 C53,44 64,46 66,54 C60,58 50,56 44,50 Z" stroke={accent} strokeWidth="1.6" fill="none" filter="url(#sk-wobble)" opacity="0.72"/>
      {/* small top bud */}
      <path d="M44,30 C41,22 44,14 44,10" stroke={accent} strokeWidth="1.4" strokeLinecap="round" filter="url(#sk-light)" opacity="0.6"/>
      <path d="M44,24 C39,20 38,14 42,12" stroke={accent} strokeWidth="1.3" fill="none" filter="url(#sk-light)" opacity="0.55"/>
      {/* soil line */}
      <path d="M22,96 C35,94 55,94 68,96" stroke={accent} strokeWidth="1.5" strokeLinecap="round" filter="url(#sk-light)" opacity="0.4"/>
      {/* sunlight dashes (top right) */}
      <g stroke={accent} strokeWidth="1" strokeLinecap="round" filter="url(#sk-light)" opacity="0.35">
        <line x1="68" y1="18" x2="76" y2="14"/>
        <line x1="72" y1="26" x2="80" y2="24"/>
        <line x1="68" y1="34" x2="77" y2="34"/>
      </g>
    </svg>
  )
}

function IllustrationRestIsntFailure({ accent }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <SketchDefs />
      {/* cup body */}
      <path d="M28,55 C28,52 30,48 34,46 L66,46 C70,46 72,50 72,53 L68,72 C67,76 63,78 59,78 L41,78 C37,78 33,76 32,72 Z" stroke={accent} strokeWidth="2" fill="none" filter="url(#sk-wobble)" opacity="0.85"/>
      {/* handle */}
      <path d="M72,53 C80,54 82,60 82,64 C82,70 78,74 72,72" stroke={accent} strokeWidth="1.8" fill="none" filter="url(#sk-wobble)" opacity="0.72"/>
      {/* saucer */}
      <path d="M20,82 C32,78 68,78 80,82" stroke={accent} strokeWidth="1.5" strokeLinecap="round" filter="url(#sk-light)" opacity="0.5"/>
      {/* steam lines */}
      <g stroke={accent} strokeWidth="1.4" strokeLinecap="round" fill="none" filter="url(#sk-wobble)" opacity="0.55">
        <path d="M40,43 C40,38 43,35 40,30 C37,25 40,22 40,18"/>
        <path d="M50,42 C50,37 53,34 50,28 C47,23 50,20 50,16"/>
        <path d="M60,43 C60,38 63,35 60,30 C57,25 60,22 60,18"/>
      </g>
    </svg>
  )
}

function IllustrationBorrowedDeadline({ accent }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <SketchDefs />
      {/* clock face */}
      <circle cx="50" cy="54" r="28" stroke={accent} strokeWidth="2" filter="url(#sk-wobble)" opacity="0.8"/>
      {/* hour hand (pointing to ~10) */}
      <line x1="50" y1="54" x2="36" y2="38" stroke={accent} strokeWidth="2.2" strokeLinecap="round" filter="url(#sk-wobble)" opacity="0.9"/>
      {/* minute hand (pointing to ~2) */}
      <line x1="50" y1="54" x2="63" y2="40" stroke={accent} strokeWidth="1.6" strokeLinecap="round" filter="url(#sk-wobble)" opacity="0.85"/>
      {/* center knob */}
      <circle cx="50" cy="54" r="2.5" fill={accent} opacity="0.8"/>
      {/* tick marks at 12/3/6/9 */}
      <g stroke={accent} strokeWidth="1.4" strokeLinecap="round" filter="url(#sk-light)" opacity="0.45">
        <line x1="50" y1="28" x2="50" y2="32"/>
        <line x1="76" y1="54" x2="72" y2="54"/>
        <line x1="50" y1="80" x2="50" y2="76"/>
        <line x1="24" y1="54" x2="28" y2="54"/>
      </g>
      {/* crown/top knob */}
      <rect x="46" y="20" width="8" height="5" rx="1.5" stroke={accent} strokeWidth="1.5" fill="none" filter="url(#sk-light)" opacity="0.55"/>
    </svg>
  )
}

function IllustrationSoftNo({ accent }) {
  return (
    <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <SketchDefs />
      {/* envelope body */}
      <path d="M18,28 C18,24 22,20 28,20 L82,20 C88,20 92,24 92,28 L92,66 C92,70 88,74 82,74 L28,74 C22,74 18,70 18,66 Z" stroke={accent} strokeWidth="2" fill="none" filter="url(#sk-wobble)" opacity="0.82"/>
      {/* flap crease */}
      <path d="M18,28 L55,52 L92,28" stroke={accent} strokeWidth="1.6" fill="none" strokeLinecap="round" filter="url(#sk-wobble)" opacity="0.65"/>
      {/* small writing lines on front */}
      <g stroke={accent} strokeWidth="1" strokeLinecap="round" filter="url(#sk-light)" opacity="0.38">
        <line x1="32" y1="56" x2="58" y2="56"/>
        <line x1="32" y1="63" x2="50" y2="63"/>
      </g>
      {/* corner crease detail */}
      <path d="M18,66 L36,52" stroke={accent} strokeWidth="1" strokeLinecap="round" filter="url(#sk-light)" opacity="0.3"/>
      <path d="M92,66 L74,52" stroke={accent} strokeWidth="1" strokeLinecap="round" filter="url(#sk-light)" opacity="0.3"/>
    </svg>
  )
}

function IllustrationWaitingRoom({ accent }) {
  return (
    <svg width="100" height="110" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <SketchDefs />
      {/* chair seat */}
      <path d="M18,56 L82,56 C82,56 80,68 78,70 L22,70 C20,68 18,56 18,56 Z" stroke={accent} strokeWidth="2" fill="none" filter="url(#sk-wobble)" opacity="0.82"/>
      {/* backrest */}
      <path d="M22,56 L22,30 C22,26 28,22 34,22 L66,22 C72,22 78,26 78,30 L78,56" stroke={accent} strokeWidth="2" fill="none" filter="url(#sk-wobble)" opacity="0.82"/>
      {/* left front leg */}
      <line x1="26" y1="70" x2="22" y2="92" stroke={accent} strokeWidth="1.8" strokeLinecap="round" filter="url(#sk-wobble)" opacity="0.75"/>
      {/* right front leg */}
      <line x1="74" y1="70" x2="78" y2="92" stroke={accent} strokeWidth="1.8" strokeLinecap="round" filter="url(#sk-wobble)" opacity="0.75"/>
      {/* floor line */}
      <path d="M14,93 C35,91 65,91 86,93" stroke={accent} strokeWidth="1.2" strokeLinecap="round" filter="url(#sk-light)" opacity="0.35"/>
      {/* window light dashes beside chair */}
      <g stroke={accent} strokeWidth="1" strokeLinecap="round" filter="url(#sk-light)" opacity="0.3">
        <line x1="12" y1="36" x2="6" y2="36"/>
        <line x1="12" y1="44" x2="6" y2="44"/>
        <line x1="12" y1="52" x2="6" y2="52"/>
      </g>
    </svg>
  )
}

function IllustrationSmallProof({ accent }) {
  return (
    <svg width="70" height="110" viewBox="0 0 70 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <SketchDefs />
      {/* flame */}
      <path d="M35,28 C32,22 26,18 28,10 C28,10 30,14 33,12 C33,12 30,6 35,4 C40,6 37,12 37,12 C40,14 42,10 42,10 C44,18 38,22 35,28 Z" stroke={accent} strokeWidth="1.8" fill="none" filter="url(#sk-wobble)" opacity="0.85"/>
      {/* match stick */}
      <rect x="32" y="28" width="6" height="52" rx="2" stroke={accent} strokeWidth="1.8" fill="none" filter="url(#sk-wobble)" opacity="0.8"/>
      {/* match head */}
      <ellipse cx="35" cy="28" rx="5" ry="4" stroke={accent} strokeWidth="1.6" fill="none" filter="url(#sk-wobble)" opacity="0.9"/>
      {/* glow rays */}
      <g stroke={accent} strokeWidth="1" strokeLinecap="round" filter="url(#sk-light)" opacity="0.38">
        <line x1="20" y1="14" x2="14" y2="10"/>
        <line x1="18" y1="22" x2="10" y2="22"/>
        <line x1="52" y1="14" x2="58" y2="10"/>
        <line x1="54" y1="22" x2="62" y2="22"/>
      </g>
    </svg>
  )
}

function IllustrationOpenDoor({ accent }) {
  return (
    <svg width="90" height="110" viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <SketchDefs />
      {/* door frame */}
      <path d="M15,95 L15,18 L75,18 L75,95" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" filter="url(#sk-wobble)" opacity="0.7"/>
      {/* floor */}
      <line x1="10" y1="95" x2="80" y2="95" stroke={accent} strokeWidth="1.5" strokeLinecap="round" filter="url(#sk-light)" opacity="0.4"/>
      {/* door panel (ajar, showing perspective) */}
      <path d="M15,18 L15,95 L48,98 L48,15 Z" stroke={accent} strokeWidth="2" fill="none" filter="url(#sk-wobble)" opacity="0.85"/>
      {/* door knob */}
      <circle cx="43" cy="58" r="3.5" stroke={accent} strokeWidth="1.6" fill="none" filter="url(#sk-wobble)" opacity="0.75"/>
      {/* light spilling from behind door (soft rays) */}
      <g stroke={accent} strokeWidth="1.2" strokeLinecap="round" filter="url(#sk-light)" opacity="0.4">
        <line x1="50" y1="30" x2="70" y2="24"/>
        <line x1="50" y1="45" x2="72" y2="44"/>
        <line x1="50" y1="60" x2="70" y2="64"/>
      </g>
      {/* top line */}
      <line x1="15" y1="18" x2="75" y2="18" stroke={accent} strokeWidth="1.8" strokeLinecap="round" filter="url(#sk-wobble)" opacity="0.65"/>
    </svg>
  )
}

function IllustrationGentleReturn({ accent }) {
  return (
    <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <SketchDefs />
      {/* open book / journal spine */}
      <line x1="55" y1="18" x2="55" y2="78" stroke={accent} strokeWidth="2.2" strokeLinecap="round" filter="url(#sk-wobble)" opacity="0.8"/>
      {/* left page */}
      <path d="M55,18 C45,20 22,22 16,28 L16,74 C22,72 44,70 55,72 Z" stroke={accent} strokeWidth="1.8" fill="none" filter="url(#sk-wobble)" opacity="0.78"/>
      {/* right page */}
      <path d="M55,18 C65,20 88,22 94,28 L94,74 C88,72 66,70 55,72 Z" stroke={accent} strokeWidth="1.8" fill="none" filter="url(#sk-wobble)" opacity="0.78"/>
      {/* handwriting lines on left page */}
      <g stroke={accent} strokeWidth="1" strokeLinecap="round" filter="url(#sk-light)" opacity="0.38">
        <path d="M22,36 C28,35 42,35 50,36"/>
        <path d="M22,45 C28,44 38,44 46,45"/>
        <path d="M22,54 C28,53 44,53 52,54"/>
        <path d="M22,63 C28,62 35,62 40,63"/>
      </g>
      {/* right page blank — partial start of fresh entry */}
      <g stroke={accent} strokeWidth="1" strokeLinecap="round" filter="url(#sk-light)" opacity="0.25">
        <path d="M60,36 C66,35 72,35 76,36"/>
      </g>
    </svg>
  )
}

function CardIllustration({ theory }) {
  const a = theory.palette.accent
  switch (theory.id) {
    case 'ray-of-hope': return <IllustrationRayOfHope accent={a} />
    case '30-percent-rule': return <IllustrationThirtyPercent accent={a} />
    case 'quiet-progress-theory': return <IllustrationQuietProgress accent={a} />
    case 'rest-isnt-failure': return <IllustrationRestIsntFailure accent={a} />
    case 'borrowed-deadline': return <IllustrationBorrowedDeadline accent={a} />
    case 'soft-no-theory': return <IllustrationSoftNo accent={a} />
    case 'waiting-room-theory': return <IllustrationWaitingRoom accent={a} />
    case 'small-proof-theory': return <IllustrationSmallProof accent={a} />
    case 'open-door-theory': return <IllustrationOpenDoor accent={a} />
    case 'gentle-return-theory': return <IllustrationGentleReturn accent={a} />
    default: return null
  }
}

function CardFront({ theory }) {
  if (theory.id === 'two-containers-theory') return <CardFrontTwoContainers />

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
        {/* illustration centered in upper card area */}
        <div className="absolute inset-x-0 top-[14%] flex items-center justify-center" style={{ bottom: '38%' }}>
          <CardIllustration theory={theory} />
        </div>
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

function CardFrontTwoContainers() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-float [backface-visibility:hidden]" style={{ background: '#f5f0e8' }}>
      <svg width="100%" height="100%" viewBox="0 0 230 390" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <defs>
          <filter id="tc-paper" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
            <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
            <feBlend in="SourceGraphic" in2="gray" mode="multiply" result="blend"/>
            <feComposite in="blend" in2="SourceGraphic" operator="in"/>
          </filter>
          <filter id="tc-sketchy" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="turbulence" baseFrequency="0.02 0.06" numOctaves="2" seed="4" result="turb"/>
            <feDisplacementMap in="SourceGraphic" in2="turb" scale="2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="tc-wobble" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="turbulence" baseFrequency="0.015 0.04" numOctaves="3" seed="8" result="turb"/>
            <feDisplacementMap in="SourceGraphic" in2="turb" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>

        {/* paper bg */}
        <rect width="230" height="390" fill="#f5f0e8" filter="url(#tc-paper)"/>

        {/* ruled lines */}
        <g stroke="#d8cfc0" strokeWidth="0.5" opacity="0.45" filter="url(#tc-sketchy)">
          <line x1="20" y1="80" x2="210" y2="80"/>
          <line x1="20" y1="318" x2="210" y2="318"/>
        </g>

        {/* rough border */}
        <rect x="12" y="12" width="206" height="366" rx="3" fill="none" stroke="#3a2e22" strokeWidth="1.8" filter="url(#tc-wobble)" opacity="0.55"/>

        {/* corner dot (sage) */}
        <circle cx="28" cy="28" r="2.5" fill="#88a59a" filter="url(#tc-sketchy)"/>

        {/* LABEL */}
        <text x="26" y="46" fontFamily="'Manrope', sans-serif" fontSize="7.5" fill="#8a7a68" letterSpacing="2" fontWeight="500">THEORY CARD</text>
        <path d="M26,50 C45,51 70,49 100,50" stroke="#8a7a68" strokeWidth="0.8" fill="none" filter="url(#tc-sketchy)" opacity="0.6"/>

        {/* ── LEFT JAR (looping) ── */}
        <g filter="url(#tc-sketchy)" fill="none" stroke="#1e1612" strokeLinecap="round">
          {/* jar body */}
          <path d="M30,230 C30,175 40,158 55,150 L80,148 C95,148 105,168 105,225 C105,262 98,278 65,280 C35,280 30,262 30,230 Z" strokeWidth="2"/>
          {/* neck */}
          <line x1="52" y1="148" x2="83" y2="148" strokeWidth="2"/>
          {/* lip */}
          <line x1="49" y1="143" x2="86" y2="143" strokeWidth="2"/>
          {/* stopper */}
          <rect x="55" y="134" width="25" height="9" rx="2" strokeWidth="1.8"/>
        </g>
        {/* looping thought swirls inside left jar */}
        <g filter="url(#tc-sketchy)" fill="none" stroke="#b85c38" strokeLinecap="round" opacity="0.72">
          <path d="M50,195 C50,186 56,182 64,183 C72,184 76,191 74,199 C72,205 66,208 59,206 C53,204 50,199 52,193" strokeWidth="1.8"/>
          <path d="M48,228 C49,219 56,215 64,216 C72,217 76,225 73,233 C71,238 65,241 58,239" strokeWidth="1.8"/>
          <path d="M72,260 C74,252 79,250 82,255 C84,260 80,265 77,267" strokeWidth="1.5"/>
          <circle cx="77" cy="271" r="1.5" fill="#b85c38" stroke="none"/>
        </g>
        {/* overflow swirls (thoughts spilling) */}
        <g filter="url(#tc-sketchy)" fill="none" stroke="#b85c38" opacity="0.35" strokeLinecap="round">
          <path d="M24,210 C30,205 38,208 34,215" strokeWidth="1.2"/>
          <path d="M98,240 C105,235 108,242 104,247" strokeWidth="1.2"/>
        </g>

        {/* ── RIGHT JAR (processing) ── */}
        <g filter="url(#tc-sketchy)" fill="none" stroke="#1e1612" strokeLinecap="round">
          <path d="M126,230 C126,175 136,158 151,150 L176,148 C191,148 201,168 201,225 C201,262 194,278 161,280 C131,280 126,262 126,230 Z" strokeWidth="2"/>
          <line x1="148" y1="148" x2="179" y2="148" strokeWidth="2"/>
          <line x1="145" y1="143" x2="182" y2="143" strokeWidth="2"/>
          <rect x="151" y="134" width="25" height="9" rx="2" strokeWidth="1.8"/>
        </g>
        {/* processing bubbles inside right jar */}
        <g filter="url(#tc-sketchy)" fill="none" stroke="#88a59a" strokeLinecap="round" opacity="0.8">
          <circle cx="158" cy="195" r="14" strokeWidth="1.6"/>
          <circle cx="176" cy="225" r="10" strokeWidth="1.6"/>
          <circle cx="153" cy="248" r="8" strokeWidth="1.6"/>
          {/* pop lines on top bubble */}
          <g opacity="0.55">
            <line x1="158" y1="178" x2="158" y2="173" strokeWidth="1.5"/>
            <line x1="169" y1="182" x2="173" y2="177" strokeWidth="1.5"/>
            <line x1="147" y1="182" x2="143" y2="177" strokeWidth="1.5"/>
          </g>
        </g>

        {/* vs divider */}
        <text x="115" y="218" fontFamily="'Manrope', sans-serif" fontSize="9" fill="#8a7a68" opacity="0.55" textAnchor="middle">vs</text>

        {/* tiny star doodle */}
        <g filter="url(#tc-sketchy)" stroke="#c8a96e" strokeLinecap="round" fill="none" opacity="0.65">
          <path d="M196,52 L198,44 L200,52 L208,50 L202,56 L204,64 L198,60 L192,64 L194,56 L188,50 Z" strokeWidth="1.2"/>
        </g>

        {/* sage arrow doodle */}
        <g filter="url(#tc-sketchy)" stroke="#88a59a" strokeLinecap="round" fill="none" opacity="0.45">
          <path d="M26,102 C36,94 50,92 58,100" strokeWidth="1.8"/>
          <path d="M54,94 L60,101 L53,104" strokeWidth="1.8"/>
        </g>

        {/* title */}
        <text x="26" y="344" fontFamily="'Georgia', serif" fontSize="17" fill="#1e1612" fontWeight="700">The Two Containers</text>
        {/* sage underline */}
        <path d="M26,349 C60,351 130,348 200,350" stroke="#88a59a" strokeWidth="2" fill="none" filter="url(#tc-sketchy)"/>

        {/* flip hint */}
        <text x="152" y="374" fontFamily="'Manrope', sans-serif" fontSize="7.5" fill="#8a7a68" letterSpacing="1.2">tap to flip →</text>
      </svg>
    </div>
  )
}

function CardBack({ theory }) {
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?theory=${theory.id}`
    : `https://theorydeck.app/?theory=${theory.id}`
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&bgcolor=f9f4ed&color=3d342f&qzone=1&data=${encodeURIComponent(shareUrl)}`

  return (
    <div
      className="paper-noise absolute inset-0 overflow-hidden rounded-[2rem] shadow-float [backface-visibility:hidden] [transform:rotateY(180deg)]"
      style={{ background: '#f9f4ed', border: '1.5px solid rgba(255,255,255,0.6)' }}
    >
      {/* subtle top wash in accent color */}
      <div
        className="absolute inset-x-0 top-0 h-28"
        style={{ background: `linear-gradient(180deg, ${theory.palette.glow.replace('0.22','0.38').replace('0.24','0.42').replace('0.20','0.38').replace('0.18','0.34').replace('0.2','0.36')}, transparent)` }}
      />

      <div className="relative flex h-full flex-col px-5 py-5 sm:px-6 sm:py-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-ink/45">
            Pocket Philosophy
          </p>
          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: theory.palette.accent }} />
        </div>

        {/* teaser */}
        <div className="mt-auto">
          <p className="font-serif text-[13px] font-light uppercase tracking-[0.1em] text-ink/35">
            {theory.title}
          </p>
          <div className="mt-2 h-px" style={{ background: theory.palette.accent, opacity: 0.3 }} />
          <p className="mt-4 font-serif text-[1.25rem] font-light italic leading-[1.55] text-ink/82 sm:text-[1.35rem]">
            "{theory.teaser}"
          </p>
        </div>

        {/* QR + hint */}
        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="mb-1.5 text-[9px] uppercase tracking-[0.2em] text-ink/35">
              scan to explore
            </p>
            <div
              className="rounded-[10px] p-1.5"
              style={{ background: '#f9f4ed', border: `1.5px solid ${theory.palette.accent}40` }}
            >
              <img
                src={qrSrc}
                alt="QR code"
                width={60}
                height={60}
                style={{ display: 'block', borderRadius: 6 }}
              />
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink/50">
              <ArrowUpRight size={13} />
              Open the thought
            </div>
            <p className="text-[9px] uppercase tracking-[0.16em] text-ink/30">
              {theory.hasJourney ? 'story · game · reflect' : 'read · reflect'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
