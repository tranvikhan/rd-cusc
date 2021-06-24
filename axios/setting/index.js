const { default: AxiosClient } = require('../index')

exports.getAllSettingAPI = async function (jwt) {
  return await AxiosClient({
    method: 'get',
    headers: { Authorization: jwt },
    url: '/api/setting',
  })
}
exports.getOneSettingAPI = async function (name, jwt) {
  return await AxiosClient({
    method: 'get',
    headers: { Authorization: jwt },
    url: '/api/setting?name=project_homePage_mode' + name,
  })
}

exports.editSettingAPI = async function (values, jwt) {
  return await AxiosClient({
    method: 'patch',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/setting',
  })
}
exports.uploadSettingImageAPI = async function (file, setting_name, jwt) {
  let formData = new FormData()
  formData.append('file', file)
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data', Authorization: jwt },
    data: formData,
    url: '/api/setting/upload-image/' + setting_name,
  })
}
