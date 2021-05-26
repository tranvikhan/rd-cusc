const { default: AxiosClient } = require('../index')

/* FUll {
	"username": "thviet",
	"password": "admin"
} */
exports.loginAPI = async function (values) {
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: { ...values },
    url: '/api/auth/login',
  })
}

/* FULL{
	"username": "tvkhan",
	"password": "admin",
	"name_vi": "Trần Vi Khan User",
	"name_en": "Tran Vi Khan User",
	"role": "user"
} */
exports.registerAPI = async function (values, jwt) {
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/auth/register',
  })
}

/*FULL {
	"old_password": "123457",
	"new_password": "123457"
} */
exports.resetPassowrdAPI = async function (values, jwt) {
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/auth/reset-password',
  })
}

/*FULL {
	"user_id": "1",
	"new_password": "admin"
} */

exports.resetPassowrRootAPI = async function (values, jwt) {
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/auth/reset-password-root',
  })
}
