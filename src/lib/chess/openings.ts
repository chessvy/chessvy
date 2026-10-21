import { Chess, type Move } from "chess.js";

// Conservative curated book: only exact legal positions from these main lines.
const LINES = [
  "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7",
  "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4",
  "e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6",
  "e4 e5 Nf3 d6 d4 Bg4 dxe5 Bxf3 Qxf3 dxe5",
  "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6",
  "e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 g6",
  "e4 e6 d4 d5 Nc3 Nf6 Bg5 Be7",
  "e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5",
  "d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7",
  "d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4",
  "d4 Nf6 c4 e6 Nc3 Bb4",
  "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6",
  "c4 e5 Nc3 Nf6 Nf3 Nc6",
  "Nf3 d5 g3 Nf6 Bg2 e6 O-O Be7",
];
const positionKey = (fen: string) => fen.split(" ").slice(0, 4).join(" ");
const book = new Set<string>();
for (const line of LINES) {
  const game = new Chess();
  for (const san of line.split(" ")) {
    const move = game.move(san);
    book.add(`${positionKey(move.before)}|${move.from}${move.to}${move.promotion ?? ""}`);
  }
}
export function isBookMove(move: Move): boolean {
  return book.has(`${positionKey(move.before)}|${move.from}${move.to}${move.promotion ?? ""}`);
}
const NAMED: [string, string][] = [
  ["e4 e5 Nf3 Nc6 Bb5", "Ruy Lopez"], ["e4 e5 Nf3 Nc6 Bc4 Bc5", "Italian Game: Giuoco Piano"], ["e4 e5 Nf3 Nc6 Bc4 Nf6", "Italian Game: Two Knights"],
  ["e4 e5 Nf3 Nc6 Bc4", "Italian Game"], ["e4 e5 Nf3 Nc6 d4", "Scotch Game"], ["e4 e5 Nf3 d6", "Philidor Defense"], ["e4 e5 Nf3 Nf6", "Petrov Defense"],
  ["e4 e5 f4", "King's Gambit"], ["e4 e5 Nf3", "King's Knight Opening"], ["e4 e5", "Open Game"], ["e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6", "Sicilian: Najdorf"],
  ["e4 c5", "Sicilian Defense"], ["e4 e6", "French Defense"], ["e4 c6", "Caro-Kann Defense"], ["e4 d5", "Scandinavian Defense"], ["e4 d6", "Pirc Defense"],
  ["e4 Nf6", "Alekhine Defense"], ["e4 g6", "Modern Defense"], ["e4", "King's Pawn Opening"], ["d4 d5 c4 e6", "Queen's Gambit Declined"],
  ["d4 d5 c4 dxc4", "Queen's Gambit Accepted"], ["d4 d5 c4 c6", "Slav Defense"], ["d4 d5 c4", "Queen's Gambit"], ["d4 d5 Bf4", "London System"],
  ["d4 Nf6 Bf4", "London System"], ["d4 Nf6 c4 e6 Nc3 Bb4", "Nimzo-Indian Defense"], ["d4 Nf6 c4 g6 Nc3 d5", "Grünfeld Defense"],
  ["d4 Nf6 c4 g6", "King's Indian Defense"], ["d4 Nf6 c4 e6", "Indian Game"], ["d4 Nf6", "Indian Defense"], ["d4 f5", "Dutch Defense"],
  ["d4 d5", "Queen's Pawn Game"], ["d4", "Queen's Pawn Opening"], ["c4", "English Opening"], ["Nf3", "Réti Opening"], ["f4", "Bird Opening"], ["g3", "King's Fianchetto"], ["b3", "Nimzo-Larsen Attack"],
];
/** Name of the most specific known opening matching the game's first moves. */
export function openingName(sans: string[]): string | null {
  for (const [line, name] of NAMED) { const l = line.split(" "); if (l.every((m, i) => sans[i] === m)) return name; }
  return null;
}
