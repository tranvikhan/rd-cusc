const result = require('../../../helper/result.helps')
import Filter from 'bad-words'
const filter = new Filter()
import excuteQuery from '../../../db'
import verifyToken from '../../../middleware/verifyToken'
import NextCors from 'nextjs-cors'

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  let { slug } = req.query
  if (req.method === 'GET') {
    // Get all user or get show user
    try {
      if (slug === 'all' || slug === 'all-show') {
        const db_res = await excuteQuery({
          query:
            slug === 'all'
              ? 'SELECT `id`, `username`, `role`, `position_vi`, `position_en`, `name_vi`, `name_en`, `avatar`, `email`, `phone`, `saying_vi`, `saying_en`, `show`, `created_at`, `updated_at` FROM `user`'
              : 'SELECT `id`, `username`, `role`, `position_vi`, `position_en`, `name_vi`, `name_en`, `avatar`, `email`, `phone`, `saying_vi`, `saying_en`, `show`, `created_at`, `updated_at` FROM `user` WHERE `show` = 1',
          values: [],
        })
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }
        result.Ok(res, db_res)
      } else if (parseInt(slug)) {
        // Get detail user
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
        result.Ok(res, db_res)
        return
      } else {
        result.BadRequest(res, 'Không tìm thấy user')
      }
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
    }
  }

  if (req.method === 'DELETE') {
    // Get all user or get show user
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
      if (parseInt(slug)) {
        // Get detail user
        const db_res = await excuteQuery({
          query: 'DELETE FROM `user` WHERE `id`= ?',
          values: [parseInt(slug)],
        })
        if (db_res.changedRows) {
          result.BadRequest(res, 'Không tìm thấy user')
          return
        }
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }

        result.Ok(res, 'Xóa thành công')
        return
      } else {
        result.BadRequest(res, 'Không tìm thấy user')
      }
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
    }
  }

  return
}
