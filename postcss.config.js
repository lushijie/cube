module.exports = {
  plugins: {
    'autoprefixer': {},

    // https://www.npmjs.com/package/postcss-pxtorem
    'postcss-pxtorem': {
      // rootValue: 75,
      // unitPrecision: 5,
      // propList: ['*'],
      propList: ['font-size'],
    },

    'precss': {}
  }
};
