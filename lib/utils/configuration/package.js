import extend from 'extend';
import { err } from 'utils/debug/debug';

/**
 * Package Class
 * @class Package
 */
export class Package {
	static async new() {
		return new Package().load();
	}

	async load() {
		const data = await import(`${process.cwd()}/package.json`)
			.catch(this.onError.bind(this));
		return extend(this, data);
	}

	onError(error) {
		err('Error loading package.json: %s', error.message);
		process.exit(1);
	}
};
