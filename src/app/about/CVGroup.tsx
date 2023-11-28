import { CVGroupType } from '@/data/cv'

export default function CVGroup({ cv }: { cv: CVGroupType }) {
  return (
    <div className="bg-white dark:bg-black/20 dark:border-neutral-800 p-6 rounded-xl">
      <h3 className="font-semibold text-2xl dark:text-neutral-200 leading-none text-neutral-900">
        {cv.name}
      </h3>
      <div className="flex flex-col dark:divide-neutral-700 divide-neutral-200 divide-y mt-6">
        {cv.lists.map(item => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center p-4 xl:p-5 gap-y-4 sm:gap-y-0"
          >
            <div className="flex flex-col items-center pe-4 space-y-3 w-full sm:w-1/4">
              <div className="text-center">
                <a
                  href={item.url}
                  target="_blank"
                  className="hover:text-indigo-800 dark:hover:text-indigo-400 font-medium line-clamp-1 sm:text-lg text-lg"
                >
                  {item.company}
                </a>
                <span className="text-xs dark:text-neutral-400 text-neutral-500">{item.date}</span>
              </div>
            </div>
            <div className="w-full sm:w-3/4 text-center sm:text-left">
              <h4 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 sm:font-semibold sm:text-base">
                {item.job}
              </h4>
              {item.activity?.map((activity, index) => (
                <p
                  key={index}
                  className="block dark:text-neutral-400 text-neutral-500 text-sm mt-3.5"
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
