import * as React from "react";
import { useState } from "react";
import type { CodeBlock } from "notion-types";

import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import CopyToClipboard from "react-copy-to-clipboard";

import { getBlockTitle } from "~/lib/notion/get-block-value";
import { cn } from "~/lib/utils";

import { useNotionContext } from "./context";
import { Mermaid } from "./mermaid";
import { Text } from "./text";

type BlockCodeProps = {
  block: CodeBlock;
  className?: string;
  defaultLanguage?: string;
  blurBlockClassName?: string;
};

export function Code(props: BlockCodeProps) {
  const { block, className, defaultLanguage, blurBlockClassName } = props;
  const [highlightCode, setHighlightCode] = useState<string | null>(null);

  const { recordMap, blockOptions } = useNotionContext();
  const content = getBlockTitle(block, recordMap);
  const language = (block.properties?.language?.[0]?.[0] || defaultLanguage || "typescript").toLowerCase();
  const caption = block.properties.caption;

  React.useEffect(() => {
    if (!content) {
      return;
    }
    // @ts-expect-error: load shiki from esm.sh to avoid large worker bundle
    import("https://esm.sh/shiki").then(async ({ codeToHtml }) => {
      setHighlightCode(
        await codeToHtml(content, {
          lang: formatCodeLang(language),
          theme: "tokyo-night",
        }),
      );
    });
  }, [content, language]);

  const [copied, setCopied] = useState(false);
  const onSuccess = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const copyBtn = (
    <button>
      {!copied && <IconCopy className="text-text-2 hover:text-text" size={18} />}
      {copied && <IconCopyCheck className="text-success" size={18} />}
    </button>
  ) as any;

  const copyBtnWrapper = (
    <CopyToClipboard text={content} onCopy={onSuccess}>
      {copyBtn}
    </CopyToClipboard>
  );

  if (language === "mermaid") {
    return <Mermaid chart={content} className={cn(className, blurBlockClassName)} />;
  }

  return (
    <div className={cn(className, blurBlockClassName, "group/code relative flex flex-col gap-2")}>
      <div
        id={`copy-${block.id}`}
        className="absolute! top-4 right-4 z-10! opacity-0 transition-opacity duration-100 group-hover/code:opacity-100 hover:cursor-pointer"
      >
        {copyBtnWrapper}
      </div>
      <div className={`language-${formatCodeLang(language)} syntax-highlighter relative overflow-hidden text-sm`}>
        {highlightCode ? (
          <div className="w-full overflow-hidden" dangerouslySetInnerHTML={{ __html: highlightCode }}></div>
        ) : (
          <div className="w-full overflow-hidden">
            <pre className="bg-bg-card my-0 max-h-75 rounded-lg border p-[1em] font-mono">
              <code>{content}</code>
            </pre>
          </div>
        )}
      </div>

      {caption && (
        <div className="text-[0.9em] italic opacity-80">
          <Text value={caption} block={block} />
        </div>
      )}

      {language === "mermaid" && <Mermaid chart={content} className={blurBlockClassName} />}
    </div>
  );
}

/**
 * Convert the code language notation of the Notion api to the code language notation of react-syntax-highlighter.
 * https://developers.notion.com/reference/block#code-blocks
 * https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
 */
const formatCodeLang = (lang: string): string => {
  switch (lang) {
    case "plain text":
      return "plaintext";
    case "objective-c":
      return "objectivec";
    default:
      return lang;
  }
};
