var fs = require('fs');
const inquirer = require('inquirer');
const fetch = require('node-fetch-commonjs');
const JsonToTS = require('json-to-ts');
const chalk = require('chalk');

function convert(response) {
	JsonToTS(response).forEach(typeInterface => {
		console.log('\n');
		console.log(chalk.green(`export ${typeInterface}`));
	});
}

function convertAndSave(response) {
	let data = [];
	JsonToTS(response).forEach(typeInterface => {
		data.push(`export ${typeInterface}`);
	});

	try {
		fs.writeFileSync('types.ts', data.join('\n\n'), { flag: 'a+' });
		console.log(chalk.yellow('saved to types.ts'));
	} catch (err) {
		console.error(err);
	}
}

const prompt = {
	name: 'api',
	message: 'endpoint',
	type: 'input'
};

function validURL(str) {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' +
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
			'((\\d{1,3}\\.){3}\\d{1,3}))' +
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
			'(\\?[;&a-z\\d%_.~+=-]*)?' +
			'(\\#[-a-z\\d_]*)?$',
		'i'
	);
	return !!pattern.test(str);
}

module.exports = async save => {
	inquirer
		.prompt([prompt])
		.then(async ({ api }) => {
			if (!validURL(api)) {
				console.log(chalk.red('invalid url'));
				return;
			}
			const res = await fetch(api);
			const response = await res.json();
			if (save) {
				convertAndSave(response);
			} else {
				convert(response);
			}
		})
		.catch(error => {
			throw new Error(error);
		});
};
