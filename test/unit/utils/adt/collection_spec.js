/**
 * Collection
 * @module utils.adt
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Collection from 'utils/adt/collection';

describe('class Collection', function() {
	before(() => {
		this.mPrimitives = [1, 2, 3];
		this.mElements = ['E1', 'E2', 'E3'];
	});

	describe('constructor()', () => {
		it('should instantiate class: empty', () => {
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
			this.elements = new Collection(this.mElements, { interface: Error });
			assert.instanceOf(this.elements, Collection);
			assert.equal(this.elements.size(), 3);
		});
	});

	describe('methods', () => {
		beforeEach(() => {
			this.mockEmpty = sandbox.mock(this.empty);
			this.mockPrimitives = sandbox.mock(this.primitives);
			this.mockElements = sandbox.mock(this.elements);
		});

		afterEach(() => {
			this.empty.removeAllListeners();
			this.primitives.removeAllListeners();
			this.elements.removeAllListeners();
			sandbox.restore();
		});

		describe('push()', () => {
			it('should add new element to the end of the collection', (done) => {
				this.empty.on(Collection.events.add, (collection, newElements, options) => {
					assert.equal(collection, this.empty);
					assert.equal(collection.size(), 1);
					assert.isArray(newElements);
					assert.lengthOf(newElements, 1);
					assert.isObject(options);
					done();
				});
				assert.equal(this.empty.push(1), this.empty);
			});
			it('should add new elements to the end of the collection', (done) => {
				this.empty.on(Collection.events.add, (collection, newElements, options) => {
					assert.equal(collection, this.empty);
					assert.equal(collection.size(), 4);
					assert.isArray(newElements);
					assert.lengthOf(newElements, 3);
					assert.isObject(options);
					done();
				});
				assert.equal(this.empty.push([3, 4, 2]), this.empty);
			});
		});

		describe('unshift()', () => {
			it('should add new elements to the beginning of the collection', (done) => {
				this.empty.on(Collection.events.add, (collection, newElements, options) => {
					assert.equal(collection, this.empty);
					assert.equal(collection.size(), 6);
					assert.isArray(newElements);
					assert.lengthOf(newElements, 2);
					assert.isObject(options);
					done();
				});
				assert.equal(this.empty.unshift([6, 5]), this.empty);
			});
		});

		describe('insert()', () => {
			it('should insert new elements at a given index inside the collection', (done) => {
				this.empty.on(Collection.events.add, (collection, newElements, options) => {
					assert.equal(collection, this.empty);
					assert.equal(collection.size(), 8);
					assert.isArray(newElements);
					assert.lengthOf(newElements, 2);
					assert.isObject(options);
					done();
				});
				assert.equal(this.empty.insert([7, 8], 2), this.empty);
			});
		});

		describe('remove()', () => {});

		describe('pop()', () => {});

		describe('shift()', () => {});

		describe('findBy()', () => {});

		describe('containsBy()', () => {});

		describe('pluckAll()', () => {});

		/** Underscore Methods **/

		describe('each()', () => {});

		describe('map()', () => {});

		describe('reduce()', () => {});

		describe('reduceRight()', () => {});

		describe('find()', () => {});

		describe('findIndex()', () => {});

		describe('filter()', () => {});

		describe('some()', () => {});

		describe('every()', () => {});

		describe('reject()', () => {});

		describe('invoke()', () => {});

		describe('pluck()', () => {});

		describe('contains()', () => {});

		describe('size()', () => {});

		describe('first()', () => {});

		describe('last()', () => {});

		describe('max()', () => {});

		describe('min()', () => {});

		describe('sortBy()', () => {});

		describe('groupBy()', () => {});

		describe('countBy()', () => {});

		describe('shuffle()', () => {});

		describe('sample()', () => {});

		describe('partition()', () => {});

		describe('compact()', () => {});
	});
});
