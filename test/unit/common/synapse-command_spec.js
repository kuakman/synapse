/**
 * SynapseCommand Class Specs
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { SynapseCommand } from 'common/synapse-command';

describe('class SynapseCommand', function() {
	describe('constructor()', () => {
		it('should instantiate class', () => {
			this.command = new SynapseCommand();
			assert.instanceOf(this.command, SynapseCommand);
		});
	});

	describe('methods', () => {
		beforeEach(() => {
			this.mockCommand = sandbox.mock(this.command);
			this.mockCommandStart = sandbox.mock(this.command.start);
			this.mockCommandEnd = sandbox.mock(this.command.end);
		});

		afterEach(() => {
			sandbox.restore();
		});

		describe('getTasks()', () => {
			it('should retrieve the list of tasks associated with this command', () => {
				this.mockCommandStart.expects('bind').once().returns(this.command.start);
				this.mockCommandEnd.expects('bind').once().returns(this.command.end);

				const result = this.command.getTasks();

				this.mockCommandStart.verify();
				this.mockCommandEnd.verify();
				assert.isArray(result);
				assert.include(result, this.command.start);
				assert.include(result, this.command.end);
			});
		});

		describe('toString()', () => {
			it('should returns a string representation of the instance', () => {
				assert.equal(this.command.toString(), `[${SynapseCommand.name}]`);
			});
		});

		describe('onError()', () => {
			it('should handle error', () => {
				const mockError = new Error('Fatal Error'); mockError.code = 1;
				this.mockCommand.expects('exit').once().withArgs(mockError.code);

				assert.isUndefined(this.command.onError(mockError));

				this.mockCommand.verify();
			});
		});

		describe('start()', () => {
			it('should start the command', async () => {
				assert.equal(await this.command.start(), this.command);
			});
		});

		describe('end()', () => {
			it('should end the command', async () => {
				assert.equal(await this.command.end(), this.command);
			});
		});

		describe('run()', () => {
			it('should run the command: success', async () => {
				const result = await this.command.run();
				assert.isArray(result);
				assert.lengthOf(result, 2);
				assert.include(result, this.command);
			});
		});
	});
});
