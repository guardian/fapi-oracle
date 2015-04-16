var request = require('request');

module.exports = function (url1, url2, cb) {
	var page1, page2;
	function goOn() {
		if (page1 && page2) {
			cb(null, page1, page2);
		}
	}

	request(url1, function (error, response, body) {
		if (error || !body) {
			cb(new Error('Unable to fetch page ' + url1));
		} else {
			page1 = body;
			goOn();
		}
	});
	request(url2, function (error, response, body) {
		if (error || !body) {
			cb(new Error('Unable to fetch page ' + url2));
		} else {
			page2 = body;
			goOn();
		}
	});
};
