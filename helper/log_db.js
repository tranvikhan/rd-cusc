import excuteQuery from '../db'

export default async function logDb(user_id, action) {
  try {
    const results = await excuteQuery({
      query: 'INSERT INTO `log`(`user`,`action`) VALUES (?,?)',
      values: [user_id, action],
    })
    if (results.error) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}
