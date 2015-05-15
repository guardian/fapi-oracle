var actions = require('./actions');

module.exports = function (opts) {
	if (opts.compare) {
		return actions.compareURLS(opts.host1, opts.host2, opts.output);
	} else {
		return actions.comparePaths(opts.host1, opts.host2, opts.priority, opts.output, opts.source, opts.limit, opts.parallel);
	}
};
