// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program", "symbols": ["_ml", "statements", "_ml"], "postprocess": 
        data => data[1]
                    },
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["__lb_", "statement"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statement", "statements$ebnf$1"], "postprocess": 
        data => {
            const repeated = data[1]
            const restStatement = repeated.map(chunk => chunk[1])
            return [data[0], ...restStatement]
        }
                },
    {"name": "statement", "symbols": ["define"], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "define", "symbols": [{"literal":"TABLE"}, "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"{"}, "__lb_", "table_props", "__lb_", {"literal":"}"}], "postprocess": 
        data => ({
            type: "table_definition",
            table_name: data[2],
            table_props: data[6]
        })
                },
    {"name": "table_props$ebnf$1", "symbols": []},
    {"name": "table_props$ebnf$1$subexpression$1", "symbols": ["__lb_", "table_prop"]},
    {"name": "table_props$ebnf$1", "symbols": ["table_props$ebnf$1", "table_props$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "table_props", "symbols": ["table_prop", "table_props$ebnf$1"], "postprocess": 
        data => {
            const repeated = data[1]
            const restStatement = repeated.map(chunk => chunk[1])
            return [data[0], ...restStatement]
        }
                },
    {"name": "table_prop$ebnf$1", "symbols": []},
    {"name": "table_prop$ebnf$1$subexpression$1", "symbols": ["__", "reference_prop"]},
    {"name": "table_prop$ebnf$1", "symbols": ["table_prop$ebnf$1", "table_prop$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "table_prop", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), "table_prop$ebnf$1"], "postprocess": 
        data => ({
            type: "prop_definition",
            prop_name: data[0],
            prop_type: data[2],
            prop_reference: data[3].length > 0 ? [data[3][0][1]] : [],
        })
                },
    {"name": "reference_prop", "symbols": [{"literal":"["}, "_", {"literal":"ref:"}, "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":"."}, (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"]"}], "postprocess": 
        data => ({
            type: "reference_definition",
            referenced_table:       data[4],
            referenced_table_col:   data[6],
        })
                },
    {"name": "__lb_$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1$subexpression$1"]},
    {"name": "__lb_$ebnf$1$subexpression$2", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1", "__lb_$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb_", "symbols": ["__lb_$ebnf$1", "_"]},
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "_ml$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1$subexpression$1"]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1", "__ml$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__ml", "symbols": ["__ml$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
