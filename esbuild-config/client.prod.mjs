import * as esbuild from "esbuild";
import postcss from "esbuild-postcss";
import "dotenv/config";

try {
  await esbuild.build({
    entryPoints: ["src/client/index.tsx"],
    bundle: true,
    sourcemap: false,
    minify: true,
    outfile: "public/static/bundle.js",
    define: {
      "process.env.NODE_ENV": "'production'",
      "process.env.FIREBASE_KEY": JSON.stringify(process.env.FIREBASE_KEY)
    },
    plugins: [postcss()],
    loader: {
      ".png": "dataurl",
      ".jpg": "dataurl",
      ".jpeg": "dataurl",
      ".svg": "dataurl",
      ".gif": "dataurl",
      ".ico": "dataurl"
    },
    assetNames: "[name]-[hash]"
  });

  console.log("Client bundled successfully for production!");
} catch (error) {
  console.error("An error occurred during bundling:", error);
  process.exit(1);
}
