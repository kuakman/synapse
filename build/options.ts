import args from "args";
import fs from "fs";
import { resolve } from "path";

export interface IOptions {
	[key: string]: any;
	env?: string;
}

const getProject = () => {
	const file = fs.readFileSync(resolve(process.cwd(), "package.json"));
	return JSON.parse(file.toString());
};

const decorate = (options: IOptions): IOptions => {
	return { ...getProject(), options };
};

export default (): IOptions => {
	return decorate(args
		.option("env", "The environment on which the build process will run.", "dev")
		.parse(process.argv));
};
