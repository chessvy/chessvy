export const BOARD_THEMES = ["stone", "walnut", "emerald", "marble"] as const;
export const PIECE_SETS = ["classic", "merida", "alpha"] as const;
export type BoardTheme = typeof BOARD_THEMES[number];
export type PieceSet = typeof PIECE_SETS[number];

export function readAppearance(value: unknown): { board: BoardTheme; pieces: PieceSet } {
  const settings = value && typeof value === "object" ? value as Record<string, unknown> : {};
  return {
    board: BOARD_THEMES.find(theme => theme === settings["board"]) ?? "stone",
    pieces: PIECE_SETS.find(set => set === settings["pieces"]) ?? "classic",
  };
}