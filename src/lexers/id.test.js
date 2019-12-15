const {anything, assert, constant, integer, property, string} = require('fast-check')
const {func: lexer} = require('./id')

test('passes on data as one big token, ignoring lines completely', () => {
  const err       = []
  const verbose   = anything()
  const argv      = verbose.map(verbose => constant({verbose}))
  const data      = string()
  const prevLines = integer()

  assert(
    property(data, prevLines, (data, prevLines) =>
      expect(
        lexer(argv)(data, prevLines)
      ).toStrictEqual(
        {err, tokens: [data], lines: [], lastLine: prevLines, rest: ''}
      )
    )
  )
})