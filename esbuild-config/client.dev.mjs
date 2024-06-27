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
    }
  });

  await ctx.watch();
  console.log("Watching client...");

  let { host, port } = await ctx.serve({
    host: "localhost",
    port: 3000,
    servedir: "public",
    fallback: "public/index.html"
  });

  host = host == "127.0.0.1" ? "localhost" : host;

  console.info(`Hot refresh at http://${host}:${port}`);
} catch (error) {
  console.error("An error occurred:", error);
  process.exit(1);
}
