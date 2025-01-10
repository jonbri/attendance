import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("month/:id", "routes/month.tsx"),
] satisfies RouteConfig;
