module.exports = {
  chunkers:    [
    require('./src/chunkers/line')
  ],
  parsers:     [],
  applicators: [
    require('./src/applicators/map'),
    require('./src/applicators/flatMap'),
    require('./src/applicators/filter')
  ],
  marshallers: [
    require('./src/marshallers/string')
  ]
}