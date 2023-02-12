const DIR_TYPE = {
	1: 'file',
	2: 'directory'
};

const methods = [
	'isBlockDevice',
	'isCharacterDevice',
	'isDirectory',
	'isFIFO',
	'isFile',
	'isSocket',
	'isSymbolicLink'
];

const getRefinedList = files =>
	files.map(d => {
		const type = d['isDirectory']() ? 'directory' : 'file';
		return `${d.name}`;
	});

module.exports = {
	getRefinedList
};
