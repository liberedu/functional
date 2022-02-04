#! /usr/bin/env node
if (!__dirname.match(/node_modules/)) {
	const chdir = require('child_process');
	const path = require('path');

	function getLocation() {
		try {
			const location = path.basename(path.dirname(__dirname));
			return `[ ${location} ]: `;
		} catch {
			return '';
		}
	}

	function fetchConfigureJs() {
		const sourceFile = 's3://infra-configs.liberedu.com.br/npm/configure.min.js';
		const outputFile = path.join(__dirname, 'configure.js');
		const cmd = `aws s3 cp ${sourceFile} ${outputFile}`;
		try {
			const location = getLocation();
			console.log(`${location}fetching configure.js`);
			chdir.execSync(cmd, { encoding: 'utf-8' });
		} catch (err) {
			console.error(err.message);
			process.exit(1);
		}
	}

	function main() {
		fetchConfigureJs();
		require('./configure');
	}

	main();
}
