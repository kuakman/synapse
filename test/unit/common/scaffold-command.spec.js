/**
 * ScaffoldCommand Class Specs
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { ScaffoldCommand } from 'common/scaffold-command';

describe('class ScaffoldCommand', function() {
	describe('constructor()', () => {
		it('should instantiate class', () => {
			this.command = new ScaffoldCommand();
			assert.instanceOf(this.command, ScaffoldCommand);
		});
	});

	describe('methods', () => {
		beforeEach(() => {
			this.mockCommand = sandbox.mock(this.command);
			this.mockCommandStart = sandbox.mock(this.command.start);
			this.mockCommandPrompting = sandbox.mock(this.command.prompting);
			this.mockCommandEnd = sandbox.mock(this.command.end);
		});

		afterEach(() => {
			sandbox.restore();
		});

		describe('getTasks()', () => {
			it('should retrieve the list of tasks associated with this command', () => {
				this.mockCommandStart.expects('bind').once().returns(this.command.start);
				this.mockCommandPrompting.expects('bind').once().returns(this.command.prompting);
				this.mockCommandEnd.expects('bind').once().returns(this.command.end);

				const result = this.command.getTasks();

				this.mockCommandStart.verify();
				this.mockCommandPrompting.verify();
				this.mockCommandEnd.verify();

				assert.isArray(result);
				assert.equal(result[0], this.command.start);
				assert.equal(result[1], this.command.prompting);
				assert.equal(result[2], this.command.end);
			});
		});

		describe('toString()', () => {
			it('should returns a string representation of the instance', () => {
				assert.equal(this.command.toString(), `[${ScaffoldCommand.name}]`);
			});
		});

		describe('prompting()', () => {
			it('should execute prompting', async () => {
				assert.equal(await this.command.prompting(), this.command);
			});
		});

		describe('run()', () => {
			it('should run the command', async () => {
				const result = await this.command.run();
				assert.isArray(result);
				assert.lengthOf(result, 3);
				assert.include(result, this.command);
			});
		});
	});
});
