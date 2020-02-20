/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Options from 'meta/test.json5';
import { StaticProperties } from 'common/decorators/command';
import { PipelineCommand } from 'common/pipeline-command';

/**
 * Class TestCommand
 * @class commands.TestCommand
 * @extends common.PipelineCommand
 */
@StaticProperties(Options)
export class TestCommand extends PipelineCommand {
	/**
	 * Environment Run
	 * @override
	 * @returns {Promise<commands.TestCommand>}
	 */
	async env() {
		await super.env();
		// TODO
		return this;
	}

	/**
	 * Process Run
	 * @override
	 * @returns {Promise<commands.TestCommand>}
	 */
	async process() {
		await super.process();
		// TODO
		return this;
	}
}
