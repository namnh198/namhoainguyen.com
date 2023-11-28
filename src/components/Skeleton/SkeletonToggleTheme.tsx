export default function SkeletonToggleTheme({ className }: { className?: string }) {
  return (
    <button className={className}>
      <span className="sr-only">Enable Dark Mode</span>
      <span className="block w-6 h-6 rounded-full animate-pulse bg-neutral-100 dark:bg-neutral-800"></span>
    </button>
  )
}
