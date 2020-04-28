/**
 *  Collection Typings
 *  @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { UnderscoreStatic } from 'underscore';

type UnderscoreCollection = Pick <UnderscoreStatic,
	'each' |
	'map' |
	'reduce' |
	'reduceRight' |
	'find' |
	'findIndex' |
	'filter' |
	'some' |
	'every' |
	'reject' |
	'pluck' |
	'contains' |
	'size' |
	'first' |
	'last' |
	'max' |
	'min' |
	'sortBy' |
	'groupBy' |
	'countBy' |
	'shuffle' |
	'sample' |
	'partition' |
	'compact'>;

export interface Silenceable {
	silent?: boolean;
}

/**
 * Collection Interface
 * FIXME: Redefine Underscore augmentation in this interface
 */
export interface Collection extends UnderscoreCollection {
	readonly _chain: boolean;
	readonly interface: FunctionConstructor;
	readonly parent: any;
	readonly elements: any[];
	reset(options?: Silenceable, elements?: any[]): Collection;
	at(index: number): any;
	push(element: any, options?: Silenceable): Collection;
	unshift(element: any, options?: Silenceable): Collection;
	insert(element: any, at?: number, options?: Silenceable): Collection;
	remove(element: any, options?: Silenceable, predicate?: Function): Collection;
	pop(options?: Silenceable): Collection;
	shift(options?: Silenceable): Collection;
	eachOn(predicate: Function): any[];
	mapOn(predicate: Function): any[];
	reduceOn(predicate: Function, initial: any): any[];
	containsBy(predicate: Function): boolean;
	containsAll(list: any[], matcher: Function): boolean;
	pluckAll(...propertyNames: string[]): any[];
	chain(): Collection;
	value(): any;
	toJSON(): object;
}
