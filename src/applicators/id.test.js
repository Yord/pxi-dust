const {anything, array, assert, constant, integer, jsonObject, property} = require('fast-check')
const {func: applicator} = require('./id')

test('does not apply function, returns input unchanged as output', () => {
  const err      = []
  const fs       = array(anything())
  const verbose  = anything()
  const argv     = verbose.map(verbose => constant({verbose}))
  const inputLen = integer(0, 10)

  assert(
    property(fs, argv, inputLen, (fs, argv, inputLen) => {
      const jsons = array(jsonObject(), inputLen)
      const lines = array(integer(), inputLen)
      property(jsons, lines, (jsons, lines) =>
        expect(
          applicator(fs, argv)(jsons, lines)
        ).toStrictEqual(
          {err, jsons}
        )
      )
    })
  )
})