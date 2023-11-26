import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildOptimize } from './buildOptimize';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack({
	mode,
	paths,
	port,
	analyzer,
	platform,
}: BuildOptions): webpack.Configuration {
	const isDev = mode === 'development';
	const isProd = mode === 'production';

	return {
		mode: mode ?? 'development',
		entry: paths.entry,
		output: {
			path: paths.output,
			filename: '[name].[contenthash].js',
			clean: true,
			assetModuleFilename: 'images/[hash][ext][query]',
		},
		module: {
			rules: buildLoaders({ mode, paths, port }),
		},
		resolve: buildResolvers({ mode, paths, port }),

		plugins: buildPlugins({ mode, paths, port, analyzer, platform }),
		devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',

		devServer: isDev ? buildDevServer({ mode, paths, port }) : undefined,
	};
}
