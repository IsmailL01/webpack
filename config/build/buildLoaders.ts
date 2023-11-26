import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types/types';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { buildBabelLoader } from './babel/buildBabelLoader';
import { buildSwclLoader } from './swc/buildSwcLoader';
import { buildEsbuildLoader } from './esbuild/buildEsbuildLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
	const isDev = options.mode === 'development';

	const cssLoaderWithModules = {
		loader: 'css-loader',
		options: {
			modules: {
				localIdentName: isDev ? '[path][name]__[local]' : '[has:base64:8]',
			},
		},
	};

	const swcLoader = buildSwclLoader();
	const esbuildLoader = buildEsbuildLoader();

	const imagesLoader = {
		test: /\.(jpg|png|gif|svg)$/,
		loader: 'image-webpack-loader',
		options: { enforce: 'pre' },
	};

	const babelLoader = buildBabelLoader(options);

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			cssLoaderWithModules,
			'sass-loader',
		],
	};
	const tsLoader = {
		test: /\.tsx?$/,
		use: [
			{
				loader: require.resolve('ts-loader'),

				options: {
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
					transpileOnly: isDev,
				},
			},
		],
		exclude: /node_modules/,
	};

	const assetsLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	};

	const svgLoader = {
		test: /\.svg$/,
		use: [
			{
				loader: '@svgr/webpack',
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: 'convertColors',
								params: {
									currentColor: true,
								},
							},
						],
					},
				},
			},
		],
	};

	return [scssLoader, assetsLoader, svgLoader, esbuildLoader, imagesLoader];
}
