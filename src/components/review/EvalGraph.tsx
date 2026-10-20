import { useState } from "react";
import { formatEvaluation } from "@/lib/chess/playback";
import { winChance, type Classification } from "@/lib/chess/classify";

const MARKED: Classification[] = ["genius", "great", "mistake", "miss", "blunder"];

export function EvalGraph({ evals, total, ply, onPick, marks }: { evals: number[]; total: number; ply: number; onPick: (ply: number) => void; marks?: Classification[] | undefined }) {
  const [hover, setHover] = useState<number | null>(null);
  const width = 800, height = 140;
  const points = evals.map((cp, i) => ({ x: i / Math.max(1, total - 1) * width, y: (100 - winChance(cp)) / 100 * height }));
  const line = points.map((point, i) => `${i ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const last = points.at(-1);
  const selected = hover ?? ply;
  const point = points[selected];
  const pick = (n: number) => onPick(Math.max(0, Math.min(evals.length - 1, n)));
  const atPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return Math.max(0, Math.min(evals.length - 1, Math.round((event.clientX - rect.left) / rect.width * (total - 1))));
  };
  return <section className="evaluation-chart" aria-label="Position evaluation">
    <div className="mb-2 flex items-center justify-between gap-2"><h2 className="text-sm font-semibold">Evaluation</h2><span className="text-xs text-muted-foreground"><span className="mr-2">{selected === 0 ? "Start" : `Move ${Math.ceil(selected / 2)}${selected % 2 ? " · White" : " · Black"}`}</span><strong className="eval-chip tabular-nums">{formatEvaluation(evals[selected] ?? null)}</strong></span></div>
    <div className="eval-plot-wrap relative">
      <svg role="slider" tabIndex={evals.length ? 0 : -1} aria-label="Evaluation graph" aria-valuemin={0} aria-valuemax={Math.max(0, evals.length - 1)} aria-valuenow={Math.min(ply, Math.max(0, evals.length - 1))} aria-valuetext={formatEvaluation(evals[ply] ?? null)} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="eval-plot block w-full cursor-crosshair touch-pan-y bg-eval-black" onPointerMove={event => setHover(atPointer(event))} onPointerLeave={() => setHover(null)} onPointerDown={event => { if (evals.length) pick(atPointer(event)); }} onKeyDown={event => { if (!evals.length) return; if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) { event.preventDefault(); event.stopPropagation(); pick(event.key === "Home" ? 0 : event.key === "End" ? evals.length - 1 : ply + (event.key === "ArrowRight" ? 1 : -1)); } }}>
        {last && <path d={`${line} L${last.x},${height} L0,${height} Z`} className="fill-eval-white" />}
        <line x1={0} x2={width} y1={height / 2} y2={height / 2} className="stroke-chart-grid" vectorEffect="non-scaling-stroke" />
        {point && <line x1={point.x} x2={point.x} y1={0} y2={height} className="stroke-chart-cursor" strokeWidth={2} vectorEffect="non-scaling-stroke" />}
      </svg>
      {/* Dots are HTML so they stay round while the plot stretches. */}
      {marks?.map((cls, i) => { const p = points[i + 1]; return p && MARKED.includes(cls) ? <button key={i} type="button" aria-label={`Move ${Math.ceil((i + 1) / 2)} ${cls}`} onClick={() => pick(i + 1)} className="eval-mark" style={{ left: `${p.x / width * 100}%`, top: `${p.y / height * 100}%`, background: `var(--dot-${cls})` }} /> : null; })}
      {point && <span className="eval-cursor-dot" style={{ left: `${point.x / width * 100}%`, top: `${point.y / height * 100}%` }} />}
    </div>
    <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground"><span>Start</span><span>{Math.ceil((total - 1) / 2)} moves</span></div>
  </section>;
}
