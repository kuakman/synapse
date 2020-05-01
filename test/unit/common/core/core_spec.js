import * as debug from 'utils/debug/debug';
import * as utils from 'utils/utils';
import ux from 'cli-ux';

/**
 * Core Specs
 * @module common.core
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
describe.skip('Core Class', function() {
	beforeEach(() => {
		this.mIsProduction = sandbox.stub(debug, 'isProduction');
		this.mUtils = sandbox.mock(utils);
		this.mUxAction = sandbox.mock(ux.action);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('onProgress()', () => {
		it('should handle progress status: production is on, message & status are defined', () => {
			this.mIsProduction.returns(true);
			this.mUtils.expects('defined').twice().returns(true);
			this.mUxAction.expects('start').once();

			assert.equal(this.command.onProgress('Some Message', 'Initializing'), this.command);
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mUtils.verify();
			this.mUxAction.verify();
		});
		it('should handle progress status: production is on, message defined & status not defined', () => {
			this.mIsProduction.returns(true);
			this.mUtils.expects('defined').twice()
				.onFirstCall().returns(true)
				.onSecondCall().returns(false);
			this.mUxAction.expects('start').never();

			assert.equal(this.command.onProgress('Some Message'), this.command);
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mUtils.verify();
			this.mUxAction.verify();
		});
		it('should handle progress status: production is off, no message & status are defined', () => {
			this.mIsProduction.returns(false);
			this.mUtils.expects('defined').never();
			this.mUxAction.expects('start').never();

			assert.equal(this.command.onProgress(undefined, 'Initializing'), this.command);
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mUtils.verify();
			this.mUxAction.verify();
		});
	});

	describe('onSuccess()', () => {
		it('should handle success status: when production is on', () => {
			this.mIsProduction.returns(true);
			this.mUxAction.expects('stop').once().withArgs('');

			assert.equal(this.command.onSuccess(), this.command);
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mUxAction.verify();
		});
		it('should handle success status: when production is off', () => {
			this.mIsProduction.returns(false);
			this.mUxAction.expects('stop').never();

			assert.equal(this.command.onSuccess(), this.command);
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mUxAction.verify();
		});
	});

	describe('onError()', () => {
		it('should handle error status: when production is on', () => {
			const options = { code: 1 };
			this.mIsProduction.returns(true);
			this.mUxAction.expects('stop').withArgs(`${this.mError.message} - Code: ${options.code}`);
			this.mCommand.expects('exit').once().withArgs(options.code);

			assert.isUndefined(this.command.onError(this.mError, options));
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mCommand.verify();
			this.mUxAction.verify();
		});
		it('should handle error status: when production is off', () => {
			const options = { code: 1 };
			this.mIsProduction.returns(false);
			this.mUxAction.expects('stop').never();
			this.mCommand.expects('exit').once().withArgs(options.code);

			assert.isUndefined(this.command.onError(this.mError, options));
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mCommand.verify();
			this.mUxAction.verify();
		});
	});

});
