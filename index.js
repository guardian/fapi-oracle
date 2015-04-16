#!/usr/bin/env node
var argv = process.argv.slice(2);

if (!argv[0] || !argv[1]){
	console.log('Usage:\n   fapi-oracle [host1] [host2]');
	return process.exit(1);
}

require('./lib/run')(argv[0], argv[1]);
