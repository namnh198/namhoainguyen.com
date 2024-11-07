export default function Search() {
  return (
    <>
      <button className="group relative inline-flex items-center justify-center lg:px-5 lg:py-3.5 lg:bg-blue text-lg text-text lg:text-background font-medium rounded-full overflow-hidden">
        <span className="absolute inset-0 top-0 left-0 block size-full opacity-20 bg-text transition-transform will-change-transform duration-500 scale-x-0 origin-[100%_100%] group-hover:scale-x-100 group-hover:origin-[0_0]"></span>
        <span className="relative inline-flex items-center text-[1rem] font-semibold leading-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="ml-2.5 hidden lg:block">Search</span>
        </span>
      </button>
    </>
  );
}
