import * as esbuild from "esbuild";
import postcss from "esbuild-postcss";
import "dotenv/config";

let ctx;

try {
  ctx = await esbuild.context({
    entryPoints: ["src/client/index.tsx"],
    bundle: true,
    minify: false,
    sourcemap: true,
    outfile: "public/static/bundle.js",
    plugins: [postcss()],
    define: {
      "process.env.NODE_ENV": "'development'",
      "process.env.FIREBASE_KEY": JSON.stringify(process.env.FIREBASE_KEY)
    },
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

  await ctx.watch();
  console.log("Watching client...");

  let { host, port } = await ctx.serve({
    host: "localhost",
    port: 3000,
    servedir: "public",
    fallback: "public/index.html"
  });

  console.info(`Hot refresh at http://localhost:${port}`);
} catch (error) {
  console.error("An error occurred:", error);
  process.exit(1);
}
