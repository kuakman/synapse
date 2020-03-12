/**
 * @module commands
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Options from 'meta/prod.json5';
import { ClassProperties } from 'utils/decorators/helpers';
import { PipelineCommand } from 'common/pipeline-command';

/**
 * Class ProdCommand
 * @class commands.ProdCommand
 * @extends common.PipelineCommand
 */
@ClassProperties(Options)
export class ProdCommand extends PipelineCommand {
	/**
	 * Environment Run
	 * @override
	 * @returns {Promise<commands.ProdCommand>}
	 */
	async env() {
		await super.env();
		// TODO
		return this;
	}

	/**
	 * Process Run
	 * @override
	 * @returns {Promise<commands.ProdCommand>}
	 */
	async process() {
		await super.process();
		// TODO
		return this;
	}
}
