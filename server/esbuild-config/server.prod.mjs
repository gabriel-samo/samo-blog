import * as esbuild from "esbuild";

try {
  await esbuild.build({
    entryPoints: ["server.ts"],
    bundle: true,
    sourcemap: false,
    minify: true,
    platform: "node",
    target: ["node20.14"],
    packages: "external",
    define: {
      "process.env.NODE_ENV": "'production'"
    },
    outfile: "dist/server.js"
  });

  console.log("Server bundled successfully for production!");
} catch (error) {
  console.error("An error occurred during bundling:", error);
  process.exit(1);
}
