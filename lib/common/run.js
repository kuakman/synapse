/**
 * Command Run
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import color from '@oclif/color';
import Command from '@oclif/command';

export default class Run extends Command {
	async run () {
		console.log(color.blue('Hello Run!'));
	}
}
