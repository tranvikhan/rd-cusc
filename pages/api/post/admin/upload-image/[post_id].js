const result = require('../../../../../helper/result.helps')
import excuteQuery from '../../../../../db'
import verifyToken from '../../../../../middleware/verifyToken'
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
  const { post_id } = req.query
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
    if (
      userToken.role === 'admin' ||
      userToken.role === 'root' ||
      parseInt(post_id) === userToken.id
    ) {
      const form = new formidable.IncomingForm()
      form.uploadDir = './public/upload/postImage/'
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
        let newFileName = post_id + '.' + str_arr[str_arr.length - 1]
        //thiết lập path mới cho files
        let newpath = form.uploadDir + newFileName
        let newpathDB = 'upload/postImage/' + newFileName
        fs.rename(path, newpath, async function (err) {
          if (err) throw err
          let db_res = await excuteQuery({
            query: 'UPDATE `post` SET `image`=? WHERE `id` =?',
            values: [newpathDB, parseInt(post_id)],
          })
          if (db_res.error) {
            result.BadRequest(res, 'Lỗi truy vấn')
            return
          }
          result.Ok(res, { path: newpathDB })
          return
        })
      })
    } else {
      result.Unauthorized(res, 'Không có quyền truy cập')
      return
    }
  } catch (e) {
    result.ServerError(res, 'Lỗi server')
    return
  }
}
