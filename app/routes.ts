import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/tags/", "routes/tags-list.tsx"),
  route("/tags/:tag", "routes/tags-detail.tsx"),
  route("/bookmarks", "routes/bookmarks.tsx"),
  route("/notes", "routes/notes-list.tsx"),
  route("/notes/:slug", "routes/notes-detail.tsx"),
] satisfies RouteConfig;
