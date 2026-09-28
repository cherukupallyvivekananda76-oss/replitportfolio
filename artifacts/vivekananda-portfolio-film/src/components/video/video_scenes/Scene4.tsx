import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export function Scene4() {
  return (
    <motion.section
      className="film-scene"
      aria-label="Source-grounded portfolio guide"
      initial={{ opacity: .7, clipPath: 'inset(0 0 0 12%)', scale: 1.08 }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)', scale: 1 }}
      exit={{ opacity: 0, scale: 1.07, clipPath: 'circle(0% at 50% 50%)', transition: { duration: .5, ease } }}
      transition={{ duration: .55, ease }}
    >
      <div className="film-grid" />
      <div className="guide-label film-mono film-eyebrow">Profile query / Source-grounded</div>
      <motion.h2 className="guide-question" initial={{ opacity: .35, y: '5vmin' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .3, ease }}>What has he built with automation and LLMs?</motion.h2>
      <motion.div className="guide-underline" initial={{ scaleX: .04 }} animate={{ scaleX: 1 }} transition={{ duration: .75, delay: .1, ease }} />
      <motion.div className="guide-status film-status" initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 1.08 }}>VERIFIED MATCH</motion.div>
      <div className="guide-tiles">
        <motion.div className="guide-tile" initial={{ opacity: 0, y: '8vmin', rotateX: 16 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: .55, delay: 1.45, ease }}>
          AI Accountant Agent
          <motion.small initial={{ opacity: 0, x: '-2vmin' }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .35, delay: 2.4 }}>SOURCE / AI ACCOUNTANT RECORD</motion.small>
        </motion.div>
        <motion.div className="guide-tile" initial={{ opacity: 0, y: '8vmin', rotateX: 16 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: .55, delay: 1.9, ease }}>
          Pinterest Affiliate Automation App
          <motion.small initial={{ opacity: 0, x: '-2vmin' }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .35, delay: 2.9 }}>SOURCE / PINTEREST RECORD</motion.small>
        </motion.div>
      </div>
      <motion.p className="guide-principle" initial={{ opacity: 0, y: '2vmin' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: 3.55, ease }}>Unsupported claims aren't guessed.</motion.p>
      <svg className="hook-trace" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
        <motion.path d="M 8 84 L 50 84 L 50 52" fill="none" stroke="#7dd9c2" strokeWidth=".2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: .65 }} transition={{ duration: .6, delay: 4.2, ease }} />
      </svg>
    </motion.section>
  );
}