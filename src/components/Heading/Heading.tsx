export default function Heading({ title }: { title: string }) {
  return (
    <div className="flex flex-col relative dark:text-neutral-50 justify-between mb-10 md:mb-12 sm:flex-row sm:items-end text-neutral-900">
      <h2 className="text-3xl md:text-4xl font-semibold leading-9 md:leading-10">{title}</h2>
    </div>
  )
}
