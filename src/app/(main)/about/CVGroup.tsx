import { CVGroupType } from '@/data/cv'
import Image from 'next/image'

export default function CVGroup({ cv }: { cv: CVGroupType }) {
  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl">
      <h3 className="font-semibold text-2xl leading-none text-neutral-900 dark:text-neutral-100">
        {cv.name}
      </h3>
      <div className="flex flex-col divide-neutral-200 dark:divide-slate-700 divide-y mt-6">
        {cv.lists.map(item => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center p-4 xl:p-5 gap-y-4 sm:gap-y-0"
          >
            <div className="flex flex-col items-center pe-4 space-y-3 w-full sm:w-1/4">
              {item.logo && (
                <div className="h-auto w-20 p-1">
                  <Image src={item.logo} alt={item.company} width={80} height={80} />
                </div>
              )}
              <div className="text-center">
                <h4 className="relative font-semibold text-md">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      className="hover:text-indigo-800 dark:hover:text-indigo-400"
                    >
                      {item.company}
                    </a>
                  ) : (
                    <span>{item.company}</span>
                  )}
                </h4>
                <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {item.date}
                </span>
              </div>
            </div>
            <div className="w-full sm:w-3/4 text-center sm:text-left">
              <h4 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 sm:font-semibold sm:text-base">
                {item.job}
              </h4>
              {item.activity?.map((activity, index) => (
                <p
                  key={index}
                  className="block text-neutral-500 dark:text-neutral-400 text-sm mt-3.5"
                >
                  {activity}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
