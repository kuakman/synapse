/**
 * Synapse Utils Typings
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 * @module synapse-utils
 */
declare module 'synapse-utils' {
	// Imports
	import _ from 'underscore';

	/**
	 * @interface EventOptions
	 */
	export interface EventOptions {
		silent?: boolean;
	}

	/**
	 * @interface CompareIterator
	 */
	export interface IteratorInfo<T> {
		prev: T | undefined;
		next: T | undefined;
		isFirst: boolean;
		isLast: boolean;
	}

	/**
	 * @interface CompareIterator
	 */
	export interface CompareIterator<T> {
		(given: any, current: T): boolean;
	}

	/**
	 * @interface ListIteratorOn
	 */
	export interface ListIteratorOn<T, TResult> extends _.ListIterator<T, TResult> {
		(value: T, index: number, list: _.List<T>, info: IteratorInfo<T>): TResult;
	}

	/**
	 * @interface MemoIteratorOn
	 */
	export interface MemoIteratorOn<T, TResult> extends _.MemoIterator<T, TResult> {
		(prev: TResult, curr: T, index: number, list: _.List<T>, info: IteratorInfo<T>): TResult;
	}

	/**
	 * @interface Collection
	 */
	export interface Collection<T> extends NodeJS.EventEmitter {
		readonly _chain: boolean;
		readonly _interface: T | undefined;
		readonly _parent: any;
		readonly _elements: T[];
		reset(options?: EventOptions, elements?: T | T[]): Collection<T>;
		at(index: number): T | undefined;
		push(element: T | T[], options?: EventOptions): Collection<T>;
		unshift(element: T | T[], options?: EventOptions): Collection<T>;
		insert(element: T | T[], at?: number, options?: EventOptions): Collection<T>;
		remove(element: T | T[], options?: EventOptions, predicate?: _.ListIterator<T, boolean>): Collection<T>;
		pop(options?: EventOptions): Collection<T>;
		shift(options?: EventOptions): Collection<T>;
		eachOn(iterator: ListIteratorOn<T, void>, context?: any): _.List<T>;
		mapOn<TResult>(iterator: ListIteratorOn<T, void>, context?: any): TResult[];
		reduceOn<TResult>(iterator: MemoIteratorOn<T, TResult>, memo?: TResult, context?: any): TResult;
		containsBy(predicate: _.ListIterator<T, boolean>): boolean;
		containsAll(list: any[], matcher: CompareIterator<T>): boolean;
		pluckAll<K extends keyof T>(...propertyNames: K[]): T[K][];
		toJSON(): object;
		chain(): Collection<T> | any;
		each(iterator: _.ListIterator<T, void>, context?: any): _.List<T>;
		map(iterator: _.ListIterator<T, any[]>, context?: any): any[];
		reduce(iterator: _.ListIterator<T, any>, memo?: any, context?: any): any;
		reduceRight(iterator: _.ListIterator<T, any>, memo?: any, context?: any): any;
		find(iterator: _.ListIterator<T, boolean>, context?: any): T | undefined;
		findIndex(predicate: _.ListIterator<T, boolean>, context?: any): number;
		findLastIndex(predicate: _.ListIterator<T, boolean>, context?: any): number;
		filter(iterator: _.ListIterator<T, boolean>, context?: any): any[];
		reject(iterator: _.ListIterator<T, boolean>, context?: any): any[];
		every(iterator: _.ListIterator<T, boolean>, context?: any): boolean;
		some(iterator: _.ListIterator<T, boolean>, context?: any): boolean;
		contains(value: T, fromIndex?: number): boolean;
		invoke(methodName: string, ...args: any[]): any;
		pluck<K extends keyof T>(propertyName: K): T[K][];
		max(iterator: _.ListIterator<T, any>, context?: any): any;
		min(iterator: _.ListIterator<T, any>, context?: any): any;
		sortBy(iterator?: _.ListIterator<T, boolean>, context?: any): Collection<T>;
		groupBy(iterator?: _.ListIterator<T, any>, context?: any): _.Dictionary<T[]>;
		countBy(iterator?: _.ListIterator<T, any>, context?: any): _.Dictionary<number>;
		shuffle(): T[];
		sample(n: number): T;
		size(): number;
		partition(iterator: _.ListIterator<T, boolean>): T[][];
		first(): T | undefined;
		last(): T | undefined;
		compact(): T[];
	}
}
