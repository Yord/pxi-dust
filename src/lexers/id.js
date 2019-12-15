module.exports = {
  name: 'id',
  desc: 'returns each chunk as a tokens.',
  func: ({}) => (data, prevLines) => (
    {err: [], tokens: [data], lines: [], lastLine: prevLines, rest: ''}
  )
}