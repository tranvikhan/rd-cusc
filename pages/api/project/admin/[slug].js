const result = require('../../../../helper/result.helps')
import excuteQuery from '../../../../db'
import verifyToken from '../../../../middleware/verifyToken'
import NextCors from 'nextjs-cors'
import AddProjectNoti from '../../../../helper/notification/addProject'
import ApprovedProjectNoti from '../../../../helper/notification/approvedProject'
import DeleteProjectNoti from '../../../../helper/notification/deleteProject'
const fs = require('fs')
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}
export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  let { slug } = req.query
  if (req.method === 'GET') {
    /*  Get project with option---------------------------------------------------- */
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
              ? 'SELECT `project`.`id`,`project`.`approved`,`project`.`show_lang`, `project`.`writer`, `user`.`name_vi` AS `writer_name`, `project`.`published_at`,  `project`.`created_at`, `project`.`image`, `project_lang`.`name`, `project_lang`.`description` FROM `project_lang` INNER JOIN `project` ON `project`.`id` = `project_lang`.`project` INNER JOIN `user` ON `user`.`id` = `project`.`writer`  WHERE ( ( `project`.`show_lang` = ? AND `project_lang`.`lang` = ? ) OR( ( `project`.`show_lang` = ? OR `project`.`show_lang` = ? ) AND `project_lang`.`lang` = ? ) ) AND `project`.`show` = ? AND `project`.`writer`=? ORDER BY `project`.`created_at` DESC'
              : 'SELECT `project`.`id`,`project`.`approved`,`project`.`show_lang`, `project`.`writer`, `user`.`name_vi` AS `writer_name`, `project`.`published_at`, `project`.`created_at`, `project`.`image`, `project_lang`.`name`, `project_lang`.`description` FROM `project_lang` INNER JOIN `project` ON `project`.`id` = `project_lang`.`project` INNER JOIN `user` ON `user`.`id` = `project`.`writer`  WHERE ( ( `project`.`show_lang` = ? AND `project_lang`.`lang` = ? ) OR( ( `project`.`show_lang` = ? OR `project`.`show_lang` = ? ) AND `project_lang`.`lang` = ? ) ) AND `project`.`show` = ? ORDER BY `project`.`created_at` DESC',
          values:
            userToken.role === 'user'
              ? ['en', 'en', 'vi', 'vi,en', 'vi', show, userToken.id]
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
                ? 'SELECT `project`.`id`,`project`.`approved`,`project`.`show`,`project`.`show_lang`, `project`.`writer`,`project_lang`.`lang`,`user`.`avatar`, `user`.`name_vi` AS `writer_name`,`project`.`published_at`,  `project`.`created_at`, `project`.`image`, `project_lang`.`name`, `project_lang`.`description`,`project_lang`.`tags`,`project_lang`.`content`,  FROM `project_lang` INNER JOIN `project` ON `project`.`id` = `project_lang`.`project` INNER JOIN `user` ON `user`.`id` = `project`.`writer`  WHERE  `project`.`writer`=? AND `project`.`id` = ?; '
                : 'SELECT `project`.`id`,`project`.`approved`,`project`.`show`,`project`.`show_lang`, `project`.`writer`,`project_lang`.`lang`,`user`.`avatar`, `user`.`name_vi` AS `writer_name`,`project`.`published_at`, `project`.`created_at`, `project`.`image`, `project_lang`.`name`, `project_lang`.`description`,`project_lang`.`tags`,`project_lang`.`content`  FROM `project_lang` INNER JOIN `project` ON `project`.`id` = `project_lang`.`project` INNER JOIN `user` ON `user`.`id` = `project`.`writer`  WHERE  `project`.`id` = ?',
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
    /*  Add new project with option---------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }
      if (slug === 'add') {
        let str_sql =
          req.body.show === 1
            ? 'INSERT INTO `project`(`writer`,`approved`, `show`, `show_lang`, `published_at`) VALUES (?,?,?,?,CURRENT_TIMESTAMP());'
            : 'INSERT INTO `project`(`writer`,`approved`, `show`, `show_lang`) VALUES (?,?,?,?);'
        let arr_values = [
          userToken.id,
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
        let new_project_id = db_res.insertId
        const db_res_2 = await excuteQuery({
          query:
            'INSERT INTO `project_lang`(`project`, `lang`, `name`, `description`, `content`, `tags`) VALUES (?,?,?,?,?,?); ' +
            'INSERT INTO `project_lang`(`project`, `lang`, `name`, `description`, `content`, `tags`) VALUES (?,?,?,?,?,?)',
          values: [
            new_project_id,
            'vi',
            req.body.vi.name,
            req.body.vi.description,
            req.body.vi.content,
            req.body.vi.tags,
            new_project_id,
            'en',
            req.body.en.name,
            req.body.en.description,
            req.body.en.content,
            req.body.en.tags,
          ],
        })
        if (db_res_2.error) {
          await excuteQuery({
            query: 'DELETE FROM `project` WHERE `id`=?',
            values: [new_project_id],
          })
          result.BadRequest(res, db_res_2)
          return
        }
        if (userToken.role !== 'admin' && userToken.role !== 'root') {
          await AddProjectNoti(
            new_project_id,
            req.body.show_lang === 'en' ? req.body.en.name : req.body.vi.name,
            userToken.id
          )
        }
        result.Ok(res, {
          message: 'Thêm dự án thành công',
          obj: { id: new_project_id, ...req.body },
        })
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
    /*  Delete project ----------------------------------------------------------------------- */

    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }

      if (parseInt(slug)) {
        await DeleteProjectNoti(userToken.id, parseInt(slug))
        const db_res_1 = await excuteQuery({
          query: 'SELECT `image` FROM `project`  WHERE `id`=?',
          values: [parseInt(slug)],
        })
        if (db_res_1.error) {
          result.BadRequest(res, db_res_1)
          return
        }
        if (db_res_1[0] && db_res_1[0].image) {
          let old_path = db_res_1[0].image
          if (old_path !== 'upload/projectImage/default.jpg')
            fs.unlink('./public/' + old_path, () => {
              return
            })
        }
        const db_res = await excuteQuery({
          query:
            userToken.role === 'user'
              ? 'DELETE FROM `project`  WHERE `id`=? AND `writer`=? '
              : 'DELETE FROM `project`  WHERE `id`=?',
          values:
            userToken.role === 'user'
              ? [parseInt(slug), userToken.id]
              : [parseInt(slug)],
        })

        if (db_res.affectedRows === 0) {
          result.BadRequest(res, 'Không tìm dự án có id= ' + slug)
          return
        }
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }

        result.Ok(res, {
          message: 'Xóa dự án thành công',
          obj: { id: parseInt(slug) },
        })
        return
      } else {
        result.BadRequest(res, 'Không tìm thấy dự án có id= ' + slug)
        return
      }
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
  if (req.method === 'PATCH') {
    /*  Edit project ----------------------------------------------------------------------- */
    try {
      let userToken = await verifyToken(req)
      if (!userToken) {
        result.Unauthorized(res, 'Thiếu token hoặc token hết hạn')
        return
      }
      if (parseInt(slug)) {
        if (
          req.body.approved != null &&
          (userToken.role === 'admin' || userToken.role === 'root')
        ) {
          const db_res = await excuteQuery({
            query: 'UPDATE `project` SET  `approved`=? WHERE `id`=?',
            values: [req.body.approved, parseInt(slug)],
          })
          if (db_res.error) {
            result.BadRequest(res, db_res)
            return
          }

          if (req.body.approved === 1) {
            await ApprovedProjectNoti(userToken.id, parseInt(slug))
          }
          result.Ok(res, {
            message: 'Đã duyệt dự án',
            obj: { id: parseInt(slug) },
          })
          return
        } else if (req.body.show_hide != null) {
          const db_res_show = await excuteQuery({
            query: 'UPDATE `project` SET  `show`=? WHERE `id`=?',
            values: [req.body.show_hide, parseInt(slug)],
          })
          if (db_res_show.error) {
            result.BadRequest(res, db_res_show)
            return
          }
          result.Ok(res, {
            message: req.body.show
              ? 'Đã hiển thị dự án'
              : 'Đã ẩn dự án vào bản nháp',
            obj: { id: parseInt(slug) },
          })
          return
        } else {
          let str_sql =
            req.body.show === 1
              ? 'UPDATE `project` SET  `show`=?, `show_lang`=? , `published_at`= CURRENT_TIMESTAMP() WHERE `id`=?'
              : 'UPDATE `project` SET  `show`=?, `show_lang`=? WHERE `id`=?'
          let arr_values = [req.body.show, req.body.show_lang, parseInt(slug)]
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
              'UPDATE `project_lang` SET `name`=?, `description`=?, `content`=?, `tags`=? WHERE `project`=? AND `lang`=? ; ' +
              'UPDATE `project_lang` SET `name`=?, `description`=?, `content`=?, `tags`=? WHERE `project`=? AND `lang`=?',
            values: [
              req.body.vi.name,
              req.body.vi.description,
              req.body.vi.content,
              req.body.vi.tags,
              parseInt(slug),
              'vi',
              req.body.en.name,
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
          result.Ok(res, {
            message: 'Sửa dự án thành công',
            obj: { id: parseInt(slug), ...req.body },
          })
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
