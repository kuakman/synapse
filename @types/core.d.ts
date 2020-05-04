/**
 * Synapse Core Typings
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 * @module synapse-core
 */
declare module 'synapse-core' {
	// Imports
	import EventEmitter from 'events';
	import { StdioOptions } from 'child_process';
	import { Collection } from 'synapse-utils';

	/**
	 * @type DependenciesType
	 */
	export type DependenciesType = 'dependencies' | 'devDependencies' | 'peerDependencies';

	/**
	 * @type ScriptType
	 */
	export type ScriptType =
		'create' |

		'start' |

		'pre-config' |
		'config' |
		'post-config' |

		'pre-clean' |
		'clean' |
		'post-clean' |

		'pre-env' |

		'pre-test' |
		'test' |
		'post-test' |

		'pre-dev' |
		'dev' |
		'post-dev' |

		'pre-prod' |
		'prod' |
		'post-prod' |

		'post-env' |

		'pre-serve' |
		'serve' |
		'post-serve' |

		'pre-release' |
		'release' |
		'post-release' |

		'end';

	/**
	 * @type EnvironmentType
	 */
	export type EnvironmentType = 'all' | 'test' | 'dev' | 'prod';

	/**
	 * @interface Core
	 * @extends EventEmitter
	 */
	export interface Core extends EventEmitter {
		readonly defaults: Partial<Core>;

		attachEvents(): Core;
		execute(methodName: string, ...args: any[]): any;
		parse(attributes?: Partial<Core>): Core;
		serialize(instance: any, ...omit: string[]): Partial<Core>;
	}

	/**
	 * @interface Environment
	 * @extends Core
	 */
	export interface Environment extends Core {
		readonly name: EnvironmentType | undefined;
		readonly config: object | undefined;

		parse(attributes?: Partial<Environment>): Environment;
		parseName(attributes?: Partial<Environment>): Environment;
		parseConfig(attributes?: Partial<Environment>, environment?: Environment): Environment;
	}

	/**
	 * @interface Script
	 * @extends Core
	 */
	export interface Script extends Core {
		readonly name: ScriptType | undefined;
		readonly queue: Collection<string>;
		readonly stdio: StdioOptions;

		isSupported(name: string): boolean;
		parse(attributes?: Partial<Script>): Script;
		parseName(attributes?: Partial<Script>): Script;
		parseQueue(attributes?: Partial<Script>, script?: Script): Script;

		run(): Promise<any>;
		create(scriptPath: string): Promise<Promise<any>>;
		execute(prevResponse: any, scriptPath: string, resolve: Function, reject: Function): Promise<void>;
	}

	/**
	 * @interface Synapse
	 * @extends Core
	 */
	export interface Synapse extends Core {
		readonly source: string;
		readonly target: string;
		readonly scripts?: Collection<Script>;
		readonly environments?: Collection<Environment>;

		parse(attributes?: Partial<Synapse>): Synapse;
		parseScripts(attributes?: Partial<Synapse>): Synapse;
		parseEnvironments(attributes?: Partial<Synapse>): Synapse;
	}

	/**
	 * @interface Archetype
	 * @extends Core
	 */
	export interface Archetype extends Core {
		readonly uri: string | undefined;
		readonly type: string | undefined;
		readonly name: string | undefined;
		readonly defaults: Partial<Archetype>;
		readonly extend: Collection<string>;
		readonly synapse: Synapse;
		readonly dependencies: Collection<DependenciesType>;
		readonly devDependencies: Collection<DependenciesType>;
		readonly peerDependencies: Collection<DependenciesType>;

		resolveUri(): string;
		load(): Promise<Archetype>;
		parse(attributes?: Partial<Archetype>): Archetype;
		parseExtend(attributes?: Partial<Archetype>): Archetype;
		parseSynapse(attributes?: Partial<Archetype>): Archetype;
		parseDependencies(attributes?: Partial<Archetype>): Archetype;
		parseDevDependencies(attributes?: Partial<Archetype>): Archetype;
		parsePeerDependencies(attributes?: Partial<Archetype>): Archetype;
		toJSON(...omit: string[]): Partial<Archetype>;
	}

	/**
	 * @type Configuration
	 */
	export type Configuration = Pick<Archetype, 'synapse' | 'dependencies' | 'devDependencies' | 'peerDependencies'>;
}
