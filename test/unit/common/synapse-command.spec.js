/**
 * SynapseCommand Class Specs
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { SynapseCommand } from 'common/synapse-command';

describe('class SynapseCommand', function() {
	afterEach(() => {
		sandbox.restore();
	});

	describe('constructor()', () => {
		it('should instantiate class', () => {
			this.command = new SynapseCommand();
			assert.instanceOf(this.command, SynapseCommand);;
		});
	});

	describe('methods', () => {
		beforeEach(() => {
			this.spyStart = sandbox.spy(SynapseCommand.prototype, 'start');
			this.spyEnd = sandbox.spy(SynapseCommand.prototype, 'end');
		});

		afterEach(() => {
			sandbox.restore();
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
			it('should run the command', async () => {
				const result = await this.command.run();
				assert.isArray(result);
				assert.isTrue(this.spyStart.calledOnce);
				assert.isTrue(this.spyEnd.calledOnce);
			});
		});
	});
});
