/**
 * SynapseCommand Class Specs
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { InitCommand } from 'commands/init';

describe.skip('class InitCommand', function() {
	describe('constructor()', () => {
		it('should instantiate class', () => {
			this.command = new InitCommand();
			assert.instanceOf(this.command, InitCommand);
		});
	});

	describe('methods', () => {
		beforeEach(() => {
			this.mockCommand = sandbox.mock(this.command);
		});

		afterEach(() => {
			sandbox.restore();
		});
	});
});
