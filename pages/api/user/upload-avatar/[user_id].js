const result = require('../../../../helper/result.helps')
import excuteQuery from '../../../../db'
import verifyToken from '../../../../middleware/verifyToken'
import formidable from 'formidable'
const fs = require('fs')
import NextCors from 'nextjs-cors'
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  const { user_id } = req.query
  let userToken = await verifyToken(req)
  if (!userToken) {
    result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
    return
  }
  if (req.method !== 'POST') {
    result.ServerError(res, 'Không hỗ trợ api này')
    return
  }

  try {
    const db_res_1 = await excuteQuery({
      query: 'SELECT `avatar` FROM `user` WHERE `id`=?',
      values: [parseInt(user_id)],
    })
    if (db_res_1.error) {
      result.BadRequest(res, db_res_1)
      return
    }

    if (db_res_1[0] && db_res_1[0].avatar) {
      let old_path = db_res_1[0].avatar
      if (old_path !== 'upload/userAvatar/default.jpg') {
        fs.unlink('./public/' + old_path, () => {
          return
        })
      }
    }
    const form = new formidable.IncomingForm()
    form.uploadDir = './public/upload/userAvatar/'
    //xử lý upload
    form.parse(req, function (err, fields, files) {
      //path tmp trên server
      let path = files.file.path
      if (files.file.type.split('/')[0] !== 'image') {
        fs.unlink(path, () => {
          return
        })
        result.BadRequest(res, 'Sai định dạng')
        return
      }

      let str_arr = files.file.name.split('.')
      let id_user_upload = userToken.role !== 'root' ? userToken.id : user_id
      let newFileName = id_user_upload + '.' + str_arr[str_arr.length - 1]
      //thiết lập path mới cho files
      let newpath = form.uploadDir + newFileName
      let newpathDB = 'upload/userAvatar/' + newFileName
      fs.rename(path, newpath, async function (err) {
        if (err) throw err
        let db_res = await excuteQuery({
          query: 'UPDATE  `user` SET `avatar`=? WHERE `id` =?',
          values: [newpathDB, id_user_upload],
        })
        if (db_res.error) {
          result.BadRequest(res, 'Lỗi truy vấn')
          return
        }
        result.Ok(res, {
          message: 'Cập nhật ảnh đại diện thành công',
          obj: { id: id_user_upload, avatar: newpathDB },
        })

        return
      })
    })
  } catch (e) {
    result.ServerError(res, 'Lỗi server')
    return
  }
}
