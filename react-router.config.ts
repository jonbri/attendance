import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  async prerender() {
    return ["/"];
  },
  basename: "/foo",
} satisfies Config;
