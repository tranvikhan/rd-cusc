const { default: AxiosClient } = require('../index')

exports.getAllPostAPI = async function (page, limit, lang, category) {
  let bonus = category != null ? '&category=' + category : ''
  return await AxiosClient({
    method: 'get',
    url:
      '/api/post/all?page=' +
      page +
      '&limit=' +
      limit +
      '&lang=' +
      lang +
      bonus,
  })
}

exports.getDetailPostAPI = async function (id, lang) {
  return await AxiosClient({
    method: 'get',
    url: '/api/post/detail?id=' + id + '&lang=' + lang,
  })
}

exports.getAllPostAdminAPI = async function (show, jwt) {
  return await AxiosClient({
    method: 'get',
    headers: { Authorization: jwt },
    url: '/api/post/admin/all?show=' + show,
  })
}
exports.getDetailPostAdminAPI = async function (id, jwt) {
  return await AxiosClient({
    method: 'get',
    headers: { Authorization: jwt },
    url: '/api/post/admin/detail?id=' + id,
  })
}
exports.uploadPostImageAPI = async function (file, id, jwt) {
  let formData = new FormData()
  formData.append('file', file)
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data', Authorization: jwt },
    data: formData,
    url: '/api/post/admin/upload-image/' + id,
  })
}

exports.deletePostAPI = async function (id, jwt) {
  return await AxiosClient({
    method: 'delete',
    headers: { Authorization: jwt },
    url: '/api/post/admin/' + id,
  })
}

exports.approvedPostAPI = async function (id, approved, jwt) {
  return await AxiosClient({
    method: 'patch',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { approved },
    url: '/api/post/admin/' + id,
  })
}

/*FULL {
    "category":1,
    "show":1,
    "show_lang":"vi,en",
    "vi":{
      "title":"Không tên A",
      "description":"Không ghi chú",
      "content":"<p>RAW A</p>",
      "tags":"a,b,c"
    },
    "en":{
      "title":"No Name",
      "description":"No description",
      "content":"<p>RAW</p>",
      "tags":"a,b,c"
    }
  } */

exports.editPostAPI = async function (id, values, jwt) {
  return await AxiosClient({
    method: 'patch',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/post/admin/' + id,
  })
}

/*FULL {
    "category":1,
    "show":1,
    "show_lang":"vi,en",
    "vi":{
      "title":"Không tên A",
      "description":"Không ghi chú",
      "content":"<p>RAW A</p>",
      "tags":"a,b,c"
    },
    "en":{
      "title":"No Name",
      "description":"No description",
      "content":"<p>RAW</p>",
      "tags":"a,b,c"
    }
  } */

exports.addPostAPI = async function (values, jwt) {
  return await AxiosClient({
    method: 'post',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/post/admin/add',
  })
}
