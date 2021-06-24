const { default: AxiosClient } = require('../index')

exports.getAllAppAPI = async function (jwt) {
  return await AxiosClient({
    method: 'get',
    url: '/api/application/all',
    headers: { Authorization: jwt },
  })
}

/* {
	"name_vi": "Hệ thống ISO 2",
	"name_en": "ISO System  2",
	"domain": "https://iso.cusc2.vn",
	"show":1
} */
exports.addAppAPI = async function (values, jwt) {
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/application/add',
  })
}

/* {
	"name_vi": "Hệ thống ISO 2",
	"name_en": "ISO System 2",
	"domain": "https://iso.cusc3.vn",
	"show":1
} */
exports.editAppAPI = async function (id, values, jwt) {
  return await AxiosClient({
    method: 'patch',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/application/' + id,
  })
}

exports.uploadAppImageAPI = async function (file, id, jwt) {
  let formData = new FormData()
  formData.append('file', file)
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data', Authorization: jwt },
    data: formData,
    url: '/api/application/upload-image/' + id,
  })
}

exports.deleteAppAPI = async function (id, jwt) {
  return await AxiosClient({
    method: 'delete',
    headers: { Authorization: jwt },
    url: '/api/application/' + id,
  })
}
