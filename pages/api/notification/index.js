const result = require('../../../helper/result.helps')
import excuteQuery from '../../../db'
import verifyToken from '../../../middleware/verifyToken'
import NextCors from 'nextjs-cors'

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['DELETE', 'GET'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  if (req.method === 'GET') {
    /*  Get Notification ----------------------------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }

      const { id } = req.query

      const db_res = await excuteQuery({
        query:
          id != null
            ? 'SELECT * FROM `notification` WHERE `id` =? AND `user`=? ORDER BY `created_at` DESC; ' +
              'UPDATE `notification` SET `is_new`=0 WHERE `id` =? AND `user`=?'
            : 'SELECT * FROM `notification` WHERE `user`=? ORDER BY `created_at` DESC; ' +
              'UPDATE `notification` SET `is_new`=0 WHERE  `user`=? AND `is_new`=1',
        values:
          id != null
            ? [id, userToken.id, id, userToken.id]
            : [userToken.id, userToken.id],
      })
      if (db_res.error) {
        result.BadRequest(res, db_res)
        return
      }
      if (id != null) {
        result.Ok(res, db_res[0][0])
      } else {
        result.Ok(res, db_res[0])
      }

      return
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }

  if (req.method === 'DELETE') {
    /*  Edit setting ----------------------------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }
      const { id } = req.query

      const db_res = await excuteQuery({
        query:
          id != null
            ? 'DELETE FROM `notification` WHERE `id`=? AND `user`=?'
            : 'DELETE FROM `notification` WHERE `user`=?',
        values: id != null ? [id, userToken.id] : [userToken.id],
      })
      if (db_res.error) {
        result.BadRequest(res, db_res)
        return
      }
      result.Ok(res, {
        message: 'Xóa thông báo thành công!',
        obj: { id: id },
      })
      return
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }

  result.ServerError(res, 'Api chưa được hỗ trợ')
  return
}
