"use client";

import { useEffect, useMemo, useState } from "react";
import { Play, Smartphone, Monitor, Sparkles } from "lucide-react";

type GameDemoCardProps = {
  title?: string;
  description?: string;
  onPlay: () => void;
};

type LatestGameStats = {
  rank: string;
  integrity: number;
  score: number;
  bugsResolved: number;
  level: number;
  status: "idle" | "running" | "completed";
  updatedAt: number;
};

const GAME_STATS_KEY = "full_stack_evolution_latest_stats";

export function GameDemoCard({
  title = "The Full-Stack Evolution",
  description = "Interactive portfolio game where users defend system integrity, resolve bugs, and unlock higher architecture ranks.",
  onPlay,
}: GameDemoCardProps) {
  const [latestStats, setLatestStats] = useState<LatestGameStats | null>(null);

  useEffect(() => {
    const readStatsFromStorage = () => {
      const raw = window.localStorage.getItem(GAME_STATS_KEY);
      if (!raw) return null;
      try {
        return JSON.parse(raw) as LatestGameStats;
      } catch {
        return null;
      }
    };

    const timer = window.setTimeout(() => {
      setLatestStats(readStatsFromStorage());
    }, 0);

    const onStatsUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<LatestGameStats>;
      if (customEvent.detail) {
        setLatestStats(customEvent.detail);
      }
    };
    window.addEventListener("full-stack-evolution-stats-updated", onStatsUpdate as EventListener);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("full-stack-evolution-stats-updated", onStatsUpdate as EventListener);
    };
  }, []);

  const statusText = useMemo(() => {
    if (!latestStats) return "Ready for first run";
    if (latestStats.status === "running") return "Live session active";
    if (latestStats.status === "completed") return "Last run completed";
    return "Ready for next run";
  }, [latestStats]);

  return (
    <section className="w-full border border-accent-energy/30 bg-surface-card p-6 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 inline-flex items-center gap-2 bg-accent-energy/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-accent-energy">
            <Sparkles size={12} />
            Live Interactive Demo
          </p>
          <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary md:text-3xl">{title}</h3>
          <p className="mt-2 text-sm text-text-secondary">{description}</p>
        </div>

      </div>

      <button
        type="button"
        onClick={onPlay}
        className="group mt-5 block w-full overflow-hidden border border-text-muted/20 bg-[#031026] text-left transition hover:border-accent-primary/60"
      >
        <div className="relative min-h-[210px] w-full overflow-hidden md:min-h-[260px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18),transparent_58%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.15)_1px,transparent_1px)] bg-[size:42px_42px]" />
          <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-energy shadow-[0_0_24px_rgba(6,182,212,0.9)]" />
          <div className="absolute left-5 top-5 rounded border border-accent-energy/30 bg-background-main/90 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">Rank</p>
            <p className="text-sm font-black text-text-primary">{latestStats?.rank ?? "FRESHER"}</p>
          </div>
          <div className="absolute right-5 top-5 rounded border border-rose-300/40 bg-background-main/90 px-3 py-2 text-right">
            <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">Integrity</p>
            <p className="text-sm font-black text-rose-600">{latestStats?.integrity ?? 100}%</p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 border border-white/30 bg-black/60 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition group-hover:border-accent-energy group-hover:text-accent-energy">
              <Play size={14} />
              Play Now
            </span>
          </div>
        </div>
      </button>

      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-text-secondary md:grid-cols-4">
        <div className="rounded border border-text-muted/20 bg-background-secondary px-3 py-2">
          <p className="font-mono uppercase text-text-muted">Level</p>
          <p className="font-bold text-text-primary">{latestStats?.level ?? 1}</p>
        </div>
        <div className="rounded border border-text-muted/20 bg-background-secondary px-3 py-2">
          <p className="font-mono uppercase text-text-muted">ROI Score</p>
          <p className="font-bold text-text-primary">{latestStats?.score ?? 0}</p>
        </div>
        <div className="rounded border border-text-muted/20 bg-background-secondary px-3 py-2">
          <p className="font-mono uppercase text-text-muted">Bugs Cleared</p>
          <p className="font-bold text-text-primary">{latestStats?.bugsResolved ?? 0}</p>
        </div>
        <div className="rounded border border-text-muted/20 bg-background-secondary px-3 py-2">
          <p className="font-mono uppercase text-text-muted">Status</p>
          <p className="font-bold text-accent-primary">{statusText}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 border-t border-text-muted/20 pt-4 text-xs text-text-secondary md:grid-cols-2">
        <div className="rounded border border-text-muted/20 bg-background-secondary p-3">
          <p className="mb-1 flex items-center gap-2 font-mono uppercase text-text-primary">
            <Monitor size={14} />
            Desktop Controls
          </p>
          <p>Move with Arrow keys, click to shoot, press Spacebar to start.</p>
        </div>
        <div className="rounded border border-text-muted/20 bg-background-secondary p-3">
          <p className="mb-1 flex items-center gap-2 font-mono uppercase text-text-primary">
            <Smartphone size={14} />
            Mobile Controls
          </p>
          <p>Swipe left side to move, tap right side to shoot, tap Start Mission.</p>
        </div>
      </div>
    </section>
  );
}
