import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const ease = [0.22, 1, 0.36, 1] as const;
const projects = [
  { index: '01', title: 'AI Accountant Agent', status: 'IN PROGRESS', detail: 'Outputs checked against hand calculations' },
  { index: '02', title: 'Pinterest Affiliate Automation App', status: 'BUILT', detail: 'Topic → titles, descriptions, keywords' },
  { index: '03', title: 'AI Tutor', status: 'PROTOTYPE', detail: 'Personalized-learning interface' },
];

export function Scene3() {
  const [stage, setStage] = useState(0);
  useSceneTimer([
    { time: 2180, callback: () => setStage(1) },
    { time: 4150, callback: () => setStage(2) },
    { time: 5250, callback: () => setStage(3) },
  ]);

  return (
    <motion.section
      className="film-scene"
      aria-label="Verified project records"
      initial={{ opacity: .75, scale: 1.12, filter: 'blur(7px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: .89, clipPath: 'inset(0 0 0 100%)', transition: { duration: .46, ease } }}
      transition={{ duration: .55, ease }}
    >
      <div className="film-grid" />
      <div className="record-heading"><h2>Project<br />evidence</h2><span className="film-number">02 / 05</span></div>
      <div className="record-deck">
        {projects.map((project, index) => {
          const offset = index - Math.min(stage, 2);
          const active = offset === 0;
          return (
            <motion.article
              key={project.index}
              className="record-card"
              data-active={active && stage !== 3 ? 'true' : 'false'}
              style={{ zIndex: active ? 8 : offset > 0 ? 5 - offset : 1 }}
              initial={{ opacity: index === 0 ? 1 : .5, y: `${index * 2}vmin`, scale: 1 - index * .06 }}
              animate={{
                opacity: stage === 3 ? 0 : active ? 1 : offset > 0 ? .78 : 0,
                y: stage === 3 ? '-13vmin' : offset < 0 ? '-55vmin' : `${Math.max(offset, 0) * 2}vmin`,
                scale: stage === 3 ? .7 : offset < 0 ? .82 : 1 - Math.max(offset, 0) * .06,
                rotate: stage === 3 ? -3 : offset > 0 ? -offset * 1.4 : 0,
              }}
              transition={{ duration: .58, ease }}
            >
              <span className="card-index film-mono">Record / {project.index}</span>
              <h3>{project.title}</h3>
              <div className="film-status">{project.status}</div>
              <p>{project.detail}</p>
              <span className="card-signal" aria-hidden="true">{project.index}</span>
            </motion.article>
          );
        })}
      </div>
      <div className="record-bottom">
        <motion.strong initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.05 }}>Methods before claims.</motion.strong>
        <span className="film-number">STATUS / VERIFIED</span>
      </div>
      <motion.div style={{ position: 'absolute', top: '59%', left: '7%', width: '86%', height: '.8vmin', background: 'var(--film-aqua)', transformOrigin: 'left', zIndex: 12 }} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: stage === 3 ? 1 : 0, opacity: stage === 3 ? 1 : 0 }} transition={{ duration: .55, ease }} />
    </motion.section>
  );
}