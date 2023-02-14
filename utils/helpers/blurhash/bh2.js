const glob = require('glob');
const { getPlaiceholder } = require('plaiceholder');
const fs = require('fs');
const chalk = require('chalk');
const rootFolder = './public';
const sharp = require('sharp');
const crypto = require('crypto');
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

const start = async (files, size, type) => {
	const allPromise = files.map(dir => dir.replace(/.\/public/i, ''));
	const initial = await Promise.all(
		allPromise.map(async src => {
			const name = crypto.createHash('md5').update(src).digest('hex');
			await new Promise(res => {
				sharp(`public/${src}`)
					.resize({ width: 15 })
					.blur()
					.webp({
						quality: 10,
						effort: 0
					})
					.toFile(`public/buffer/${name}.webp`)
					.then(res);
			});

			const ret = await getPlaiceholder(`/buffer/${name}.webp`, {
				size
			});

			fs.unlink(`public/buffer/${name}.webp`, console.log);

			return {
				img: src,
				hash: ret[type]
			};
		})
	).then(values => values);
	parseToJSON(initial);
};

module.exports = (size, type) =>
	glob(
		rootFolder + '/**/*.{png,jpg,jpeg,webp}',
		{ ignore: [rootFolder + '/buffer'] },
		(err, files) => {
			if (err) {
				console.log('Error', err);
			} else {
				console.log(
					chalk.yellow(`Found ${files.length} file/s under /public`)
				);
				if (files.length) {
					files.map(file => console.log(chalk.green(`${file}`)));
					console.log(chalk.green(`Generating blurhash...`));
					start(files, size, type);
				}
			}
		}
	);
