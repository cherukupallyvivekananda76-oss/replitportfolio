import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export function Scene5() {
  return (
    <motion.section
      className="film-scene"
      aria-label="Vivekananda Cherukupally, AI Generalist"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: .12 } }}
    >
      <motion.div className="finale-field" initial={{ clipPath: 'circle(4% at 50% 45%)' }} animate={{ clipPath: 'circle(130% at 50% 45%)' }} transition={{ duration: .58, ease }} />
      <div className="finale-center">
        <motion.div className="finale-mark" initial={{ opacity: 0, scale: 1.5, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .55, delay: .1, ease }}>V.</motion.div>
        <motion.h2 initial={{ opacity: 0, y: '6vmin', clipPath: 'inset(100% 0 0 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: .58, delay: .85, ease }}>Vivekananda</motion.h2>
        <motion.h2 initial={{ opacity: 0, y: '6vmin', clipPath: 'inset(100% 0 0 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: .58, delay: 1.3, ease }}>Cherukupally</motion.h2>
        <motion.div className="finale-rule" initial={{ scaleX: 0, transformOrigin: 'left' }} animate={{ scaleX: 1 }} transition={{ duration: .58, delay: 1.95, ease }} />
        <motion.p className="film-mono" initial={{ opacity: 0, y: '1vmin' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: 2.15 }}>AI Generalist / Evaluation Lab</motion.p>
        <motion.p className="finale-line" initial={{ opacity: 0, y: '3vmin' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: 3.05, ease }}>Make AI useful. Make its output hold up.</motion.p>
      </div>
      <motion.div className="finale-loop" initial={{ clipPath: 'circle(0% at 10% 9%)' }} animate={{ clipPath: 'circle(150% at 10% 9%)' }} transition={{ duration: .35, delay: 4.65, ease }}>
        <div className="hook-square">V.</div>
      </motion.div>
    </motion.section>
  );
}