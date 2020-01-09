module.exports = {
  chunkers:      [
    require('./src/chunkers/line')
  ],
  deserializers: [],
  appliers:      [
    require('./src/appliers/map'),
    require('./src/appliers/flatMap'),
    require('./src/appliers/filter')
  ],
  serializers:   [
    require('./src/serializers/string')
  ]
}