/**
 * PipelineCommand Class Specs
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { PipelineCommand } from 'common/pipeline-command';

describe('class PipelineCommand', function() {
	describe('constructor()', () => {
		it('should instantiate class', () => {
			this.command = new PipelineCommand();
			assert.instanceOf(this.command, PipelineCommand);
		});
	});

	describe('methods', () => {
		beforeEach(() => {
			this.mockCommand = sandbox.mock(this.command);
			this.mockCommandStart = sandbox.mock(this.command.start);
			this.mockCommandConfiguration = sandbox.mock(this.command.configuration);
			this.mockCommandClean = sandbox.mock(this.command.clean);
			this.mockCommandEnv = sandbox.mock(this.command.env);
			this.mockCommandProcess = sandbox.mock(this.command.process);
			this.mockCommandRelease = sandbox.mock(this.command.release);
			this.mockCommandEnd = sandbox.mock(this.command.end);
		});

		afterEach(() => {
			sandbox.restore();
		});

		describe('getTasks()', () => {
			it('should retrieve the list of tasks associated with this command', () => {
				this.mockCommandStart.expects('bind').once().returns(this.command.start);
				this.mockCommandConfiguration.expects('bind').once().returns(this.command.configuration);
				this.mockCommandClean.expects('bind').once().returns(this.command.clean);
				this.mockCommandEnv.expects('bind').once().returns(this.command.env);
				this.mockCommandProcess.expects('bind').once().returns(this.command.process);
				this.mockCommandRelease.expects('bind').once().returns(this.command.release);
				this.mockCommandEnd.expects('bind').once().returns(this.command.end);

				const result = this.command.getTasks();

				this.mockCommandStart.verify();
				this.mockCommandConfiguration.verify();
				this.mockCommandClean.verify();
				this.mockCommandEnv.verify();
				this.mockCommandProcess.verify();
				this.mockCommandRelease.verify();
				this.mockCommandEnd.verify();

				assert.isArray(result);
				assert.equal(result[0], this.command.start);
				assert.equal(result[1], this.command.configuration);
				assert.equal(result[2], this.command.clean);
				assert.equal(result[3], this.command.env);
				assert.equal(result[4], this.command.process);
				assert.equal(result[5], this.command.release);
				assert.equal(result[6], this.command.end);
			});
		});

		describe('toString()', () => {
			it('should returns a string representation of the instance', () => {
				assert.equal(this.command.toString(), `[${PipelineCommand.name}]`);
			});
		});

		describe('configuration()', () => {
			it('should execute configuration', async () => {
				assert.equal(await this.command.configuration(), this.command);
			});
		});

		describe('clean()', () => {
			it('should execute clean', async () => {
				assert.equal(await this.command.clean(), this.command);
			});
		});

		describe('env()', () => {
			it('should execute env', async () => {
				assert.equal(await this.command.env(), this.command);
			});
		});

		describe('process()', () => {
			it('should execute process', async () => {
				assert.equal(await this.command.process(), this.command);
			});
		});

		describe('release()', () => {
			it('should execute release', async () => {
				assert.equal(await this.command.release(), this.command);
			});
		});

		describe('run()', () => {
			it('should run the command', async () => {
				const result = await this.command.run();
				assert.isArray(result);
				assert.lengthOf(result, 7);
				assert.include(result, this.command);
			});
		});
	});
});
