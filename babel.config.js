module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        'react-native-reanimated/plugin',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-export-namespace-from',
        'babel-plugin-transform-remove-console',
      ],
    };
  };
  