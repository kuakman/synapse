/**
 * ScaffoldCommand Class Specs
 * @module common
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import { flags } from '@oclif/command';
import { SynapseCommand } from 'common/synapse-command';
import { ScaffoldCommand } from 'common/scaffold-command';
import * as debug from 'utils/debug/debug';
import Collection from 'utils/adt/collection';

describe('class ScaffoldCommand', function() {
	beforeEach(() => {
		this.mSuper = sandbox.mock(SynapseCommand.prototype);
		ScaffoldCommand.flags = {
			test: flags.string({
				char: 't',
				description: 'Test description',
				hidden: false,
				env: 'SYNAPSE',
				options: ['A', 'B', 'C'],
				default: null,
				required: false
			})
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('constructor()', () => {
		it('should instantiate class', () => {
			this.command = new ScaffoldCommand([], {});
			assert.instanceOf(this.command, ScaffoldCommand);
		});
		it('should verify decorator interface is applied to the command instance', () => {
			assert.isOk(this.command.createQuestion);
			assert.isOk(this.command.newPrompt);
			assert.isOk(this.command.bindEvents);
		});
	});

	describe('methods', () => {
		beforeEach(() => {
			this.mIsProduction = sandbox.stub(debug, 'isProduction');
			this.mCommand = sandbox.mock(this.command);
			this.mAnswers = sandbox.mock(this.command.answers);

			this.mQuestion = { name: 'test' };
		});

		afterEach(() => {
			sandbox.restore();
		});

		describe('init()', () => {
			it('should initialize command', async() => {
				this.mSuper.expects('init')
					.once()
					.resolves(this.command);
				this.mCommand.expects('attachEvents')
					.once()
					.returns(this.command);
				assert.instanceOf(await this.command.init(), ScaffoldCommand);
			});
		});

		describe('attachEvents()', () => {
			it('should attach events to the command', () => {
				this.mAnswers.expects('on')
					.once()
					.withArgs(Collection.events.add, this.command._onCapture)
					.returns(this.command);
				assert.instanceOf(this.command.attachEvents(), ScaffoldCommand);
			});
		});

		describe('isFlagAvailable()', () => {
			it('should return false: question.name is not defined', () => {
				assert.isFalse(this.command.isFlagAvailable({}));
			});
			it('should return false: flag with question.name does NOT exists', () => {
				assert.isFalse(this.command.isFlagAvailable({ name: 'non-existent' }));
			});
			it('should return true', () => {
				assert.isTrue(this.command.isFlagAvailable(this.mQuestion));
			});
		});

		describe('question()', () => {});

		describe('answer()', () => {});

		describe('createPrompt()', () => {});

		describe('prompt()', () => {});

		describe('write()', () => {});

		describe('install()', () => {});

		describe('_onCapture()', () => {});

		describe('run()', () => {
			it('should run the command', async () => {
				const result = await this.command.run();
				assert.isArray(result);
				assert.lengthOf(result, 3);
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
