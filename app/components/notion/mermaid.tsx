import mermaid from "mermaid";
import React from "react";
import { cn } from "~/lib/utils";

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
});

export default class Mermaid extends React.Component<{
  chart: string;
  className?: string;
}> {
  componentDidMount() {
    mermaid.contentLoaded();
  }
  render() {
    // Class "mermaid" is required by mermaid
    return (
      <div className={cn(this.props.className)}>
        <div className={cn("mermaid flex justify-center rounded-md bg-white")} suppressHydrationWarning>
          {this.props.chart}
        </div>
      </div>
    );
  }
}
