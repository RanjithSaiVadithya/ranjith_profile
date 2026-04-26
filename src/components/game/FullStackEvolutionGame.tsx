"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X, Gamepad2, Smartphone, Monitor, Play } from "lucide-react";

type FullStackEvolutionGameProps = {
  isOpen: boolean;
  onClose: () => void;
};

type EnemyType = "small" | "medium" | "large";

type Enemy = {
  x: number;
  y: number;
  label: string;
  hp: number;
  size: number;
  speed: number;
  type: EnemyType;
};

type Bullet = { x: number; y: number; vx: number; vy: number };
type FloatingText = { text: string; x: number; y: number; alpha: number; color: string };

const ranks = ["FRESHER", "FRONTEND DEV", "BACKEND DEV", "API MIDDLEWARE", "DB ADMIN", "SECURITY LEAD"];
const bugLabels = ["HTML TYPO", "CSS BUG", "ROUTE ERROR", "CORS ISSUE", "SQL INJECT", "DDOS"];
const damageSequence = [15, 15, 15, 20, 25, 10];
const GAME_STATS_KEY = "full_stack_evolution_latest_stats";

function detectTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export function FullStackEvolutionGame({ isOpen, onClose }: FullStackEvolutionGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const enemySpawnTimerRef = useRef<number | null>(null);
  const lastPublishedStatsRef = useRef("");
  const lastSpaceShotRef = useRef(0);

  const scoreRef = useRef(0);
  const bugsResolvedRef = useRef(0);
  const integrityRef = useRef(100);
  const levelRef = useRef(1);
  const hitsTakenRef = useRef(0);
  const radarPulseRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const keysRef = useRef<Record<string, boolean>>({});

  const playerRef = useRef({
    x: 0,
    y: 0,
    size: 20,
    speed: 5,
    shieldActive: false,
    shieldHealth: 0,
    maxShieldHealth: 100,
  });

  const touchMoveRef = useRef({
    active: false,
    identifier: -1,
    startX: 0,
    startY: 0,
    dx: 0,
    dy: 0,
  });

  const [hud, setHud] = useState({
    level: 1,
    rank: ranks[0],
    integrity: 100,
    score: 0,
    bugsResolved: 0,
    securityLevel: "VULNERABLE",
    gameStarted: false,
    gameOver: false,
    maxRank: ranks[0],
    levelUpText: "",
    showLevelUp: false,
    touchMode: false,
  });

  const [showHelp, setShowHelp] = useState(false);

  const publishStats = useCallback((payload: {
    rank: string;
    integrity: number;
    score: number;
    bugsResolved: number;
    level: number;
    status: "idle" | "running" | "completed";
  }) => {
    if (typeof window === "undefined") return;
    const withTimestamp = { ...payload, updatedAt: Date.now() };
    const signature = `${payload.rank}|${payload.integrity}|${payload.score}|${payload.bugsResolved}|${payload.level}|${payload.status}`;
    if (lastPublishedStatsRef.current === signature) return;
    lastPublishedStatsRef.current = signature;
    window.localStorage.setItem(GAME_STATS_KEY, JSON.stringify(withTimestamp));
    window.dispatchEvent(new CustomEvent("full-stack-evolution-stats-updated", { detail: withTimestamp }));
  }, []);

  const addFloatingText = useCallback((text: string, x: number, y: number, color = "#ffffff") => {
    floatingTextsRef.current.push({ text, x, y, alpha: 1, color });
  }, []);

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    playerRef.current.x = rect.width / 2;
    playerRef.current.y = rect.height / 2;
    mouseRef.current = { x: rect.width / 2, y: rect.height / 2 };

    scoreRef.current = 0;
    bugsResolvedRef.current = 0;
    integrityRef.current = 100;
    levelRef.current = 1;
    hitsTakenRef.current = 0;
    radarPulseRef.current = 0;
    floatingTextsRef.current = [];
    bulletsRef.current = [];
    enemiesRef.current = [];
    keysRef.current = {};
    touchMoveRef.current = { active: false, identifier: -1, startX: 0, startY: 0, dx: 0, dy: 0 };
    lastSpaceShotRef.current = 0;

    playerRef.current.shieldActive = false;
    playerRef.current.shieldHealth = 0;
    playerRef.current.maxShieldHealth = 100;

    setHud({
      level: 1,
      rank: ranks[0],
      integrity: 100,
      score: 0,
      bugsResolved: 0,
      securityLevel: "VULNERABLE",
      gameStarted: false,
      gameOver: false,
      maxRank: ranks[0],
      levelUpText: "",
      showLevelUp: false,
      touchMode: detectTouchDevice(),
    });
    publishStats({
      rank: ranks[0],
      integrity: 100,
      score: 0,
      bugsResolved: 0,
      level: 1,
      status: "idle",
    });
  }, [publishStats]);

  const fireAt = useCallback((targetX: number, targetY: number) => {
    const player = playerRef.current;
    const level = levelRef.current;
    const angle = Math.atan2(targetY - player.y, targetX - player.x);

    for (let i = enemiesRef.current.length - 1; i >= 0; i -= 1) {
      const enemy = enemiesRef.current[i];
      if (Math.hypot(targetX - enemy.x, targetY - enemy.y) < enemy.size + 15) {
        enemy.hp -= 3;
        if (enemy.hp > 0) addFloatingText("-3", enemy.x, enemy.y - 20, "#ff6b6b");
      }
    }

    const count = level >= 3 ? 2 : 1;
    for (let i = 0; i < count; i += 1) {
      bulletsRef.current.push({
        x: player.x,
        y: player.y,
        vx: Math.cos(angle + i * 0.1) * 12,
        vy: Math.sin(angle + i * 0.1) * 12,
      });
    }
  }, [addFloatingText]);

  const stopLoop = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (enemySpawnTimerRef.current) {
      window.clearTimeout(enemySpawnTimerRef.current);
      enemySpawnTimerRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    setHud((prev) => ({ ...prev, gameStarted: true, gameOver: false }));
    publishStats({
      rank: ranks[levelRef.current - 1],
      integrity: integrityRef.current,
      score: scoreRef.current,
      bugsResolved: bugsResolvedRef.current,
      level: levelRef.current,
      status: "running",
    });
  }, [publishStats]);

  const handleGameOver = useCallback(() => {
    setHud((prev) => ({
      ...prev,
      gameOver: true,
      gameStarted: false,
      securityLevel: levelRef.current >= 4 ? "ULTRA SECURE" : "MODERATE",
      maxRank: ranks[levelRef.current - 1],
    }));
    publishStats({
      rank: ranks[levelRef.current - 1],
      integrity: integrityRef.current,
      score: scoreRef.current,
      bugsResolved: bugsResolvedRef.current,
      level: levelRef.current,
      status: "completed",
    });
    stopLoop();
  }, [publishStats, stopLoop]);

  useEffect(() => {
    if (!isOpen) {
      stopLoop();
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      stopLoop();
    };
  }, [isOpen, stopLoop]);

  useEffect(() => {
    if (!isOpen) return;
    resetGame();
  }, [isOpen, resetGame]);

  useEffect(() => {
    if (!isOpen || !hud.gameStarted || hud.gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const spawnEnemy = (width: number, height: number) => {
      if (integrityRef.current <= 0) return;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.max(width, height);

      const sizeRnd = Math.random();
      let type: EnemyType = "small";
      let size = 8;
      let hpMult = 1;
      let speedMult = 1;

      if (sizeRnd > 0.8) {
        type = "large";
        size = 16;
        hpMult = 3;
        speedMult = 0.5;
      } else if (sizeRnd > 0.5) {
        type = "medium";
        size = 12;
        hpMult = 2;
        speedMult = 0.8;
      }

      enemiesRef.current.push({
        x: playerRef.current.x + Math.cos(angle) * dist,
        y: playerRef.current.y + Math.sin(angle) * dist,
        label: bugLabels[Math.min(levelRef.current - 1, bugLabels.length - 1)],
        hp: levelRef.current * hpMult,
        size,
        speed: (2 + levelRef.current * 0.5) * speedMult,
        type,
      });

      enemySpawnTimerRef.current = window.setTimeout(
        () => spawnEnemy(width, height),
        Math.max(420, 1400 - scoreRef.current * 9),
      );
    };

    resizeCanvas();
    spawnEnemy(canvas.clientWidth, canvas.clientHeight);

    const update = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const player = playerRef.current;

      const moveX = (keysRef.current.ArrowRight ? 1 : 0) - (keysRef.current.ArrowLeft ? 1 : 0);
      const moveY = (keysRef.current.ArrowDown ? 1 : 0) - (keysRef.current.ArrowUp ? 1 : 0);

      if (touchMoveRef.current.active) {
        const maxDelta = 60;
        const dx = Math.max(-maxDelta, Math.min(maxDelta, touchMoveRef.current.dx));
        const dy = Math.max(-maxDelta, Math.min(maxDelta, touchMoveRef.current.dy));
        const len = Math.hypot(dx, dy) || 1;
        player.x += (dx / len) * player.speed;
        player.y += (dy / len) * player.speed;
      } else {
        player.x += moveX * player.speed;
        player.y += moveY * player.speed;
      }

      player.x = Math.max(player.size, Math.min(width - player.size, player.x));
      player.y = Math.max(player.size, Math.min(height - player.size, player.y));

      if (bugsResolvedRef.current >= 2 && levelRef.current === 1) {
        levelRef.current = 2;
        player.shieldActive = true;
        player.maxShieldHealth = 150;
        player.shieldHealth = 150;
        setHud((prev) => ({ ...prev, levelUpText: ranks[1], showLevelUp: true }));
        window.setTimeout(() => setHud((prev) => ({ ...prev, showLevelUp: false })), 1800);
      }
      if (bugsResolvedRef.current >= 10 && levelRef.current === 2) {
        levelRef.current = 3;
        player.maxShieldHealth = 250;
        player.shieldHealth = 250;
        player.shieldActive = true;
        setHud((prev) => ({ ...prev, levelUpText: ranks[2], showLevelUp: true }));
        window.setTimeout(() => setHud((prev) => ({ ...prev, showLevelUp: false })), 1800);
      }
      if (bugsResolvedRef.current >= 20 && levelRef.current === 3) {
        levelRef.current = 4;
        setHud((prev) => ({ ...prev, levelUpText: ranks[3], showLevelUp: true }));
        window.setTimeout(() => setHud((prev) => ({ ...prev, showLevelUp: false })), 1800);
      }
      if (bugsResolvedRef.current >= 30 && levelRef.current === 4) {
        levelRef.current = 5;
        setHud((prev) => ({ ...prev, levelUpText: ranks[4], showLevelUp: true }));
        window.setTimeout(() => setHud((prev) => ({ ...prev, showLevelUp: false })), 1800);
      }
      if (bugsResolvedRef.current >= 40 && levelRef.current === 5) {
        levelRef.current = 6;
        setHud((prev) => ({ ...prev, levelUpText: ranks[5], showLevelUp: true }));
        window.setTimeout(() => setHud((prev) => ({ ...prev, showLevelUp: false })), 1800);
      }

      for (let i = bulletsRef.current.length - 1; i >= 0; i -= 1) {
        const bullet = bulletsRef.current[i];
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
        if (bullet.x < 0 || bullet.x > width || bullet.y < 0 || bullet.y > height) {
          bulletsRef.current.splice(i, 1);
        }
      }

      for (let enemyIndex = enemiesRef.current.length - 1; enemyIndex >= 0; enemyIndex -= 1) {
        const enemy = enemiesRef.current[enemyIndex];
        const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
        enemy.x += Math.cos(angle) * enemy.speed;
        enemy.y += Math.sin(angle) * enemy.speed;

        let dead = false;
        for (let bulletIndex = bulletsRef.current.length - 1; bulletIndex >= 0; bulletIndex -= 1) {
          const bullet = bulletsRef.current[bulletIndex];
          if (Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < enemy.size + 6) {
            enemy.hp -= 1;
            bulletsRef.current.splice(bulletIndex, 1);
            if (enemy.hp > 0) {
              addFloatingText("-1", enemy.x, enemy.y - 15, "#ff4d6d");
            }
            if (enemy.hp <= 0) {
              dead = true;
              addFloatingText("CLEARED!", enemy.x, enemy.y, "#00d48f");
              let scoreAdd = levelRef.current * 5;
              if (enemy.type === "medium") scoreAdd += 5;
              if (enemy.type === "large") scoreAdd += 10;
              scoreRef.current += scoreAdd;
              bugsResolvedRef.current += 1;
            }
            break;
          }
        }

        if (dead) {
          enemiesRef.current.splice(enemyIndex, 1);
          continue;
        }

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (player.shieldActive && dist < 60) {
          let damage = 10;
          if (enemy.type === "medium") damage = 20;
          if (enemy.type === "large") damage = 30;
          player.shieldHealth -= damage;
          if (player.shieldHealth <= 0) player.shieldActive = false;
          enemiesRef.current.splice(enemyIndex, 1);
        } else if (dist < player.size) {
          let dmg = 25;
          if (hitsTakenRef.current < damageSequence.length) {
            dmg = damageSequence[hitsTakenRef.current];
          }
          hitsTakenRef.current += 1;
          integrityRef.current = Math.max(0, integrityRef.current - dmg);
          enemiesRef.current.splice(enemyIndex, 1);
          if (integrityRef.current <= 0) {
            handleGameOver();
            return;
          }
        }
      }

      for (let i = floatingTextsRef.current.length - 1; i >= 0; i -= 1) {
        const floating = floatingTextsRef.current[i];
        floating.y -= 0.5;
        floating.alpha -= 0.02;
        if (floating.alpha <= 0) floatingTextsRef.current.splice(i, 1);
      }

      radarPulseRef.current = (radarPulseRef.current + 2) % 280;

      ctx.fillStyle = "rgba(4, 10, 19, 0.28)";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(37,99,235,0.08)";
      for (let i = 0; i < width; i += 80) ctx.strokeRect(i, 0, 1, height);
      for (let i = 0; i < height; i += 80) ctx.strokeRect(0, i, width, 1);

      ctx.strokeStyle = "rgba(6,182,212,0.2)";
      ctx.beginPath();
      ctx.arc(player.x, player.y, radarPulseRef.current, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(6,182,212,0.2)";
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.moveTo(player.x, player.y);
      ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
      ctx.stroke();
      ctx.setLineDash([]);

      if (player.shieldActive) {
        ctx.strokeStyle = "#7c3aed";
        ctx.lineWidth = 2;
        ctx.beginPath();
        const shieldPct = Math.max(0, player.shieldHealth / player.maxShieldHealth);
        ctx.arc(player.x, player.y, 60, 0, Math.PI * 2 * shieldPct);
        ctx.stroke();
        ctx.lineWidth = 1;
      }

      ctx.fillStyle = "#06b6d4";
      ctx.shadowBlur = 24;
      ctx.shadowColor = "#06b6d4";
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      for (const enemy of enemiesRef.current) {
        ctx.fillStyle = "#f43f5e";
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#e2e8f0";
        ctx.font = "700 10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(enemy.label, enemy.x, enemy.y - enemy.size - 10);
        ctx.font = "600 9px sans-serif";
        ctx.fillStyle = "#fda4af";
        ctx.fillText(`${Math.ceil(enemy.hp)} HP`, enemy.x, enemy.y + enemy.size + 10);
      }

      ctx.fillStyle = "#f8fafc";
      for (const bullet of bulletsRef.current) {
        ctx.fillRect(bullet.x, bullet.y, 3, 3);
      }

      for (const floating of floatingTextsRef.current) {
        ctx.globalAlpha = Math.max(0, floating.alpha);
        ctx.fillStyle = floating.color;
        ctx.textAlign = "center";
        ctx.font = "700 12px sans-serif";
        ctx.fillText(floating.text, floating.x, floating.y);
      }
      ctx.globalAlpha = 1;

      setHud((prev) => {
        const rank = ranks[levelRef.current - 1];
        if (
          prev.rank === rank &&
          prev.integrity === integrityRef.current &&
          prev.score === scoreRef.current &&
          prev.bugsResolved === bugsResolvedRef.current
        ) {
          return prev;
        }
        return {
          ...prev,
          level: levelRef.current,
          rank,
          integrity: integrityRef.current,
          score: scoreRef.current,
          bugsResolved: bugsResolvedRef.current,
        };
      });
      publishStats({
        rank: ranks[levelRef.current - 1],
        integrity: integrityRef.current,
        score: scoreRef.current,
        bugsResolved: bugsResolvedRef.current,
        level: levelRef.current,
        status: "running",
      });

      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      stopLoop();
    };
  }, [addFloatingText, handleGameOver, hud.gameOver, hud.gameStarted, isOpen, publishStats, stopLoop]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      keysRef.current[event.key] = true;
      if (event.key === " " && !hud.gameStarted && !hud.gameOver) {
        event.preventDefault();
        startGame();
      } else if (event.key === " " && hud.gameStarted && !hud.gameOver) {
        event.preventDefault();
        const now = performance.now();
        // Keyboard fire support with a short cooldown for stable control.
        if (now - lastSpaceShotRef.current > 150) {
          fireAt(mouseRef.current.x, mouseRef.current.y);
          lastSpaceShotRef.current = now;
        }
      }
      if (event.key === "Escape") {
        onClose();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      keysRef.current[event.key] = false;
    };
    const onMouseMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onMouseDown = (event: MouseEvent) => {
      if (!hud.gameStarted || hud.gameOver) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      fireAt(x, y);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [fireAt, hud.gameOver, hud.gameStarted, isOpen, onClose, startGame]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const locateTouch = (touch: Touch) => {
      const rect = canvas.getBoundingClientRect();
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top, width: rect.width };
    };

    const onTouchStart = (event: TouchEvent) => {
      const primary = event.changedTouches[0];
      if (!primary) return;
      const point = locateTouch(primary);

      if (!hud.gameStarted && !hud.gameOver) {
        startGame();
      }

      if (point.x <= point.width / 2 && !touchMoveRef.current.active) {
        touchMoveRef.current = {
          active: true,
          identifier: primary.identifier,
          startX: point.x,
          startY: point.y,
          dx: 0,
          dy: 0,
        };
      } else if (hud.gameStarted && !hud.gameOver) {
        fireAt(point.x, point.y);
      }
      event.preventDefault();
    };

    const onTouchMove = (event: TouchEvent) => {
      for (const touch of Array.from(event.touches)) {
        if (touch.identifier === touchMoveRef.current.identifier && touchMoveRef.current.active) {
          const point = locateTouch(touch);
          touchMoveRef.current.dx = point.x - touchMoveRef.current.startX;
          touchMoveRef.current.dy = point.y - touchMoveRef.current.startY;
        }
      }
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      for (const touch of Array.from(event.changedTouches)) {
        if (touch.identifier === touchMoveRef.current.identifier) {
          touchMoveRef.current = { active: false, identifier: -1, startX: 0, startY: 0, dx: 0, dy: 0 };
        }
      }
      event.preventDefault();
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });
    canvas.addEventListener("touchcancel", onTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [fireAt, hud.gameOver, hud.gameStarted, isOpen, startGame]);

  const helpText = useMemo(
    () => [
      "Objective: protect System Integrity and clear incoming bugs.",
      "Rank Up milestones: 2, 10, 20, 30, 40 bugs resolved.",
      "Shield unlocks at level 2 and upgrades at level 3.",
    ],
    [],
  );

  const nextMilestone = useMemo(() => {
    const milestones = [2, 10, 20, 30, 40];
    return milestones.find((milestone) => hud.bugsResolved < milestone) ?? null;
  }, [hud.bugsResolved]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[50] bg-surface-dark/90 backdrop-blur-sm p-3 pt-20 md:p-6 md:pt-24">
      <div className="mx-auto flex h-full w-full max-w-7xl gap-4 rounded-xl border border-text-muted/20 bg-[#050b16] p-3 md:p-4">
        <div className="relative flex-1 overflow-hidden rounded-lg border border-accent-primary/30 bg-[#020712]">
          <canvas ref={canvasRef} className="h-full w-full touch-none" />

          <div className="pointer-events-none absolute left-0 top-0 flex w-full justify-between p-3 md:p-4">
            <div className="rounded border border-accent-energy/30 bg-background-main/90 px-3 py-2">
              <p className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">Architecture Rank</p>
              <p className="text-sm font-black text-text-primary md:text-lg">{hud.rank}</p>
            </div>
            <div className="rounded border border-accent-warning/30 bg-background-main/90 px-3 py-2 text-right">
              <p className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">System Integrity</p>
              <p className="text-sm font-black text-rose-600 md:text-lg">{hud.integrity}%</p>
            </div>
          </div>

          {hud.showLevelUp ? (
            <div className="pointer-events-none absolute left-1/2 top-[24%] -translate-x-1/2 rounded border border-accent-success/40 bg-surface-card/90 px-6 py-3 text-center">
              <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary">Promoted To</p>
              <p className="text-base font-black uppercase tracking-wide text-accent-success md:text-2xl">{hud.levelUpText}</p>
            </div>
          ) : null}

          {!hud.gameStarted && !hud.gameOver ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#020712]/90">
              <div className="w-full max-w-xl space-y-4 px-6 text-center">
                <h3 className="text-xl font-black uppercase tracking-wide text-accent-energy md:text-3xl">The Full-Stack Evolution</h3>
                <p className="text-sm text-text-secondary">Defend your system integrity by clearing incoming bugs and leveling up your architecture rank.</p>
                <div className="grid gap-3 rounded border border-text-muted/20 bg-surface-card/90 p-4 text-left text-xs text-text-secondary md:grid-cols-2">
                  <div>
                    <p className="mb-1 flex items-center gap-2 font-mono uppercase text-text-primary"><Monitor size={14} /> Desktop</p>
                    <p>Move: Arrow Keys</p>
                    <p>Shoot: Mouse Click</p>
                    <p>Start: Spacebar</p>
                  </div>
                  <div>
                    <p className="mb-1 flex items-center gap-2 font-mono uppercase text-text-primary"><Smartphone size={14} /> Mobile</p>
                    <p>Move: Swipe on left side</p>
                    <p>Shoot: Tap on right side</p>
                    <p>Start: Tap Start Mission</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                  <button
                    type="button"
                    onClick={startGame}
                    className="inline-flex items-center justify-center gap-2 border border-accent-energy bg-accent-energy px-4 py-2 text-xs font-bold uppercase tracking-wider text-surface-dark transition hover:bg-cyan-400"
                  >
                    <Play size={14} /> Start Mission
                  </button>
                  <p className="self-center text-[11px] uppercase tracking-widest text-text-muted">or press spacebar</p>
                </div>
              </div>
            </div>
          ) : null}

          {hud.gameOver ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#030814]/95 px-4">
              <div className="w-full max-w-md rounded border border-accent-primary/40 bg-surface-card p-6">
                <h3 className="text-center font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">Post-Project Summary</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded border border-text-muted/20 bg-background-secondary p-3">
                    <p className="font-mono uppercase text-text-muted">Total ROI</p>
                    <p className="mt-1 text-lg font-black text-text-primary">{hud.score}</p>
                  </div>
                  <div className="rounded border border-text-muted/20 bg-background-secondary p-3">
                    <p className="font-mono uppercase text-text-muted">Max Rank</p>
                    <p className="mt-1 text-sm font-black text-text-primary">{hud.maxRank}</p>
                  </div>
                  <div className="rounded border border-text-muted/20 bg-background-secondary p-3">
                    <p className="font-mono uppercase text-text-muted">Bugs Resolved</p>
                    <p className="mt-1 text-lg font-black text-text-primary">{hud.bugsResolved}</p>
                  </div>
                  <div className="rounded border border-text-muted/20 bg-background-secondary p-3">
                    <p className="font-mono uppercase text-text-muted">Security Level</p>
                    <p className="mt-1 text-sm font-black text-accent-success">{hud.securityLevel}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetGame}
                  className="mt-4 w-full border border-accent-primary bg-accent-primary px-3 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-blue-700"
                >
                  Initiate Reboot
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="hidden w-[280px] shrink-0 rounded-lg border border-text-muted/20 bg-surface-card p-4 md:flex md:flex-col">
          <div className="mb-4 flex items-center justify-between border-b border-text-muted/20 pb-3">
            <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">Game Instructions</p>
            <Gamepad2 size={16} className="text-accent-energy" />
          </div>
          <div className="space-y-2 text-xs text-text-secondary">
            <p className="font-mono text-[11px] uppercase text-text-primary">Desktop</p>
            <p>Arrow keys to move, click or Spacebar to shoot, Spacebar to start.</p>
            <p className="font-mono text-[11px] uppercase text-text-primary">Mobile</p>
            <p>Swipe left side to move, tap right side to shoot, tap Start Mission.</p>
            {helpText.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded border border-text-muted/20 bg-background-secondary p-2">
              <p className="font-mono uppercase text-text-muted">Current Level</p>
              <p className="font-bold text-text-primary">{hud.level}</p>
            </div>
            <div className="rounded border border-text-muted/20 bg-background-secondary p-2">
              <p className="font-mono uppercase text-text-muted">Next Upgrade</p>
              <p className="font-bold text-text-primary">
                {nextMilestone ? `${nextMilestone - hud.bugsResolved} bugs` : "Maxed"}
              </p>
            </div>
            <div className="rounded border border-text-muted/20 bg-background-secondary p-2">
              <p className="font-mono uppercase text-text-muted">Bugs Cleared</p>
              <p className="font-bold text-text-primary">{hud.bugsResolved}</p>
            </div>
            <div className="rounded border border-text-muted/20 bg-background-secondary p-2">
              <p className="font-mono uppercase text-text-muted">Live Rank</p>
              <p className="font-bold text-text-primary">{hud.rank}</p>
            </div>
          </div>
          <div className="mt-auto rounded border border-accent-primary/30 bg-accent-primary/5 p-3 text-[11px] text-text-secondary">
            Tip: Direct click/tap on a bug deals bonus damage.
          </div>
        </aside>

        <button
          type="button"
          onClick={() => setShowHelp((prev) => !prev)}
          className="absolute bottom-6 right-20 rounded border border-accent-energy/30 bg-surface-card px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-accent-energy md:hidden"
        >
          {showHelp ? "Hide Help" : "Show Help"}
        </button>
        {showHelp ? (
          <div className="absolute bottom-20 right-3 z-10 w-[88vw] rounded border border-text-muted/20 bg-surface-card p-4 text-xs text-text-secondary md:hidden">
            <p className="mb-2 font-mono text-[11px] uppercase text-text-primary">{hud.touchMode ? "Mobile Controls" : "Controls"}</p>
            <p>Move: Swipe left side / Arrow keys</p>
            <p>Shoot: Tap right side / Mouse click</p>
            <p>Start: Start Mission / Spacebar</p>
            <p className="mt-2">Goal: protect integrity, clear bugs, and climb ranks.</p>
          </div>
        ) : null}

        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded border border-text-muted/20 bg-surface-card text-text-primary transition hover:border-accent-primary hover:text-accent-primary"
          aria-label="Close game"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
