const {anything, array, assert, integer, jsonObject, property} = require('fast-check')
const {func: applicator} = require('./id')

test('does not apply function, returns input unchanged as output', () => {
  const verbose   = anything()
  const failEarly = anything()
  const fs        = array(anything())
  const argv      = anything()
  const inputLen  = integer(0, 10)

  assert(
    property(verbose, failEarly, fs, argv, inputLen, (verbose, failEarly, fs, argv, inputLen) => {
      const jsons = array(jsonObject(), inputLen)
      const lines = array(integer(), inputLen)
      property(jsons, lines, (jsons, lines) =>
        expect(
          applicator(verbose, failEarly, fs, argv)(jsons, lines)
        ).toStrictEqual(
          {err: '', jsons}
        )
      )
    })
  )
})