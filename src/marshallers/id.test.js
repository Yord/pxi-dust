const {array, assert, integer, jsonObject, property} = require('fast-check')
const {func: marshaller} = require('./id')

test('returns input as toString without newlines', () => {
  const verbose   = undefined
  const failEarly = undefined
  const argv      = undefined
  const marshal   = marshaller(verbose, failEarly, argv)

  const jsons     = array(jsonObject())

  assert(
    property(jsons, jsons => {
      const str = (
        jsons
        .map(json => json === null ? '' : json.toString())
        .join('')
      )

      expect(
        marshal(jsons)
      ).toStrictEqual(
        {err: '', str}
      ) 
    })
  )
})