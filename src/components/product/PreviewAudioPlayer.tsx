"use client";

import { useRef, useState, useEffect } from "react";

interface PreviewAudioPlayerProps {
  src: string;
  title?: string;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Decorative waveform bars (heights from a simple pattern, not real audio data) */
const WAVEFORM_BARS = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.5, 0.7, 0.6, 0.9, 0.5, 0.8, 0.6, 0.7, 0.5, 0.8, 0.5, 0.7, 0.6];

export function PreviewAudioPlayer({ src, title }: PreviewAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onDurationChange = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("durationchange", onDurationChange);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("durationchange", onDurationChange);
    };
  }, []);

  if (!src?.trim()) return null;

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const value = parseFloat(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  }

  function handleEnded() {
    setPlaying(false);
    setCurrentTime(0);
  }

  function handlePlay() {
    setPlaying(true);
  }

  function handlePause() {
    setPlaying(false);
  }

  const progress = duration > 0 ? currentTime / duration : 0;

  if (error) {
    return (
      <div id="listen" className="border border-border-warm rounded-lg p-4 bg-parchment-light">
        <h3 className="font-serif text-lg text-charcoal mb-3">Preview</h3>
        {title && (
          <p className="text-sm text-charcoal-light mb-3">{title}</p>
        )}
        <p className="text-sm text-charcoal-light">Preview audio is unavailable.</p>
      </div>
    );
  }

  return (
    <div id="listen" className="border border-border-warm rounded-lg p-4 bg-parchment-light">
      <h3 className="font-serif text-lg text-charcoal mb-3">Preview</h3>
      {title && (
        <p className="text-sm text-charcoal-light mb-3">{title}</p>
      )}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-honey text-charcoal-dark hover:bg-honey-light transition-colors"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          {/* Waveform-style progress bar (clickable to seek) */}
          <div
            className="flex items-end justify-between gap-1 h-10 mb-3 cursor-pointer"
            onClick={(e) => {
              const audio = audioRef.current;
              if (!audio || duration <= 0) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width;
              const seekTo = Math.max(0, Math.min(1, x)) * duration;
              audio.currentTime = seekTo;
              setCurrentTime(seekTo);
            }}
          >
            {WAVEFORM_BARS.map((height, i) => {
              const barProgress = (i + 1) / WAVEFORM_BARS.length;
              const filled = progress >= barProgress;
              return (
                <div
                  key={i}
                  className="flex-1 min-w-[3px] max-w-[8px] rounded-sm transition-colors hover:opacity-80"
                  style={{
                    height: `${height * 100}%`,
                    backgroundColor: filled ? "#C9A227" : "#E5DDD4",
                  }}
                />
              );
            })}
          </div>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 accent-honey cursor-pointer bg-parchment-dark rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-honey [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-charcoal-light">{formatTime(currentTime)}</span>
            <span className="text-xs text-charcoal-light">{formatTime(duration)}</span>
          </div>
          <audio
            ref={audioRef}
            src={src}
            onEnded={handleEnded}
            onPlay={handlePlay}
            onPause={handlePause}
            onError={() => setError(true)}
            preload="metadata"
          />
        </div>
      </div>
    </div>
  );
}
