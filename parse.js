const nearley = require('nearley');

const schemaGrammar = require('./schemaGrammar.js');

function parse() {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(schemaGrammar));

  parser.feed(`
  //ayo
  
  TABLE person {
    id INT
    name VARCHAR
  }
  
  TABLE student {
    id INT
    name VARCHAR
    personId INT [ref: person.id]
  }

  `);
  
  const parseResult = parser.results;

  if (parseResult.length > 2) throw new Error('Error: Ambiguous code detected!');
  else if (parseResult.length === 0) throw new Error('Error: Grammar not found!');
  else return parseResult[0];
}

// export { parse };
console.log(JSON.stringify(parse(), null, 4));
