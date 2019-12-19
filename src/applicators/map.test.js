const {anything, array, assert, constant, integer, property} = require('fast-check')
const {func: applicator} = require('./map')

test('applies the identity function to each element', () => {
  const err   = []
  const fs    = [json => json]
  const argv  = anything().chain(verbose => constant({verbose}))
  const jsons = array(anything())
  const lines = anything()

  assert(
    property(argv, jsons, lines, (argv, jsons, lines) =>
      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})

test('applies a function selecting the time attribute from each element', () => {
  const err    = []
  const fs     = [json => json.time]
  const argv   = anything().chain(verbose => constant({verbose}))
  const jsons  = array(anything().chain(any => constant({time: any})))
  const others = array(integer())
  const lines  = anything()

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
  const msg   = "TypeError: Cannot read property 'b' of undefined"
  const fs    = [int => int.a.b]
  const argv  = {verbose: 0}
  const jsons = array(integer())
  const lines = anything()

  assert(
    property(jsons, lines, (jsons, lines) => {
      const err = jsons.map(() => msg)

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: []}
      )
    })
  )
})

test('applies a function selecting non-present attributes which leads to an error, using lines since verbose is 1', () => {
  const msg        = "TypeError: Cannot read property 'b' of undefined"
  const fs         = [int => int.a.b]
  const argv       = {verbose: 1}
  const jsonsLines = integer(0, 10).chain(len =>
    array(integer(), len, len).chain(jsons =>
      array(integer(), len, len).chain(lines =>
        constant({jsons, lines})
      )
    )
  )

  assert(
    property(jsonsLines, ({jsons, lines}) => {
      const err = lines.map(line => `Line ${line}: ${msg}`)

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: []}
      )
    })
  )
})

test('applies a function selecting non-present attributes which leads to an error, using lines and additional info since verbose is 2 or bigger', () => {
  const msg        = "TypeError: Cannot read property 'b' of undefined"
  const fs         = [int => int.a.b]
  const argv       = integer(2, 50).chain(verbose => constant({verbose}))
  const jsonsLines = integer(0, 10).chain(len =>
    array(integer(), len, len).chain(jsons =>
      array(integer(), len, len).chain(lines =>
        constant({jsons, lines})
      )
    )
  )

  assert(
    property(argv, jsonsLines, (argv, {jsons, lines}) => {
      const err = lines.map((line, index) => {
        const info = ' while transforming:\n' + JSON.stringify(jsons[index], null, 2)
        return `Line ${line}: ${msg}${info}`
      })

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: []}
      )
    })
  )
})