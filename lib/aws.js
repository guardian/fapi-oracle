var FaciaTool = require('aws-s3-facia-tool');
var CONFIG = {
	"bucket": "aws-frontend-store",
	"env": "PROD",
	"configKey": "frontsapi/config/config.json",
	"configHistoryPrefix": "frontsapi/history/config",
	"collectionHistoryPrefix": "frontsapi/history/collection",
	"collectionsPrefix": "frontsapi/collection",
	"maxParallelRequests": 6
};

exports.listFronts = function (edition) {
	var tool = new FaciaTool(CONFIG);
	return tool.fetchConfig()
	.then(function (config) {
		if (!edition) {
			return Object.keys(config.json.fronts);
		} else {
			return Object.keys(config.json.fronts).filter(function (front) {
				return front.priority === 'front' || (!front.priority && edition === 'editorial');
			});
		}
	}).catch(function (ex) {
		console.error(ex);
	});
};
