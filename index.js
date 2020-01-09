module.exports = {
  chunkers:      [
    require('./src/chunkers/line')
  ],
  deserializers: [],
  applicators:   [
    require('./src/applicators/map'),
    require('./src/applicators/flatMap'),
    require('./src/applicators/filter')
  ],
  serializers:   [
    require('./src/serializers/string')
  ]
}