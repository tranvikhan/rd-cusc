const { default: AxiosClient } = require('../index')

exports.getAllFeedbackAPI = async function (type, jwt) {
  return await AxiosClient({
    method: 'get',
    url: '/api/feedback/' + type,
    headers: { Authorization: jwt },
  })
}
exports.deleteFeedbackAPI = async function (id, jwt) {
  return await AxiosClient({
    method: 'delete',
    headers: { Authorization: jwt },
    url: '/api/feedback/' + id,
  })
}
exports.approvedFeedbackAPI = async function (id, approved, jwt) {
  return await AxiosClient({
    method: 'patch',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { approved },
    url: '/api/feedback/' + id,
  })
}

/*FULL {
	"name": "Trần Vi Khan 3",
	"type": "get-news",
	"content":"Tôi muốn gặp anh Việt 2",
	"email": "tranvikhan2@gmail.com"
} */
exports.addFeedbackAPI = async function (values) {
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: { ...values },
    url: '/api/feedback/add',
  })
}
