var aws = require('./aws');
var iterate = require('./iterate');
var log = require('./log');
var compare = require('./compare');

module.exports = function (host1, host2, priority, output, limit, parallel) {
	return aws
	.listFronts(priority)
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
};

function join (host, front) {
	if (host.charAt(host.length - 1) !== '/') {
		host += '/';
	}
	return host + front;
}
