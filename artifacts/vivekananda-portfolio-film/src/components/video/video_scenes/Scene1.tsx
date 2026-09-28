import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export function Scene1() {
  return (
    <motion.section
      className="film-scene"
      aria-label="Make AI useful"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, clipPath: 'inset(0 0 100% 0)', filter: 'blur(8px)', transition: { duration: .48, ease } }}
    >
      <div className="film-grid" />
      <motion.div className="hook-square" initial={{ scale: .55, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 380, damping: 24, delay: .05 }}>V.</motion.div>
      <div className="hook-headline">
        <motion.div initial={{ clipPath: 'inset(100% 0 0 0)', y: '4vmin' }} animate={{ clipPath: 'inset(0% 0 0 0)', y: 0 }} transition={{ duration: .42, ease, delay: .46 }}><h1>Make AI</h1></motion.div>
        <motion.div initial={{ clipPath: 'inset(100% 0 0 0)', y: '4vmin' }} animate={{ clipPath: 'inset(0% 0 0 0)', y: 0 }} transition={{ duration: .42, ease, delay: .91 }}><h1 className="acid">useful.</h1></motion.div>
      </div>
      <motion.div className="hook-rule" initial={{ scaleX: 0, opacity: .6 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: .55, ease, delay: 1.43 }} />
      <div className="hook-question">
        <motion.div initial={{ opacity: 0, y: '4vmin', clipPath: 'inset(100% 0 0 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: .53, ease, delay: 1.7 }}>Make its output</motion.div>
        <motion.div className="acid" initial={{ opacity: 0, scale: 1.14, x: '-2vmin' }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: .47, ease, delay: 2.25 }}>hold up.</motion.div>
      </div>
      <motion.div className="hook-foot film-mono film-eyebrow" initial={{ opacity: 0, y: '2vmin' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: 3.05 }}>AI Generalist / Evaluation Lab</motion.div>
      <svg className="hook-trace" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
        {[24, 50, 76].map((x, i) => (
          <motion.path key={x} d={`M 7 66 L 93 66 L ${x} 104`} fill="none" stroke="#c9f36a" strokeWidth=".18" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [.2, .7, .7] }} transition={{ duration: .55, delay: 3.3 + i * .12, ease }} />
        ))}
      </svg>
    </motion.section>
  );
}