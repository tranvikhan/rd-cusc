const result = require('../../../helper/result.helps')
import Filter from 'bad-words'
const filter = new Filter()
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
import excuteQuery from '../../../db'
import logDb from '../../../helper/log_db'
import NextCors from 'nextjs-cors'
export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  if (req.method === 'POST') {
    try {
      //Login
      const db_res = await excuteQuery({
        query: 'SELECT * FROM `user` WHERE `username`=?',
        values: [filter.clean(req.body.username)],
      })
      if (db_res.error) {
        result.BadRequest(res, db_res)
      }
      if (db_res[0]) {
        let user = { ...db_res[0] }
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
        // set password null
        user.password = null
        //Log
        await logDb(user.id, 'login')
        result.Ok(res, { ...user, jwt: token })
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
