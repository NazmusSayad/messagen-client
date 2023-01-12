// vite.config.ts
import path from "path";
import { defineConfig } from "vite";
import vitePWA from "vite-pwa";
import viteVSCode, { createAlias } from "vite-vscode";
import react from "@vitejs/plugin-react";
import svgr from "@honkhonk/vite-plugin-svgr";
var isDevMode = process.env.NODE_ENV !== "production";
var srcDir = path.resolve("./src");
var config = {
  static: "static",
  assets: "assets"
};
var plugins = [
  react(),
  svgr.default(),
  vitePWA(),
  viteVSCode()
];
var css = {
  modules: {
    generateScopedName: isDevMode ? "[local]___[name]--[hash:base64:5]" : "[hash:base64]"
  },
  preprocessorOptions: {
    scss: {
      additionalData: `@use '$styles/core' as *;
`
    }
  }
};
var resolve = {
  alias: {
    $slice: path.join(srcDir, "/store/slice"),
    ...createAlias("$", srcDir),
    $src: srcDir
  }
};
var server = {
  host: "localhost",
  port: 3e3
};
var build = {
  rollupOptions: {
    output: {
      assetFileNames: (file) => {
        const ext = file.name.split(".").at(-1);
        const outputFolder = ext === "css" || ext === "js" ? "" : config.assets + "/";
        return `${config.static}/${outputFolder}[name]-[hash][extname]`;
      },
      entryFileNames: `${config.static}/[name]-[hash].js`,
      chunkFileNames: `${config.static}/chunk-[name]-[hash].js`
    }
  }
};
var vite_config_default = defineConfig({ plugins, css, resolve, server, build });
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZpdGVQV0EgZnJvbSAndml0ZS1wd2EnXG5pbXBvcnQgdml0ZVZTQ29kZSwgeyBjcmVhdGVBbGlhcyB9IGZyb20gJ3ZpdGUtdnNjb2RlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHN2Z3IgZnJvbSAnQGhvbmtob25rL3ZpdGUtcGx1Z2luLXN2Z3InXG5cbmNvbnN0IGlzRGV2TW9kZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbmNvbnN0IHNyY0RpciA9IHBhdGgucmVzb2x2ZSgnLi9zcmMnKVxuY29uc3QgY29uZmlnID0ge1xuICBzdGF0aWM6ICdzdGF0aWMnLFxuICBhc3NldHM6ICdhc3NldHMnLFxufVxuXG5jb25zdCBwbHVnaW5zID0gW1xuICByZWFjdCgpLFxuICAvLyBAdHMtaWdub3JlXG4gIHN2Z3IuZGVmYXVsdCgpLFxuICB2aXRlUFdBKCksXG4gIHZpdGVWU0NvZGUoKSxcbl1cblxuY29uc3QgY3NzID0ge1xuICBtb2R1bGVzOiB7XG4gICAgZ2VuZXJhdGVTY29wZWROYW1lOiBpc0Rldk1vZGVcbiAgICAgID8gJ1tsb2NhbF1fX19bbmFtZV0tLVtoYXNoOmJhc2U2NDo1XSdcbiAgICAgIDogJ1toYXNoOmJhc2U2NF0nLFxuICB9LFxuICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgc2Nzczoge1xuICAgICAgYWRkaXRpb25hbERhdGE6IGBAdXNlICckc3R5bGVzL2NvcmUnIGFzICo7XFxuYCxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCByZXNvbHZlID0ge1xuICBhbGlhczoge1xuICAgICRzbGljZTogcGF0aC5qb2luKHNyY0RpciwgJy9zdG9yZS9zbGljZScpLFxuICAgIC4uLmNyZWF0ZUFsaWFzKCckJywgc3JjRGlyKSxcbiAgICAkc3JjOiBzcmNEaXIsXG4gIH0sXG59XG5cbmNvbnN0IHNlcnZlciA9IHtcbiAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gIHBvcnQ6IDMwMDAsXG59XG5cbmNvbnN0IGJ1aWxkID0ge1xuICByb2xsdXBPcHRpb25zOiB7XG4gICAgb3V0cHV0OiB7XG4gICAgICBhc3NldEZpbGVOYW1lczogKGZpbGUpID0+IHtcbiAgICAgICAgY29uc3QgZXh0ID0gZmlsZS5uYW1lLnNwbGl0KCcuJykuYXQoLTEpXG4gICAgICAgIGNvbnN0IG91dHB1dEZvbGRlciA9XG4gICAgICAgICAgZXh0ID09PSAnY3NzJyB8fCBleHQgPT09ICdqcycgPyAnJyA6IGNvbmZpZy5hc3NldHMgKyAnLydcbiAgICAgICAgcmV0dXJuIGAke2NvbmZpZy5zdGF0aWN9LyR7b3V0cHV0Rm9sZGVyfVtuYW1lXS1baGFzaF1bZXh0bmFtZV1gXG4gICAgICB9LFxuICAgICAgZW50cnlGaWxlTmFtZXM6IGAke2NvbmZpZy5zdGF0aWN9L1tuYW1lXS1baGFzaF0uanNgLFxuICAgICAgY2h1bmtGaWxlTmFtZXM6IGAke2NvbmZpZy5zdGF0aWN9L2NodW5rLVtuYW1lXS1baGFzaF0uanNgLFxuICAgIH0sXG4gIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7IHBsdWdpbnMsIGNzcywgcmVzb2x2ZSwgc2VydmVyLCBidWlsZCB9KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGFBQWE7QUFDcEIsT0FBTyxjQUFjLG1CQUFtQjtBQUN4QyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRWpCLElBQU0sWUFBWSxRQUFRLElBQUksYUFBYTtBQUMzQyxJQUFNLFNBQVMsS0FBSyxRQUFRLE9BQU87QUFDbkMsSUFBTSxTQUFTO0FBQUEsRUFDYixRQUFRO0FBQUEsRUFDUixRQUFRO0FBQ1Y7QUFFQSxJQUFNLFVBQVU7QUFBQSxFQUNkLE1BQU07QUFBQSxFQUVOLEtBQUssUUFBUTtBQUFBLEVBQ2IsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUNiO0FBRUEsSUFBTSxNQUFNO0FBQUEsRUFDVixTQUFTO0FBQUEsSUFDUCxvQkFBb0IsWUFDaEIsc0NBQ0E7QUFBQSxFQUNOO0FBQUEsRUFDQSxxQkFBcUI7QUFBQSxJQUNuQixNQUFNO0FBQUEsTUFDSixnQkFBZ0I7QUFBQTtBQUFBLElBQ2xCO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTSxVQUFVO0FBQUEsRUFDZCxPQUFPO0FBQUEsSUFDTCxRQUFRLEtBQUssS0FBSyxRQUFRLGNBQWM7QUFBQSxJQUN4QyxHQUFHLFlBQVksS0FBSyxNQUFNO0FBQUEsSUFDMUIsTUFBTTtBQUFBLEVBQ1I7QUFDRjtBQUVBLElBQU0sU0FBUztBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUNSO0FBRUEsSUFBTSxRQUFRO0FBQUEsRUFDWixlQUFlO0FBQUEsSUFDYixRQUFRO0FBQUEsTUFDTixnQkFBZ0IsQ0FBQyxTQUFTO0FBQ3hCLGNBQU0sTUFBTSxLQUFLLEtBQUssTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3RDLGNBQU0sZUFDSixRQUFRLFNBQVMsUUFBUSxPQUFPLEtBQUssT0FBTyxTQUFTO0FBQ3ZELGVBQU8sR0FBRyxPQUFPLFVBQVU7QUFBQSxNQUM3QjtBQUFBLE1BQ0EsZ0JBQWdCLEdBQUcsT0FBTztBQUFBLE1BQzFCLGdCQUFnQixHQUFHLE9BQU87QUFBQSxJQUM1QjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYSxFQUFFLFNBQVMsS0FBSyxTQUFTLFFBQVEsTUFBTSxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
