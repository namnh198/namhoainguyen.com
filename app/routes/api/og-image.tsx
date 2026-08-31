import { ImageResponse } from "@cf-wasm/og/workerd";

import type { Route } from "./+types/og-image";

import { ME } from "~/data/me";

export async function loader({ url }: Route.LoaderArgs) {
  const title = url.searchParams.get("title") || ME.fullName;
  const desc = url.searchParams.get("desc") || ME.quote;

  const response = await ImageResponse.async(<OgCard title={title} desc={desc} />, {
    width: 1200,
    height: 630,
  });

  const headers = new Headers(response.headers);

  headers.set("Cache-Control", "public, max-age=3600");

  headers.set("Cloudflare-CDN-Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function OgCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "80px",
        background: "#070a14",
        color: "#dde3f0",
        fontFamily: "Inter Variable",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: "32px", color: "#fbbf24" }}>namhoainguyen.com</span>
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            backgroundClip: "text",
            color: "transparent",
            background: "linear-gradient(135deg, #4f80ff 0%, #9b6dff 100%)",
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: "42px", color: "#8492b8" }}>{desc}</p>
      </div>
    </div>
  );
}
