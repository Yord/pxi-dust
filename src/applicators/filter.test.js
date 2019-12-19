const {anything, array, assert, constant, integer, jsonObject, property} = require('fast-check')
const {func: applicator} = require('./filter')

test('applies a predicate that is always true to each element, not using lines since verbose is 0', () => {
  const err   = []
  const fs    = [() => true]
  const argv  = {verbose: 0}
  const jsons = array(jsonObject())
  const lines = anything()

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

test('applies a predicate that is always false to each element, not using lines since verbose is 0', () => {
  const err   = []
  const fs    = [() => false]
  const argv  = {verbose: 0}
  const jsons = array(jsonObject())
  const lines = anything()

  assert(
    property(jsons, lines, (jsons, lines) =>
      expect(
        applicator(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: []}
      )
    )
  )
})

test('applies a predicate that is true for some input and false for other, not using lines since verbose is 0', () => {
  const err     = []
  const fs      = [n => n > 4]
  const argv    = {verbose: 0}
  const falsy   = array(integer(0, 4))
  const truthy  = array(integer(5, 9))
  const lines   = anything()

  assert(
    property(falsy, truthy, lines, (falsy, truthy, lines) => {
      const numbers = falsy.concat(truthy)

      expect(
        applicator(fs, argv)(numbers, lines)
      ).toStrictEqual(
        {err, jsons: truthy}
      )
    })
  )
})

test('compares two predicates with one predicate that is the conjunction of the two, not using lines since verbose is 0', () => {
  const fs     = [n => n >= 4, n => n <= 6]
  const f      = [n => n >= 4 && n <= 6]
  const argv   = {verbose: 0}
  const falsy1 = array(integer(1, 3))
  const falsy2 = array(integer(4, 6))
  const truthy = array(integer(7, 9))
  const lines  = anything()

  assert(
    property(falsy1, falsy2, truthy, lines, (falsy1, falsy2, truthy, lines) => {
      const numbers = falsy1.concat(falsy2).concat(truthy)

      expect(
        applicator(fs, argv)(numbers, lines)
      ).toStrictEqual(
        applicator(f, argv)(numbers, lines)
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