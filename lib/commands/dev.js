/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Options from 'meta/dev.json5';
import { ClassProperties } from 'utils/decorators/helpers';
import { PipelineCommand } from 'common/pipeline-command';

/**
 * Class DevCommand
 * @class commands.DevCommand
 * @extends common.PipelineCommand
 */
@ClassProperties(Options)
export class DevCommand extends PipelineCommand {
	/**
	 * Environment Run
	 * @override
	 * @returns {Promise<commands.DevCommand>}
	 */
	async env() {
		await super.env();
		// TODO
		return this;
	}

	/**
	 * Process Run
	 * @override
	 * @returns {Promise<commands.DevCommand>}
	 */
	async process() {
		await super.process();
		// TODO
		return this;
	}
}
