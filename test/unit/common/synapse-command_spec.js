/**
 * SynapseCommand Class Specs
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { SynapseCommand } from 'common/synapse-command';
import Collection from 'utils/adt/collection';
import ux from 'cli-ux';
import * as utils from 'utils/utils';
import * as debug from 'utils/debug/debug';

describe('class SynapseCommand', function() {
	describe('constructor()', () => {
		it('should instantiate class', () => {
			this.command = new SynapseCommand([], { root: process.cwd() });
			assert.instanceOf(this.command, SynapseCommand);
		});
	});

	describe('methods', () => {
		beforeEach(() => {
			this.mIsProduction = sandbox.stub(debug, 'isProduction');
			this.mUtils = sandbox.mock(utils);
			this.mUxAction = sandbox.mock(ux.action);
			this.mCommand = sandbox.mock(this.command);
			this.mStart = sandbox.mock(this.command.start);
			this.mLoad = sandbox.mock(this.command.load);
			this.mEnd = sandbox.mock(this.command.end);
			this.mError = new Error('Mock Fatal Error');

			this.spyCollectionInvoke = sandbox.spy(this.command.tasks, 'invoke');
		});

		afterEach(() => {
			sandbox.restore();
		});

		describe('tasks', () => {
			it('should retrieve the list of tasks associated with this command', () => {
				const result = this.command.tasks;
				assert.instanceOf(result, Collection);
				assert.equal(result.size(), 3);
				assert.include(result, this.command.start);
				assert.include(result, this.command.load);
				assert.include(result, this.command.end);
			});
		});

		describe('init()', () => {
			it('should initialize command', async () => {
				this.mCommand.expects('parse')
					.once()
					.withArgs(SynapseCommand)
					.returns({});
				assert.instanceOf(await this.command.init(), SynapseCommand);
				assert.isOk(this.command.synapsePath);
				assert.equal(this.command.synapsePath, process.cwd());
			});
		});

		describe('start()', () => {
			it('should start the command', async () => {
				assert.equal(await this.command.start(), this.command);
			});
		});

		describe('load()', () => {
			it('should load project package: package hasn\'t been loaded', async () => {
				this.mCommand.expects('onProgress')
					.once().withArgs('Package', 'Reading...')
					.returns(this.command);
				this.mCommand.expects('onSuccess')
					.once()
					.withArgs('Package Loaded.')
					.returns(this.command);

				assert.equal(await this.command.load(), this.command);
				assert.isOk(this.command.package);
				assert.include(this.command.package, { name: 'synapse' });

				this.mCommand.verify();
			});
		});

		describe('end()', () => {
			it('should end the command', async () => {
				assert.equal(await this.command.end(), this.command);
			});
		});

		describe('run()', () => {
			it('should run the command: success', async () => {
				const stubTask = sandbox.stub().resolves(this.command);
				this.mStart.expects('bind').once().returns(stubTask);
				this.mLoad.expects('bind').once().returns(stubTask);
				this.mEnd.expects('bind').once().returns(stubTask);

				const result = await this.command.run();

				assert.isArray(result);
				assert.lengthOf(result, 3);
				assert.include(result, this.command);

				assert.isTrue(this.spyCollectionInvoke.calledOnce);
				assert.isTrue(stubTask.calledThrice);

				this.mStart.verify();
				this.mLoad.verify();
				this.mEnd.verify();
			});
			it('should run the command: fail', async () => {
				const stubTask = sandbox.stub()
					.onFirstCall().resolves(this.command)
					.onSecondCall().rejects(this.mError)
					.onThirdCall().resolves(this.command);
				this.mCommand.expects('onError').once().withArgs(this.mError);
				this.mStart.expects('bind').once().returns(stubTask);
				this.mLoad.expects('bind').once().returns(stubTask);
				this.mEnd.expects('bind').once().returns(stubTask);

				const result = await this.command.run();

				assert.isUndefined(result);
				assert.isTrue(this.spyCollectionInvoke.calledOnce);
				assert.isTrue(stubTask.calledThrice);

				this.mCommand.verify();
				this.mStart.verify();
				this.mLoad.verify();
				this.mEnd.verify();
			});
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

		describe('toString()', () => {
			it('should returns a string representation of the instance', () => {
				assert.equal(this.command.toString(), `[${SynapseCommand.name}]`);
			});
		});
	});
});
