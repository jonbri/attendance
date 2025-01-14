import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  base: "./",
  async prerender() {
    return ["/"];
  },
} satisfies Config;
