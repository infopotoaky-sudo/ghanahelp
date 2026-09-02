import { useRef, useState } from "react";
import { Play, Pause, Film } from "lucide-react";
import { cn } from "../lib/utils";

interface DemoVideoProps {
  src: string;
  poster: string;
  title: string;
  /** Small caption under the player */
  note?: string;
  className?: string;
  posterAlt?: string;
}

/**
 * Custom video player used for the GHH demo reels.
 * Footage comes from a stable public sample bucket and is always
 * labelled "Sample footage" so nothing is misrepresented.
 */
export default function DemoVideo({ src, poster, title, note, className, posterAlt }: DemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
    } else {
      v.pause();
    }
  };

  return (
    <figure className={cn("group/video", className)}>
      <div className="relative overflow-hidden rounded-3xl bg-ink-900 shadow-lift ring-1 ring-ink-900/10">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          controls={playing}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="aspect-video w-full object-cover"
          aria-label={title}
        />

        {/* Sample-footage badge */}
        <span className="pointer-events-none absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/75 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          <Film className="h-3 w-3 text-gold-400" aria-hidden="true" />
          Sample footage
        </span>

        {/* Custom play overlay */}
        {!playing && (
          <button
            type="button"
            onClick={toggle}
            aria-label={`Play video: ${title}`}
            className="absolute inset-0 flex items-center justify-center bg-ink-900/25 transition-colors duration-300 hover:bg-ink-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-inset"
          >
            <span className="relative flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gold-400/40 animate-ping motion-reduce:animate-none" aria-hidden="true" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-ink-900 shadow-lift transition-transform duration-300 group-hover/video:scale-110">
                <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
              </span>
            </span>
          </button>
        )}

        {playing && (
          <button
            type="button"
            onClick={toggle}
            aria-label="Pause video"
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/70 text-white backdrop-blur-sm transition-colors hover:bg-ink-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <Pause className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-3 px-1">
        <span className="font-display text-sm font-bold text-ink-900">{title}</span>
        {note && <span className="text-xs font-medium text-ink-400">{note}</span>}
      </figcaption>
    </figure>
  );
}
