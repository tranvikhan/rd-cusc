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
const getUserName = async (id) => {
  const db_res = await excuteQuery({
    query: 'SELECT `name_vi` FROM `user` WHERE `id`=?',
    values: [id],
  })
  if (db_res.error) {
    return false
  }
  return db_res
}

export default async function AddPostNoti(id, title, author) {
  try {
    const admins = await getUsers('admin', 'root')
    if (admins && admins.length > 0) {
      let author_name = await getUserName(author)
      if (author_name) {
        author_name = author_name[0].name_vi
        let name = 'Bài viết cần được duyệt'
        let description =
          author_name + ' đã thêm một bài viết mới có tiêu đề `' + title + '`'
        admins.forEach(async (row) => {
          if (row.id != author) {
            await excuteQuery({
              query:
                'INSERT INTO `notification`( `user`, `name`, `description`, `type`, `style`, `ref_id`, `link` ) VALUES(?,?,?,?,?,?,?)',
              values: [
                row.id,
                name,
                description,
                'post',
                'warning',
                id,
                '/admin/post',
              ],
            })
          }
        })
      }
    }
    return true
  } catch (error) {
    return false
  }
}
