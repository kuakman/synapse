/**
 * PipelineCommand Class Specs
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { PipelineCommand } from 'common/pipeline-command';
import Collection from 'utils/adt/collection';
import * as debug from 'utils/debug/debug';

describe('class PipelineCommand', function() {
	describe('constructor()', () => {
		it('should instantiate class', () => {
			this.command = new PipelineCommand();
			assert.instanceOf(this.command, PipelineCommand);
		});
	});

	describe('methods', () => {
		beforeEach(() => {
			this.mIsProduction = sandbox.stub(debug, 'isProduction');
			this.mCommand = sandbox.mock(this.command);
		});

		afterEach(() => {
			sandbox.restore();
		});

		describe('tasks', () => {
			it('should retrieve the list of tasks associated with this command', () => {
				const result = this.command.tasks;
				assert.instanceOf(result, Collection);
				assert.equal(result.size(), 8);
				assert.include(result, this.command.start);
				assert.include(result, this.command.load);
				assert.include(result, this.command.configuration);
				assert.include(result, this.command.clean);
				assert.include(result, this.command.env);
				assert.include(result, this.command.process);
				assert.include(result, this.command.release);
				assert.include(result, this.command.end);
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
				assert.lengthOf(result, 8);
				assert.include(result, this.command);
			});
		});

		describe('toString()', () => {
			it('should returns a string representation of the instance', () => {
				assert.equal(this.command.toString(), `[${PipelineCommand.name}]`);
			});
		});
	});
});
