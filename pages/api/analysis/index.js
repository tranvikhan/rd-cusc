const result = require('../../../helper/result.helps')
import excuteQuery from '../../../db'
import verifyToken from '../../../middleware/verifyToken'
import NextCors from 'nextjs-cors'
const moment = require('moment')

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  if (req.method === 'GET') {
    /*  GET analysis ----------------------------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }
      const db_res = await excuteQuery({
        query:
          'SELECT COUNT(`id`) AS `total_user` FROM `user`; ' +
          'SELECT COUNT(`id`) AS `total_feedback` FROM `feedback`; ' +
          'SELECT COUNT(`id`) AS `total_post` FROM `post`; ' +
          'SELECT COUNT(`id`) AS `total_project` FROM `project`; ' +
          'SELECT COUNT(`id`) AS `total`, DATE(`created_at`) AS `date`  FROM `log` WHERE `action` = ? GROUP BY DATE(`created_at`) ORDER BY DATE(`created_at`) DESC LIMIT ?,? ; ' +
          'SELECT COUNT(`post`.`id`) AS `total`, `post`.`author`, `user`.`name_vi` FROM `post` INNER JOIN `user` ON `user`.`id` = `post`.`author` GROUP BY `post`.`author` ORDER BY COUNT(`post`.`id`) DESC LIMIT ?,?',
        values: ['login', 0, 16, 0, 5],
      })
      if (db_res.error) {
        result.BadRequest(res, db_res)
        return
      }

      result.Ok(res, {
        total_user: db_res[0][0].total_user,
        total_feedback: db_res[1][0].total_feedback,
        total_post: db_res[2][0].total_post,
        total_project: db_res[3][0].total_project,
        log_access: db_res[4],
        ranking: db_res[5],
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
