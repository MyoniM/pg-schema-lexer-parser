const moo = require('moo');

let lexer = moo.compile({
  WS: /[ \t]+/,
  comment: /\/\/.*?$/,
  keyword: ['ref:'],
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  lSquareParen: '[',
  rSquareParen: ']',
  lBrace: '{',
  rBrace: '}',
  dot: '.',
  NL: { match: /\r?\n/, lineBreaks: true },
});

module.exports = lexer;
