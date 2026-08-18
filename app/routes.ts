import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/notes", "routes/notes-list.tsx"),
  route("/notes/:slug", "routes/notes-detail.tsx"),
] satisfies RouteConfig;
