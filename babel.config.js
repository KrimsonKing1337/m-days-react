module.exports = function (api) {
  api.cache(false);

  const presets = [
    ['@babel/preset-typescript'],
    ['@babel/preset-react', {
      'runtime': 'automatic',
    },
    ],
    [
      '@babel/preset-env',
      {
        corejs: { version: 3 },
        useBuiltIns: 'usage',
      },
    ],
  ];

  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-transform-object-assign'],
    ['@babel/transform-runtime', { useESModules: true, regenerator: true }],
  ];

  return {
    presets,
    plugins,
    ignore: [/\/node_modules\//],
  };
};
