module.exports = {
  lexers: [
    require('./src/lexers/line'),
    require('./src/lexers/id')
  ],
  parsers: [
    require('./src/parsers/id')
  ],
  applicators: [
    require('./src/applicators/map'),
    require('./src/applicators/flatMap'),
    require('./src/applicators/filter'),
    require('./src/applicators/id')
  ],
  marshallers: [
    require('./src/marshallers/toString'),
    require('./src/marshallers/id')
  ]
}