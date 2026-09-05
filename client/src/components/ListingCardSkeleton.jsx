export default function ListingCardSkeleton() {
  return (
    <div className="surface-card w-full overflow-clip" aria-hidden="true">
      <div className="aspect-video animate-pulse bg-line" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-5 w-3/4 animate-pulse rounded-lg bg-line" />
        <div className="h-4 w-1/2 animate-pulse rounded-lg bg-line" />
        <div className="h-4 w-full animate-pulse rounded-lg bg-line" />
        <div className="mt-2 h-5 w-24 animate-pulse rounded-lg bg-line" />
      </div>
    </div>
  )
}
