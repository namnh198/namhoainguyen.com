import type { CodeBlock } from "notion-types";
import * as React from "react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Prism, type SyntaxHighlighterProps } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useNotionContext } from "./context";
import Mermaid from "./mermaid";
import { Text } from "./text";
import { getBlockTitle } from "~/lib/notion/get-page-title";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import { cn } from "~/lib/utils";

const SyntaxHighlighter = Prism as any as React.FC<SyntaxHighlighterProps>;

type BlockCodeProps = {
  block: CodeBlock;
  className?: string;
  defaultLanguage?: string;
  updatedBlock?: React.ReactElement;
  blurBlockClassName?: string;
};

export function Code(props: BlockCodeProps) {
  const { block, className, defaultLanguage, updatedBlock, blurBlockClassName } = props;

  const { recordMap, blockOptions } = useNotionContext();
  const content = getBlockTitle(block, recordMap);
  const language = (block.properties?.language?.[0]?.[0] || defaultLanguage || "typescript").toLowerCase();
  const caption = block.properties.caption;

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

  const syntaxWraper = (
    <SyntaxHighlighter
      language={formatCodeLang(language)}
      style={vscDarkPlus}
      className="syntax-highlighter-pre my-0! max-h-75 border rounded-xl bg-bg-card!"
      showLineNumbers={true}
      customStyle={{ fontSize: "15px" }}
    >
      {content}
    </SyntaxHighlighter>
  );

  return (
    <div className={cn(className, blurBlockClassName, "group/code relative flex flex-col gap-2")}>
      <div
        id={`copy-${block.id}`}
        className="absolute! top-4 right-4 z-10! duration-100 opacity-0 transition-opacity group-hover/code:opacity-100 hover:cursor-pointer"
      >
        {copyBtnWrapper}
      </div>
      <div className={`language-${formatCodeLang(language)} syntax-highlighter relative overflow-hidden text-sm`}>
        <div className="w-full overflow-hidden">{syntaxWraper}</div>
      </div>

      {caption && (
        <div className="text-[0.9em] italic opacity-80">
          <Text value={caption} block={block} />
        </div>
      )}

      {language === "mermaid" && <Mermaid chart={content} updatedBlock={updatedBlock} className={blurBlockClassName} />}
    </div>
  );
}

/**
 * Convert the code language notation of the Notion api to the code language notation of react-syntax-highlighter.
 * https://developers.notion.com/reference/block#code-blocks
 * https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
 */
const formatCodeLang = (lang: string) => {
  switch (lang) {
    case "plain text":
      return "plaintext";
    case "objective-c":
      return "objectivec";
    default:
      return lang;
  }
};
