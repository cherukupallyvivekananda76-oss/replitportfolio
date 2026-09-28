import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;
const capabilities = [
  { index: '01', title: 'Evaluate AI outputs', detail: 'Accuracy · relevance · consistency', delay: .36 },
  { index: '02', title: 'Iterate workflows', detail: 'Feedback → better prompts', delay: 1.36 },
  { index: '03', title: 'Build practical tools', detail: 'Full-stack + AI workflows', delay: 2.36 },
];
const evidence = ['HANDSHAKE AI', 'AI ACCOUNTANT AGENT', 'PINTEREST APP'];

export function Scene2() {
  return (
    <motion.section
      className="film-scene"
      aria-label="Role fit evidence map"
      initial={{ opacity: .7, scale: 1.08, clipPath: 'inset(5% 0 0 0)' }}
      animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0)' }}
      exit={{ opacity: 0, scale: 1.16, clipPath: 'inset(0 0 0 100%)', transition: { duration: .45, ease } }}
      transition={{ duration: .55, ease }}
    >
      <div className="film-grid" />
      <div className="map-header film-mono film-eyebrow"><span>Role fit / Evidence map</span><span>01—03</span></div>
      <motion.div className="map-spine" initial={{ scaleY: .05, opacity: .35, transformOrigin: 'top' }} animate={{ scaleY: 1, opacity: 1 }} transition={{ duration: 2.8, ease }} />
      <div className="cap-list">
        {capabilities.map((cap) => (
          <motion.div
            className="cap-card"
            key={cap.index}
            initial={{ opacity: 0, x: '12vmin', scale: .94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: .55, delay: cap.delay, ease }}
          >
            <motion.span className="cap-node" initial={{ scale: .5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 420, damping: 26, delay: cap.delay + .2 }} />
            <div><div className="film-number">CAP-{cap.index}</div><h2>{cap.title}</h2><p>{cap.detail}</p></div>
          </motion.div>
        ))}
      </div>
      <div className="map-evidence">
        {evidence.map((name, index) => (
          <motion.span key={name} initial={{ opacity: 0, y: '2vmin' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .32, delay: 3.25 + index * .45 }}>{name}</motion.span>
        ))}
      </div>
    </motion.section>
  );
}