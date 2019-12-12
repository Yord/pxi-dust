const {anything, array, assert, property} = require('fast-check')
const {func: marshaller} = require('./id')

test('returns input as toString without newlines', () => {
  const verbose   = anything()
  const failEarly = anything()
  const argv      = anything()
  const jsons     = array(anything())

  assert(
    property(jsons, jsons => {
      const str = (
        jsons
        .filter(json => typeof json !== 'undefined' && json !== null)
        .map(json => json.toString())
        .join('')
      )

      expect(
        marshaller(verbose, failEarly, argv)(jsons)
      ).toStrictEqual(
        {err: '', str}
      ) 
    })
  )
})