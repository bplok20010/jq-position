const pkg = require("./package.json");
module.exports = function () {
	return {
		babel: {
			plugins: [
				[
					"babel-plugin-search-and-replace",
					{
						rules: [
							{
								search: "%VERSION%",
								replace: pkg.version,
							},
						],
					},
				],
			],
		},
	};
};
