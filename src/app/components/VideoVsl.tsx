"use client";

import { useRef, useState } from "react";
import { trackVideo } from "../lib/analytics";

export function VideoVsl() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  // Marcos já enviados nesta sessão de visualização, para não repetir evento
  // quando a pessoa volta o vídeo ou pausa e retoma.
  const marcos = useRef(new Set<number>());

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setStarted(true);
      void video.play();
    } else {
      video.pause();
    }
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border bg-surface">
      <video
        ref={videoRef}
        src="/publetv-vsl.mp4"
        poster="/publetv-vsl-poster.webp"
        playsInline
        preload="metadata"
        onPlay={() => {
          setPlaying(true);
          if (!marcos.current.has(0)) {
            marcos.current.add(0);
            trackVideo("video_start");
          }
        }}
        onTimeUpdate={(e) => {
          const { currentTime, duration } = e.currentTarget;
          if (!duration) return;
          const pct = (currentTime / duration) * 100;
          for (const marco of [25, 50, 75]) {
            if (pct >= marco && !marcos.current.has(marco)) {
              marcos.current.add(marco);
              trackVideo("video_progress", marco);
            }
          }
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          trackVideo("video_complete");
          marcos.current.clear();
          setPlaying(false);
          setStarted(false);
        }}
        onClick={toggle}
        className="h-full w-full cursor-pointer object-cover"
      />
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={started ? "Continuar o vídeo" : "Assistir ao vídeo"}
          className="absolute inset-0 flex items-center justify-center bg-black/10 transition hover:bg-black/0"
        >
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan text-navy-deep shadow-[0_0_60px_rgba(0,200,240,0.55)] transition hover:scale-105 sm:h-36 sm:w-36 lg:h-44 lg:w-44">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1.5 h-10 w-10 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
            >
              <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.1-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
