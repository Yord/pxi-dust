const {anything, array, assert, constant, integer, property} = require('fast-check')
const {func: applicator} = require('./flatMap')

test('applies the identity function to each element', () => {
  const err   = []
  const fs    = [json => json]
  const argv  = anything().chain(verbose => constant({verbose}))
  const jsons = array(array(anything()))
  const lines = anything()

  assert(
    property(argv, jsons, lines, (argv, jsons, lines) => {
      const jsons2 = jsons.reduce((acc, json) => (fs[0](json).forEach(elem => acc.push(elem)), acc), []) // flatMap

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: jsons2}
      )
    })
  )
})

test('applies the identity function to each element', () => {
  const err    = []
  const fs     = [json => json]
  const argv   = anything().chain(verbose => constant({verbose}))
  const valid  = array(integer())
  const others = array(integer().map(_ => undefined))
  const jsons  = valid.chain(valid => others.map(others => valid.concat(others)))
  const lines  = anything()

  assert(
    property(argv, jsons, lines, (argv, jsons, lines) => {
      const jsons2 = jsons.filter(json => typeof json !== 'undefined')

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: jsons2}
      )
    })
  )
})

test('applies a function selecting the results attribute from each element', () => {
  const err    = []
  const fs     = [json => json.results]
  const argv   = anything().chain(verbose => constant({verbose}))
  const jsons  = array(array(integer()).map(results => ({results})))
  const lines  = anything()

  assert(
    property(argv, jsons, lines, (argv, jsons, lines) => {
      const results = jsons.reduce((acc, json) => (fs[0](json).forEach(elem => acc.push(elem)), acc), []) // flatMap

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: results}
      )
    })
  )
})

test('applies a function selecting non-present attributes which leads to an error, not using lines since verbose is 0', () => {
  const msg   = "Cannot read property 'b' of undefined"
  const fs    = [i => i.a.b]
  const argv  = {verbose: 0}
  const jsons = array(integer())
  const lines = anything()

  assert(
    property(jsons, lines, (jsons, lines) => {
      const err = jsons.map(() => ({msg}))

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: []}
      )
    })
  )
})

test('applies a function selecting non-present attributes which leads to an error, using lines since verbose is 1', () => {
  const msg        = "Cannot read property 'b' of undefined"
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
      const err = lines.map(line => ({msg, line}))

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: []}
      )
    })
  )
})

test('applies a function selecting non-present attributes which leads to an error, using lines and additional info since verbose is 2 or higher', () => {
  const msg        = "Cannot read property 'b' of undefined"
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
        const info = JSON.stringify(jsons[index], null, 0)
        return {msg, line, info}
      })

      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: []}
      )
    })
  )
})