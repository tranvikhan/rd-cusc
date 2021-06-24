const result = require('../../../helper/result.helps')
import excuteQuery from '../../../db'
import verifyToken from '../../../middleware/verifyToken'
import NextCors from 'nextjs-cors'

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['PATCH', 'GET'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  if (req.method === 'GET') {
    /*  GET setting ----------------------------------------------------------------------- */
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
      const { name } = req.query

      const db_res = await excuteQuery({
        query:
          name != null
            ? 'SELECT * FROM `setting` WHERE `setting_name` =?'
            : 'SELECT * FROM `setting`',
        values: name != null ? [name] : [],
      })
      if (db_res.error) {
        result.BadRequest(res, db_res)
        return
      }
      if (db_res.length < 1) {
        result.BadRequest(res, 'Không tìm thấy cài đặt này')
        return
      }
      let obj = {}
      for (let i = 0; i < db_res.length; ++i) {
        let key = db_res[i].setting_name
        let value = db_res[i].setting_value
        let type = db_res[i].value_type
        if (type === 'number') {
          obj[key] = parseInt(value)
        } else if (type === 'boolean') {
          obj[key] = value === '1'
        } else {
          obj[key] = value
        }
      }

      result.Ok(res, obj)
      return
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }

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
        if (req.body[key] != null) {
          sql_option =
            sql_option +
            'UPDATE `setting` SET `setting_value`=? WHERE `setting_name`=? ;'
          let value = req.body[key]
          arr_options.push(value)
          arr_options.push(key)
        }
      })

      if (arr_options.length > 0) {
        const db_res = await excuteQuery({
          query: sql_option,
          values: [...arr_options],
        })
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }

        result.Ok(res, {
          message: 'Cập nhật cài đặt thành công',
          obj: { ...req.body },
        })
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
