const result = require('../../../helper/result.helps')
import Filter from 'bad-words'
const filter = new Filter()
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
import excuteQuery from '../../../db'

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const results = await excuteQuery({
        query: 'SELECT * FROM `user` WHERE `username`=?',
        values: [filter.clean(req.body.username)],
      })
      if (results.error) {
        result.BadRequest(res, results)
      }
      if (results[0]) {
        let user = { ...results[0] }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        )

        if (!passwordIsValid) {
          result.BadRequest(res, 'Sai mật khẩu')
          return
        }
        var token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.AUTH_SECRET,
          {
            expiresIn: 86400, // 24 hours
          }
        )
        user.password = null
        result.Ok(res, { ...user, jwt: token })
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
}
