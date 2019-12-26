module.exports = {
  lexers:      [
    require('./src/lexers/line')
  ],
  parsers:     [],
  applicators: [
    require('./src/applicators/map'),
    require('./src/applicators/flatMap'),
    require('./src/applicators/filter')
  ],
  marshallers: [
    require('./src/marshallers/toString')
  ]
}