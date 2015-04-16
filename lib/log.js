var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

exports.msg = function (text) {
	console.log(text);
};

exports.ln = function (text) {
	console.log('\n', text);
};

exports.file = function (name) {
	mkdirp.sync(path.dirname(name));
	if (fs.existsSync(name)) {
		fs.unlinkSync(name);
	}

	return function (text) {
		fs.appendFileSync(name, text);
	};
};
