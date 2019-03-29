/**
 * Rollup Bundles Utility
 */
import {ModuleJSON, OutputOptions, ResolvedId, ResolvedIdMap} from "rollup";

export type Bundles = {
	[name: string]: string[];
};

const getFilename = (target: string, output?: OutputOptions): string | null => {
	return output && output.file ? output.file.replace(target, "") : ":anonymous";
};

const getEntry = (memo: string[], entry: [string, ResolvedId]): string[] => {
	const name = entry[0];
	const value = entry[1];
	if (!value.external) memo.push(name);
	return memo;
};

export default (target: string, output?: OutputOptions, modules?: ModuleJSON[]): object | null => {
	const module: ModuleJSON | null = modules ? modules[0] : null;
	if (!module) return null;
	const ids: ResolvedIdMap = module.resolvedIds;
	return { bundles: { [`${getFilename(target, output)}`]: Object.entries(ids).reduce(getEntry, []) } };
};
