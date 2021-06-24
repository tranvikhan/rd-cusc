const { default: AxiosClient } = require('../index')

exports.getAllUserAPI = async function () {
  return await AxiosClient({
    method: 'get',
    url: '/api/user/all',
  })
}
exports.getAllUserShowAPI = async function () {
  return await AxiosClient({
    method: 'get',
    url: '/api/user/all-show',
  })
}
exports.getDetailUserAPI = async function (id) {
  return await AxiosClient({
    method: 'get',
    url: '/api/user/' + id,
  })
}

exports.uploadAvatarAPI = async function (file, id, jwt) {
  let formData = new FormData()
  formData.append('file', file)
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data', Authorization: jwt },
    data: formData,
    url: '/api/user/upload-avatar/' + id,
  })
}

exports.deleteUserAPI = async function (id, jwt) {
  return await AxiosClient({
    method: 'delete',
    headers: { Authorization: jwt },
    url: '/api/user/' + id,
  })
}
/* 
ANY
{
	"name_vi": "Trần Vi Khan",
	"name_en": "Khan Tran",
	"position_vi": "Thành viên",
	"position_en": "Member",
	"saying_vi": "Ahii",
	"saying_en": "Ok let do it",
	"national_vi": "Việt Nam",
	"national_en": "Vietnam",
	"gender": "male",
	"birth_day": "1990-01-01",
	"role": "admin",
	"show": 1,
	"email": "tranvikhan@gmail.com",
	"phone": "0974184717",
	"address_vi": "Thành phố Cần Thơ",
	"address_en": "Can Tho City",
	"cv": "#"
} */
exports.editUserAPI = async function (id, values, jwt) {
  return await AxiosClient({
    method: 'patch',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/user/' + id,
  })
}
