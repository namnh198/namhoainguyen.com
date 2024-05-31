export default function BG({ grassMorphism = false }: { grassMorphism?: boolean }) {
  return grassMorphism ? (
    <div className='absolute inset-x-0 md:top-10 xl:top-20 min-h-0 pl-20 py-24 flex overflow-hidden z-0'>
      <span className='block bg-[#ef233c] size-72 rounded-full mix-blend-multiply blur-3xl opacity-10 lg:w-96 lg:h-96'></span>
      <span className='block bg-[#04868b] size-72 -ml-20 mt-40 rounded-full mix-blend-multiply blur-3xl opacity-10 lg:w-96 lg:h-96'></span>
      <span className='sr-only hidden'>bg</span>
    </div>
  ) : (
    <div className='absolute z-0 -translate-x-1/2 2xl:max-w-screen-2xl bg-neutral-100 dark:bg-black dark:opacity-10 inset-y-0 left-1/2 w-screen xl:max-w-[1340px] xl:rounded-3xl'>
      <span className='sr-only hidden'>bg</span>
    </div>
  )
}
