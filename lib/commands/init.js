/**
 * Command Init
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import Command from '@oclif/command';

export class Init extends Command {
	static description = 'Init Description Command';

	async run() {
		console.log('Hello Init 1!');
	}
}
