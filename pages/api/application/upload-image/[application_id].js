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
  const { application_id } = req.query
  let userToken = await verifyToken(req)
  if (!userToken) {
    result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
    return
  }
  if (userToken.role !== 'admin' && userToken.role !== 'root') {
    result.Unauthorized(res, 'Không có quyền truy cập')
    return
  }
  if (req.method !== 'POST') {
    result.ServerError(res, 'Không hỗ trợ api này')
    return
  }

  try {
    const db_res_1 = await excuteQuery({
      query: 'SELECT `image` FROM `application`  WHERE `id`=?',
      values: [parseInt(application_id)],
    })
    if (db_res_1.error) {
      result.BadRequest(res, db_res_1)
      return
    }
    console.log(db_res_1)
    if (db_res_1[0] && db_res_1[0].image) {
      let old_path = db_res_1[0].image
      if (old_path !== 'upload/appImage/default.jpg') {
        fs.unlink('./public/' + old_path, () => {
          return
        })
      }
    }

    const form = new formidable.IncomingForm()
    form.uploadDir = './public/upload/appImage/'
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
      let newFileName = application_id + '.' + str_arr[str_arr.length - 1]
      //thiết lập path mới cho files
      let newpath = form.uploadDir + newFileName
      let newpathDB = 'upload/appImage/' + newFileName
      fs.rename(path, newpath, async function (err) {
        if (err) throw err
        let db_res = await excuteQuery({
          query: 'UPDATE  `application` SET `image`=? WHERE `id` =?',
          values: [newpathDB, application_id],
        })
        if (db_res.error) {
          result.BadRequest(res, 'Lỗi truy vấn')
          return
        }
        result.Ok(res, {
          message: 'Cập nhật ảnh ứng dụng thành công',
          obj: { id: parseInt(application_id), image: newpathDB },
        })
        return
      })
    })
  } catch (e) {
    result.ServerError(res, 'Lỗi server')
    return
  }
}
