if (typeof window === 'undefined') {
  var esprima = require('./3rdparty/esprima');
  var escodegen = require('../escodegen');
}

var fixtures = {
  'FunctionDeclarations': {
    'one-line named functions': [
      'function foo(){}',
      'function foo() {}',
      'function foo(p1){}',
      'function foo(p1) {}',
      'function foo(p1,p2){}',
      'function foo(p1, p2){}',
      'function foo(p1,p2) {}',
      'function foo(p1, p2) {}'
    ],
    'multi-line named functions': [
      'function foo() {\n' +
      '}',

      'function foo() {\n' +
      ' }',

      'function foo() {\n' +
      '\n' +
      '}',

      'function foo() {\n' +
      '\n' +
      ' }',

      'function foo(p1, p2) {\n' +
      '}',

      'function foo(p1, p2) {\n' +
      ' }',

      'function foo(p1, p2) {\n' +
      '\n' +
      '}',

      'function foo(p1, p2) {\n' +
      '\n' +
      ' }',

      'function foo(p1, p2) {\n' +
      '  return \'foo\';\n' +
      '}'
    ]
  },

  'Program': {
    'whitespace at top': [
      ' var a = 1;',
      '\n\nvar a = 1;',
    ]
  },

  'LabeledStatement': {
    'inline label statement': [
      'testLabel: var a = 1;',
      'testLabel:  var a = 1;'
    ],

    'multi-line label statement': [
      'testLabel:\n' +
      'var a = 1;',

      'testLabel:\n' +
      ' var a = 1;',

      'testLabel:\n' +
      '  for (var key in foo) {\n' +
      '    bar = foo[key];\n' +
      '}'
    ]
  },

  'ForInStatement': {
    'single line for-in': [
      'for(var key in foo){}',
      'for (var key in foo){}',
      'for(var key in foo) {}',
      'for (var key in foo) {}',
      'for (var  key in foo) {}',
      'for (var key in foo) {var a = foo[key];}',
      'for (var key in foo) { var a = foo[key];}',
      'for (var key in foo) {var a = foo[key]; }',
      'for (var key in foo)var a = foo[key];',
      'for (var key in foo) var a = foo[key];',
      'for(key in foo){}',
      'for (key in foo){}',
      'for(key in foo) {}',
      'for (key in foo) {}',
      'for (key in foo) {var a = foo[key];}',
      'for (key in foo) { var a = foo[key];}',
      'for (key in foo) {var a = foo[key]; }',
      'for (key in foo)var a = foo[key];',
      'for (key in foo) var a = foo[key];'
    ],

    'multi line for-in': [
      'for(var key in foo){\n' +
      '}',

      'for (var key in foo){\n' +
      '}',

      'for (var  key in foo){\n' +
      '}',

      'for (var  key in foo) {\n' +
      '}',

      'for (var  key in foo) {\n' +
      '\n' +
      '}',

      'for (var  key in foo) {\n' +
      ' var a = foo[key];\n' +
      '}',

      'for (var  key in foo) {\n' +
      '\n' +
      ' var a = foo[key];\n' +
      '}',

      'for (var  key in foo) {\n' +
      ' var a = foo[key];\n' +
      '\n' +
      '}',

      'for(key in foo){\n' +
      '}',

      'for (key in foo){\n' +
      '}',

      'for (key in foo) {\n' +
      '}',

      'for (key in foo) {\n' +
      '\n' +
      '}',

      'for (key in foo) {\n' +
      ' var a = foo[key];\n' +
      '}',

      'for (key in foo) {\n' +
      '\n' +
      ' var a = foo[key];\n' +
      '}',

      'for (key in foo) {\n' +
      ' var a = foo[key];\n' +
      '\n' +
      '}'
    ]
  },

  'ForStatement': {
    'single line for': [
      'for (;;){}',

      'for(var i = 0;;){}',
      'for (var i = 0;;){}',
      'for(i = 0;;){}',
      'for (i = 0;;){}',

      'for(;i < 10;){}',
      'for (;i < 10;){}',

      'for(;;i++){}',
      'for (;;i++){}',

      'for(var i = 0;i < 10;){}',
      'for (var i = 0;i < 10;){}',
      'for(var i = 0; i < 10;){}',
      'for (var i = 0; i < 10;){}',

      'for(var i = 0;;i++){}',
      'for (var i = 0;;i++){}',
      'for(var i = 0;; i++){}',
      'for (var i = 0;; i++){}',

      'for(var i = 0;i < 10;i++){}',
      'for (var i = 0;i < 10;i++){}',
      'for(var i = 0;i < 10; i++){}',
      'for (var i = 0;i < 10; i++){}',

      'for(var i = 0;i < 10; i++) {}',
      'for (var i = 0;i < 10; i++) {}',
      'for(var i = 0;i < 10; i++)var a = 1;',
      'for (var i = 0;i < 10; i++)var a = 1;',
      'for(var i = 0;i < 10; i++) var a = 1;',
      'for (var i = 0;i < 10; i++) var a = 1;',
    ],

    'multi line for': [
      'for (var i = 0; i < 10; i++){\n' +
      '}',

      'for (var i = 0; i < 10; i++) {\n' +
      '}',

      'for (var i = 0; i < 10; i++) {\n' +
      '\n' +
      '}',

      'for (var i = 0; i < 10; i++) {\n' +
      '  var a = 1;\n' +
      '}',

      'for (var i = 0; i < 10; i++) {\n' +
      '\n' +
      '  var a = 1;\n' +
      '}',

      'for (var i = 0; i < 10; i++) {\n' +
      '  var a = 1;\n' +
      '\n' +
      '}',

      'for (var i = 0; i < 10; i++) {\n' +
      '\n' +
      '  var a = 1;\n' +
      '\n' +
      '}'
    ]
  },

  'IfStatement': {
    'singe line if, no alternate': [
      'if(a)b;',
      'if (a)b;',
      'if (a) b;',

      'if(a){b;}',
      'if(a) {b;}',
      'if(a) { b;}',
      'if(a) {b; }',
      'if(a) { b; }',
    ],

    'single line if, with alternate': [
      'if(a){b;}else c;',
      'if(a){b;} else c;',
      'if (a) {b;} else {c;}',
      'if (a) {b;} else { c;}',
      'if (a) {b;} else {c; }',
      'if (a) {b;} else { c; }'
    ],

    'multi line if, no alternate': [
      'if(a)\n' +
      'b;',

      'if (a)\n' +
      'b;',

      'if (a)\n' +
      '  b;',

      'if (a) {\n' +
      '}',

      'if (a) {\n' +
      '\n' +
      '}',

      'if (a) {\n' +
      'b;' +
      '}',

      'if (a) {\n' +
      '  b;' +
      '}',

      'if (a) {\n' +
      '\n' +
      '  b;' +
      '\n' +
      '}'
    ],

    'multi line if, with alternate': [
      'if (a) {\n' +
      '  b;\n' +
      '}else c;',

      'if (a) {\n' +
      '  b;\n' +
      '}\n' +
      'else c;',

      'if (a) {\n' +
      '  b;\n' +
      '}\n' +
      '\n' +
      'else c;',

      'if (a) {\n' +
      '  b;\n' +
      '} else {c;}',

      'if (a) {\n' +
      '  b;\n' +
      '} else { c;}',

      'if (a) {\n' +
      '  b;\n' +
      '} else {c; }',

      'if (a) {\n' +
      '  b;\n' +
      '} else { c; }',

      'if (a) {\n' +
      '  b;\n' +
      '}\n' +
      '\n' +
      'else {c;}',

      'if (a) {\n' +
      '  b;\n' +
      '}\n' +
      'else {c;}',

      'if (a) {\n' +
      '  b;\n' +
      '}\n' +
      'else {\n' +
      '  c;\n' +
      '}',

      'if (a) {\n' +
      '  b;\n' +
      '}\n' +
      'else {\n' +
      '  c;\n' +
      '}'
    ]
  },

  'SwitchStatement': {
    'single line switch statement': [
      'switch(1){}',
      'switch (1){}',
      'switch (1) {}',
      'switch (1) {}',
      'switch (1){case 1:\'foo\';\'bar\';case 2:\'baz\';default:\'blah\';}',
      'switch (1) {case 1:\'foo\';\'bar\';case 2:\'baz\';default:\'blah\';}',
      'switch (1) {case 1: \'foo\';\'bar\';case 2:\'baz\';default:\'blah\';}',
      'switch (1) {case 1: \'foo\'; \'bar\';case 2:\'baz\';default:\'blah\';}',
      'switch (1) {case 1: \'foo\'; \'bar\'; case 2:\'baz\';default:\'blah\';}',
      'switch (1) {case 1: \'foo\'; \'bar\'; case 2: \'baz\';default:\'blah\';}',
      'switch (1) {case 1: \'foo\'; \'bar\'; case 2: \'baz\'; default:\'blah\';}',
      'switch (1) {case 1: \'foo\'; \'bar\'; case 2: \'baz\'; default: \'blah\';}',
      'switch (1) {case 1: \'foo\'; \'bar\'; case 2: \'baz\'; default: \'blah\'; }',
      'switch (1) {default:\'foo\';}',
      'switch (1) {default: \'foo\'; }'
    ],

    'multi line switch statement': [
      'switch(1) {\n' +
      '}',

      'switch (1) {\n' +
      '}',

      'switch (1) {\n' +
      ' }',

      'switch (1) {\n' +
      'case 1:\'foo\';\'bar\';\n' +
      'case 2:\'baz\';\n' +
      'default:\'blah\';\n' +
      '}',

      'switch (1) {\n' +
      '  case 1:\'foo\';\'bar\';\n' +
      'case 2:\'baz\';\n' +
      'default:\'blah\';\n' +
      '}',

      'switch (1) {\n' +
      '  case 1:\n' +
      '    \'foo\';\'bar\';\n' +
      'case 2:\'baz\';\n' +
      'default:\'blah\';\n' +
      '}',

      'switch (1) {\n' +
      '  case 1:\n' +
      '    \'foo\';\'bar\';\n' +
      '  case 2:\'baz\';\n' +
      'default:\'blah\';\n' +
      '}',

      'switch (1) {\n' +
      '  case 1:\n' +
      '    \'foo\';\'bar\';\n' +
      '  case 2:\n' +
      '    \'baz\';\n' +
      'default:\'blah\';\n' +
      '}',

      'switch (1) {\n' +
      '  case 1:\n' +
      '    \'foo\';\'bar\';\n' +
      '  case 2:\n' +
      '    \'baz\';\n' +
      '  default:\'blah\';\n' +
      '}',

      'switch (1) {\n' +
      '  case 1:\n' +
      '    \'foo\';\'bar\';\n' +
      '  case 2:\n' +
      '    \'baz\';\n' +
      '  default:\n' +
      '    \'blah\';\n' +
      '}',

      'switch (1) {\n' +
      'default:\'blah\';\n' +
      '}',

      'switch (1) {\n' +
      '  default:\'blah\';\n' +
      '}',

      'switch (1) {\n' +
      '  default:\n' +
      '    \'blah\';\n' +
      '}'
    ]
  },

  'TryStatement': {
    'single line try-catch': [
      'try{\'foo\';}catch(e){\'bar\';}',
      'try {\'foo\';}catch(e){\'bar\';}',
      'try { \'foo\';}catch(e){\'bar\';}',
      'try { \'foo\'; }catch(e){\'bar\';}',
      'try { \'foo\'; } catch(e){\'bar\';}',
      'try { \'foo\'; } catch (e){\'bar\';}',
      'try { \'foo\'; } catch (e) {\'bar\';}',
      'try { \'foo\'; } catch (e) { \'bar\';}',
      'try { \'foo\'; } catch (e) { \'bar\'; }',
    ],

    'single line try-finally': [
      'try{\'foo\';} finally {\'bar\';}',
      'try {\'foo\';} finally {\'bar\';}',
      'try { \'foo\';} finally {\'bar\';}',
      'try { \'foo\'; } finally {\'bar\';}',
      'try { \'foo\'; } finally { \'bar\';}',
      'try { \'foo\'; } finally { \'bar\'; }',
    ],

    'single line try-catch-finally': [
      'try{\'foo\';}catch(e){\'bar\';} finally {\'baz\';}',
      'try {\'foo\';}catch(e){\'bar\';} finally {\'baz\';}',
      'try { \'foo\';}catch(e){\'bar\';} finally {\'baz\';}',
      'try { \'foo\'; } catch(e){\'bar\';} finally {\'baz\';}',
      'try { \'foo\'; } catch (e){\'bar\';} finally {\'baz\';}',
      'try { \'foo\'; } catch (e) {\'bar\';} finally {\'baz\';}',
      'try { \'foo\'; } catch (e) { \'bar\'; } finally {\'baz\';}',
      'try { \'foo\'; } catch (e) { \'bar\'; } finally { \'baz\';}',
      'try { \'foo\'; } catch (e) { \'bar\'; } finally { \'baz\'; }',
    ],

    'multi line try-catch': [
      'try{\n' +
      '\'foo\';\n' +
      '}catch(e){\n' +
      '\'bar\';\n' +
      '}',

      'try {\n' +
      '\'foo\';\n' +
      '}catch(e){\n' +
      '\'bar\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '}catch(e){\n' +
      '\'bar\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '} catch(e){\n' +
      '\'bar\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '}\n' +
      'catch(e){\n' +
      '\'bar\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '} catch(e) {\n' +
      '\'bar\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '} catch(e) {\n' +
      '  \'bar\';\n' +
      '}',
    ],

    'multi line try-finally': [
      'try{\n' +
      '\'foo\';\n' +
      '} finally {\n' +
      '\'bar\';\n' +
      '}',

      'try {\n' +
      '\'foo\';\n' +
      '} finally {\n' +
      '\'bar\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '} finally {\n' +
      '\'bar\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '} finally {\n' +
      '  \'bar\';\n' +
      '}'
    ],

    'multi line try-catch-finally': [
      'try{\n' +
      '\'foo\';\n' +
      '}catch(e){\n' +
      '\'bar\';\n' +
      '} finally {\n' +
      '\'baz\';\n' +
      '}',

      'try {\n' +
      '\'foo\';\n' +
      '}catch(e){\n' +
      '\'bar\';\n' +
      '} finally {\n' +
      '\'baz\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '}catch(e){\n' +
      '\'bar\';\n' +
      '} finally {\n' +
      '\'baz\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '} catch(e){\n' +
      '\'bar\';\n' +
      '} finally {\n' +
      '\'baz\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '} catch (e){\n' +
      '\'bar\';\n' +
      '} finally {\n' +
      '\'baz\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '} catch (e) {\n' +
      '\'bar\';\n' +
      '} finally {\n' +
      '\'baz\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '} catch (e) {\n' +
      '  \'bar\';\n' +
      '} finally {\n' +
      '\'baz\';\n' +
      '}',

      'try {\n' +
      '  \'foo\';\n' +
      '} catch (e) {\n' +
      '  \'bar\';\n' +
      '} finally {\n' +
      '  \'baz\';\n' +
      '}'
    ]
  }
};

function compare(input, expected) {
  'use strict';
  var generatedCode, ast;

  expected = expected || input;

  ast = esprima.parse(input, {loc: true});
  generatedCode = escodegen.generate(ast, {format: {preserveLocInfo: true}});
  if (generatedCode !== expected) {
    return 'Expected:\n' +
           expected.replace(/ /g, '_') +
           '\ngot:\n' +
           generatedCode.replace(/ /g, '_');
  }
}

(function() {
  'use strict';
  var category, fixture, i, il, numFailures = 0, numTests = 0, result,
      subcategory, test, timer;

  timer = Date.now();
  for (category in fixtures) {
    for (subcategory in fixtures[category]) {
      for (i = 0, il = fixtures[category][subcategory].length; i < il; i++) {
        fixture = fixtures[category][subcategory][i];
        numTests++;
        if (Object.prototype.toString.call(fixture) == '[object Array]') {
          result = compare(fixture[0], fixture[1]);
        } else {
          result = compare(fixture);
        }
        if (result) {
          console.error('\n' + result);
          numFailures++;
          throw new Error();
        }
      }
    }
  }
  timer = Date.now() - timer;
  console.log(
      numTests + ' tests. ' + numFailures + ' failures. ' + timer + ' ms'
  );
}())
