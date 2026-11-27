export type MenuItem = {
  label: string;
  href: string;
  footer?: boolean;
};

export const MENU: MenuItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Notes",
    href: "/notes",
    footer: true,
  },
  {
    label: "Topics",
    href: "/tags",
    footer: true,
  },
  {
    label: "About",
    href: "/about",
    footer: true,
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
    footer: true,
  },
];
