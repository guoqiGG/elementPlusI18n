import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8072,
    open: true,
    proxy: {
      "/api": {
        ws: true,
        target: "https://spsd.hnliyue.cn/youth",
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp("^/api"), ""),
        secure: false,
      },
    },
  },
});
