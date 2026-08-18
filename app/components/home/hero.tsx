import { GlowingEffect } from "../ui/glowing-effect";
import { cn } from "~/lib/utils";

export function HomeHero() {
  return (
    <div className="p-4 container mx-auto">
      <section className="min-h-[calc(100vh-12rem)] grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 xl:grid-rows-4">
        <HomeHeroGridItem area="md:[grid-area:1/1/3/7] lg:[grid-area:1/1/2/7]">ME</HomeHeroGridItem>
        <HomeHeroGridItem area="md:[grid-area:2/1/3/7] lg:[grid-area:2/1/5/7]">
          <h2 className="mt-auto text-transparent bg-clip-text bg-linear-[115deg,#f4f7ff_0%,#82a5ff_28%,#9b6dff_58%,#f4f7ff_100%] bg-size-[220%_100%] bg-position-[0_0] font-bold inline-flex text-4xl md:text-5xl">
            Bring your vision to ultimate reality
          </h2>
          <p className="text-text-2">
            Specialize in creating unique visual identities for digital products and believe that a stunning design
            starts with common values, open communication, and respect for your audience.
          </p>
        </HomeHeroGridItem>
        <HomeHeroGridItem area="md:[grid-area:2/1/3/7] lg:[grid-area:1/7/4/13]" className="hidden lg:block">
          GLOBE
        </HomeHeroGridItem>
        <HomeHeroGridItem area="md:[grid-area:2/1/3/7] lg:[grid-area:4/7/4/10]">WORKS</HomeHeroGridItem>
        <HomeHeroGridItem area="md:[grid-area:2/1/3/7] lg:[grid-area:4/10/4/13]">CONTACT</HomeHeroGridItem>
      </section>
    </div>
  );
}

function HomeHeroGridItem({
  area,
  children,
  className,
}: {
  area: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-24", [area, className])}>
      <div className="relative h-full rounded-2xl border p-2">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="border-0.75 relative flex h-full flex-col gap-6 overflow-hidden rounded-xl p-4 dark:shadow-[0px_0px_20px_0px_#2D2D2D]">
          {children}
        </div>
      </div>
    </div>
  );
}
