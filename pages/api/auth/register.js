const result = require('../../../helper/result.helps')
import Filter from 'bad-words'
const filter = new Filter()
var bcrypt = require('bcryptjs')
import excuteQuery from '../../../db'
import NextCors from 'nextjs-cors'
import verifyToken from '../../../middleware/verifyToken'

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
    return
  }
  if (req.method === 'POST') {
    try {
      let hashPassword = bcrypt.hashSync(req.body.password, 8)

      const db_res = await excuteQuery({
        query:
          'INSERT INTO `user`(`username`,`password`,`name_vi`,`name_en`,`role`) VALUES (?,?,?,?,?)',
        values: [
          filter.clean(req.body.username),
          hashPassword,
          filter.clean(req.body.name_vi),
          filter.clean(req.body.name_en),
          req.body.role && req.body.role === 'admin' ? 'admin' : 'user',
        ],
      })
      if (db_res.error) {
        if (db_res.error.code === 'ER_DUP_ENTRY') {
          result.BadRequest(res, 'Tên đăng nhập đã tồn tại')
          return
        }
        result.BadRequest(res, db_res)
        return
      }
      result.Ok(res, {
        message: 'Đăng ký người dùng mới thành công',
        obj: { id: db_res.insertId, ...req.body },
      })
      return
    } catch (error) {
      result.ServerError(res, 'Lỗi truy vấn')
      return
    }
  } else {
    result.ServerError(res, 'Không hỗ trợ api này')
    return
  }
}
