import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLabelLang(lang: string) {
  switch (lang) {
    case "en":
      return "English";
    case "vi":
      return "Vietnamese";
    default:
      return lang;
  }
}

export function removeBaseUrl(url: string) {
  const baseUrlRegex = /^(https?:\/\/[^/]+)/;
  const matches = url.match(baseUrlRegex);
  if (matches && matches.length > 1) {
    const baseUrl = matches[1];
    return url.replace(baseUrl, "");
  }
  return url;
}

export const getHashFragmentValue = (url: string) => {
  return url.includes("#") ? url.replace(/^.+(#.+)$/, "$1") : "";
};
