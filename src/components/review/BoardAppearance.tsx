import { defaultPieces, type PieceRenderObject } from "react-chessboard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BOARD_THEMES, PIECE_SETS, type BoardTheme, type PieceSet } from "@/lib/chess/appearance";
import { Check } from "lucide-react";

const names = { jade: "Jade", stone: "Stone", ocean: "Ocean", rose: "Rose", classic: "Classic", merida: "Merida", alpha: "Alpha" };
const pieces = (set: Exclude<PieceSet, "classic">): PieceRenderObject => Object.fromEntries(
  ["w", "b"].flatMap(color => ["K", "Q", "R", "B", "N", "P"].map(piece => [color + piece,
    () => <img src={`/pieces/${set}/${color}${piece}.svg`} alt="" draggable={false} className="h-full w-full select-none" />]))
);
export const PIECE_RENDERERS = { classic: defaultPieces, merida: pieces("merida"), alpha: pieces("alpha") };

export function BoardAppearance({ open, onOpenChange, board, pieceSet, onBoard, onPieces }: {
  open: boolean; onOpenChange: (open: boolean) => void; board: BoardTheme; pieceSet: PieceSet;
  onBoard: (board: BoardTheme) => void; onPieces: (pieces: PieceSet) => void;
}) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent aria-describedby={undefined} className="appearance-dialog">
    <DialogTitle>Board & pieces</DialogTitle>
    <fieldset className="mt-2"><legend className="mb-3 text-sm font-semibold">Board color</legend>
      <div className="grid grid-cols-4 gap-3">{BOARD_THEMES.map(theme => <Button key={theme} variant="ghost" aria-label={`${names[theme]} board`} aria-pressed={board === theme} onClick={() => onBoard(theme)} className="appearance-choice h-auto flex-col gap-2 p-1">
        <span data-board-theme={theme} className="board-swatch relative grid aspect-square w-full grid-cols-2 overflow-hidden rounded-md">{[0, 1, 2, 3].map(i => <span key={i} className={i === 0 || i === 3 ? "swatch-light" : "swatch-dark"} />)}{board === theme && <span className="swatch-check absolute bottom-1 right-1 rounded-full bg-primary p-1 text-primary-foreground"><Check className="size-3" /></span>}</span><span className="text-xs">{names[theme]}</span>
      </Button>)}</div>
    </fieldset>
    <fieldset className="mt-4"><legend className="mb-3 text-sm font-semibold">Piece style</legend><div className="grid grid-cols-3 gap-3">{PIECE_SETS.map(set => <Button key={set} variant="outline" aria-label={`${names[set]} pieces`} aria-pressed={pieceSet === set} onClick={() => onPieces(set)} className="appearance-choice h-auto flex-col gap-2 py-3"><span className="piece-preview flex h-14 w-full justify-center">{PIECE_RENDERERS[set].wN?.()}{PIECE_RENDERERS[set].bN?.()}</span><span className="text-xs">{names[set]}</span></Button>)}</div></fieldset>
    <Button className="mt-4" onClick={() => onOpenChange(false)}>Done</Button>
  </DialogContent></Dialog>;
}