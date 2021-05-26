const { default: AxiosClient } = require('../index')

exports.getAllNotiAPI = async function (jwt) {
  return await AxiosClient({
    method: 'get',
    headers: { Authorization: jwt },
    url: '/api/notification',
  })
}
exports.getDetailNotiAPI = async function (id, jwt) {
  return await AxiosClient({
    method: 'get',
    headers: { Authorization: jwt },
    url: '/api/notification?id=' + id,
  })
}
exports.deleteAllNotiAPI = async function (jwt) {
  return await AxiosClient({
    method: 'delete',
    headers: { Authorization: jwt },
    url: '/api/notification',
  })
}
exports.deleteOneNotiAPI = async function (id, jwt) {
  return await AxiosClient({
    method: 'delete',
    headers: { Authorization: jwt },
    url: '/api/notification?id=' + id,
  })
}
