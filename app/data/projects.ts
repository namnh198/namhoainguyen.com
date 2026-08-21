import type { TechItem } from "./techs";

export type Project = {
  name: string;
  type: "web" | "tool" | "module";
  desc?: string;
  icon?: string;
  previewUrl?: string;
  githubUrl?: string;
  techs?: TechItem[];
};

export const PROJECTS: Project[] = [
  {
    name: "Lodev",
    desc: "Create and manage local web development enviroment with ease.",
    type: "tool",
    githubUrl: "https://github.com/namnh198/coderx-open-ai",
  },
  {
    name: "M2 - Microsoft Clarity",
    desc: "Magento 2 module to integrate Microsoft Clarity for user behavior analytics.",
    type: "module",
    githubUrl: "https://github.com/namnh198/magento-microsoft-clarity",
  },
  {
    name: "M2 - Mobile Login",
    desc: "Magento 2 module to allow customers to login using their mobile number.",
    type: "module",
    githubUrl: "https://github.com/namnh198/magento-mobile-login",
  },
  {
    name: "NextJS - Blog and Notion CMS",
    desc: "A personal blog and CMS built with Next.js and Notion.",
    type: "web",
    githubUrl: "https://github.com/namnh198/namhoainguyen.com",
  },
  {
    name: "M2 - SMS Notification",
    desc: "Magento 2 module to send SMS notifications to customers.",
    type: "module",
    githubUrl: "https://github.com/namnh198/magento-sms-notification",
  },
  {
    name: "Astro - Blog",
    desc: "A personal blog built with Astro.",
    type: "web",
    githubUrl: "https://github.com/namnh198/namhoainguyen.com",
  },
];
