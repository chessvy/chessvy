import type { Classification } from "./classify";
import { ASSET } from "@/lib/asset-paths";

const I = ASSET.icons;

export const CLASS_ICON: Record<Classification, string> = {
  book: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#a68a62"/><path d="M24 15c-5-4-11-4-15-2v22c5-2 10-1 15 2 5-3 10-4 15-2V13c-4-2-10-2-15 2Z" fill="white"/><path d="M24 15v22" stroke="#a68a62" stroke-width="2"/></svg>')}`,
  genius: I.genius,
  great: I.great,
  best: I.best,
  excellent: I.excellent,
  good: I.good,
  inaccuracy: I.inaccuracy,
  mistake: I.mistake,
  miss: I.miss,
  blunder: I.blunder,
};

export const RESULT_ICON = { win: I.win, draw: I.draw, defeat: I.defeat };
