exports.tagToArray = (str) => {
  if (!str) return []
  return str.split(',')
}
exports.tagToString = (arr) => {
  if (!arr) return ''
  if (arr.length > 0) {
    let newStr = arr.reduce((strs, item) => strs + ',' + item)
    return newStr
  }
  return ''
}
