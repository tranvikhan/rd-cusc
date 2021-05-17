const result = require('../../../helper/result.helps')
import Filter from 'bad-words'
const filter = new Filter()
var bcrypt = require('bcryptjs')
import excuteQuery from '../../../db'
import verifyToken from '../../../middleware/verifyToken'

export default async (req, res) => {
  let userToken = await verifyToken(req)
  if (userToken) {
    if (req.method === 'PATCH') {
      try {
        let results = await excuteQuery({
          query: 'SELECT  `password` FROM `user` WHERE `id` =?',
          values: [userToken.id],
        })
        if (results.error) {
          result.BadRequest(res, results)
        }
        if (results[0]) {
          let user = { ...results[0] }
          var passwordIsValid = bcrypt.compareSync(
            req.body.old_password,
            user.password
          )
          if (!passwordIsValid) {
            result.BadRequest(res, 'Sai mật khẩu cũ')
            return
          }
          let hashPassword = bcrypt.hashSync(req.body.new_password, 8)
          let results2 = await excuteQuery({
            query: 'UPDATE  `user` SET `password`=? WHERE `id` =?',
            values: [hashPassword, userToken.id],
          })
          if (results2.error) {
            result.BadRequest(res, 'Lỗi truy vấn')
          }
          result.Ok(res, 'Đổi mật khẩu thành công')
          return
        } else {
          result.NotFound(res, 'Tài khoản không tồn tại')
        }
      } catch (error) {
        result.ServerError(res, 'Lỗi truy vấn')
      }
    } else {
      result.ServerError(res, 'Không hỗ trợ api này')
      return
    }
  } else {
    result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
  }
}
