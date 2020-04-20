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

	export type SynapseScript = string | string[] | undefined | null;

	export interface SynapseScripts {
		// Executed once through the command `synapse init` or `synapse update`
		'create'?: SynapseScript;

		// Pipeline Execution Start
		'pre-start'?: SynapseScript;

		// Pipeline Execution for Configuration
		'pre-config'?: SynapseScript;
		'config'?: SynapseScript;
		'post-config'?: SynapseScript;

		// Pipeline Execution Clean (Optional)
		'pre-clean'?: SynapseScript;
		'clean'?: SynapseScript;
		'post-clean'?: SynapseScript;

		// Pipeline Execution before environment
		'pre-env'?: SynapseScript;

		// Pipeline Execution Test Environment
		'pre-test'?: SynapseScript;
		'test'?: SynapseScript;
		'post-test'?: SynapseScript;

		// Pipeline Execution Development Environment
		'pre-dev'?: SynapseScript;
		'dev'?: SynapseScript;
		'post-dev'?: SynapseScript;

		// Pipeline Execution Production Environment
		'pre-prod'?: SynapseScript;
		'prod'?: SynapseScript;
		'post-prod'?: SynapseScript;

		// Pipeline Execution after environment
		'post-env'?: SynapseScript;

		// Pipeline Execution serve phase
		'pre-serve'?: SynapseScript;
		'serve'?: SynapseScript;
		'post-serve'?: SynapseScript;

		// Pipeline Execution for Release phase
		'pre-release'?: SynapseScript;
		'release'?: SynapseScript;
		'post-release'?: SynapseScript;

		// Pipeline Execution End
		'pre-end'?: SynapseScript;
	}

	export interface SynapseEnvironment {
		[index: string]: object;
		backend?: object;
		frontend?: object;
	}

	export interface SynapseEnvironments {
		test?: SynapseEnvironment;
		dev?: SynapseEnvironment;
		prod: SynapseEnvironment;
	}

	export interface SynapseRealtime {
		server: object;
		auth: { // FIXME: Security SSH-based
			username: string;
		};
		update: 'auto' | 'manual';
	}

	export interface SynapseConfiguration {
		source: string;
		target: string;
		scripts?: SynapseScripts;
		environments?: SynapseEnvironments;
		realtime?: SynapseRealtime;
	}

	export type Synapse = {
		synapse: SynapseConfiguration;
		devDependencies?: { [index: string]: string };
		dependencies?: { [index: string]: string };
	}

	/** END SynapseConfiguration **/

	/**
	 * @interface ErrorOptions
	 */
	export interface ErrorOptions {
		code?: number;
	}

	/**
	 * @interface SynapseCommand
	 * @extends Command.Class
	 */
	export interface SynapseCommand extends Command.Class {
		start(): Promise<SynapseCommand>;
		load(): Promise<SynapseCommand>;
		end(): Promise<SynapseCommand>;
		onProgress(message?: string, status?: string): SynapseCommand;
		onSuccess(message?: string): SynapseCommand;
		onError(error: string|Error, options?: ErrorOptions): void;
		toString(): string;
	}

	/**
	 * @interface ScaffoldCommand
	 * @extends SynapseCommand
	 */
	export interface ScaffoldCommand extends SynapseCommand {
		attachEvents(): ScaffoldCommand;
		isFlagAvailable(question: object): boolean;
		question(question: object): object;
		answer(answer: object): ScaffoldCommand;
		createPrompt(Prompt: FunctionConstructor, question?: object): Promise<Prompt>|null;
		prompt(question?: object): Promise<object|object[]>|null;
		read(): Promise<ScaffoldCommand>;
		write(): Promise<ScaffoldCommand>;
		install(): Promise<ScaffoldCommand>;
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
