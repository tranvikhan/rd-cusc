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
    /*  Get application with option---------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }

      if (slug === 'all') {
        const db_res = await excuteQuery({
          query: 'SELECT * FROM `application`',
          values: [],
        })
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }
        result.Ok(res, db_res)
        return
      } else {
        result.BadRequest(res, 'Không hỗ trợ api')
        return
      }
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
  if (req.method === 'POST') {
    /*  Add new application with option---------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }
      if (userToken.role !== 'admin' && userToken.role !== 'root') {
        result.Unauthorized(res, 'Không có quyền truy cập')
        return
      }
      if (slug === 'add') {
        const db_res = await excuteQuery({
          query:
            'INSERT INTO `application`( `name_vi`, `name_en`, `domain`,`show`) VALUES (?,?,?,?)',
          values: [
            req.body.name_vi,
            req.body.name_en,
            req.body.domain,
            req.body.show,
          ],
        })
        if (db_res.error && db_res.error.code === 'ER_DUP_ENTRY') {
          result.BadRequest(res, 'Bạn đã thêm ứng dụng này trước đó')
          return
        }
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }
        result.Ok(res, 'Thêm ứng dụng thành công!')
        return
      } else {
        result.BadRequest(res, 'Không hỗ trợ api')
        return
      }
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
  if (req.method === 'DELETE') {
    /*  Delete application ----------------------------------------------------------------------- */

    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }
      if (userToken.role !== 'admin' && userToken.role !== 'root') {
        result.Unauthorized(res, 'Không có quyền truy cập')
        return
      }
      if (parseInt(slug)) {
        const db_res_1 = await excuteQuery({
          query: 'SELECT `image` FROM `application`  WHERE `id`=?',
          values: [parseInt(slug)],
        })
        if (db_res_1.error) {
          result.BadRequest(res, db_res_1)
          return
        }
        if (db_res_1[0] && db_res_1[0].image) {
          let old_path = db_res_1[0].image
          if (old_path !== 'upload/appImage/default.jpg')
            console.log('./public/' + old_path)
          fs.unlink('./public/' + old_path, () => {
            return
          })
        }
        const db_res = await excuteQuery({
          query: 'DELETE FROM `application`  WHERE `id`=?',
          values: [parseInt(slug)],
        })

        if (db_res.affectedRows === 0) {
          result.BadRequest(res, 'Không tìm tháy ứng dụng có id= ' + slug)
          return
        }
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }

        result.Ok(res, 'Xóa thành công')
        return
      } else {
        result.BadRequest(res, 'Không tìm tháy ứng dụng có id= ' + slug)
        return
      }
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
  if (req.method === 'PATCH') {
    /*  Edit application ----------------------------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }
      if (userToken.role !== 'admin' && userToken.role !== 'root') {
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
              'UPDATE `application` SET ' +
              sql_option.substring(0, sql_option.length - 2) +
              ' WHERE `id`=?',
            values: [...arr_options, parseInt(slug)],
          })
          if (db_res.error && db_res.error.code === 'ER_DUP_ENTRY') {
            result.BadRequest(res, 'Domain bị trùng với ứng dụng trước đó')
            return
          }
          if (db_res.affectedRows === 0) {
            result.BadRequest(res, 'Không tìm tháy ứng dụng có id= ' + slug)
            return
          }
          if (db_res.error) {
            result.BadRequest(res, db_res)
            return
          }

          result.Ok(res, 'Cập nhật ứng dụng thành công')
          return
        } else {
          result.BadRequest(res, 'Lỗi truy vấn')
          return
        }
      } else {
        result.BadRequest(res, 'Không tìm tháy ứng dụng có id= ' + slug)
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
