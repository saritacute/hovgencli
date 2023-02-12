const fs = require('fs');
const chalk = require('chalk');
const CURR_DIR = process.cwd();

module.exports = (templatePath, newProjectPath) => {
	const path = `${templatePath}/${newProjectPath}`;
	const isFile = fs.statSync(path).isFile();
	if (!isFile) fs.mkdirSync(`${CURR_DIR}/${newProjectPath}`);

	if (isFile) {
		const contents = fs.readFileSync(path, 'utf8');
		const writePath = `${CURR_DIR}/${newProjectPath}`;
		fs.writeFileSync(writePath, contents, 'utf8');
		console.log(chalk.green('done!'));
	} else {
		const filesToCreate = fs.readdirSync(path);
		filesToCreate.forEach(file => {
			const origFilePath = `${templatePath}/${newProjectPath}/${file}`;
			const stats = fs.statSync(origFilePath);

			if (stats.isFile()) {
				const contents = fs.readFileSync(origFilePath, 'utf8');

				// Rename
				// if (file === '.npmignore') file = '.gitignore';

				const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
				fs.writeFileSync(writePath, contents, 'utf8');
			} else if (stats.isDirectory()) {
				fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

				createDirectoryContents(
					`${templatePath}/${file}`,
					`${newProjectPath}/${file}`
				);
			}
		});
	}
};
