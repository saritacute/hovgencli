const glob = require('glob');
const { getPlaiceholder } = require('plaiceholder');
const fs = require('fs');
const chalk = require('chalk');
const rootFolder = './public';

const writeToFile = data => fs.writeFileSync('blurhash.json', data);

const parseToJSON = object => {
	const getHashAndImg = object.reduce((acc, item) => {
		const { img, hash } = item.value;
		return {
			...acc,
			[img]: hash
		};
	}, {});
	writeToFile(JSON.stringify(getHashAndImg));
	console.log(chalk.green(`Done!`));
};

const getPromise = img =>
	new Promise(resolve => {
		getPlaiceholder(img, {
			size: 64
		}).then(({ blurhash }) => {
			const { hash } = blurhash;
			resolve({ hash, img });
		});
	});

const start = async files => {
	const allPromise = files.map(dir =>
		getPromise(dir.replace(/.\/public/i, ''))
	);
	const initial = await Promise.allSettled(allPromise);
	parseToJSON(initial);
};

module.exports = () =>
	glob(rootFolder + '/**/*.{png,jpg,jpeg}', (err, files) => {
		if (err) {
			console.log('Error', err);
		} else {
			console.log(chalk.yellow(`Found ${files.length} files.`));
			files.map(file => console.log(chalk.green(`${file}`)));
			console.log(chalk.green(`Generating blurhash...`));
			start(files);
		}
	});
