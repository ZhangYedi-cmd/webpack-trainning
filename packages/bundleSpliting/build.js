const path = require('path')
const webpack = require('webpack')

const normalConfig = {
    entry: './index.js',
    mode: 'none',
    output: {
        filename: '[name].[id].[contenthash].js',
        chunkFilename: '[name].[id].[contenthash].chunk.js',
        path: path.resolve(__dirname, 'dist/normal'),
    },
    optimization: {
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`,
        },
        chunkIds: 'deterministic',
        moduleIds: 'deterministic',
    }
}

const splitBundleConfig = {
    entry: './index.js',
    mode: 'none',
    output: {
        filename: '[name].[id].[contenthash].js',
        chunkFilename: '[name].[id].[contenthash].chunk.js',
        path: path.resolve(__dirname, 'dist/normal'),
    },
    optimization: {
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`,
        },
        chunkIds: 'deterministic',
        moduleIds: 'deterministic',
        splitChunks: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
            minSize: 0,
        }
    }
}

const f = () =>  webpack(normalConfig)

f().run(res => {
    console.log('build done')
})
