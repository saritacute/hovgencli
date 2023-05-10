#!/usr/bin/env node

/**
 * hovgen-cli
 * generate files from templates for hov
 *
 * @author asarita<asarita@hov.co>
 */
const chalk = require('chalk');
const gen = require('hovgen');
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const convertInit = require('./utils/convert');
const cpy = require('./utils/cpy');
const bh = require('./utils/helpers/blurhash/bh');
const bh2 = require('./utils/helpers/blurhash/bh2');
const towebp = require('./utils/helpers/towebp');

const input = cli.input;
const flags = cli.flags;
const { clear, debug, generate, convert, save, copy } = flags;

const plaiceholderReturn = ['base64', 'blurhash', 'svg', 'css'];

const blur = input => {
	const [_, size, type = 'base64'] = input;
	if (!plaiceholderReturn.includes(type)) {
		console.log(chalk.red('invalid type'));
		return;
	}

	if (size < 4 || size > 64) {
		console.log(chalk.red('size should be between 0 and 100'));
		return;
	}

	const numSize = parseInt(size) || 64;
	bh2(numSize, type);
};

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);
	input.includes(`generate`) && gen();
	input.includes(`types`) && convertInit(false);
	input.includes(`savetypes`) && convertInit(true);
	input.includes(`files`) && cpy();
	input.includes(`blurhash`) && blur(input);
	input.includes(`towebp`) && towebp();
})();
