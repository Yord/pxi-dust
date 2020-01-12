const {anything, array, assert, constant, integer, property, unicodeString} = require('fast-check')
const {func: chunker} = require('./line')

test('chunks data into lines and passes on each line as one chunk', () => {
  const err        = []
  const argv       = {verbose: 0}
  const chunks     = array(unicodeStringNoNewlines())
  const rest       = unicodeStringNoNewlines()
  const offset     = anything()
  const lines      = []
  const noMoreData = false

  assert(
    property(chunks, rest, offset, (chunks, rest, offset) => {
      const data     = chunks.map(chunk => chunk + '\n').join('') + rest
      const lastLine = offset

      expect(
        chunker(argv)(data, offset, noMoreData)
      ).toStrictEqual(
        {err, chunks, lines, lastLine, rest}
      )
    })
  )
})

test('passes rest as a chunk if noMoreData is true', () => {
  const err        = []
  const argv       = {verbose: 0}
  const chunks     = array(unicodeStringNoNewlines())
  const rest       = unicodeStringNoNewlines()
  const offset     = anything()
  const lines      = []
  const noMoreData = true

  assert(
    property(chunks, rest, offset, (chunks, rest, offset) => {
      const data     = chunks.map(chunk => chunk + '\n').join('') + rest
      const lastLine = offset
      const results  = rest === '' ? chunks : [...chunks, rest]

      expect(
        chunker(argv)(data, offset, noMoreData)
      ).toStrictEqual(
        {err, chunks: results, lines, lastLine, rest: ''}
      )
    })
  )
})

test('chunks data into lines and passes on each line as one chunk, tracking lines since verbose is 1', () => {
  const err        = []
  const argv       = {verbose: 1}
  const chunks     = array(unicodeStringNoNewlines())
  const rest       = unicodeStringNoNewlines()
  const offset     = integer()
  const noMoreData = false

  assert(
    property(chunks, rest, offset, (chunks, rest, offset) => {
      const data     = chunks.map(chunk => chunk + '\n').join('') + rest
      const lastLine = offset + chunks.length
      const lines    = arrayFrom(offset + 1, chunks.length)

      expect(
        chunker(argv)(data, offset, noMoreData)
      ).toStrictEqual(
        {err, chunks, lines, lastLine, rest}
      )
    })
  )
})

test('counts rest as one line if noMoreData is true and verbose is 1', () => {
  const err        = []
  const argv       = {verbose: 1}
  const chunks     = array(unicodeStringNoNewlines())
  const rest       = unicodeStringNoNewlines()
  const offset     = integer()
  const noMoreData = true

  assert(
    property(chunks, rest, offset, (chunks, rest, offset) => {
      const data     = chunks.map(chunk => chunk + '\n').join('') + rest
      const lastLine = offset + chunks.length + (rest === '' ? 0 : 1)
      const results  = rest === '' ? chunks : [...chunks, rest]
      const lines    = arrayFrom(offset + 1, chunks.length + (rest === '' ? 0 : 1))

      expect(
        chunker(argv)(data, offset, noMoreData)
      ).toStrictEqual(
        {err, chunks: results, lines, lastLine, rest: ''}
      )
    })
  )
})

function unicodeStringNoNewlines () {
  return unicodeString().map(str => str.replace(/\n/g, ''))
}

function arrayFrom (from, length) {
  return Array.from(new Array(length), (_, i) => i + from)
}