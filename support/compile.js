var folio = require('folio');

folio('decorator')
  .root(__dirname, '..')
  .use(folio.reader())
    .file('./lib/decorator.js')
    .pop()
  .use(folio.indent())
    .line('  ')
    .pop()
  .use(folio.wrapper())
    .prefix(
      [ 'var Decorator = function() {'
      , '  var module = {};\n'
      ].join('\n')
    )
    .suffix(
      [ '\n  return module.exports;'
      , '}(Decorator);'
      ].join('\n')
    )
    .pop()
  .use(folio.save())
    .file('./decorator.js')
    .pop()
  .use(folio.minify())
    .pop()
  .use(folio.save())
    .file('./decorator.min.js')
    .pop()
  .compile();
