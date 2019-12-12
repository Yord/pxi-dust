const {anything, array, assert, constant, integer, jsonObject, property} = require('fast-check')
const {func: applicator} = require('./map')

test('applies the identity function to each element, not using lines since verbose is false, not failing early', () => {
  const err       = ''
  const verbose   = false
  const failEarly = false
  const fs        = [json => json]
  const argv      = anything()
  const jsons     = array(jsonObject())
  const lines     = integer()

  assert(
    property(jsons, lines, (jsons, lines) =>
      expect(
        applicator(verbose, failEarly, fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})

/*
test('applies a function selecting the time attribute to each element, not using lines since verbose is false, not failing early', () => {
  const err       = ''
  const verbose   = false
  const failEarly = false
  const fs        = [json => json.time]
  const argv      = anything()
  const jsons     = array(integer()).chain(ints => constant(ints.map(int => ({time: int}))))
  const others    = array(integer())
  const lines     = integer()

  assert(
    property(argv, jsons, others, lines, (argv, jsons, others, lines) =>
      expect(
        applicator(verbose, failEarly, fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})
*/