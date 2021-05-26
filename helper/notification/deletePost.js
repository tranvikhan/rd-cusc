import excuteQuery from '../../db'
const getPostInfo = async (id) => {
  const db_res = await excuteQuery({
    query:
      'SELECT  `post`.`author`,`post_lang`.`lang`,`post_lang`.`title`, `post`.`show_lang` FROM `post` INNER JOIN `post_lang` ON `post`.`id` = `post_lang`.`post` WHERE `post`.`id` =?',
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

export default async function DeletePostNoti(user, id) {
  try {
    let user_name = await getUserName(user)
    let post_info = await getPostInfo(id)
    if (user_name && post_info) {
      let title =
        post_info[0].show_lang === 'en'
          ? post_info[1].title
          : post_info[0].title
      let author = post_info[0].author
      let name = 'Bài của bạn đã bị xóa'
      let description =
        user_name[0].name_vi + ' đã xóa bài viết có tiêu đề `' + title + '`'
      if (user !== author)
        await excuteQuery({
          query:
            'INSERT INTO `notification`( `user`, `name`, `description`, `type`, `style`, `ref_id`, `link` ) VALUES(?,?,?,?,?,?,?)',
          values: [
            author,
            name,
            description,
            'post',
            'error',
            id,
            '/admin/post',
          ],
        })
    }

    return true
  } catch (error) {
    return false
  }
}
