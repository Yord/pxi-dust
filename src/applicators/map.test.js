const {anything, array, assert, constant, integer, jsonObject, property} = require('fast-check')
const {func: applicator} = require('./map')

test('applies the identity function to each element, not using lines since verbose is 0', () => {
  const err     = []
  const fs      = [json => json]
  const verbose = 0
  const argv    = constant({verbose})
  const jsons   = array(jsonObject())
  const lines   = anything()

  assert(
    property(jsons, lines, (jsons, lines) =>
      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})

test('applies a function selecting the time attribute from each element, not using lines since verbose is 0', () => {
  const err       = []
  const fs        = [json => json.time]
  const verbose   = 0
  const argv      = constant({verbose})
  const jsons     = array(integer()).chain(ints => constant(ints.map(int => ({time: int}))))
  const others    = array(integer())
  const lines     = anything()

  assert(
    property(argv, jsons, others, lines, (argv, jsons, others, lines) => {
      const input   = jsons.concat(others)
      const results = jsons.map(fs[0]).concat(others.map(() => undefined))

      expect(
        applicator(fs, argv)(input, lines)
      ).toStrictEqual(
        {err, jsons: results}
      )
    })
  )
})

test('applies a function selecting non-present attributes which leads to an error, not using lines since verbose is 0', () => {
  const msg       = "TypeError: Cannot read property 'b' of undefined"
  const fs        = [int => int.a.b]
  const verbose   = 0
  const argv      = constant({verbose})
  const jsons     = array(integer())
  const lines     = anything()

  assert(
    property(argv, jsons, lines, (argv, jsons, lines) => {
      const err = jsons.map(() => msg)

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: []}
      )
    })
  )
})