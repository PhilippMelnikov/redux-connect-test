module.exports = function override(config, env) {
  console.log('override webpack config!');
  const LoadablePlugin = require('@loadable/webpack-plugin');
  config.plugins = [
    ...config.plugins,
    new LoadablePlugin(),
  ];

  const loaders = config.module.rules[2].oneOf;

  loaders.splice(loaders.length - 1, 0, {
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader', // creates style nodes from JS strings
      },
      {
        loader: 'css-loader', // translates CSS into CommonJS
      },
      {
        loader: 'less-loader', // compiles Less to CSS
      },
    ],
  });
  return config;
}
