module.exports = {
  extends: "meishi",
  globals: {
    INJECT: true
  },
  rules: {
    'no-console': ['warn', {
      allow: ['debug', 'info', 'warn', 'error']
    }],
    'comma-dangle': ['warn', {
      'arrays': 'ignore',
      'objects': 'ignore',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never'
    }],
  }
}