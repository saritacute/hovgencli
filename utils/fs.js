const fs = require('fs');

const listFiles = dir =>
	new Promise((resolve, reject) => {
		fs.readdir(dir, (err, files) => {
			if (err) reject(err);
			resolve(files);
		});
	});

const listFilesSync = dir => fs.readdirSync(dir, { withFileTypes: true });

module.exports = {
	listFiles,
	listFilesSync
};
