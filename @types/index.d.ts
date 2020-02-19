/**
 *  Synapse Typings
 *  @author Patricio Ferreira <3dimentionar@gmail.com>
 **/
import { Command } from '@oclif/config';

/**
 * @namespace synapse
 */
declare namespace synapse {
	/**
	 * @interface SynapseCommand
	 * @extends Command.Class
	 */
	export interface SynapseCommand extends Command.Class {
		getTasks(): Promise<SynapseCommand>[];
		toString(): string;
		onError(error: Error): void;
		start(): Promise<SynapseCommand>;
		end(): Promise<SynapseCommand>;
	}

	/**
	 * @interface ScaffoldCommand
	 * @extends SynapseCommand
	 */
	export interface ScaffoldCommand extends SynapseCommand {
		prompting(): Promise<ScaffoldCommand>;
	}

	/**
	 * @interface PipelineCommand
	 * @extends SynapseCommand
	 */
	export interface PipelineCommand extends SynapseCommand {
		configuration(): Promise<PipelineCommand>;
		clean(): Promise<PipelineCommand>;
		env(): Promise<PipelineCommand>;
		process(): Promise<PipelineCommand>;
		release(): Promise<PipelineCommand>;
	}

	/**
	 * @interface InitCommand
	 * @extends ScaffoldCommand
	 */
	export interface InitCommand extends ScaffoldCommand {
		// TODO
	}

	/**
	 * @interface CleanCommand
	 * @extends PipelineCommand
	 */
	export interface CleanCommand extends PipelineCommand {
		// TODO
	}

	/**
	 * @interface TestCommand
	 * @extends PipelineCommand
	 */
	export interface TestCommand extends PipelineCommand {
		// TODO
	}

	/**
	 * @interface DevCommand
	 * @extends PipelineCommand
	 */
	export interface DevCommand extends PipelineCommand {
		// TODO
	}

	/**
	 * @interface ProdCommand
	 * @extends PipelineCommand
	 */
	export interface ProdCommand extends PipelineCommand {
		// TODO
	}
}
