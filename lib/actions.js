var listPaths = require('./list');
var iterate = require('./iterate');
var log = require('./log');
var compare = require('./compare');
var Promise = require('es6-promise').Promise;

function comparePaths (host1, host2, priority, output, source, limit, parallel) {
	return listPaths(source, priority)
	.then(function (fronts) {
		if (limit) {
			fronts = fronts.slice(0, limit);
		}
		log.msg('Comparing ' + fronts.length + ' fronts with priority ' + (priority || '*'));
		var out = log.file(output);

		return new Promise(function (resolve, reject) {
			if (!fronts.length) {
				reject(new Error('Unable to find any front'));
			}
			iterate(fronts, parallel || 4, function (front, cb) {
				compare(
					join(host1, front),
					join(host2, front),
					cb
				)
				.differ(function (diff) {
					out(diff);
				})
				.onerror(function (err) {
					log.ln(err.message);
				});
			}, function () {
				resolve();
			});
		});
	});
}

function compareURLS (url1, url2, output) {
	var out = log.file(output);

	return new Promise(function (resolve) {
		compare(url1, url2, resolve)
		.differ(function (diff) {
			out(diff);
		})
		.onerror(function (err) {
			log.ln(err.message);
		});
	});
}

function join (host, front) {
	if (host.charAt(host.length - 1) !== '/') {
		host += '/';
	}
	return host + front;
}

exports.comparePaths = comparePaths;
exports.compareURLS = compareURLS;
