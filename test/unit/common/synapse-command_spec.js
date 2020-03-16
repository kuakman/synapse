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
			this.command = new SynapseCommand();
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
			this.mError.statusCode = 1;

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

		describe('start()', () => {
			it('should start the command', async () => {
				assert.equal(await this.command.start(), this.command);
			});
		});

		describe('load()', () => {
			it('should load project package: package hasn\'t been loaded', async () => {
				this.mCommand.expects('onProgress')
					.once().withArgs('Reading Package', 'Initializing')
					.returns(this.command);
				this.mCommand.expects('onSuccess')
					.once()
					.withArgs('Done')
					.returns(this.command);

				assert.equal(await this.command.load(), this.command);
				assert.isOk(this.command.package);
				assert.include(this.command.package, { name: 'synapse' });

				this.mCommand.verify();
			});
			it('should load project package: package has been already loaded', async () => {
				this.mUtils.expects('defined').once().returns(true);
				this.mCommand.expects('onProgress').never();
				this.mCommand.expects('onSuccess').never();

				assert.equal(await this.command.load(), this.command);
				assert.isOk(this.command.package);
				assert.include(this.command.package, { name: 'synapse' });

				this.mUtils.verify();
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
				this.mIsProduction.returns(true);
				this.mUxAction.expects('stop').withArgs(`${this.mError.message} - Code: ${this.mError.statusCode}`);
				this.mCommand.expects('exit').once().withArgs(this.mError.statusCode);

				assert.isUndefined(this.command.onError(this.mError));
				assert.isTrue(this.mIsProduction.calledOnce);

				this.mCommand.verify();
				this.mUxAction.verify();
			});
			it('should handle error status: when production is off', () => {
				this.mIsProduction.returns(false);
				this.mUxAction.expects('stop').never();
				this.mCommand.expects('exit').once().withArgs(this.mError.statusCode);

				assert.isUndefined(this.command.onError(this.mError));
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
