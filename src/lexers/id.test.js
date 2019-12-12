const {anything, assert, integer, property, string} = require('fast-check')
const {func: lexer} = require('./id')

test('passes on data as one big token, ignoring lines completely', () => {
  const verbose   = anything()
  const failEarly = anything()
  const argv      = anything()
  const data      = string()
  const prevLines = integer()

  assert(
    property(data, prevLines, (data, prevLines) =>
      expect(
        lexer(verbose, failEarly, argv)(data, prevLines)
      ).toStrictEqual(
        {err: '', tokens: [data], lines: [], lastLine: prevLines, rest: ''}
      )
    )
  )
})