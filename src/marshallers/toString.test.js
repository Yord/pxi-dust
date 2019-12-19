const {anything, array, assert, constant, property} = require('fast-check')
const {func: marshaller} = require('./toString')

test('chunks data into lines and passes on each line as one token, not tracking lines since verbose is false', () => {
  const err    = []
  const argv   = anything().chain(verbose => constant({verbose}))
  const values = array(anything()).map(values => values.filter(value => value !== null && typeof value !== 'undefined'))

  assert(
    property(argv, values, (argv, values) => {
      const str = values.map(value => value.toString() + '\n').join('')

      expect(
        marshaller(argv)(values)
      ).toStrictEqual(
        {err, str}
      )
    })
  )
})