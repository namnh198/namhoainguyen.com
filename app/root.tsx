import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

import { useEffect } from "react";

import { env } from "cloudflare:workers";

import { useGoogleAnalytics } from "./hooks/use-google-analytics";

import { TooltipProvider } from "./components/ui/tooltip";
import { PageFooter } from "./components/layouts/page-footer";
import { PageHeader } from "./components/layouts/page-header";

export const loader = ({ url }: Route.LoaderArgs) => {
  return {
    gaMeasurementId: env.GA_MEASUREMENT_ID,
    canonical: `${url.href}`,
  };
};

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital@0;1&family=Oxanium:wght@800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { gaMeasurementId, canonical } = useRouteLoaderData<typeof loader>("root") || {};
  const location = useLocation();
  const isGaInitialized = useGoogleAnalytics(gaMeasurementId);
  useEffect(() => {
    if (isGaInitialized && gaMeasurementId) {
      (window as any).gtag("config", gaMeasurementId, {
        page_path: location.pathname,
      });
    }
  }, [isGaInitialized, location, gaMeasurementId]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {canonical && <link rel="canonical" href={canonical} />}
        <Meta />
        <Links />
      </head>
      <body>
        <TooltipProvider>
          <PageHeader />
          {children}
          <PageFooter />
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
