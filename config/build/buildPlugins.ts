import { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BuildOptions } from './types/types';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins({
	mode,
	paths,
	analyzer,
	platform,
}: BuildOptions): Configuration['plugins'] {
	const isProd = mode === 'production';
	const isDev = mode === 'development';

	const plugins: Configuration['plugins'] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(paths.public, 'youtube.ico'),
		}),
		new DefinePlugin({
			__PLATFORM__: JSON.stringify(platform),
			__ENV__: JSON.stringify(mode),
		}),
	];

	if (isDev) {
		plugins.push(
			new webpack.ProgressPlugin() /**  Выносить проверку типов в отдельный процесс, не нагружая сборку */,
			new ForkTsCheckerWebpackPlugin(),
			new ReactRefreshWebpackPlugin()
		);
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			}),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(paths.public, 'locales'),
						to: path.resolve(paths.output, 'locales'),
					},
				],
			})
		);
	}

	if (analyzer) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return plugins;
}
