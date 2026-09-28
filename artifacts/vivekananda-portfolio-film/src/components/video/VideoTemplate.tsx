import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { VideoCanvas, VideoPausedContext, type VideoAspectRatio, useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import './film.css';

export const SCENE_DURATIONS = {
  hook: 4000,
  map: 5000,
  records: 6000,
  guide: 5000,
  finale: 5000,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '4:5';
const SCENE_COMPONENTS = {
  hook: Scene1,
  map: Scene2,
  records: Scene3,
  guide: Scene4,
  finale: Scene5,
};
const SCENE_START_SEC: Record<string, number> = (() => {
  const starts: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    starts[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return starts;
})();
const AUDIO_SEEK_EPSILON_SEC = .18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  muted = false,
  onSceneChange,
  onAutoplayBlocked,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
  onAutoplayBlocked?: () => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused });
  useEffect(() => { onSceneChange?.(currentSceneKey); }, [currentSceneKey, onSceneChange]);
  const sceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_COMPONENTS;
  const Scene = SCENE_COMPONENTS[sceneKey];
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastSceneKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = .45;
    if (paused) { audio.pause(); return; }
    if (lastSceneKeyRef.current !== currentSceneKey) {
      lastSceneKeyRef.current = currentSceneKey;
      const targetTime = SCENE_START_SEC[sceneKey] ?? 0;
      if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) audio.currentTime = targetTime;
    }
    void audio.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        onAutoplayBlocked?.();
        return;
      }
      console.warn('Film audio could not start:', error);
    });
  }, [currentSceneKey, sceneKey, muted, paused, onAutoplayBlocked]);

  return (
    <VideoPausedContext.Provider value={paused}>
      <VideoCanvas aspectRatio={VIDEO_ASPECT_RATIO} style={{ backgroundColor: 'var(--film-base)' }}>
        <AnimatePresence mode="sync">
          {Scene && <Scene key={currentSceneKey} />}
        </AnimatePresence>
      </VideoCanvas>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`} preload="auto" autoPlay muted={muted} />
    </VideoPausedContext.Provider>
  );
}
