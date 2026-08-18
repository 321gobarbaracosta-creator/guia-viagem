import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { promises as fs } from "node:fs";
import path from "node:path";

async function listFiles(dir, root = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(full, root)));
    } else if (entry.name !== "sw.js") {
      files.push("/" + path.relative(root, full).replaceAll(path.sep, "/"));
    }
  }
  return files;
}

function offlineServiceWorker() {
  return {
    name: "321go-offline-service-worker",
    apply: "build",
    async closeBundle() {
      const outDir = path.resolve("dist");
      const swTemplate = await fs.readFile(path.resolve("public/sw.js"), "utf8");
      const assets = await listFiles(outDir);
      const sw = swTemplate.replace("const PRECACHE_ASSETS = [];", `const PRECACHE_ASSETS = ${JSON.stringify(assets, null, 2)};`);
      await fs.writeFile(path.join(outDir, "sw.js"), sw, "utf8");
    },
  };
}

export default defineConfig({
  plugins: [react(), offlineServiceWorker()],
});
