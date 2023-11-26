export function buildSwclLoader() {
	return {
		test: /\.tsx?$/,
		exclude: /(node_modules)/,
		use: {
			loader: 'swc-loader',
		},
	};
}
