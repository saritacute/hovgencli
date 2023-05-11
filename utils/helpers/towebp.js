const glob = require('glob');
const { getPlaiceholder } = require('plaiceholder');
const fs = require('fs');
const chalk = require('chalk');
const rootFolder = './public';
const sharp = require('sharp');
const crypto = require('crypto');
const writeToFile = data => fs.writeFileSync('blurhash.json', data);

function formatBytes(bytes, decimals = 2) {
	if (!+bytes) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const start = async files => {
	const allPromise = files.map(dir => dir.replace(/.\/public/i, ''));
	await Promise.all(
		allPromise.map(async src => {
			return new Promise(async () => {
				try {
					const { size } = await sharp(`public/${src}`)
						.webp({ effort: 6 })
						.toFile(
							`public/${src.substr(0, src.lastIndexOf('.'))}.webp`
						);
					console.log(
						`${src}: ${chalk.red(
							formatBytes(fs.statSync(`public/${src}`).size)
						)} -> ${chalk.green(formatBytes(size))}`
					);
				} catch (error) {
					console.log(chalk.red(error));
				}
			});
		})
	);
};

module.exports = () =>
	glob(
		rootFolder + '/**/*.{png,jpg,jpeg,svg}',
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
					console.log(chalk.green(`converting images...`));
					start(files);
				}
			}
		}
	);
