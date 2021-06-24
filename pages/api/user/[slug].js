const result = require('../../../helper/result.helps')
import excuteQuery from '../../../db'
import verifyToken from '../../../middleware/verifyToken'
import NextCors from 'nextjs-cors'
const fs = require('fs')

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  let { slug } = req.query
  if (req.method === 'GET') {
    /*  Get all user or get show user ---------------------------------------------------- */
    try {
      if (slug === 'all' || slug === 'all-show') {
        const db_res = await excuteQuery({
          query:
            slug === 'all'
              ? 'SELECT `id`, `username`, `role`, `position_vi`, `position_en`, `name_vi`, `name_en`, `avatar`,`saying_vi`, `saying_en`, `show`, `created_at`, `updated_at` FROM `user`'
              : 'SELECT `id`, `username`, `role`, `position_vi`, `position_en`, `name_vi`, `name_en`, `avatar`,`saying_vi`, `saying_en`, `show`, `created_at`, `updated_at` FROM `user` WHERE `show` = 1',
          values: [],
        })

        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }
        result.Ok(res, db_res)
        return
      } else if (parseInt(slug)) {
        /*Get detail user ---------------------------------------------------- */
        const db_res = await excuteQuery({
          query:
            'SELECT `id`, `username`, `role`, `position_vi`, `position_en`, `name_vi`, `name_en`, `avatar`, `birth_day`, `national_vi`, `national_en`, `gender`, `address_vi`, `address_en`, `email`, `phone`, `saying_vi`, `saying_en`, `cv`, `show`, `created_at`, `updated_at` FROM `user` WHERE `id`= ?',
          values: [parseInt(slug)],
        })
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }
        if (!db_res[0]) {
          result.BadRequest(res, 'Không tìm thấy user')
          return
        }
        result.Ok(res, db_res[0])
        return
      } else {
        result.BadRequest(res, 'Không tìm thấy user')
        return
      }
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }

  if (req.method === 'DELETE') {
    /*  Delete user ----------------------------------------------------------------------- */
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
      if (parseInt(slug) && parseInt(slug) !== 1) {
        const db_res_0 = await excuteQuery({
          query:
            'UPDATE `post` SET `author` = ?  WHERE `author`=? ; ' +
            'UPDATE `project` SET `writer` = ?  WHERE `writer`=?',
          values: [1, parseInt(slug), 1, parseInt(slug)],
        })
        if (db_res_0.error) {
          result.BadRequest(res, db_res_0)
          return
        }
        const db_res_1 = await excuteQuery({
          query: 'SELECT `avatar` FROM `user`  WHERE `id`=?',
          values: [parseInt(slug)],
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

        const db_res = await excuteQuery({
          query: 'DELETE FROM `user`  WHERE `id`=?',
          values: [parseInt(slug)],
        })

        if (db_res.affectedRows === 0) {
          result.BadRequest(res, 'Không tìm thấy user')
          return
        }
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }

        result.Ok(res, {
          message: 'Xóa thành công tài khoản người dùng',
          obj: { id: parseInt(slug) },
        })
        return
      } else {
        result.BadRequest(res, 'Không tìm thấy user')
        return
      }
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
  if (req.method === 'PATCH') {
    /*  Edit user ----------------------------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }
      if (userToken.role !== 'root' && userToken.id != parseInt(slug)) {
        result.Unauthorized(res, 'Không có quyền truy cập')
        return
      }
      if (parseInt(slug)) {
        let arr_options = []
        let sql_option = ''
        Object.keys(req.body).forEach((key, index) => {
          sql_option = sql_option + '`' + key + '`=? , '
          let value = req.body[key]
          arr_options.push(value)
        })

        if (arr_options.length > 0) {
          const db_res = await excuteQuery({
            query:
              'UPDATE `user` SET ' +
              sql_option.substring(0, sql_option.length - 2) +
              ' WHERE `id`=?',
            values: [...arr_options, parseInt(slug)],
          })

          if (db_res.affectedRows === 0) {
            result.BadRequest(res, 'Không tìm thấy user')
            return
          }
          if (db_res.error) {
            result.BadRequest(res, db_res)
            return
          }

          result.Ok(res, {
            message: 'Cập nhật thông tin người dùng thành công',
            obj: { id: parseInt(slug), ...req.body },
          })
          return
        } else {
          result.BadRequest(res, 'Lỗi truy vấn')
          return
        }
      } else {
        result.BadRequest(res, 'Không tìm thấy user')
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
