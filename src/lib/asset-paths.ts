// Static files live in /public so every host (Lovable, Cloudflare Pages) serves them from the same origin.
export const ASSET = {
  engine: { script: "/engine/stockfish-18.js", wasm: "/engine/stockfish-18.wasm" },
  icons: {
    genius: "/icons/genius-brain.png",
    great: "/icons/great-sparkle.png",
    best: "/icons/best-crown.png",
    excellent: "/icons/excellent-star.png",
    good: "/icons/good-checkmark.png",
    inaccuracy: "/icons/inaccuracy-question-exclamation.png",
    mistake: "/icons/mistake-question.png",
    miss: "/icons/miss-cross.png",
    blunder: "/icons/blunder-double-question.png",
    win: "/icons/win-crown.png",
    draw: "/icons/draw-equals.png",
    defeat: "/icons/defeat-fallen-king.png",
  },
  sounds: { move: "/sounds/move.mp3", capture: "/sounds/capture.mp3" },
  platforms: { lichess: "/platforms/lichess.svg", chesscom: "/platforms/chesscom.png" },
  logo: "/brand/chessvy-logo.png",
} as const;
