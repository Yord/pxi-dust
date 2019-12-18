const {anything, array, assert, constant, integer, jsonObject, property} = require('fast-check')
const {func: applicator} = require('./flatMap')

test('applies the identity function to each element, not using lines since verbose is 0', () => {
  const err   = []
  const fs    = [json => json]
  const argv  = {verbose: 0}
  const jsons = array(array(jsonObject()))
  const lines = anything()

  assert(
    property(jsons, lines, (jsons, lines) => {
      const jsons2 = jsons.flatMap(fs[0])

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: jsons2}
      )
    })
  )
})

test('applies the identity function to each element, not using lines since verbose is 0', () => {
  const err    = []
  const fs     = [json => json]
  const argv   = {verbose: 0}
  const valid  = array(integer())
  const others = array(integer().map(_ => undefined))
  const jsons  = valid.chain(valid => others.map(others => valid.concat(others)))
  const lines  = anything()

  assert(
    property(jsons, lines, (jsons, lines) => {
      const jsons2 = jsons.filter(json => typeof json !== 'undefined')

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: jsons2}
      )
    })
  )
})

test('applies a function selecting the results attribute from each element, not using lines since verbose is 0', () => {
  const err    = []
  const fs     = [json => json.results]
  const argv   = {verbose: 0}
  const jsons  = array(array(integer()).map(results => ({results})))
  const lines  = anything()

  assert(
    property(jsons, lines, (jsons, lines) => {
      const results = jsons.flatMap(fs[0])

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: results}
      )
    })
  )
})

test('applies a function selecting non-present attributes which leads to an error, not using lines since verbose is 0', () => {
  const msg   = "TypeError: Cannot read property 'b' of undefined"
  const fs    = [i => i.a.b]
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
  const len        = integer(0, 10)
  const jsonsLines = len.chain(len =>
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

test('applies a function selecting non-present attributes which leads to an error, using lines and additional info since verbose is 2', () => {
  const msg        = "TypeError: Cannot read property 'b' of undefined"
  const fs         = [int => int.a.b]
  const argv       = {verbose: 2}
  const len        = integer(0, 10)
  const jsonsLines = len.chain(len =>
    array(integer(), len, len).chain(jsons =>
      array(integer(), len, len).chain(lines =>
        constant({jsons, lines})
      )
    )
  )

  assert(
    property(jsonsLines, ({jsons, lines}) => {
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