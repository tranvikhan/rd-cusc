const result = require('../../../helper/result.helps')
import Filter from 'bad-words'
const filter = new Filter()
var bcrypt = require('bcryptjs')
import excuteQuery from '../../../db'

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      let hashPassword = bcrypt.hashSync(req.body.password, 8)

      const results = await excuteQuery({
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
      if (results.error) {
        if (results.error.code === 'ER_DUP_ENTRY') {
          result.BadRequest(res, 'Tên đăng nhập đã tồn tại')
          return
        }
        result.BadRequest(res, results)
        return
      }
      result.Ok(res, 'Đăng ký thành công')
      return
    } catch (error) {
      result.ServerError(res, 'Lỗi truy vấn')
    }
  } else {
    result.ServerError(res, 'Không hỗ trợ api này')
    return
  }
}
