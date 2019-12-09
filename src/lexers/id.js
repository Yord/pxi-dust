module.exports = {
  name: 'id',
  desc: 'returns each chunk as a tokens.',
  func: (verbose, failEarly, argv) => (data, prevLines) => (
    {err: '', tokens: [data], lines: [], lastLine: -1, rest: ''}
  )
}