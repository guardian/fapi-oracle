var async = require('async');
var ProgressBar = require('progress');

module.exports = function (array, parallel, iteratee, callback) {
    var bar = new ProgressBar(':bar :percent :eta seconds left', {
        total: array.length,
        width: 40
    });

    async.mapLimit(array, parallel || 1, function (element, cb) {
        bar.tick();
        setImmediate(function () {
            iteratee(element, cb);
        });
    }, callback);
};
