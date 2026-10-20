import { createFileRoute } from "@tanstack/react-router";
import { ReviewWorkspace } from "@/components/review/ReviewWorkspace";
import { ASSET } from "@/lib/asset-paths";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chessvy — Game Review & Analysis" },
      { name: "description", content: "Import a PGN and review every move with Stockfish analysis, accuracy and move classifications." },
      { property: "og:title", content: "Chessvy — Game Review & Analysis" },
      { property: "og:description", content: "Review your chess games move by move with real engine analysis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="review-app min-h-screen">
      <header className="app-header border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <span className="relative flex h-10 w-9 shrink-0 items-center justify-center overflow-hidden"><img src={ASSET.logo} alt="" className="h-16 w-16 max-w-none shrink-0 object-contain" /></span>
          <span className="font-display text-2xl font-bold">Chessvy</span>
          <span className="header-label ml-auto text-xs font-medium text-muted-foreground">Game review & analysis</span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-6">
        <ReviewWorkspace />
      </main>
    </div>
  );
}
