@{%
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
%}

@lexer lexer

program -> _ml statements _ml
            {%
                data => data[1]
            %}

statements
    ->  statement (__lb_ statement):*
        {%
            data => {
                const repeated = data[1]
                const restStatement = repeated.map(chunk => chunk[1])
                return [data[0], ...restStatement]
            }
        %}
        
statement
    ->  define     {% id %}
    |   %comment   {% id %}

define
    ->  "TABLE" _ %identifier _ "{" __lb_ table_props __lb_ "}"
        {%
            data => ({
                type: "table_definition",
                table_name: data[2],
                table_props: data[6]
            })
        %}

table_props
    ->  table_prop (__lb_ table_prop):*
        {%
            data => {
                const repeated = data[1]
                const restStatement = repeated.map(chunk => chunk[1])
                return [data[0], ...restStatement]
            }
        %}

table_prop
    ->  %identifier __ %identifier (__ reference_prop):*
        {%
            data => ({
                type: "prop_definition",
                prop_name: data[0],
                prop_type: data[2],
                prop_reference: data[3].length > 0 ? [data[3][0][1]] : [],
            })
        %}

reference_prop
    ->  "[" _ "ref:" __ %identifier "." %identifier _ "]"
        {%
            data => ({
                type: "reference_definition",
                referenced_table:       data[4],
                referenced_table_col:   data[6],
            })
        %}


__lb_ -> (_ %NL):+ _

_ml -> (%WS | %NL):*
__ml -> (%WS | %NL):+

_ -> %WS:*
__ -> %WS:+