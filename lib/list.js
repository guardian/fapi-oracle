var fs = require('fs');
var aws = require('./aws');
var Promise = require('es6-promise').Promise;

module.exports = function (source, priority) {
	if (!source) {
		return aws.listFronts(priority);
	} else {
		return parseFromFile(source);
	}
};

function parseFromFile (source) {
	return new Promise(function (resolve, reject) {
		fs.readFile(source, function (err, data) {
			if (err) {
				return reject(err);
			}
			resolve(data.toString().split('\n').map(function (line) {
				return line ? line.trim() : null;
			}).filter(function (line) {
				return !!line;
			}));
		});
	});
}