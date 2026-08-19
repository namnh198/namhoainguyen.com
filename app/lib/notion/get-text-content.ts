import type { Decoration } from "notion-types";

export const getTextContent = (text?: Decoration[]): string => {
  if (!text) {
    return "";
  } else if (Array.isArray(text)) {
    return (
      text?.reduce((prev, current) => prev + (current[0] !== "⁍" && current[0] !== "‣" ? current[0] : ""), "") ?? ""
    );
  } else {
    return text;
  }
};
