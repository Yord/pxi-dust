const {anything, array, assert, constant, property} = require('fast-check')
const {func: serializer} = require('./string')

test('returns input as toString with newlines', () => {
  const err    = []
  const argv   = anything().chain(verbose => constant({verbose}))
  const values = array(anything()).map(values => values.filter(value => value !== null && typeof value !== 'undefined'))

  assert(
    property(argv, values, (argv, values) => {
      const str = values.map(value => value.toString() + '\n').join('')

      expect(
        serializer(argv)(values)
      ).toStrictEqual(
        {err, str}
      )
    })
  )
})