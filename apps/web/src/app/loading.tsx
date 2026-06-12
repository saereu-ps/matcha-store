export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-matcha-accent/20 border-t-matcha-accent animate-spin" />
        <p className="text-matcha-fg-muted text-xs animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
