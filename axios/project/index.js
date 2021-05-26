const { default: AxiosClient } = require('../index')

exports.getAllProjectAPI = async function (page, limit, lang) {
  return await AxiosClient({
    method: 'get',
    url: '/api/project/all?page=' + page + '&limit=' + limit + '&lang=' + lang,
  })
}

exports.getDetailProjectAPI = async function (id, lang) {
  return await AxiosClient({
    method: 'get',
    url: '/api/project/detail?id=' + id + '&lang=' + lang,
  })
}

exports.getAllPostAdminAPI = async function (show, jwt) {
  return await AxiosClient({
    method: 'get',
    headers: { Authorization: jwt },
    url: '/api/project/admin/all?show=' + show,
  })
}
exports.getDetailPostAdminAPI = async function (id, jwt) {
  return await AxiosClient({
    method: 'get',
    headers: { Authorization: jwt },
    url: '/api/project/admin/detail?id=' + id,
  })
}
exports.uploadProjectImageAPI = async function (file, id, jwt) {
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data', Authorization: jwt },
    data: { file: file },
    url: 'api/project/admin/upload-image/' + id,
  })
}

exports.deleteProjectAPI = async function (id, jwt) {
  return await AxiosClient({
    method: 'delete',
    headers: { Authorization: jwt },
    url: '/api/project/admin/' + id,
  })
}

exports.approvedProjectAPI = async function (id, approved, jwt) {
  return await AxiosClient({
    method: 'patch',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { approved },
    url: '/api/project/admin/' + id,
  })
}

/*FULL {
	"show":1,
	"show_lang":"vi",
	"vi":{
		"name":"Không tên A",
		"description":"Không ghi chú",
		"content":"<p>RAW A</p>",
		"tags":"a,b,c"
	},
	"en":{
		"name":"No Name A" ,
		"description":"No description A",
		"content":"<p>RAW</p>",
		"tags":"a,b,c"
	}
}*/

exports.editProjectAPI = async function (id, values, jwt) {
  return await AxiosClient({
    method: 'patch',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/project/admin/' + id,
  })
}

/*FULL {
	"show":1,
	"show_lang":"en",
	"vi":{
		"name":"Không tên 2",
		"description":"Không ghi chú 2",
		"content":"<p>RAW</p>",
		"tags":"a,b,c"
	},
	"en":{
		"name":"No Name 2",
		"description":"No description 2",
		"content":"<p>RAW</p>",
		"tags":"a,b,c"
	}
} */

exports.addProjectAPI = async function (id, values, jwt) {
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/project/admin/add',
  })
}
