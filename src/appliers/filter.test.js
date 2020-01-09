const {anything, array, assert, constant, integer, jsonObject, property} = require('fast-check')
const {func: applier} = require('./filter')

test('applies a predicate that is always true to each element', () => {
  const err   = []
  const fs    = [() => true]
  const argv  = anything().chain(verbose => constant({verbose}))
  const jsons = array(anything().map(any => typeof any === 'undefined' ? 42 : any))
  const lines = anything()

  assert(
    property(argv, jsons, lines, (argv, jsons, lines) =>
      expect(
        applier(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})

test('applies a predicate that is always false to each element', () => {
  const err   = []
  const fs    = [() => false]
  const argv  = anything().chain(verbose => constant({verbose}))
  const jsons = array(anything())
  const lines = anything()

  assert(
    property(argv, jsons, lines, (argv, jsons, lines) =>
      expect(
        applier(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: []}
      )
    )
  )
})

test('applies a predicate that is true for some input and false for other', () => {
  const err     = []
  const fs      = [n => n > 4]
  const argv    = anything().chain(verbose => constant({verbose}))
  const falsy   = array(integer(0, 4))
  const truthy  = array(integer(5, 9))
  const lines   = anything()

  assert(
    property(argv, falsy, truthy, lines, (argv, falsy, truthy, lines) => {
      const numbers = falsy.concat(truthy)

      expect(
        applier(fs, argv)(numbers, lines)
      ).toStrictEqual(
        {err, jsons: truthy}
      )
    })
  )
})

test('compares two predicates with one predicate that is the conjunction of the two', () => {
  const fs     = [n => n >= 4, n => n <= 6]
  const f      = [n => n >= 4 && n <= 6]
  const argv   = anything().chain(verbose => constant({verbose}))
  const falsy1 = array(integer(1, 3))
  const falsy2 = array(integer(4, 6))
  const truthy = array(integer(7, 9))
  const lines  = anything()

  assert(
    property(argv, falsy1, falsy2, truthy, lines, (argv, falsy1, falsy2, truthy, lines) => {
      const numbers = falsy1.concat(falsy2).concat(truthy)

      expect(
        applier(fs, argv)(numbers, lines)
      ).toStrictEqual(
        applier(f, argv)(numbers, lines)
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
        applier(fs, argv)(jsons, lines)
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
        applier(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: []}
      )
    })
  )
})

test('applies a function selecting non-present attributes which leads to an error, using lines and additional info since verbose is 2 or bigger', () => {
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
        applier(fs, argv)(jsons, lines)
      ).toStrictEqual(
        {err, jsons: []}
      )
    })
  )
})