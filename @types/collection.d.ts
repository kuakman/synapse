/**
 *  Collection Typings
 *  @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import _ from 'underscore';

declare namespace synapse {
	export interface Silenceable {
		silent?: boolean;
	}

	export interface IteratorInfo<T extends any> {
		prev: T | undefined;
		next: T | undefined;
		isFirst: boolean;
		isLast: boolean;
	}

	export interface CompareIterator {
		(given: any, current: any): boolean;
	}

	export interface ListIteratorOn<any, TResult> extends _.ListIterator<any, TResult> {
		(value: any, index: number, list: _.List<any>, info: IteratorInfo<any>): TResult;
	}

	export interface MemoIteratorOn<any, TResult> extends _.MemoIterator<any, TResult> {
		(prev: TResult, curr: any, index: number, list: _.List<any>, info: IteratorInfo<any>): TResult;
	}

	export interface ElementConstructor {
		/**
		 * Creates a new function.
		 * @param args A list of arguments the function accepts.
		 */
		new(...args: any[]): Function;

		(...args: any[]): Function;

		readonly prototype: Function;
	}

	/**
	 * Collection Interface
	 */
	export interface Collection extends NodeJS.EventEmitter {
		readonly _chain: boolean;
		readonly _interface: ElementConstructor;
		readonly _parent: any;
		readonly _elements: any[];

		reset(options?: Silenceable, elements?: any | any[]): Collection;

		at(index: number): any;

		push(element: any | any[], options?: Silenceable): Collection;

		unshift(element: any | any[], options?: Silenceable): Collection;

		insert(element: any | any[], at?: number, options?: Silenceable): Collection;

		remove(element: any | any[], options?: Silenceable, predicate?: _.ListIterator<any, boolean>): Collection;

		pop(options?: Silenceable): Collection;

		shift(options?: Silenceable): Collection;

		eachOn(iterator: ListIteratorOn<any, void>, context?: any): _.List<any>;

		mapOn<TResult>(iterator: ListIteratorOn<any, void>, context?: any): TResult[];

		reduceOn<TResult>(iterator: MemoIteratorOn<any, TResult>, memo?: TResult, context?: any): TResult;

		containsBy(predicate: _.ListIterator<any, boolean>): boolean;

		containsAll(list: any[], matcher: CompareIterator): boolean;

		pluckAll<K extends keyof any>(...propertyNames: K[]): any[K][];

		toJSON(): object;

		// Underscore bindings

		chain(): Collection | any;

		each(iterator: _.ListIterator<any, void>, context?: any): _.List<any>;

		map(iterator: _.ListIterator<any, any[]>, context?: any): any[];

		reduce(iterator: _.ListIterator<any, any[]>, memo?: any, context?: any): any;

		reduceRight(iterator: _.ListIterator<any, any>, memo?: any, context?: any): any;

		find(iterator: _.ListIterator<any, boolean>, context?: any): any | undefined;

		findIndex(predicate: _.ListIterator<any, boolean>, context?: any): number;

		findLastIndex(predicate: _.ListIterator<any, boolean>, context?: any): number;

		filter(iterator: _.ListIterator<any, boolean>, context?: any): any[];

		reject(iterator: _.ListIterator<any, boolean>, context?: any): any[];

		every(iterator: _.ListIterator<any, boolean>, context?: any): boolean;

		some(iterator: _.ListIterator<any, boolean>, context?: any): boolean;

		contains(value: any, fromIndex?: number): boolean;

		invoke(methodName: string, ...args: any[]): any;

		pluck<K extends keyof any>(propertyName: K): any[K][];

		max(iterator: _.ListIterator<any, any>, context?: any): any;

		min(iterator: _.ListIterator<any, any>, context?: any): any;

		sortBy(iterator?: _.ListIterator<any, boolean>, context?: any): Collection;

		groupBy(iterator?: _.ListIterator<any, any>, context?: any): _.Dictionary<any[]>;

		countBy(iterator?: _.ListIterator<any, any>, context?: any): _.Dictionary<number>;

		shuffle(): any[];

		sample(n: number): any;

		size(): number;

		partition(iterator: _.ListIterator<any, boolean>): any[][];

		first(): any | undefined;

		last(): any | undefined;

		compact(): any[];
	}
}
