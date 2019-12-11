const {array, assert, integer, jsonObject, property} = require('fast-check')
const {func: applicator} = require('./id')

test('does not apply function, returns input unchanged as output', () => {
  const verbose   = undefined
  const failEarly = undefined
  const fs        = undefined
  const argv      = undefined
  const apply     = applicator(verbose, failEarly, fs, argv)

  const jsons     = array(jsonObject())
  const lines     = integer()

  assert(
    property(jsons, lines, (jsons, lines) =>
      expect(
        apply(jsons, lines)
      ).toStrictEqual(
        {err: '', jsons}
      )
    )
  )
})