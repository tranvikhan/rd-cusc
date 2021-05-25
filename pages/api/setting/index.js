const result = require('../../../helper/result.helps')
import excuteQuery from '../../../db'
import verifyToken from '../../../middleware/verifyToken'
import NextCors from 'nextjs-cors'

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['PATCH'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  let { slug } = req.query
  if (req.method === 'PATCH') {
    /*  Edit setting ----------------------------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }
      if (userToken.role !== 'root') {
        result.Unauthorized(res, 'Không có quyền truy cập')
        return
      }
      let arr_options = []
      let sql_option = ''
      Object.keys(req.body).forEach((key, index) => {
        sql_option =
          sql_option +
          'UPDATE `setting` SET `setting_value`=? WHERE `setting_name`=? ;'
        let value = req.body[key]
        arr_options.push(value)
        arr_options.push(key)
      })
      console.log(sql_option)
      if (arr_options.length > 0) {
        const db_res = await excuteQuery({
          query: sql_option,
          values: [...arr_options],
        })
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }

        result.Ok(res, 'Cập nhật cài đặt thành công')
        return
      } else {
        result.BadRequest(res, 'Lỗi truy vấn')
        return
      }
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }

  result.ServerError(res, 'Api chưa được hỗ trợ')
  return
}
