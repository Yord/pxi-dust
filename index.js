module.exports = {
  lexers: [
    require('./src/lexers/line')
  ],
  parsers: [
    require('./src/parsers/id')
  ],
  applicators: [
    require('./src/applicators/map'),
    require('./src/applicators/flatMap'),
    require('./src/applicators/filter')
  ],
  marshallers: [
    require('./src/marshallers/toString')
  ]
}