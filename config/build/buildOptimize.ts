import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import { BuildOptions } from './types/types';
import { Configuration } from 'webpack';

export function buildOptimize(
	options: BuildOptions
): Configuration['optimization'] {
	const MinimizeImage = () =>
		new ImageMinimizerPlugin({
			minimizer: {
				implementation: ImageMinimizerPlugin.imageminMinify,
				options: {
					plugins: [
						['gifsicle', { interlaced: true }],
						['jpegtran', { progressive: true }],
						['optipng', { optimizationLevel: 5 }],
						[
							'svgo',
							{
								plugins: [
									{
										name: 'preset-default',
										params: {
											overrides: {
												removeViewBox: false,
											},
										},
									},
								],
							},
						],
					],
				},
			},
		});

	return {
		minimizer: ['...', MinimizeImage],
	};
}
