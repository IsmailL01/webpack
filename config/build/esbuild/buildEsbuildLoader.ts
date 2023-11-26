import esbuild from 'esbuild';

export function buildEsbuildLoader() {
	return {
		test: /\.[jt]sx?$/,
		loader: 'esbuild-loader',
		options: {
			target: 'es2016',
			minify: true,
			implementation: esbuild,
		},
	};
}
