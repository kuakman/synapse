/**
 * Core Archetype Typings
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 * @module synapse-core
 */
declare module 'synapse-core' {
	// Imports
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
	 * @interface Environment
	 * // TODO
	 */
	export interface Environment {
		backend?: any;
		frontend?: any;
	}

	/**
	 * @interface Synapse
	 */
	export interface Synapse {
		source: string;
		target: string;
		scripts?: { [script: keyof ScriptType]: string | string[] };
		environments?: { [environment: keyof EnvironmentType]: Environment };
	}

	/**
	 * @interface Configuration
	 */
	export interface Configuration {
		[index: string]: any;
		[dependency: keyof DependenciesType]: string[];
		synapse: Synapse;
	}

	/**
	 * @interface Archetype
	 * @extends NodeJS.EventEmitter
	 */
	export interface Archetype extends NodeJS.EventEmitter {
		readonly uri: string | undefined;
		readonly type: string | undefined;
		readonly name: string | undefined;
		readonly defaults: Partial<Archetype>;
		readonly extend: Collection<string>;
		readonly synapse: Synapse;
		readonly dependencies: Collection<string>;
		readonly devDependencies: Collection<string>;
		readonly peerDependencies: Collection<string>;

		load(): Archetype;
		parse(): object;
		toJSON(): object;
	}
}
