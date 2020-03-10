/**
 * Collection
 * @module utils.adt
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Collection from 'utils/adt/collection';

describe.only('class Collection', function() {
	describe('constructor()', () => {
		it('should instantiate class', () => {
			this.collection = new Collection();
			assert.instanceOf(this.collection, Collection);
			console.log(this.collection.size);
		});
	});

	describe('methods', () => {
		beforeEach(() => {
			this.mockCommand = sandbox.mock(this.collection);
		});

		afterEach(() => {
			sandbox.restore();
		});
	});
});
