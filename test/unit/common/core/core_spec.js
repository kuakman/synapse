/**
 * Core Specs
 * @module common.core
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import * as _ from 'underscore';
import * as debug from 'utils/debug/debug';
import * as utils from 'utils/utils';
import colors from 'ansi-colors';
import ux from 'cli-ux';
import Instance, { Core } from 'common/core/core';

describe('Core Class', function() {
	beforeEach(() => {
		this.mDate = sandbox.mock(Date.prototype);
		this.mConsole = sandbox.mock(console);
		this.mError = new Error('Mock Fatal Error');
		this.mIsProduction = sandbox.stub(debug, 'isProduction');
		this.mUtils = sandbox.mock(utils);
		this.mUxAction = sandbox.mock(ux.action);
		this.aCommand = {
			toString: () => { return '[SomeCommand]'; },
			exit: (code) => code
		};
		this.mCommand = sandbox.mock(this.aCommand);

		this.bannerTemplate = _.template(Core.output.banner);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('static#output', () => {
		it('should retrieve synapse base configuration output', () => {
			assert.isDefined(Core.output.synapse);
			assert.isDefined(Core.output.synapse.source);
			assert.isDefined(Core.output.synapse.target);
			assert.isDefined(Core.output.banner);
			assert.isDefined(Core.output.dependencies);
			assert.isDefined(Core.output.devDependencies);
			assert.isDefined(Core.output.peerDependencies);
		});
	});

	describe('static#getBannerDefaults()', () => {
		it('should retrieve banner defaults: when year is 2020', () => {
			const result = Core.getBannerDefaults();

			assert.equal(result.version, 'v[?.?.?]');
			assert.equal(result.year, 2020);
		});
		it('should retrieve banner defaults: when year is NOT 2020', () => {
			const mockYear = 2021;
			this.mDate.expects('getFullYear').once().returns(mockYear);

			const result = Core.getBannerDefaults();

			assert.equal(result.version, 'v[?.?.?]');
			assert.equal(result.year, `2020-${mockYear}`);
			this.mDate.verify();
		});
	});

	describe('banner()', () => {
		it('should output synapse banner to the stdin: when in production', () => {
			const mockModel = { version: '1.1.0', url: 'http://myurl', year: 2020 };
			this.mIsProduction.returns(true);
			this.mConsole.expects('log')
				.once()
				.withArgs(colors.cyan(this.bannerTemplate(mockModel)));

			Instance.banner(mockModel);

			this.mConsole.verify();
		});
	});

	describe('onProgress()', () => {
		it('should handle progress status: production is on, message & status are defined', () => {
			this.mIsProduction.returns(true);
			this.mUtils.expects('defined')
				.twice()
				.returns(true);
			this.mUxAction.expects('start')
				.once()
				.withArgs('Some Message', 'Initializing', Instance.uxOptions);

			assert.equal(Instance.onProgress(this.aCommand, 'Some Message', 'Initializing'), this.aCommand);
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

			assert.equal(Instance.onProgress(this.aCommand, 'Some Message'), this.aCommand);
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mUtils.verify();
			this.mUxAction.verify();
		});
		it('should handle progress status: production is off, no message & status are defined', () => {
			this.mIsProduction.returns(false);
			this.mUtils.expects('defined').never();
			this.mUxAction.expects('start').never();

			assert.equal(Instance.onProgress(this.aCommand, undefined, 'Initializing'), this.aCommand);
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mUtils.verify();
			this.mUxAction.verify();
		});
	});

	describe('onSuccess()', () => {
		it('should handle success status: when production is on', () => {
			this.mIsProduction.returns(true);
			this.mUxAction.expects('stop').once().withArgs('');

			assert.equal(Instance.onSuccess(this.aCommand), this.aCommand);
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mUxAction.verify();
		});
		it('should handle success status: when production is off', () => {
			this.mIsProduction.returns(false);
			this.mUxAction.expects('stop').never();

			assert.equal(Instance.onSuccess(this.aCommand), this.aCommand);
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

			assert.isUndefined(Instance.onError(this.mError, this.aCommand, options));
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mCommand.verify();
			this.mUxAction.verify();
		});
		it('should handle error status: when production is off', () => {
			const options = { code: 1 };
			this.mIsProduction.returns(false);
			this.mUxAction.expects('stop').never();
			this.mCommand.expects('exit').once().withArgs(options.code);

			assert.isUndefined(Instance.onError(this.mError, this.aCommand, options));
			assert.isTrue(this.mIsProduction.calledOnce);

			this.mCommand.verify();
			this.mUxAction.verify();
		});
	});

});
