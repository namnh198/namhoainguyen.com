import { useEffect, useId, useRef, useState } from "react";
import { useDebounce } from "~/hooks/use-debounce";
import { cn } from "~/lib/utils";

function useMermaid(chart: string, debounceTime: number) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Unique ID for this diagram instance
  const id = useId().replace(/:/g, "");

  // Hidden container for Mermaid's size calculations
  const renderRef = useRef<HTMLDivElement>(null);

  // Debounce the input chart string to avoid thrashing
  const debouncedChart = useDebounce(chart, debounceTime);

  useEffect(() => {
    if (!debouncedChart.trim()) {
      setStatus("idle");
      setSvg(null);
      setError(null);
      return;
    }

    let isCancelled = false;

    const render = async () => {
      setStatus("loading");
      setError(null);

      try {
        // @ts-expect-error: load shiki from esm.sh to avoid large worker bundle
        const mermaid = (await import("https://esm.sh/mermaid")).default;

        if (isCancelled) return;

        // Initialize Mermaid
        // Note: startOnLoad must be false so we can manually render
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            primaryColor: "#070a14",
            primaryTextColor: "#dde3f0",
            primaryBorderColor: "#1a2035",
            background: "#070a14",
            textColor: "#dde3f0",
            lineColor: "#263050",
            secondaryColor: "#8492b8",
            tertiaryColor: "#4a5475",
          },
          look: "classic",
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
          logLevel: "error",
          securityLevel: "loose",
        });

        // Ensure we have a DOM node for calculation
        if (!renderRef.current) return;
        renderRef.current.innerHTML = "";

        // Generate unique ID for this specific render cycle
        const uniqueId = `mermaid-${id}-${Date.now()}`;

        // Render
        // We pass the ref as the container so Mermaid can calculate dimensions accurately
        const { svg: svgOutput } = await mermaid.render(uniqueId, debouncedChart.trim(), renderRef.current);

        if (!isCancelled) {
          setSvg(svgOutput);
          setStatus("success");
          // Clean up the calculation node to free memory
          renderRef.current.innerHTML = "";
        }
      } catch (err) {
        if (!isCancelled) {
          const message = err instanceof Error ? err.message : "Failed to render diagram";
          console.error("Mermaid Render Error:", err);
          setError(message);
          setStatus("error");
          setSvg(null);
        }
      }
    };

    render();

    return () => {
      isCancelled = true;
    };
  }, [debouncedChart, id]);

  return { svg, error, status, renderRef };
}

export function Mermaid({
  chart,
  className,
  debounceTime = 300,
}: {
  chart: string;
  className?: string;
  debounceTime?: number;
}) {
  const { svg, error, status, renderRef } = useMermaid(chart, debounceTime);
  // console.log(svg, error, status, renderRef);
  return (
    <div className={cn("relative w-full min-h-25 bg-bg-elevated border rounded-xl p-[1em]", className)}>
      {status === "success" && svg && (
        <div
          className="flex items-center justify-center w-full h-full overflow-auto animate-in fade-in duration-300 [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
          role="img"
          aria-label="Mermaid diagram"
        />
      )}
      <div
        ref={renderRef}
        className="absolute inset-0 invisible -z-50 w-full h-full pointer-events-none overflow-hidden"
        aria-hidden="true"
      />

      {/* 3. Loading State */}
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-5 h-5 border-2 border-primary rounded-full animate-spin border-t-transparent" />
            <span className="text-xs text-muted-foreground font-medium">Rendering...</span>
          </div>
        </div>
      )}

      {/* 4. Error State */}
      {status === "error" && error && (
        <div className="flex items-center justify-center w-full p-6 border border-destructive/20 bg-destructive/5 rounded-lg">
          <div className="flex flex-col items-center gap-2 max-w-md text-center">
            <span className="text-xs font-bold text-destructive uppercase tracking-wider">Syntax Error</span>
            <code className="text-xs text-muted-foreground font-mono bg-background/50 px-2 py-1 rounded w-full break-all">
              {error.split("\n")[0]} {/* Show only first line of error for brevity */}
            </code>
          </div>
        </div>
      )}

      {/* 5. Idle State */}
      {status === "idle" && (
        <div className="flex items-center justify-center w-full h-full min-h-[150px] border-2 border-dashed rounded-lg border-muted-foreground/20">
          <p className="text-sm text-muted-foreground">No diagram code provided</p>
        </div>
      )}
    </div>
  );
}

// export default class Mermaid extends React.Component<{
//   chart: string;
//   className?: string;
// }> {
//   componentDidMount() {
//     mermaid.contentLoaded();
//   }
//   render() {
//     // Class "mermaid" is required by mermaid
//     return (
//       <div className={cn(this.props.className)}>
//         <div className={cn("mermaid flex justify-center rounded-md bg-white")} suppressHydrationWarning>
//           {this.props.chart}
//         </div>
//       </div>
//     );
//   }
// }
