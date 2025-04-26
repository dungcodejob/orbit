import { index, rootRoute, route } from "@tanstack/virtual-file-routes";

export const routes = rootRoute("root.tsx", [
  index("./sindex.tsx"),
  route("/about", "./about.tsx"),
]);
