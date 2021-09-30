module.exports = {
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    [
      'transform-react-remove-prop-types',
      {
        additionalLibraries: [/\/prop-types$/],
        mode: 'remove',
        removeImport: true,
      },
    ],
  ],
  presets: ['@babel/preset-env', '@babel/react'],
};
