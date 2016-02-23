var path = require('path');

module.exports = {
	entry: './src/scripts/app.js',
	output: {
		path: path.join(__dirname, './dist/'),
		filename: "bundle.js"
	}
};
