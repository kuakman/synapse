/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Options from 'meta/init.json5';
import { StaticProperties } from 'common/decorators/command';
import { ScaffoldCommand } from 'common/scaffold-command';

/**
 * Class InitCommand
 * @class commands.InitCommand
 * @extends common.ScaffoldCommand
 */
@StaticProperties(Options)
export class InitCommand extends ScaffoldCommand {
	/**
	 * Retrieve tasks
	 * @override
	 * @returns {Array}
	 */
	getTasks() {
		const tasks = super.getTasks();
		return tasks;
	}

	async askName() { return this; }
	async askConfiguration() { return this; }
	async askArchetypes() { return this; }
}
