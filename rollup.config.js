import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import lernaGetPackages from "lerna-get-packages";
import path from "path";

const { LERNA_PACKAGE_NAME, LERNA_ROOT_PATH } = process.env;
const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, "src/index.js");
const OUTPUT_DIR = path.join(PACKAGE_ROOT_PATH, "dist");
const PKG_JSON = require(path.join(PACKAGE_ROOT_PATH, "package.json"));
const IS_BROWSER_BUNDLE = !!PKG_JSON.browser;

const ALL_MODULES = lernaGetPackages(LERNA_ROOT_PATH).map(
  ({ package: { name } }) => name
);

const mirror = array =>
  array.reduce((acc, val) => ({ ...acc, [val]: val }), {});

const formats = IS_BROWSER_BUNDLE ? ["umd"] : ["es", "cjs"];

export default formats.map(format => ({
  plugins: [
    nodeResolve({
      mainFields: ['module']
    }),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "node_modules/react-is/index.js": ["isValidElementType"]
      }
    })
  ],
  input: INPUT_FILE,
  
  external: IS_BROWSER_BUNDLE ? undefined : ALL_MODULES,
  
  output: {
    file: path.join(OUTPUT_DIR, `index.${format}.js`),
    format, 
    sourcemap: true,
    name: LERNA_PACKAGE_NAME,
    globals: IS_BROWSER_BUNDLE ? mirror(ALL_MODULES) : undefined,
    amd: {
      id: LERNA_PACKAGE_NAME
    }
  }
}));
