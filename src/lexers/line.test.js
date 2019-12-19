const {anything, array, assert, constant, integer, property, unicodeString} = require('fast-check')
const {func: lexer} = require('./line')

test('chunks data into lines and passes on each line as one token', () => {
  const err     = []
  const argv    = anything().chain(verbose => constant({verbose}))
  const tokens  = array(unicodeStringNoNewlines())
  const rest    = unicodeStringNoNewlines()
  const offset  = anything()
  const lines   = []

  assert(
    property(tokens, rest, offset, (tokens, rest, offset) => {
      const data     = tokens.map(token => token + '\n').join('') + rest
      const lastLine = offset

      expect(
        lexer(argv)(data, offset)
      ).toStrictEqual(
        {err, tokens, lines, lastLine, rest}
      )
    })
  )
})

test('chunks data into lines and passes on each line as one token, tracking lines since verbose is 1', () => {
  const err    = []
  const argv   = {verbose: 1}
  const tokens = array(unicodeStringNoNewlines())
  const rest   = unicodeStringNoNewlines()
  const offset = integer()

  assert(
    property(tokens, rest, offset, (tokens, rest, offset) => {
      const data     = tokens.map(token => token + '\n').join('') + rest
      const lastLine = offset + tokens.length
      const lines    = arrayFrom(offset + 1, tokens.length)

      expect(
        lexer(argv)(data, offset)
      ).toStrictEqual(
        {err, tokens, lines, lastLine, rest}
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