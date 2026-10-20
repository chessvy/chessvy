import { useRef, useState } from "react";
import { FileText, Search, Upload, Play, LoaderCircle, ArrowDownToLine, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ASSET } from "@/lib/asset-paths";
import { fetchChessComGames, fetchLichessGames, type RemoteGame } from "@/lib/chess/importers";
import { PlayerAvatar, type Platform } from "./PlayerAvatar";

export type ImportTab = "pgn" | Platform | "new";
type Tab = ImportTab;
export function GameImporter({ pgn, setPgn, onLoad, sample, onNewGame, initialTab = "pgn" }: {
  pgn: string; setPgn: (s: string) => void; onLoad: (pgn: string, platform?: Platform) => void; sample: string; onNewGame: () => void; initialTab?: Tab;
}) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [user, setUser] = useState("");
  const [games, setGames] = useState<RemoteGame[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const request = useRef(0);
  const file = useRef<HTMLInputElement>(null);
  const search = async () => {
    const id = ++request.current;
    setLoading(true); setErr(null); setGames(null);
    try {
      const results = tab === "lichess" ? await fetchLichessGames(user) : await fetchChessComGames(user);
      if (id === request.current) setGames(results);
    } catch (e) { if (id === request.current) setErr((e as Error).message); }
    finally { if (id === request.current) setLoading(false); }
  };
  return <section className="game-importer">
    <div className="source-tabs mt-3 grid grid-cols-4 gap-2" role="tablist" aria-label="Game source">
      {([['pgn', 'PGN'], ['chesscom', 'Chess.com'], ['lichess', 'Lichess'], ['new', 'New game']] as const).map(([key, label]) =>
        <Button key={key} role="tab" aria-selected={tab === key} variant="tile" className="source-tile h-auto min-w-0 flex-col gap-1.5 px-1 py-3 text-[11px] sm:text-xs"
          onClick={() => { ++request.current; setTab(key); setGames(null); setErr(null); setLoading(false); }}>
          {key === "pgn" ? <><FileText /><span className="truncate">{label}</span></> : key === "new" ? <><Swords /><span className="truncate">{label}</span></> : <img src={ASSET.platforms.wordmarks[key]} alt={label} className="h-5 w-full max-w-[96px] object-contain" />}
        </Button>)}
    </div>
    {tab === "new" ? <div className="mt-5 text-sm"><p className="text-muted-foreground">Start from the opening position and play moves on the board yourself, then run a review.</p><Button size="lg" className="mt-4 w-full" onClick={onNewGame}><Swords />Start new game</Button></div> : tab === "pgn" ? <>
      <label className="mt-5 block text-xs font-semibold text-muted-foreground" htmlFor="game-pgn">Game notation</label>
      <textarea id="game-pgn" aria-label="PGN game" value={pgn} onChange={e => setPgn(e.target.value)} placeholder={'[White "Player 1"]\n[Black "Player 2"]\n\n1. e4 e5 2. Nf3 Nc6…'}
        className="mt-2 h-36 w-full resize-y rounded-md border border-input bg-background p-3 font-mono text-xs placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring" />
      <div className="mt-3 flex items-center gap-2">
        <Button className="flex-1" onClick={() => onLoad(pgn)} disabled={!pgn.trim()}><ArrowDownToLine />Import game</Button>
        <Button size="icon" variant="secondary" title="Upload PGN file" aria-label="Upload PGN file" onClick={() => file.current?.click()}><Upload /></Button>

        <input ref={file} type="file" accept=".pgn,text/plain" className="hidden" onChange={async e => {
          const f = e.target.files?.[0]; if (!f) return;
          try { const text = await f.text(); setPgn(text); onLoad(text); } catch { setErr("This file couldn't be read."); }
          e.target.value = "";
        }} />
      </div>
    </> : <>
      <form className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2" onSubmit={e => { e.preventDefault(); void search(); }}>
        <input aria-label={tab === "lichess" ? "Lichess username" : "Chess.com username"} value={user} onChange={e => setUser(e.target.value)} placeholder={tab === "lichess" ? "Lichess username" : "Chess.com username"}
          className="min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        <Button type="submit" size="icon" aria-label="Find games" title="Find games" disabled={!user.trim() || loading}>{loading ? <LoaderCircle className="animate-spin" /> : <Search />}</Button>
      </form>
      {games && <>
        <p className="mt-3 text-xs text-foreground/50">{games.length ? `${games.length} recent games` : "No public games found."}</p>
        <ul className="mt-2 max-h-64 divide-y divide-border overflow-y-auto">{games.map(g => <li key={g.id}>
          <Button variant="ghost" onClick={() => { setPgn(g.pgn); onLoad(g.pgn, tab); }} className="h-auto w-full justify-start gap-3 whitespace-normal px-1 py-3 text-left">
            <PlayerAvatar name={g.white} platform={tab} />
            <span className="min-w-0 flex-1"><span className="block truncate font-medium">{g.white} <span className="text-foreground/40">vs</span> {g.black}</span><span className="block text-xs text-foreground/50">{g.date}</span></span>
            <span className="shrink-0 text-xs text-foreground/70">{g.result}</span>
          </Button></li>)}</ul>
      </>}
    </>}
    <div className="sample-game mt-6 border-t border-border pt-4"><Button variant="ghost" className="w-full justify-between text-muted-foreground" aria-label="Try sample game" onClick={() => { setPgn(sample); onLoad(sample); }}><span className="text-left"><span className="block text-sm font-semibold text-foreground">The Opera Game</span><span className="block text-xs font-normal">Paul Morphy · 1858</span></span><Play /></Button></div>
    {err && <p role="alert" className="mt-3 text-sm text-destructive">{err}</p>}
  </section>;
}
