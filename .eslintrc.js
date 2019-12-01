module.exports = {
  extends: [
    'airbnb-base',
    'airbnb',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react-hooks', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'off',
      {
        extensions: ['.js']
      }
    ]
  }
};
