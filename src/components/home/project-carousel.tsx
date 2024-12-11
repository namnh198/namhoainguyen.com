import { type EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import type { Project } from '@/types';

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const handlePrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full mt-4 relative flex-auto">
      <button
        className="absolute bg-mantle disabled:bg-base hover:bg-crust top-1/2 -translate-y-1/2 -left-4 z-10 size-10 inline-flex items-center justify-center shadow-lg rounded-full border border-surface0 text-text"
        onClick={handlePrev}
        disabled={prevBtnDisabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-left"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-x touch-pinch-zoom gap-x-5">
          {projects.map(({ name, url, type, color }: Project) => (
            <CarouselItem key={name} name={name} url={url} type={type} color={color} />
          ))}
        </div>
      </div>
      <button
        className="absolute bg-mantle disabled:bg-base hover:bg-crust top-1/2 -translate-y-1/2 -right-4 z-10 size-10 inline-flex items-center justify-center shadow-lg rounded-full border border-surface0 text-text"
        onClick={handleNext}
        disabled={nextBtnDisabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

const CarouselItem = ({ name, url, type, color }: Project) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="shrink-0 w-64 bg-mantle border border-surface0 min-h-32 flex flex-col justify-center items-center p-4 rounded-xl relative overflow-hidden group gap-2"
  >
    <span className="font-medium leading-[1.35] text-[0.95rem] group-hover:text-mauve transition-colors">{name}</span>
    <span className="gap-2 items-center">
      <span
        className={clsx('inline-block py-0.5 px-2 rounded-[.25rem] text-sm leading-4 font-semibold', {
          'bg-rosewater text-background': color === 'rosewater',
          'bg-flamingo text-background': color === 'flamingo',
          'bg-pink text-background': color === 'pink',
          'bg-mauve text-background': color === 'mauve',
          'bg-red text-background': color === 'red',
          'bg-maroon text-background': color === 'maroon',
          'bg-peach text-background': color === 'peach',
          'bg-yellow text-background': color === 'yellow',
          'bg-green text-background': color === 'green',
          'bg-teal text-background': color === 'teal',
          'bg-sky text-background': color === 'sky',
          'bg-lavender text-background': color === 'lavender',
          'bg-sapphire text-background': color === 'sapphire',
          'bg-blue text-background': color === 'blue'
        })}
      >
        {type}
      </span>
    </span>
    <span className="absolute -bottom-0.5 w-full">
      <svg
        className="relative w-full h-[5vh] -mb-2 min-h-[60px] max-h-[150px]"
        preserveAspectRatio="none"
        shapeRendering="auto"
        viewBox="0 24 150 28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" id="gentle-wave"></path>
        </defs>
        <g className="parallax">
          <use
            fill={`rgba(var(--ctp-${color}), 0.1)`}
            x="48"
            xlinkHref="#gentle-wave"
            y="0"
            className="animation-wave"
            style={{ animationDelay: '2s', animationDuration: '10s' }}
          ></use>
          <use
            fill={`rgba(var(--ctp-${color}), 0.05)`}
            x="48"
            xlinkHref="#gentle-wave"
            y="3"
            style={{ animationDelay: '-5s', animationDuration: '10s' }}
          ></use>
          <use
            fill={`rgba(var(--ctp-${color}), 0.01)`}
            x="48"
            xlinkHref="#gentle-wave"
            y="5"
            style={{ animationDelay: '7s', animationDuration: '10s' }}
          ></use>
          <use
            fill={`rgba(var(--ctp-${color}), 0.005)`}
            x="48"
            xlinkHref="#gentle-wave"
            y="7"
            style={{ animationDelay: '1s', animationDuration: '10s' }}
          ></use>
        </g>
      </svg>
    </span>
  </a>
);
