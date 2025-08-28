import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import viteCompression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, "./");
  return {
    plugins: [
      vue(),
      viteCompression({
        //gzip压缩
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')         // +++
      }
    },
    server: {
      port: 8072,
      open: true,
      proxy: {
        "/api": {
          ws: true,
          target: config.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp("^/api"), ""),
          secure: false,
        },
      },
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      minify: 'terser',
      // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
      rollupOptions: {
        output: {
          //静态资源分类打包
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            //静态资源分拆打包
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    css: {
      /* CSS 预处理器   导入全局样式*/
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // 解决sass编译问题
        },
      },
    },
  };
});
