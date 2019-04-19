import { bar, bar_baz } from "@mikelockzrimble/bar";
import foo from "./foo";

console.log(foo(), bar(), bar_baz());

export { default as foo } from "./foo";
