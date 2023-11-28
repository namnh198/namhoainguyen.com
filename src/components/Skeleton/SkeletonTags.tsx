export default function SkeletonTags({ className = '' }) {
  return (
    <>
      <div className="h-40 w-full animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800"></div>
      <div className={className}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800"
          />
        ))}
      </div>
    </>
  )
}
