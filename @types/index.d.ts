/**
 *  Synapse Typings
 *  @author Patricio Ferreira <3dimentionar@gmail.com>
 **/
import { Command } from '@oclif/config';
import { Prompt } from 'enquirer';

/**
 * @namespace synapse
 */
declare namespace synapse {
	/** Synapse Configuration **/

	export type Script = string | string[] | undefined | null;

	export interface Scripts {
		// Executed once through the command `synapse init` or `synapse update`
		'create'?: Script;

		// Pipeline Execution Start
		'pre-start'?: Script;

		// Pipeline Execution for Configuration
		'pre-config'?: Script;
		'config'?: Script;
		'post-config'?: Script;

		// Pipeline Execution Clean (Optional)
		'pre-clean'?: Script;
		'clean'?: Script;
		'post-clean'?: Script;

		// Pipeline Execution before environment
		'pre-env'?: Script;

		// Pipeline Execution Test Environment
		'pre-test'?: Script;
		'test'?: Script;
		'post-test'?: Script;

		// Pipeline Execution Development Environment
		'pre-dev'?: Script;
		'dev'?: Script;
		'post-dev'?: Script;

		// Pipeline Execution Production Environment
		'pre-prod'?: Script;
		'prod'?: Script;
		'post-prod'?: Script;

		// Pipeline Execution after environment
		'post-env'?: Script;

		// Pipeline Execution serve phase
		'pre-serve'?: Script;
		'serve'?: Script;
		'post-serve'?: Script;

		// Pipeline Execution for Release phase
		'pre-release'?: Script;
		'release'?: Script;
		'post-release'?: Script;

		// Pipeline Execution End
		'pre-end'?: Script;
	}

	export interface Environment {
		[index: string]: object;
		backend?: object;
		frontend?: object;
	}

	export interface Environments {
		all?: Environment;
		test?: Environment;
		dev?: Environment;
		prod?: Environment;
	}

	export interface Synapse {
		source: string;
		target: string;
		scripts?: Scripts;
		environments?: Environments;
	}

	export interface DependencyType {
		dependencies: string;
		devDependencies: string;
		peerDependencies: string;
	}

	export type Configuration = {
		[index: string]: any;
		[name: keyof DependencyType]: string;
		synapse: Synapse;
		banner: string;
	}

	/** END SynapseConfiguration **/

	/** Types **/

	export interface Archetype {
		name: string;
		type: string;
		dependencies: string[];
		extend?: string;
		multiple: boolean;
		value: any;
	}

	/** END Types **/

	/**
	 * @interface SynapseCommand
	 * @extends Command.Class
	 */
	export interface SynapseCommand extends Command.Class {
		attachEvents(): SynapseCommand;
		setupTasks(): SynapseCommand;
		start(): Promise<SynapseCommand>;
		load(): Promise<SynapseCommand>;
		end(): Promise<SynapseCommand>;
		toString(): string;
	}

	/**
	 * @interface ScaffoldCommand
	 * @extends SynapseCommand
	 */
	export interface ScaffoldCommand extends SynapseCommand {
		isFlagAvailable(question: object): boolean;
		findAnswerByName(name: string): Archetype|null;
		question(question: object): object;
		answer(answer: object): ScaffoldCommand;
		createPrompt(Prompt: FunctionConstructor, question?: object): Promise<Prompt>|null;
		prompt(question?: object): Promise<object|object[]>|null;
		process(): Promise<ScaffoldCommand>;
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
