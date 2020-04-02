/**
 * Bundles Task
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
const getFilename = (target, output) => {
	return output && output.file ? output.file.replace(target, '') : ':anonymous';
};

const getEntry = (memo, entry) => {
	const name = entry[0];
	const value = entry[1];
	if (!value.external) memo.push(name);
	return memo;
};

export default (target, output, modules) => {
	const module = modules ? modules[0] : null;
	if (!module) return null;
	const ids = module.resolvedIds;
	return { bundles: { [`${getFilename(target, output)}`]: Object.entries(ids).reduce(getEntry, []) } };
};
