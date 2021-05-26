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

export default async function AddProjectNoti(id, project_name, writer) {
  try {
    const admins = await getUsers('admin', 'root')
    if (admins && admins.length > 0) {
      let writer_name = await getUserName(writer)
      if (writer_name) {
        writer_name = writer_name[0].name_vi
        let name = 'Dự án cần được duyệt'
        let description =
          writer_name + ' đã thêm một dự án có tên `' + project_name + '`'
        admins.forEach(async (row) => {
          if (row.id != writer) {
            await excuteQuery({
              query:
                'INSERT INTO `notification`( `user`, `name`, `description`, `type`, `style`, `ref_id`, `link` ) VALUES(?,?,?,?,?,?,?)',
              values: [
                row.id,
                name,
                description,
                'project',
                'warning',
                id,
                '/admin/project',
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
