const {array, assert, integer, property, string} = require('fast-check')
const {func: parser} = require('./id')

test('always passes tokens on', () => {
  const verbose   = undefined
  const failEarly = undefined
  const argv      = undefined
  const parse     = parser(verbose, failEarly, argv)

  const tokens    = array(string())
  const lines     = integer()

  assert(
    property(tokens, tokens =>
      expect(
        parse(tokens, lines)
      ).toStrictEqual(
        {err: '', jsons: tokens}
      )
    )
  )
})