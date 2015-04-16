var fetch = require('./fetch');
var disparity = require('disparity');

module.exports = function (url1, url2, cb) {
	var diffCallback, errCallback;

	setImmediate(function () {
		fetch(url1, url2, function (err, page1, page2) {
			if (err) {
				errCallback(err);
			} else {
				var diff = disparity.unifiedNoColor(page1, page2, {
					paths: [url1, url2]
				});
				if (diff) {
					diffCallback(diff);
				}
			}
			cb();
		});
	});

	var interface = {
		differ: function (whenDiffer) {
			diffCallback = whenDiffer;
			return interface;
		},
		onerror: function (whenError) {
			errCallback = whenError;
			return interface;
		}
	};
	return interface;
};
