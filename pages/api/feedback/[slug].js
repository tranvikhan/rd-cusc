const result = require('../../../helper/result.helps')
import excuteQuery from '../../../db'
import verifyToken from '../../../middleware/verifyToken'
import NextCors from 'nextjs-cors'
import AddFeedbackNoti from '../../../helper/notification/addFeedback'
export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  let { slug } = req.query
  if (req.method === 'GET') {
    /*  Get feedback with option---------------------------------------------------- */
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
      if (slug === 'contact' || slug === 'get-news' || slug === 'advisory') {
        const db_res = await excuteQuery({
          query:
            'SELECT * FROM `feedback` WHERE `type` = ? ORDER BY `created_at` DESC',
          values: [slug],
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
    /*  Add new feedback with option---------------------------------------------------- */
    try {
      if (slug === 'add') {
        const db_res = await excuteQuery({
          query:
            'INSERT INTO `feedback`( `name`, `email`, `content`, `type`) VALUES (?,?,?,?)',
          values: [
            req.body.name,
            req.body.email,
            req.body.content,
            req.body.type,
          ],
        })

        if (db_res.error && db_res.error.code === 'ER_DUP_ENTRY') {
          result.BadRequest(res, 'Bạn đã gửi mẫu này trước đó!')
          return
        }
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }
        await AddFeedbackNoti(
          db_res.insertId,
          req.body.name,
          req.body.email,
          req.body.type
        )
        result.Ok(res, {
          message: 'Gửi thông tin thành công!',
          obj: { id: db_res.insertId, ...req.body },
        })
        return
      } else {
        result.BadRequest(res, 'Không hỗ trợ api')
        return
      }
    } catch (e) {
      console.log(e)
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
  if (req.method === 'DELETE') {
    /*  Delete feedback ----------------------------------------------------------------------- */

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
        const db_res = await excuteQuery({
          query: 'DELETE FROM `feedback`  WHERE `id`=?',
          values: [parseInt(slug)],
        })

        if (db_res.affectedRows === 0) {
          result.BadRequest(res, 'Không tìm phản hồi có id= ' + slug)
          return
        }
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }

        result.Ok(res, {
          message: 'Xóa phản hồi thành công!',
          obj: { id: parseInt(slug) },
        })
        return
      } else {
        result.BadRequest(res, 'Không tìm phản hồi có id= ' + slug)
        return
      }
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
  if (req.method === 'PATCH') {
    /*  Edit feedback ----------------------------------------------------------------------- */
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
      if (parseInt(slug) && typeof req.body.approved === 'number') {
        const db_res = await excuteQuery({
          query: 'UPDATE `feedback` SET `approved`=? WHERE `id`=?',
          values: [req.body.approved === 1 ? 1 : 0, parseInt(slug)],
        })

        if (db_res.affectedRows === 0) {
          result.BadRequest(res, 'Không tìm phản hồi có id= ' + slug)
          return
        }
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }

        result.Ok(res, {
          message: 'Xác nhận phản hồi thành công!',
          obj: { id: parseInt(slug) },
        })
        return
      } else {
        result.BadRequest(res, 'Không tìm phản hồi có id= ' + slug)
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
