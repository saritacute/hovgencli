const fs = require('../utils/fs');
const inquirer = require('inquirer');
const gen = require('../utils/helpers/fs/generateFromTemplate');
const { getRefinedList } = require('../utils/helpers/constants');
const { dirname } = require('path');

const appDir = dirname(require.main.filename);
const dir = `${appDir}/utils/helpers/single-files`;

const prompt = {
	name: 'file',
	message: 'What file do you need?',
	type: 'list'
};

module.exports = () => {
	const choices = getRefinedList(fs.listFilesSync(dir));
	inquirer.prompt([{ ...prompt, choices }]).then(({ file }) => {
		gen(dir, file);
	});
};
