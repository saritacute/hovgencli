#!/usr/bin/env node

/**
 * hovgen-cli
 * generate files from templates for hov
 *
 * @author asarita<asarita@hov.co>
 */

const gen = require('hovgen');
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const convertInit = require('./utils/convert');
const cpy = require('./utils/cpy');
const bh = require('./utils/helpers/blurhash/bh');
const bh2 = require('./utils/helpers/blurhash/bh2');

const input = cli.input;
const flags = cli.flags;
const { clear, debug, generate, convert, save, copy } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);
	input.includes(`generate`) && gen();
	input.includes(`types`) && convertInit(false);
	input.includes(`savetypes`) && convertInit(true);
	input.includes(`files`) && cpy();
	input.includes(`blurhash`) && bh2();
})();
