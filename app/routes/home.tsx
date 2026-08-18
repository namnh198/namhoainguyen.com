import { HomeHero } from "~/components/home/hero";
import type { Route } from "./+types/home";
import { getMetaData } from "~/lib/get-meta-data";

export function meta({}: Route.MetaArgs) {
  return getMetaData({
    title: "Hi! I'm Nam",
    prefix: false,
  });
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <HomeHero />
    </main>
  );
}
