import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches,
  useNavigation,
  useRouteLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

import { useEffect, useState } from "react";

import { env } from "cloudflare:workers";

import { getPosts } from "./lib/fetcher";
import { getUsedTags } from "./lib/helpers";
import { useGoogleAnalytics } from "./hooks/use-google-analytics";

import { TooltipProvider } from "./components/ui/tooltip";
import { PageFooter } from "./components/layouts/page-footer";
import { PageHeader } from "./components/layouts/page-header";
import { PageSkeleton } from "./components/layouts/page-skeleton";

export const loader = async ({ url }: Route.LoaderArgs) => {
  // the header's Topics panel lists only tags that have a page; a Notion failure empties the panel, not the whole site
  const topics = await getPosts(env)
    .then(getUsedTags)
    .catch((error) => {
      console.error("root loader: topics unavailable", error);
      return [];
    });
  return {
    gaMeasurementId: env.GA_MEASUREMENT_ID,
    origin: url.origin,
    topics,
  };
};

// nothing here depends on the page: load it once per document, not on every page change (each rerun hit Notion again)
export const shouldRevalidate = () => false;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400..700&family=Funnel+Sans:wght@400..600&family=DM+Mono:wght@400;500&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { gaMeasurementId, origin } = useRouteLoaderData<typeof loader>("root") || {};
  const location = useLocation();
  const canonical = origin && `${origin}${location.pathname}${location.search}`;
  // a route whose page is built in whole screens (home) starts under the fixed header and ends on the closing footer
  const matchesScreens = useMatches().some((match) => (match.handle as { screens?: boolean } | undefined)?.screens);
  // a page change whose loader takes over 150ms shows the next page's skeleton; faster ones never flash it
  const navigation = useNavigation();
  const nextPath = navigation.state === "loading" ? navigation.location.pathname : undefined;
  const [skeletonPath, setSkeletonPath] = useState<string>();
  useEffect(() => {
    if (!nextPath || nextPath === location.pathname) return setSkeletonPath(undefined);
    const timer = setTimeout(() => {
      setSkeletonPath(nextPath);
      window.scrollTo(0, 0); // ScrollRestoration still restores the real position once the page commits
    }, 150);
    return () => clearTimeout(timer);
  }, [nextPath, location.pathname]);
  const screens = matchesScreens && !skeletonPath;
  const isGaInitialized = useGoogleAnalytics(gaMeasurementId);
  useEffect(() => {
    if (isGaInitialized && gaMeasurementId) {
      (window as any).gtag("config", gaMeasurementId, {
        page_path: location.pathname,
      });
    }
  }, [isGaInitialized, location, gaMeasurementId]);

  return (
    // the head script adds m-enter before hydration
    <html lang="en" data-type="software" data-radius="soft" data-buttons="arrow" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        {/* theme before paint: saved choice, else the OS setting (followed live until the toggle saves one); Mocha when neither says light */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var m=matchMedia('(prefers-color-scheme: light)'),s=function(){var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=m.matches?'light':'dark';document.documentElement.dataset.theme=t};s();m.addEventListener('change',s)}catch(e){}",
          }}
        />
        {/* the hero's entrance runs once; m-enter-done is its safety mark */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)",
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {canonical && <link rel="canonical" href={canonical} />}
        <Meta />
        <Links />
      </head>
      <body>
        <TooltipProvider>
          <PageHeader />
          {/* the header is fixed: this pads the page below it */}
          {screens ? (
            children
          ) : (
            <div id="content" tabIndex={-1} className="pt-nav lg:pt-nav-lg outline-none">
              {skeletonPath ? <PageSkeleton pathname={skeletonPath} /> : children}
            </div>
          )}
          <PageFooter closing={screens} />
        </TooltipProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
