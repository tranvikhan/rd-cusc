const { default: AxiosClient } = require('../index')

exports.getAllSettingAPI = async function (jwt) {
  return await AxiosClient({
    method: 'get',
    headers: { Authorization: jwt },
    url: '/api/setting/',
  })
}
exports.getOneSettingAPI = async function (name, jwt) {
  return await AxiosClient({
    method: 'get',
    headers: { Authorization: jwt },
    url: '/api/setting?name=project_homePage_mode' + name,
  })
}

/*ANY 
{
  "project_homePage_mode":"auto",	
  "project_1":"",
  "project_2":"",
  "project_3":"",
  "project_projectPage_mode":"auto",
  "project_projectPage":"",
  "post_newsPage_mode":"auto",
  "post_newPage":"",
  "user_organizationPage_mode":"auto",	
  "user_organizationPage":"",
  "auto_email_mode":"off",
  "email_autoEmail":"",
  "host_autoEmail":"",
  "port_autoEmail":"",
  "username_autoEmail":"",
  "password_autoEmail":""	,
  "subject_autoEmail":"R&D-CUSC Thông tin phản hồi",
  "html_autoEmail":"<p>Nội dung</p>"
}
, */
exports.editSettingAPI = async function (values, jwt) {
  return await AxiosClient({
    method: 'patch',
    headers: { 'Content-Type': 'application/json', Authorization: jwt },
    data: { ...values },
    url: '/api/setting/',
  })
}
