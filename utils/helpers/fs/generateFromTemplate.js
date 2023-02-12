const createDirectoryContents = require('./createDirectoryContents');
const fs = require('fs');

module.exports = gen = (templatePath, filename) => {
	const CURR_DIR = process.cwd();
	createDirectoryContents(templatePath, filename);
};
