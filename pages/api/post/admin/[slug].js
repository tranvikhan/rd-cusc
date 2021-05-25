const result = require('../../../../helper/result.helps')
import excuteQuery from '../../../../db'
import verifyToken from '../../../../middleware/verifyToken'
import NextCors from 'nextjs-cors'
const fs = require('fs')

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  let { slug } = req.query
  if (req.method === 'GET') {
    /*  Get post with option---------------------------------------------------- */
    try {
      if (slug === 'all') {
        let userToken = await verifyToken(req)
        if (!userToken) {
          result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
          return
        }
        const { show } = req.query
        const db_res = await excuteQuery({
          query:
            userToken.role === 'user'
              ? 'SELECT `post`.`id`,`post`.`approved`,`post`.`show_lang`, `post`.`author`, `user`.`name_en` AS `author_name`, `post`.`category`, `post_category`.`name_vi` AS `category_name`, `post`.`published_at`,  `post`.`created_at`, `post`.`image`, `post_lang`.`title`, `post_lang`.`description` FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` INNER JOIN `post_category` ON `post_category`.`id` = `post`.`category` WHERE ( ( `post`.`show_lang` = ? AND `post_lang`.`lang` = ? ) OR( ( `post`.`show_lang` = ? OR `post`.`show_lang` = ? ) AND `post_lang`.`lang` = ? ) ) AND `post`.`show` = ? AND `post`.`author`=? ORDER BY `post`.`created_at` DESC'
              : 'SELECT `post`.`id`,`post`.`approved`,`post`.`show_lang`, `post`.`author`, `user`.`name_en` AS `author_name`, `post`.`category`, `post_category`.`name_vi` AS `category_name`, `post`.`published_at`, `post`.`created_at`, `post`.`image`, `post_lang`.`title`, `post_lang`.`description` FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` INNER JOIN `post_category` ON `post_category`.`id` = `post`.`category` WHERE ( ( `post`.`show_lang` = ? AND `post_lang`.`lang` = ? ) OR( ( `post`.`show_lang` = ? OR `post`.`show_lang` = ? ) AND `post_lang`.`lang` = ? ) ) AND `post`.`show` = ? ORDER BY `post`.`created_at` DESC',
          values:
            userToken.role === 'user'
              ? ['en', 'en', 'vi', 'vi,en', 'vi', userToken.id, show]
              : ['en', 'en', 'vi', 'vi,en', 'vi', show],
        })
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }
        result.Ok(res, db_res)
        return
      }
      if (slug === 'detail') {
        let userToken = await verifyToken(req)
        if (!userToken) {
          result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
          return
        }
        const { id } = req.query
        if (parseInt(id)) {
          const db_res = await excuteQuery({
            query:
              userToken.role === 'user'
                ? 'SELECT `post`.`id`,`post`.`approved`,`post`.`show`,`post`.`show_lang`, `post`.`author`,`post_lang`.`lang`,`user`.`avatar`, `user`.`name_en` AS `author_name`, `post`.`category`, `post_category`.`name_vi` AS `category_name`, `post`.`published_at`,  `post`.`created_at`, `post`.`image`, `post_lang`.`title`, `post_lang`.`description`,`post_lang`.`content`  FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` INNER JOIN `post_category` ON `post_category`.`id` = `post`.`category` WHERE  `post`.`author`=? AND `post`.`id` = ?; '
                : 'SELECT `post`.`id`,`post`.`approved`,`post`.`show`,`post`.`show_lang`, `post`.`author`,`post_lang`.`lang`,`user`.`avatar`, `user`.`name_en` AS `author_name`, `post`.`category`, `post_category`.`name_vi` AS `category_name`, `post`.`published_at`, `post`.`created_at`, `post`.`image`, `post_lang`.`title`, `post_lang`.`description`,`post_lang`.`content`  FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` INNER JOIN `post_category` ON `post_category`.`id` = `post`.`category` WHERE  `post`.`id` = ?',
            values:
              userToken.role === 'user'
                ? [userToken.id, parseInt(id)]
                : [parseInt(id)],
          })
          if (db_res.error) {
            result.BadRequest(res, db_res)
            return
          }
          if (db_res.length < 2) {
            result.BadRequest(res, 'Không tìm thấy bài viết này')
            return
          }
          result.Ok(res, db_res)
          return
        }
        result.BadRequest(res, 'Không tìm thấy bài viết này')
        return
      }
      result.BadRequest(res, 'không hỗ trợ api này')
      return
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
  if (req.method === 'POST') {
    /*  Add new post with option---------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }
      if (slug === 'add') {
        let str_sql =
          req.body.show === 1
            ? 'INSERT INTO `post`(`author`, `category`, `approved`, `show`, `show_lang`, `published_at`) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP());'
            : 'INSERT INTO `post`(`author`, `category`, `approved`, `show`, `show_lang`) VALUES (?,?,?,?,?);'
        let arr_values = [
          userToken.id,
          req.body.category,
          userToken.role === 'admin' || userToken.role === 'root' ? 1 : 0,
          req.body.show,
          req.body.show_lang,
        ]
        const db_res = await excuteQuery({
          query: str_sql,
          values: [...arr_values],
        })
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }
        let new_post_id = db_res.insertId
        const db_res_2 = await excuteQuery({
          query:
            'INSERT INTO `post_lang`(`post`, `lang`, `title`, `description`, `content`, `tags`) VALUES (?,?,?,?,?,?); ' +
            'INSERT INTO `post_lang`(`post`, `lang`, `title`, `description`, `content`, `tags`) VALUES (?,?,?,?,?,?)',
          values: [
            new_post_id,
            'vi',
            req.body.vi.title,
            req.body.vi.description,
            req.body.vi.content,
            req.body.vi.tags,
            new_post_id,
            'en',
            req.body.en.title,
            req.body.en.description,
            req.body.en.content,
            req.body.en.tags,
          ],
        })
        if (db_res_2.error) {
          await excuteQuery({
            query: 'DELETE FROM `post` WHERE `id`=?',
            values: [new_post_id],
          })
          result.BadRequest(res, db_res_2)
          return
        }
        result.Ok(res, 'Thêm bài viết thành công')
        return
      } else {
        result.BadRequest(res, 'Không hỗ trợ api')
        return
      }
    } catch (e) {
      console.log(e)
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
  if (req.method === 'DELETE') {
    /*  Delete post ----------------------------------------------------------------------- */

    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }

      if (parseInt(slug)) {
        const db_res_1 = await excuteQuery({
          query: 'SELECT `image` FROM `post`  WHERE `id`=?',
          values: [parseInt(slug)],
        })
        if (db_res_1.error) {
          result.BadRequest(res, db_res_1)
          return
        }
        if (db_res_1[0] && db_res_1[0].image) {
          let old_path = db_res_1[0].image
          if (old_path !== 'upload/postImage/default.jpg')
            console.log('./public/' + old_path)
          fs.unlink('./public/' + old_path, () => {
            return
          })
        }
        const db_res = await excuteQuery({
          query:
            userToken.role === 'user'
              ? 'DELETE FROM `post`  WHERE `id`=? AND `author`=? '
              : 'DELETE FROM `post`  WHERE `id`=?',
          values:
            userToken.role === 'user'
              ? [parseInt(slug), userToken.id]
              : [parseInt(slug)],
        })

        if (db_res.affectedRows === 0) {
          result.BadRequest(res, 'Không tìm thấy bài viết có id= ' + slug)
          return
        }
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }

        result.Ok(res, 'Xóa thành công')
        return
      } else {
        result.BadRequest(res, 'Không tìm tháy ứng dụng có id= ' + slug)
        return
      }
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
  if (req.method === 'PATCH') {
    /*  Edit post ----------------------------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }
      if (
        parseInt(slug) &&
        (userToken.role === 'admin' ||
          userToken.role === 'root' ||
          userToken.id === parseInt(slug))
      ) {
        if (req.body.approved != null) {
          const db_res = await excuteQuery({
            query: 'UPDATE `post` SET  `approved`=? WHERE `id`=?',
            values: [req.body.approved, parseInt(slug)],
          })
          if (db_res.error) {
            result.BadRequest(res, db_res)
            return
          }
          result.Ok(res, 'Bài viết đã duyệt')
          return
        } else {
          let str_sql =
            req.body.show === 1
              ? 'UPDATE `post` SET  `category`=?, `show`=?, `show_lang`=? , `published_at`= CURRENT_TIMESTAMP() WHERE `id`=?'
              : 'UPDATE `post` SET  `category`=?, `show`=?, `show_lang`=? WHERE `id`=?'
          let arr_values = [
            req.body.category,
            req.body.show,
            req.body.show_lang,
            parseInt(slug),
          ]
          const db_res = await excuteQuery({
            query: str_sql,
            values: [...arr_values],
          })
          if (db_res.error) {
            result.BadRequest(res, db_res)
            return
          }
          const db_res_2 = await excuteQuery({
            query:
              'UPDATE `post_lang` SET `title`=?, `description`=?, `content`=?, `tags`=? WHERE `post`=? AND `lang`=? ; ' +
              'UPDATE `post_lang` SET `title`=?, `description`=?, `content`=?, `tags`=? WHERE `post`=? AND `lang`=?',
            values: [
              req.body.vi.title,
              req.body.vi.description,
              req.body.vi.content,
              req.body.vi.tags,
              parseInt(slug),
              'vi',
              req.body.en.title,
              req.body.en.description,
              req.body.en.content,
              req.body.en.tags,
              parseInt(slug),
              'en',
            ],
          })
          if (db_res_2.error) {
            result.BadRequest(res, db_res_2)
            return
          }
          result.Ok(res, 'Sửa bài viết thành công')
          return
        }
      } else {
        result.BadRequest(res, 'Không hỗ trợ api')
        return
      }
    } catch (e) {
      console.log(e)
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }

  result.ServerError(res, 'Api chưa được hỗ trợ')
  return
}
