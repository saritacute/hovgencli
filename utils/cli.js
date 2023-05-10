const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	generate: {
		type: `boolean`,
		alias: `g`,
		default: false,
		desc: `generate files from templates`
	},
	convert: {
		type: `boolean`,
		alias: `c`,
		default: false,
		desc: `generate types from an api`
	},
	save: {
		type: `boolean`,
		alias: `s`,
		default: false,
		desc: `save the types inside /types.ts`
	},
	copy: {
		type: `boolean`,
		alias: `x`,
		default: false,
		desc: `copy file/s from list of folder/file/s`
	}
};

const commands = {
	help: { desc: `Print help info` },
	generate: { desc: `Generate files from templates` },
	file: { desc: `Get pre-generated files` },
	types: { desc: `Get types from api endpoint` },
	savetypes: { desc: `Get types from api endpoint and save it to types.ts` },
	blurhash: {
		desc: `Generate blurhash for png,jpg,jpeg files under /public`
	},
	towebp: { desc: `Generate blurhash for png,jpg,jpeg files under /public` }
};

const helpText = meowHelp({
	name: `hovgen`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
