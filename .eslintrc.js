module.exports = {
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': './tsconfig.json',
    'tsconfigRootDir': './'
  },
  'extends': [
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'none',
        'requireLast': false
      },
      'singleline': {
        'delimiter': 'comma',
        'requireLast': false
      }
    }],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'node/no-unsupported-features/es-syntax': 'off'
  },
  'env': {
    'jasmine': true
  }
}
