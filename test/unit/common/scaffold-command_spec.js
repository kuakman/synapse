/**
 * ScaffoldCommand Class Specs
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { ScaffoldCommand } from 'common/scaffold-command';
import Collection from 'utils/adt/collection';
import * as debug from 'utils/debug/debug';

describe('class ScaffoldCommand', function() {
	describe('constructor()', () => {
		it('should instantiate class', () => {
			this.command = new ScaffoldCommand();
			assert.instanceOf(this.command, ScaffoldCommand);
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
				assert.equal(result.size(), 4);
				assert.include(result, this.command.start);
				assert.include(result, this.command.load);
				assert.include(result, this.command.prompting);
				assert.include(result, this.command.end);
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
				assert.lengthOf(result, 4);
				assert.include(result, this.command);
			});
		});

		describe('toString()', () => {
			it('should returns a string representation of the instance', () => {
				assert.equal(this.command.toString(), `[${ScaffoldCommand.name}]`);
			});
		});
	});
});
