/**
 * Synapse Unit Tests
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { assert } from 'chai';
import sinon from 'sinon';
import synapse from 'synapse';

describe('Synapse', function() {
	before(() => {
		this.defaultArgs = ['node', 'synapse'];
		this.opts = { exit: false };
		this.sandbox = sinon.createSandbox(sinon.defaultConfig);
	});

	beforeEach(() => {
		this.spySynapse = this.sandbox.spy(synapse);
	});

	afterEach(() => {
		delete this.spySynapse;
	});

	after(() => {
		this.sandbox.verifyAndRestore();
		this.sandbox.resetHistory();
		this.sandbox.reset();
	});

	describe('run', () => {
		xit('Should run the main cli with options', () => {
			const args = [...this.defaultArgs, '-e', 'test'];
			const actual = this.spySynapse(this.opts, ...args);
			assert.isNotEmpty(actual);
			assert.propertyVal(actual, 'e', 'test');
			assert.propertyVal(actual, 'env', 'test');
			assert(this.spySynapse.calledOnce, 'Should be called once!');
		});

		it('Should run the main cli with -v (displays the version)', () => {
			const args = [...this.defaultArgs, '-h'];
			const actual = this.spySynapse(this.opts, ...args);
			assert.isNotEmpty(actual);
		});
	});
});
