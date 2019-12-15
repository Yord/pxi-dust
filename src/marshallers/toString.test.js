const {anything, array, assert, constant, property} = require('fast-check')
const {func: marshaller} = require('./toString')

test('chunks data into lines and passes on each line as one token, not tracking lines since verbose is false', () => {
  const err     = []                                          // toString marshaller does not report any errors
  const verbose = anything()                                  // is not used by toString marshaller, should not make any difference
  const argv    = verbose.map(verbose => constant({verbose})) // is not used by toString marshaller, should not make any difference
  const values  = array(anything())                           // values are an array of anything that the user function returns

  assert(
    property(argv, values, (argv, values) => {
      const cleaned = values.filter(value => value !== null && typeof value !== 'undefined')
      const str     = cleaned.map(value => value.toString()).join('\n') + (cleaned.length > 0 ? '\n' : '')

      expect(
        marshaller(argv)(values)
      ).toStrictEqual(
        {err, str}
      )
    })
  )
})