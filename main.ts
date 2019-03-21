/**
 * Main
 */
import colors from "colors";
import { resolve } from "path";
import get, { IOptions } from "./build/options";

const opts: IOptions = get();
console.log(colors.black.bold.bgGreen(`[${opts.env}] Running...`));
require(resolve(opts.cwd, "build", opts.env, "run")).run(opts);
