#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));

if (argv._.length !== 2 || !argv.o){
	console.log('Usage:\n   fapi-oracle host1 host2 [-p priority] -o output.diff');
	return process.exit(1);
}

require('./lib/run')(argv._[0], argv._[1], argv.p, argv.o, argv.l)
.catch(function (err) {
	console.error(err);
});
