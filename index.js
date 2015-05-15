#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2), {
	boolean: ['c']
});
var colour = require('colour');

if (argv._.length !== 2 || !argv.o){
	console.log([
		'Usage:',
		'   fapi-oracle host1 host2 [-p priority] [-s source] -o output.diff',
		'to compare a list of paths against two hosts',
		'or',
		'   fapi-oracle -c host1/path1 host2/path2 -o output.diff',
		'to compare two full paths'
	].join('\n'));
	return process.exit(1);
}

require('./lib/run')({
	host1: argv._[0],
	host2: argv._[1],
	priority: argv.p,
	output: argv.o,
	source: argv.s,
	limit: argv.l,
	parallel: argv.parallel,
	compare: !!argv.c
})
.then(function () {
	console.log('[DONE]'.green + ' Check the output of ' + argv.o.grey);
})
.catch(function (err) {
	console.error(err);
});
