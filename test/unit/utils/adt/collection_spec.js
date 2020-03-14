/**
 * Collection
 * @module utils.adt
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import extend from 'extend';
import Collection from 'utils/adt/collection';

describe.only('class Collection', function() {
	before(() => {
		this.mPrimitives = [1, 2, 3];
		this.mElements = [{ message: 'E1', value: 1 }, { message: 'E2', value: 2 }, { message: 'E3', value: 3 }];
		this.Generic = class Generic {
			constructor(attrs = {}) { extend(true, this, attrs); }
			say(prefix) { return `${prefix} ${this.message}`; };
			toJSON() { return { message: this.message, value: this.value }; }
		};
	});

	describe('constructor()', () => {
		it('should instantiate class: primitives', () => {
			this.empty = new Collection();
			assert.instanceOf(this.empty, Collection);
			assert.equal(this.empty.size(), 0);
		});
		it('should instantiate class: primitives', () => {
			this.primitives = new Collection(this.mPrimitives);
			assert.instanceOf(this.primitives, Collection);
			assert.equal(this.primitives.size(), 3);
		});
		it('should instantiate class: interface', () => {
			this.elements = new Collection(this.mElements, { interface: this.Generic });
			assert.instanceOf(this.elements, Collection);
			assert.equal(this.elements.size(), 3);
		});
	});

	describe('methods', () => {
		beforeEach(() => {
			this.primitives.push(this.mPrimitives);
			this.elements.push(this.mElements);
		});

		afterEach(() => {
			this.primitives.removeAllListeners();
			this.elements.removeAllListeners();
			this.primitives.reset();
			this.elements.reset();
			sandbox.restore();
		});

		describe('fireEvent()', () => {
			it('should NOT fire an event: name is not defined', () => {
				this.spyEmit = sandbox.spy(this.primitives, 'emit');
				assert.equal(this.primitives.fireEvent(), this.primitives);
				assert.isFalse(this.spyEmit.calledOnce);
			});
			it('should NOT fire an event: name defined, options.silent = true', () => {
				this.spyEmit = sandbox.spy(this.primitives, 'emit');
				assert.equal(this.primitives.fireEvent('some:event', { silent: true }), this.primitives);
				assert.isFalse(this.spyEmit.calledOnce);
			});
		});

		describe('at()', () => {
			it('should retrieve an element at a given index', () => {
				assert.hasAllKeys(this.elements.at(2), ['message', 'value']);
			});
			it('should retrieve an element at a given index: default (first element)', () => {
				assert.hasAllKeys(this.elements.at(), ['message', 'value']);
			});
		});

		describe('push()', () => {
			it('should add new element/s to the end of the collection (primitives)', (done) => {
				this.primitives.on(Collection.events.add, (collection, elements, options) => {
					assert.equal(collection, this.primitives);
					assert.equal(collection.size(), 4);
					assert.isArray(elements);
					assert.lengthOf(elements, 1);
					assert.isObject(options);
					done();
				});
				assert.equal(this.primitives.push(1), this.primitives);
			});
			it('should add new element/s to the end of the collection (interface)', (done) => {
				this.elements.on(Collection.events.add, (collection, elements, options) => {
					assert.equal(collection, this.elements);
					assert.equal(collection.size(), 5);
					assert.isArray(elements);
					assert.lengthOf(elements, 2);
					assert.isObject(options);
					done();
				});
				assert.equal(this.elements.push([{ message: 'E4', value: 4 }, { message: 'E5', value: 5 }]), this.elements);
			});
		});

		describe('unshift()', () => {
			it('should add new element/s to the beginning of the collection (primitives)', (done) => {
				this.primitives.on(Collection.events.add, (collection, elements, options) => {
					assert.equal(collection, this.primitives);
					assert.equal(collection.size(), 5);
					assert.isArray(elements);
					assert.lengthOf(elements, 2);
					assert.isObject(options);
					done();
				});
				assert.equal(this.primitives.unshift([4, 5]), this.primitives);
			});
			it('should add new element/s to the beginning of the collection (interface)', (done) => {
				this.elements.on(Collection.events.add, (collection, elements, options) => {
					assert.equal(collection, this.elements);
					assert.equal(collection.size(), 4);
					assert.isArray(elements);
					assert.lengthOf(elements, 1);
					assert.isObject(options);
					done();
				});
				assert.equal(this.elements.unshift([{ message: 'E0', value: 0 }]), this.elements);
			});
		});

		describe('insert()', () => {
			it('should insert new element/s at a given index (primitives)', (done) => {
				this.primitives.on(Collection.events.add, (collection, elements, options) => {
					assert.equal(collection, this.primitives);
					assert.equal(collection.size(), 5);
					assert.isArray(elements);
					assert.lengthOf(elements, 2);
					assert.isObject(options);
					done();
				});
				assert.equal(this.primitives.insert([4, 5], 2), this.primitives);
			});
			it('should insert new element/s at a given index (interface)', (done) => {
				this.elements.on(Collection.events.add, (collection, elements, options) => {
					assert.equal(collection, this.elements);
					assert.equal(collection.size(), 5);
					assert.isArray(elements);
					assert.lengthOf(elements, 2);
					assert.isObject(options);
					done();
				});
				assert.equal(this.elements.insert([{ message: 'E4', value: 4 }, { message: 'E5', value: 5 }], 2), this.elements);
			});
		});

		describe('remove()', () => {
			it('should remove existing elements (primitives)', (done) => {
				this.primitives.on(Collection.events.remove, (collection, removed, options) => {
					assert.equal(collection, this.primitives);
					assert.equal(collection.size(), 1);
					assert.isArray(removed);
					assert.lengthOf(removed, 2);
					assert.isObject(options);
					done();
				});
				assert.equal(this.primitives.remove([2, 3]), this.primitives);
			});
			it('should remove existing elements (interface)', (done) => {
				this.elements.on(Collection.events.remove, (collection, removed, options) => {
					assert.equal(collection, this.elements);
					assert.equal(collection.size(), 1);
					assert.isArray(removed);
					assert.lengthOf(removed, 2);
					assert.isObject(options);
					done();
				});
				assert.equal(this.elements.remove([{ message: 'E1', value: 1 }, { message: 'E3', value: 3 }]), this.elements);
			});
		});

		describe('pop()', () => {
			it('should remove last element (primitives)', (done) => {
				this.primitives.on(Collection.events.remove, (collection, removed, options) => {
					assert.equal(collection, this.primitives);
					assert.equal(collection.size(), 2);
					assert.isArray(removed);
					assert.lengthOf(removed, 1);
					assert.isObject(options);
					done();
				});
				assert.equal(this.primitives.pop(), this.primitives);
			});
		});

		describe('shift()', () => {
			it('should remove first element (primitives)', (done) => {
				this.primitives.on(Collection.events.remove, (collection, removed, options) => {
					assert.equal(collection, this.primitives);
					assert.equal(collection.size(), 2);
					assert.isArray(removed);
					assert.lengthOf(removed, 1);
					assert.isObject(options);
					done();
				});
				assert.equal(this.primitives.shift(), this.primitives);
			});
		});

		describe('eachOn()', () => {
			it('should iterate over elements with extra meta', () => {
				this.elements.eachOn((element, ix, elements, meta) => {
					assert.hasAllKeys(meta, ['prev', 'next', 'isFirst', 'isLast']);
				});
			});
		});

		describe('mapOn()', () => {
			it('should resolve a map, with iteration over elements with extra meta', () => {
				assert.isArray(this.elements.mapOn((element, ix, elements, meta) => {
					assert.hasAllKeys(meta, ['prev', 'next', 'isFirst', 'isLast']);
					return element;
				}));
			});
		});

		describe('reduceOn()', () => {
			it('should resolve a memo, with iteration over elements with extra meta', () => {
				assert.hasAllKeys(this.elements.reduceOn((memo, element, ix, elements, meta) => {
					assert.hasAllKeys(meta, ['prev', 'next', 'isFirst', 'isLast']);
					memo[element.message] = ix;
					return memo;
				}, {}), ['E1', 'E2', 'E3']);
			});
		});

		describe('containsBy()', () => {
			it('should return true if contains the element', () => {
				assert.isTrue(this.primitives.containsBy((element) => element === 3));
			});
		});

		describe('pluckAll()', () => {
			it('should return true if contains the element', () => {
				const result = this.elements.pluckAll('message');
				assert.isArray(result);
				assert.lengthOf(result, 3);
				assert.sameDeepMembers(result, [{ message: 'E1' }, { message: 'E2' }, { message: 'E3' }]);
			});
		});

		describe('toJSON()', () => {
			it('should serialize the collection into a json representation', () => {
				const result = this.elements.toJSON();
				assert.isArray(result);
				assert.lengthOf(result, 3);
				assert.sameDeepMembers(result, this.mElements);
			});
		});

		xdescribe('chain() - TODO', () => {
			// TODO
			// this.elements.chain().filter().compact() => <Instance of Collection> with result;
			// Unless your operator's chain ends with find(), last(), or max() for example.
		});

		/** Underscore Methods **/

		describe('each()', () => {
			it('should iterate over elements', () => {
				this.elements.each((element) => assert.instanceOf(element, this.Generic));
			});
		});

		describe('map()', () => {
			it('should return an array of elements', () => {
				const result = this.elements.map((element, ix, elements) => {
					assert.instanceOf(element, this.Generic);
					assert.isNumber(ix);
					assert.isArray(elements);
					return element;
				});
				assert.isArray(result);
				assert.lengthOf(result, 3);
			});
		});

		describe('reduce()', () => {
			it('should resolve a memo by iterating over the elements', () => {
				assert.hasAllKeys(this.elements.reduce((memo, element) => {
					memo[element.message] = element.value;
					return memo;
				}, {}), ['E1', 'E2', 'E3']);
			});
		});

		describe('reduceRight()', () => {
			it('should resolve a memo by iterating over the elements (from end to start)', () => {
				assert.hasAllKeys(this.elements.reduceRight((memo, element) => {
					memo[element.message] = element.value;
					return memo;
				}, {}), ['E1', 'E2', 'E3']);
			});
		});

		describe('find()', () => {
			it('should find an element by predicate', () => {
				assert.equal(this.primitives.find((element) => element === 3), 3);
			});
		});

		describe('findIndex()', () => {
			it('should find the index by predicate', () => {
				assert.equal(this.elements.findIndex((element) => {
					return element.value === 2;
				}), 1);
			});
		});

		describe('filter()', () => {
			it('should filter elements by predicate', () => {
				assert.sameDeepMembers(this.elements.filter((element) => {
					return element.value >= 2;
				}), [this.mElements[1], this.mElements[2]]);
			});
		});

		describe('some()', () => {
			it('should return true for some elements that pass predicate condition', () => {
				assert.isTrue(this.elements.some((element) => element.value === 2));
			});
		});

		describe('every()', () => {
			it('should return true for all elements that pass predicate condition', () => {
				assert.isTrue(this.elements.every((element) => [1, 2, 3].includes(element.value)));
			});
		});

		describe('reject()', () => {
			it('should reject elements by predicate', () => {
				const result = this.elements.reject((element) => element.value !== 2);
				assert.sameDeepMembers(result, [this.mElements[1]]);
			});
		});

		describe('invoke()', () => {
			it('should invoke a method over all the elements in the collection', () => {
				const result = this.elements.invoke('say', 'Howdy!');
				assert.sameMembers(result, ['Howdy! E1', 'Howdy! E2', 'Howdy! E3']);
			});
		});

		describe('pluck()', () => {
			it('should return a flat array with values for a given property', () => {
				const result = this.elements.pluck('value');
				assert.sameMembers(result, [1, 2, 3]);
			});
		});

		describe('contains()', () => {
			it('should return true, when the element is contained in the collection: primitives', () => {
				assert.isTrue(this.primitives.contains(2));
			});
			it('should return true, when the element is contained in the collection: elements', () => {
				assert.isTrue(this.elements.contains(this.elements.at(1)));
			});
		});

		describe('size()', () => {
			it('should retrieve the size', () => {
				assert.equal(this.elements.size(), 3);
			});
		});

		describe('first()', () => {
			it('should retrieve the first element', () => {
				assert.ownInclude(this.elements.first(), this.mElements[0]);
			});
		});

		describe('last()', () => {
			it('should retrieve the last element', () => {
				assert.ownInclude(this.elements.last(), this.mElements[2]);
			});
		});

		describe('max()', () => {
			it('should retrieve the max value by predicate', () => {
				assert.propertyVal(this.elements.max((element) => element.value > 2), 'message', 'E3');
			});
		});

		describe('min()', () => {
			it('should retrieve the min value by predicate', () => {
				assert.propertyVal(this.elements.min((element) => element.value < 2), 'message', 'E2');
			});
		});

		describe('groupBy()', () => {
			xit('should make groups by a predicate', () => {});
		});

		describe('countBy()', () => {
			xit('should count by a predicate', () => {});
		});

		describe('sample()', () => {
			xit('should retrieve a random sample from the collection', () => {});
		});

		describe('partition()', () => {
			xit('should make different partitions by a predicate', () => {});
		});

		describe('compact()', () => {
			xit('should compact values from the collection', () => {});
		});

		// TODO: Needs special treatment to mutate internal elements array
		describe('sortBy()', () => {});

		// TODO: Needs special treatment to mutate internal elements array
		describe('shuffle()', () => {});
	});
});
