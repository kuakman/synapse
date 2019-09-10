/**
 * Command Clean
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import color from '@oclif/color';
import Command from '@oclif/command';

export class Clean extends Command {
	async run () {
		console.log(color.blue('Hello Clean!'));
	}
}
