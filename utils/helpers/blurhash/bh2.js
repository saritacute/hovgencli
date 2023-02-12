const glob = require('glob');
const { getPlaiceholder } = require('plaiceholder');
const fs = require('fs');
const chalk = require('chalk');
const rootFolder = './public';

const writeToFile = data => fs.writeFileSync('blurhash.json', data);

const parseToJSON = object => {
	const getHashAndImg = object.reduce((acc, item) => {
		const { img, hash } = item;
		return {
			...acc,
			[img]: hash
		};
	}, {});
	writeToFile(JSON.stringify(getHashAndImg, null, 2));
	console.log(chalk.green(`Done!`));
};

const start = async files => {
	const allPromise = files.map(dir => dir.replace(/.\/public/i, ''));
	const initial = await Promise.all(
		allPromise.map(async src => {
			const { base64 } = await getPlaiceholder(src, {
				size: 64
			});
			return {
				img: src,
				hash: base64
			};
		})
	).then(values => values);
	parseToJSON(initial);
};

module.exports = () =>
	glob(rootFolder + '/**/*.{png,jpg,jpeg}', (err, files) => {
		if (err) {
			console.log('Error', err);
		} else {
			console.log(
				chalk.yellow(`Found ${files.length} file/s under /public`)
			);
			if (files.length) {
				files.map(file => console.log(chalk.green(`${file}`)));
				console.log(chalk.green(`Generating blurhash...`));
				start(files);
			}
		}
	});
