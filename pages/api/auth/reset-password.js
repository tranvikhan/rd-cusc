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
  if (req.method === 'PATCH') {
    try {
      let db_res = await excuteQuery({
        query: 'SELECT  `password` FROM `user` WHERE `id` =?',
        values: [userToken.id],
      })
      if (db_res.error) {
        result.BadRequest(res, db_res)
        return
      }
      if (db_res[0]) {
        let user = { ...db_res[0] }
        var passwordIsValid = bcrypt.compareSync(
          req.body.old_password,
          user.password
        )
        if (!passwordIsValid) {
          result.BadRequest(res, 'Sai mật khẩu cũ')
          return
        }
        let hashPassword = bcrypt.hashSync(req.body.new_password, 8)
        let db_res_2 = await excuteQuery({
          query: 'UPDATE  `user` SET `password`=? WHERE `id` =?',
          values: [hashPassword, userToken.id],
        })
        if (db_res_2.error) {
          result.BadRequest(res, 'Lỗi truy vấn')
          return
        }
        result.Ok(res, 'Đổi mật khẩu thành công')
        return
      } else {
        result.NotFound(res, 'Tài khoản không tồn tại')
        return
      }
    } catch (error) {
      result.ServerError(res, 'Lỗi truy vấn')
      return
    }
  } else {
    result.ServerError(res, 'Không hỗ trợ api này')
    return
  }
}
