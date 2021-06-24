import excuteQuery from '../../db'
const getProjectInfo = async (id) => {
  const db_res = await excuteQuery({
    query:
      'SELECT  `project`.`writer`,`project_lang`.`lang`,`project_lang`.`name`, `project`.`show_lang` FROM `project` INNER JOIN `project_lang` ON `project`.`id` = `project_lang`.`project` WHERE `project`.`id` =?',
    values: [id],
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

export default async function ApprovedProjectNoti(user, id) {
  try {
    let user_name = await getUserName(user)
    let project_info = await getProjectInfo(id)
    if (user_name && project_info && project_info[0].writer != user) {
      let project_name =
        project_info[0].show_lang === 'en'
          ? project_info[1].name
          : project_info[0].name
      let writer = project_info[0].writer
      let name = 'Dự án của bạn đã được duyệt'
      let description =
        user_name[0].name_vi + ' đã duyệt dự án có tên `' + project_name + '`'
      await excuteQuery({
        query:
          'INSERT INTO `notification`( `user`, `name`, `description`, `type`, `style`, `ref_id`, `link` ) VALUES(?,?,?,?,?,?,?)',
        values: [
          writer,
          name,
          description,
          'project',
          'success',
          id,
          '/admin/project',
        ],
      })
    }

    return true
  } catch (error) {
    return false
  }
}
