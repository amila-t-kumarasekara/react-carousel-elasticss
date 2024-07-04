const babel = require("@rollup/plugin-babel").default;
const commonjs = require("rollup-plugin-commonjs");
const postcss = require("rollup-plugin-postcss");
const resolve = require("rollup-plugin-node-resolve");
const url = require("rollup-plugin-url");
const alias = require("rollup-plugin-alias");
const serve = require("rollup-plugin-serve");
const replace = require("@rollup/plugin-replace");
const livereload = require("rollup-plugin-livereload");

const libName = require("./libName");

const ReactNamedExports = require('react');
const ReactIsNamedExports = require('react-is');

module.exports = {
  input: `demoApp/src/index.js`,
  output: [
    {
      file: "demoApp/dist/bundle.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
  ],
  plugins: [
    alias({
      entries: {
        "react-elastic-carousel": `src/${libName}/index.js`,
      }
    }),
    // external(),
    postcss({
      modules: false,
    }),
    url(),
    babel({
      exclude: "node_modules/**",
      plugins: ["@babel/external-helpers"],
    }),
    resolve(),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "node_modules/react-is/index.js": Object.keys(ReactIsNamedExports),
        "node_modules/react/index.js": Object.keys(ReactNamedExports),
      },
    }),
    serve({
      open: true,
      contentBase: "demoApp/dist",
    }),
    livereload(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
};
