/**
 * SynapseCommand Class Specs
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { SynapseCommand } from 'common/synapse-command';
import Core from 'common/core/core';
import Collection from 'utils/adt/collection';
import colors from 'ansi-colors';
import ux from 'cli-ux';
import * as utils from 'utils/utils';
import * as debug from 'utils/debug/debug';

describe('class SynapseCommand', function() {
	beforeEach(() => {
		this.mockConfig = {
			config: {
				pjson: {
					version: '1.0.0'
				}
			}
		};

		this.mCommandClass = sandbox.mock(SynapseCommand.prototype);
		this.mCore = sandbox.mock(Core);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('constructor()', () => {
		it('should instantiate class', () => {
			this.mCommandClass.expects('parse')
				.once()
				.withArgs(SynapseCommand)
				.returns(this.mockConfig);
			this.command = new SynapseCommand([], { root: process.cwd() });
			this.command.init();
			assert.instanceOf(this.command, SynapseCommand);
		});
	});

	describe('methods', () => {
		beforeEach(() => {
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

		describe('start()', () => {
			it('should start the command', async () => {
				this.mCore.expects('banner')
					.once()
					.withArgs({ version: `v${this.command.config.pjson.version}`, url: 'Documentation: http://nahuel.io/synapse' })
					.returns(null);
				assert.equal(await this.command.start(), this.command);

				this.mCore.verify();
			});
		});

		describe('load()', () => {
			it('should load project package: package hasn\'t been loaded', async () => {
				this.mCore.expects('onProgress')
					.once()
					.withArgs(this.command, 'Package Configuration', colors.yellow.bold('[Reading...]'))
					.returns(this.command);
				this.mCore.expects('onSuccess')
					.once()
					.withArgs(this.command, colors.green.bold('[Loaded]'))
					.returns(this.command);

				assert.equal(await this.command.load(), this.command);
				assert.isOk(this.command.package);
				assert.include(this.command.package, { name: 'synapse' });

				this.mCore.verify();
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
				this.mCore.expects('onError').once().withArgs(this.mError, this.command);
				this.mStart.expects('bind').once().returns(stubTask);
				this.mLoad.expects('bind').once().returns(stubTask);
				this.mEnd.expects('bind').once().returns(stubTask);

				const result = await this.command.run();

				assert.isUndefined(result);
				assert.isTrue(this.spyCollectionInvoke.calledOnce);
				assert.isTrue(stubTask.calledThrice);

				this.mCore.verify();
				this.mStart.verify();
				this.mLoad.verify();
				this.mEnd.verify();
			});
		});

		describe('toString()', () => {
			it('should returns a string representation of the instance', () => {
				assert.equal(this.command.toString(), `[${SynapseCommand.name}]`);
			});
		});
	});
});
