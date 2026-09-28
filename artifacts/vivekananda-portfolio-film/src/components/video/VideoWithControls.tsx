import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { ChevronDown, ChevronUp, Pause, Play, Repeat, Volume2, VolumeX } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';
import './preview-controls.css';

const SCENE_DETAILS: Record<string, { title: string; filePath: string }> = {
  hook: { title: 'The hook', filePath: 'src/components/video/video_scenes/Scene1.tsx' },
  map: { title: 'Evidence map', filePath: 'src/components/video/video_scenes/Scene2.tsx' },
  records: { title: 'Project records', filePath: 'src/components/video/video_scenes/Scene3.tsx' },
  guide: { title: 'Source-grounded guide', filePath: 'src/components/video/video_scenes/Scene4.tsx' },
  finale: { title: 'Identity finale', filePath: 'src/components/video/video_scenes/Scene5.tsx' },
};

function announceSceneSelection(index: number, sceneKeys: string[]) {
  const key = sceneKeys[index];
  const details = SCENE_DETAILS[key];
  if (!details?.filePath) return;
  window.parent.postMessage({
    type: 'REPLIT_VIDEO_SCENE_SELECTED',
    payload: {
      sceneIndex: index, sceneCount: sceneKeys.length, sceneTitle: details.title,
      filePath: details.filePath, lineNumber: 1,
    },
  }, '*');
}

function formatPlaybackTime(durationMs: number) {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  return `${Math.floor(totalSeconds / 60)}:${(totalSeconds % 60).toString().padStart(2, '0')}`;
}

function PlaybackStatus({
  sceneKeys, activeIndex, activeDuration, activeStartTime, totalDuration, tick, paused, onJumpTo,
}: {
  sceneKeys: string[]; activeIndex: number; activeDuration: number; activeStartTime: number;
  totalDuration: number; tick: number; paused: boolean; onJumpTo: (index: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedBaseRef = useRef(0);
  useEffect(() => { setElapsed(0); elapsedBaseRef.current = 0; }, [tick]);
  useEffect(() => {
    if (paused) return;
    const start = performance.now();
    const id = window.setInterval(() => setElapsed(elapsedBaseRef.current + (performance.now() - start)), 60);
    return () => {
      window.clearInterval(id);
      elapsedBaseRef.current += performance.now() - start;
    };
  }, [tick, paused]);

  const progress = activeDuration > 0 ? Math.min(1, elapsed / activeDuration) : 0;
  const totalElapsed = Math.min(totalDuration, activeStartTime + Math.min(elapsed, activeDuration));
  return (
    <>
      <div className="preview-progress" aria-label="Scenes">
        {sceneKeys.map((key, index) => (
          <button
            type="button" key={key} onClick={() => onJumpTo(index)}
            aria-label={`Jump to scene ${index + 1}: ${SCENE_DETAILS[key]?.title ?? key}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            title={SCENE_DETAILS[key]?.title ?? key}
          >
            <span style={{ width: index === activeIndex ? `${progress * 100}%` : '0%' }} />
          </button>
        ))}
      </div>
      <div className="preview-count">{activeIndex + 1}/{sceneKeys.length}</div>
      <div className="preview-time" role="timer" aria-label={`Playback time ${formatPlaybackTime(totalElapsed)} of ${formatPlaybackTime(totalDuration)}`}>
        {formatPlaybackTime(totalElapsed)} / {formatPlaybackTime(totalDuration)}
      </div>
    </>
  );
}

export default function VideoWithControls() {
  const isIframed = typeof window !== 'undefined' && window.self !== window.top;
  const {
    sceneKeys, activeIndex, locked, paused, mountKey, tick, durations, activeDuration,
    activeStartTime, totalDuration, onSceneChange, jumpTo, toggleLock, togglePause,
  } = useSceneControls(SCENE_DURATIONS);
  const [muted, setMuted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tapPinned, setTapPinned] = useState(false);
  const sensorRef = useRef<HTMLDivElement>(null);

  const handleJumpTo = useCallback((index: number) => {
    jumpTo(index);
    announceSceneSelection(index, sceneKeys);
  }, [jumpTo, sceneKeys]);
  const handleAutoplayBlocked = useCallback(() => setMuted(true), []);
  const handleToggleSound = useCallback(() => {
    const audio = document.querySelector<HTMLAudioElement>('.preview-video-shell audio');
    const nextMuted = !muted;
    // User-initiated unmute must happen in the click activation, not a later effect.
    if (audio) audio.muted = nextMuted;
    setMuted(nextMuted);
    if (audio?.paused) {
      void audio.play().catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'NotAllowedError')) {
          console.warn('Film audio could not start:', error);
        }
      });
    }
  }, [muted]);
  useEffect(() => {
    if (!paused || typeof document.getAnimations !== 'function') return;
    const frozen = document.getAnimations().filter((animation) => animation.playState === 'running');
    frozen.forEach((animation) => animation.pause());
    return () => frozen.forEach((animation) => animation.play());
  }, [paused]);
  const handlePointerEnter = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(true);
  }, []);
  const handlePointerLeave = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(false);
  }, []);
  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' && collapsed) setTapPinned(true);
  }, [collapsed]);
  const handleToggleCollapsed = useCallback(() => {
    setCollapsed((wasCollapsed) => {
      if (!wasCollapsed) { setHovering(false); setTapPinned(false); }
      return !wasCollapsed;
    });
  }, []);
  useEffect(() => {
    if (!(collapsed && tapPinned)) return;
    const onDocPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      if (sensorRef.current && !sensorRef.current.contains(event.target as Node)) setTapPinned(false);
    };
    document.addEventListener('pointerdown', onDocPointerDown);
    return () => document.removeEventListener('pointerdown', onDocPointerDown);
  }, [collapsed, tapPinned]);

  if (!isIframed) return <VideoTemplate />;
  const visible = !collapsed || hovering || tapPinned;
  return (
    <div className="preview-video-shell">
      <VideoTemplate key={mountKey} durations={durations} loop paused={paused} muted={muted} onSceneChange={onSceneChange} onAutoplayBlocked={handleAutoplayBlocked} />
      <div ref={sensorRef} className="preview-sensor" onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} onPointerDown={handlePointerDown}>
        <div className="preview-sensor-space" aria-hidden="true" />
        <div className={`preview-controls ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
          <button type="button" onClick={togglePause} title={paused ? 'Play' : 'Pause'} aria-label={paused ? 'Play' : 'Pause'}><span>{paused ? <Play /> : <Pause />}</span></button>
          <button type="button" className={locked ? 'is-active' : ''} onClick={toggleLock} title={locked ? 'Loop scene: on' : 'Loop scene: off'} aria-label={locked ? 'Loop scene: on' : 'Loop scene: off'} aria-pressed={locked}><Repeat /></button>
          <button type="button" onClick={handleToggleSound} title={muted ? 'Unmute' : 'Mute'} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted}>{muted ? <VolumeX /> : <Volume2 />}</button>
          <div className="preview-divider" aria-hidden="true" />
          <PlaybackStatus sceneKeys={sceneKeys} activeIndex={activeIndex} activeDuration={activeDuration} activeStartTime={activeStartTime} totalDuration={totalDuration} tick={tick} paused={paused} onJumpTo={handleJumpTo} />
          <button type="button" onClick={handleToggleCollapsed} title={collapsed ? 'Show controls' : 'Hide controls'} aria-label={collapsed ? 'Show controls' : 'Hide controls'} aria-expanded={!collapsed}>{collapsed ? <ChevronUp /> : <ChevronDown />}</button>
        </div>
      </div>
    </div>
  );
}