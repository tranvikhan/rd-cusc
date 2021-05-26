import excuteQuery from '../../db'
const getUsers = async (role1, role2) => {
  const db_res = await excuteQuery({
    query: 'SELECT `id` FROM `user` WHERE `role`=? OR `role`=?',
    values: [role1, role2],
  })
  if (db_res.error) {
    return false
  }
  return db_res
}

export default async function AddFeedbackNoti(id, name, email, type) {
  try {
    const admins = await getUsers('admin', 'root')
    if (admins && admins.length > 0) {
      let name =
        type === 'advisory'
          ? 'Hỗ trợ tư vấn'
          : type === 'contact'
          ? 'Liên hệ'
          : 'Nhận thông tin'

      let description = 'Phản hồi từ email `' + email + '` cần được xử lý'
      admins.forEach(async (row) => {
        await excuteQuery({
          query:
            'INSERT INTO `notification`( `user`, `name`, `description`, `type`, `style`, `ref_id`, `link` ) VALUES(?,?,?,?,?,?,?)',
          values: [
            row.id,
            name,
            description,
            'feedback',
            'info',
            id,
            '/admin/feedback',
          ],
        })
      })
    }

    return true
  } catch (error) {
    return false
  }
}
