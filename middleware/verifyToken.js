const jwt = require('jsonwebtoken')
export default async function verifyToken(req) {
  let token = req.headers['authorization']

  if (!token) {
    return null
  }
  try {
    let decoded = await jwt.verify(token, process.env.AUTH_SECRET)
    return { id: decoded.id, role: decoded.role }
  } catch (err) {
    return null
  }
}
