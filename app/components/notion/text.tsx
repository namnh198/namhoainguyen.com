import { Fragment, useMemo } from "react";
import type { Block, Decoration, ExternalObjectInstance, User } from "notion-types";

import type { NotionComponents } from "./context";

import { getUri, mapBlockColorClass } from "~/lib/helpers";
import { parsePageId } from "~/lib/notion/parse-page-id";
import { formatDate } from "~/lib/notion/utils";
import { cn, getHashFragmentValue, removeBaseUrl } from "~/lib/utils";

import { LazyImage } from "../ui/lazy-image";
import { useNotionContext } from "./context";
import { EOI } from "./eoi";
import { Equation } from "./equation";
import { GraceFullImage } from "./grace-full-image";
import { PageTitle } from "./page-title";

export function Text({
  value,
  block,
  linkProps,
  linkProtocol,
  components: inputComponents,
  ignoreMarkup,
}: {
  value: Decoration[];
  block: Block;
  linkProps?: any;
  linkProtocol?: string;
  components?: Partial<NotionComponents>;
  ignoreMarkup?: ("b" | "_" | "a" | "u" | "h")[];
}) {
  const {
    components: ctxComponents,
    recordMap,
    mapPageUrl,
    mapImageUrl,
    rootDomain,
    blockOptions,
  } = useNotionContext();
  const components = useMemo(() => {
    return {
      ...ctxComponents,
      ...inputComponents,
    };
  }, [ctxComponents, inputComponents]);

  return (
    <Fragment>
      {value?.map(([text, decorations], index) => {
        // TODO: sometimes notion shows a max of N items to prevent overflow
        // if (trim && index > 18) {
        //   return null
        // }

        const newText = text.includes("\n") ? (
          <span dangerouslySetInnerHTML={{ __html: text.split("\n").join("<br />") }}></span>
        ) : (
          text
        );

        if (!decorations) {
          if (text === ",") {
            return <span key={index} style={{ padding: "0.5em" }} />;
          } else {
            return <Fragment key={index}>{newText}</Fragment>;
          }
        }

        const formatted = decorations.reduce(
          (element: React.ReactNode, decorator) => {
            switch (decorator[0]) {
              case "p": {
                // link to an internal block (within the current workspace)
                const blockId = decorator[1];
                const linkedBlock = recordMap.block[blockId]?.value as Block;
                if (!linkedBlock) {
                  if (import.meta.env.DEV) {
                    console.log('"p" missing block', blockId);
                  }
                  return null;
                }

                const postSlug = linkedBlock?.properties?.[`${blockOptions?.slugKey}`]?.[0]?.[0];

                return (
                  <components.PageLink
                    className="text-accent hover:text-accent-2 notion-link transition-colors"
                    href={getUri(postSlug, "note")}
                  >
                    <PageTitle block={linkedBlock} hideIcon={true} />
                  </components.PageLink>
                );
              }

              case "‣": {
                // link to an external block (outside of the current workspace)
                const linkType = decorator[1][0];
                const id = decorator[1][1];

                switch (linkType) {
                  case "u": {
                    const user = recordMap.notion_user[id]?.value as User;

                    if (!user) {
                      console.log('"‣" missing user', id);
                      return null;
                    }

                    const name = [user.given_name, user.family_name].filter(Boolean).join(" ");

                    return (
                      <GraceFullImage className="notion-user" src={mapImageUrl(user.profile_photo, block)} alt={name} />
                    );
                  }

                  default: {
                    const linkedBlock = recordMap.block[id]?.value as Block;
                    if (!linkedBlock) {
                      console.log('"‣" missing block', linkType, id);
                      return null;
                    }

                    return (
                      <components.PageLink
                        className="text-accent hover:text-accent-2 notion-link transition-colors"
                        href={mapPageUrl(id)}
                        {...linkProps}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PageTitle block={linkedBlock} />
                      </components.PageLink>
                    );
                  }
                }
              }

              case "h":
                if (ignoreMarkup?.includes("h")) return element;
                const blockColorClass = mapBlockColorClass(decorator[1]);
                return <span className={cn(`notion-in-text`, [blockColorClass])}>{element}</span>;

              case "c":
                return (
                  <code className="text-text-2 rounded-sm border bg-[#ffffff05] p-[1px_8px_2px_6px] font-mono text-[90%] wrap-break-word">
                    {element}
                  </code>
                );

              case "b": {
                if (ignoreMarkup?.includes("b")) return element;
                return <strong className="text-text">{element}</strong>;
              }

              case "i":
                return <em className="italic">{element}</em>;

              case "s":
                return <s>{element}</s>;

              case "_": {
                if (ignoreMarkup?.includes("_")) return element;
                return <span className="underline decoration-slate-500 underline-offset-4">{element}</span>;
              }

              case "e":
                return <Equation math={decorator[1]} inline />;

              case "m":
                // comment / discussion
                return element; // still need to return the base element

              case "a": {
                if (ignoreMarkup?.includes("_")) return element;
                const v = decorator[1];
                const pathname = v.substring(1);
                const id = parsePageId(pathname, { uuid: true });

                if ((v[0] === "/" || v.includes(rootDomain!)) && id) {
                  const href = v.includes(rootDomain!) ? v : `${mapPageUrl(id)}${getHashFragmentValue(v)}`;

                  return (
                    <components.PageLink
                      className="text-accent hover:text-accent-2 notion-link transition-colors"
                      href={href}
                      {...linkProps}
                    >
                      {element}
                    </components.PageLink>
                  );
                } else {
                  let hostName = "";
                  try {
                    hostName = new URL(decorator[1]).hostname;
                  } catch (_) {
                    hostName = "";
                  }
                  if (hostName === "localhost" || hostName?.includes(blockOptions.notionDomain || "cannotBeIncluded")) {
                    return (
                      <components.PageLink
                        className="text-accent hover:text-accent-2 notion-link transition-colors"
                        href={removeBaseUrl(decorator[1])}
                      >
                        {element}
                      </components.PageLink>
                    );
                  }

                  return (
                    <components.Link
                      className="text-accent hover:text-accent-2 notion-link transition-colors"
                      href={linkProtocol ? `${linkProtocol}:${decorator[1]}` : decorator[1]}
                      {...linkProps}
                    >
                      {element}
                    </components.Link>
                  );
                }
              }

              case "d": {
                const v = decorator[1];
                const type = v?.type;

                if (type === "date") {
                  // Example: Jul 31, 2010
                  const startDate = v.start_date;

                  return formatDate(startDate);
                } else if (type === "datetime") {
                  // Example: Jul 31, 2010 20:00
                  const startDate = v.start_date;
                  const startTime = v.start_time;

                  return `${formatDate(startDate)} ${startTime}`;
                } else if (type === "daterange") {
                  // Example: Jul 31, 2010 → Jul 31, 2020
                  const startDate = v.start_date;
                  const endDate = v.end_date;

                  return `${formatDate(startDate)} → ${formatDate(endDate!)}`;
                } else {
                  return element;
                }
              }

              case "u": {
                if (ignoreMarkup?.includes("_")) return element;
                const userId = decorator[1];
                const user = recordMap.notion_user[userId]?.value as User;

                if (!user) {
                  console.log("missing user", userId);
                  return null;
                }

                const name = [user.given_name, user.family_name].filter(Boolean).join(" ");

                return (
                  <GraceFullImage className="notion-user" src={mapImageUrl(user.profile_photo, block)} alt={name} />
                );
              }

              // Github mention
              case "eoi": {
                const blockId = decorator[1];
                const externalObjectInstance = recordMap.block[blockId]?.value as ExternalObjectInstance;

                return <EOI block={externalObjectInstance} inline={true} />;
              }

              // Mention format
              case "lm" as any: {
                const href = (decorator[1] as any)?.href;
                const title = (decorator[1] as any)?.title;
                const iconUrl = (decorator[1] as any)?.icon_url;
                return (
                  <a
                    className="group inline-flex flex-row items-start gap-1.5 px-1 hover:cursor-pointer hover:border-sky-300"
                    target="_blank"
                    href={href}
                    rel="noopener noreferrer"
                  >
                    {iconUrl && (
                      <LazyImage
                        className="mt-px"
                        src={iconUrl}
                        alt={"URL icon"}
                        width={16}
                        height={16}
                        layout="constrained"
                      />
                    )}
                    <span className="text-accent hover:text-accent-2 text-[1em] leading-[1.1] transition-colors">
                      {title}
                    </span>
                  </a>
                );
              }

              default:
                if (import.meta.env.DEV) {
                  console.log("unsupported text format", decorator);
                }
                return element;
            }
          },
          <>{newText}</>,
        );

        return <Fragment key={index}>{formatted}</Fragment>;
      })}
    </Fragment>
  );
}
