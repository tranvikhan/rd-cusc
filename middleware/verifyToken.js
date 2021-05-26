const jwt = require('jsonwebtoken')
import excuteQuery from '../db'
export default async function verifyToken(req) {
  let token = req.headers['authorization']

  if (!token) {
    return null
  }
  try {
    let decoded = await jwt.verify(token, process.env.AUTH_SECRET)
    let db_res = await excuteQuery({
      query: 'SELECT COUNT(`id`) AS `count` FROM `user` WHERE `id` =?',
      values: [decoded.id],
    })
    if (db_res.error) {
      return null
    }
    if (db_res[0].count !== 1) {
      return null
    }
    return { id: decoded.id, role: decoded.role }
  } catch (err) {
    return null
  }
}
