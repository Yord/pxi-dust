const {array, assert, constant, integer, property, unicodeString} = require('fast-check')
const {func: lexer} = require('./line')

test('chunks data into lines and passes on each line as one token, not tracking lines since verbose is false', () => {
  const err     = []                               // line lexer does not report any errors
  const verbose = false                            // verbose is set to false, so lines should not be counted
  const argv    = constant({verbose})              // is not used by line lexer, should not make any difference
  const tokens  = array(unicodeStringNoNewlines()) // tokens are any number of strings
  const rest    = unicodeStringNoNewlines()        // rest string that should not be lexed as a token
  const offset  = integer()                        // starting offset for line count

  assert(
    property(argv, tokens, rest, offset, (argv, tokens, rest, offset) => {
      const data     = tokens.join('\n') + (tokens.length > 0 ? '\n' : '') + rest
      const lastLine = offset
      const lines    = []

      expect(
        lexer(argv)(data, offset)
      ).toStrictEqual(
        {err, tokens, lines, lastLine, rest}
      )
    })
  )
})

test('chunks data into lines and passes on each line as one token, tracking lines since verbose is true', () => {
  const err       = []                               // line lexer does not report any errors
  const verbose   = true                             // verbose is set to true, so lines should be counted
  const argv      = constant({verbose})              // is not used by line lexer, should not make any difference
  const tokens    = array(unicodeStringNoNewlines()) // tokens are any number of strings
  const rest      = unicodeStringNoNewlines()        // rest string that should not be lexed as a token
  const offset    = integer()                        // starting offset for line count

  assert(
    property(argv, tokens, rest, offset, (argv, tokens, rest, offset) => {
      const data     = tokens.join('\n') + (tokens.length > 0 ? '\n' : '') + rest
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