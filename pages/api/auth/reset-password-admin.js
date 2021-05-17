const result = require('../../../helper/result.helps')
import Filter from 'bad-words'
const filter = new Filter()
var bcrypt = require('bcryptjs')
import excuteQuery from '../../../db'
import verifyToken from '../../../middleware/verifyToken'

export default async (req, res) => {
  let userToken = await verifyToken(req)
  if (userToken) {
    if (userToken.role === 'admin') {
      if (req.method === 'PATCH') {
        try {
          let hashPassword = bcrypt.hashSync(req.body.new_password, 8)
          let results2 = await excuteQuery({
            query: 'UPDATE  `user` SET `password`=? WHERE `id` =?',
            values: [hashPassword, req.body.user_id],
          })
          if (results2.error) {
            result.BadRequest(res, 'Lỗi truy vấn')
          }
          result.Ok(res, 'Đổi mật khẩu thành công')
          return
        } catch (error) {
          result.ServerError(res, 'Lỗi truy vấn')
        }
      } else {
        result.ServerError(res, 'Không hỗ trợ api này')
        return
      }
    } else {
      result.Unauthorized(res, 'Không có quyền truy cập')
    }
  } else {
    result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
  }
}
