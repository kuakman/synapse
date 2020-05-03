/**
 * Synapse Typings
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 * @module synapse
 */
declare module 'synapse' {
	// Imports
	import { Command } from '@oclif/config';
	import { Prompt } from 'enquirer';

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
