const {anything, array, assert, constant, integer, property, string} = require('fast-check')
const {func: parser} = require('./id')

test('always passes tokens on', () => {
  const err     = []
  const verbose = anything()
  const argv    = verbose.map(verbose => constant({verbose}))
  const tokens  = array(string())
  const lines   = integer()

  assert(
    property((argv, tokens, lines), (argv, tokens, lines) => {
      const parse = parser(argv)

      expect(
        parse(tokens, lines)
      ).toStrictEqual(
        {err, jsons: tokens}
      )
    })
  )
})