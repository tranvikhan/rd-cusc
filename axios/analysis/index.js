const { default: AxiosClient } = require('../index')

exports.getAllAnalysisAPI = async function (jwt) {
  return await AxiosClient({
    method: 'get',
    headers: { Authorization: jwt },
    url: '/api/analysis',
  })
}
