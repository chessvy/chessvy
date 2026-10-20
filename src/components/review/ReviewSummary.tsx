import type { GameReview } from "@/lib/chess/review";
import { CLASS_LABEL } from "@/lib/chess/classify";
import { CLASS_ICON } from "@/lib/chess/icons";

export function ReviewSummary({ review }: { review: GameReview }) {
  return <div className="review-summary">
    <div className="accuracy-summary grid grid-cols-2 gap-3">
      {(["white", "black"] as const).map(side => <div key={side} className={`accuracy-score ${side}`}>
        <span className="text-xs font-semibold">{side === "white" ? "White" : "Black"}</span>
        <strong className="block font-display text-3xl">{review.accuracy[side]?.toFixed(1) ?? "—"}</strong>
        <span className="text-xs">Accuracy</span>
      </div>)}
    </div>
    <div className="classification-summary mt-4">
      {Object.entries(CLASS_LABEL).map(([key, label]) => {
        const white = review.moves.filter(m => m.ply % 2 === 1 && m.classification === key).length;
        const black = review.moves.filter(m => m.ply % 2 === 0 && m.classification === key).length;
        if (!white && !black) return null;
        return <div key={key} className="grid grid-cols-[2rem_1fr_2rem] items-center gap-2 py-1.5 text-sm">
          <span className="text-center font-semibold tabular-nums">{white}</span>
          <span className="flex items-center justify-center gap-2"><img src={CLASS_ICON[key as keyof typeof CLASS_ICON]} alt="" className="h-5 w-5" />{label}</span>
          <span className="text-center font-semibold tabular-nums">{black}</span>
        </div>;
      })}
    </div>
  </div>;
}