/**
 * @module common.scaffold.format
 * @author Patricio Ferreira <3dimentionar@gmail.com>
 */
import colors from 'ansi-colors';
import { defined } from 'utils/utils';

/**
 * Group Selection option highlight strategy
 * @param {object} choice
 * @param {colors} styles
 * @returns {object}
 */
export const onGroupChoice = function (choice, styles) {
	if (choice._selected && !choice.hidden) {
		choice.message = styles.primary(choice.message);
	} else if (!choice._selected && choice.hidden) {
		choice.message = colors.gray(choice.message);
	} else {
		choice.message = colors.unstyle(choice.message);
	}
	return choice;
};

/**
 * Group Selection toggle Strategy
 * @param {object} choice
 * @returns {Promise<Prompt>}
 */
export const onGroupToggle = async function(choice) {
	this.choices.forEach((current) => {
		if (current.type === choice.type) {
			if (current.name === choice.name) {
				current._selected = !current._selected;
				current.hidden = false;
			} else if (!current.multiple) {
				current._selected = false;
				current.hidden = !current.hidden;
			}
		} else if (!current._selected && !current.hidden) {
			current._selected = false;
			current.hidden = false;
		}
		onGroupChoice(current, this.styles);
	});
	return this.render();
};

/**
 * Format Archetype Enquirer option
 * @param {object} archetype
 * @returns {object}
 */
export const formatArchetype = (archetype) => {
	const { type, name, dependencies, multiple } = archetype;
	const d = defined(archetype.dependencies) ? `| [${dependencies.join(', ')}]` : '';
	return { name: `${type}:${name}`, type, multiple, hint: colors.white(d) };
};
