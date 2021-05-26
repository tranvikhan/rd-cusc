const result = require('../../../helper/result.helps')
import Filter from 'bad-words'
const filter = new Filter()
var bcrypt = require('bcryptjs')
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
  let userToken = await verifyToken(req)
  if (!userToken) {
    result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
    return
  }
  if (!userToken.role === 'root') {
    result.Unauthorized(res, 'Không có quyền truy cập')
  }
  if (req.method === 'PATCH') {
    try {
      let hashPassword = bcrypt.hashSync(req.body.new_password, 8)
      let results2 = await excuteQuery({
        query: 'UPDATE  `user` SET `password`=? WHERE `id` =?',
        values: [hashPassword, req.body.user_id],
      })

      if (results2.changedRows === 0) {
        result.BadRequest(res, 'Tài khoản không tồn tại')
        return
      }
      if (results2.error) {
        result.BadRequest(res, 'Lỗi truy vấn')
        return
      }
      result.Ok(res, {
        message: 'Đổi mật khẩu thành công',
        obj: { id: req.body.user_id },
      })
      return
    } catch (error) {
      result.ServerError(res, 'Lỗi truy vấn')
    }
  } else {
    result.ServerError(res, 'Không hỗ trợ api này')
    return
  }
}
