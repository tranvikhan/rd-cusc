const result = require('../../../helper/result.helps')
import excuteQuery from '../../../db'
import verifyToken from '../../../middleware/verifyToken'
import NextCors from 'nextjs-cors'

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  if (req.method === 'GET') {
    /*  Get feedback with option---------------------------------------------------- */

    const { category, page, limit, lang } = req.query

    try {
      const db_res = await excuteQuery({
        query:
          category != null
            ? 'SELECT COUNT(`post`.`id`) as total FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` WHERE (`post`.`show_lang` = ? OR `post`.`show_lang` = ?) AND `post`.`show` =1 AND `post`.`approved` =1 AND `post_lang`.`lang`=? AND `post`.`category`=?;'
            : 'SELECT COUNT(`post`.`id`) as total FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` WHERE (`post`.`show_lang` = ? OR `post`.`show_lang` = ?) AND `post`.`show` =1 AND `post`.`approved` =1 AND `post_lang`.`lang`=?;',
        values:
          category != null
            ? [lang, 'vi,en', lang, parseInt(category)]
            : [lang, 'vi,en', lang],
      })
      if (db_res.error) {
        result.BadRequest(res, db_res)
        return
      }
      let sql_limit = parseInt(limit) < 1 ? 1 : parseInt(limit)
      let total_pages = Math.ceil(db_res[0].total / sql_limit)
      let page_sql =
        parseInt(page) > total_pages
          ? total_pages
          : parseInt(page) < 1
          ? 1
          : parseInt(page)
      let start_rows = (page_sql - 1) * sql_limit
      const db_res_2 = await excuteQuery({
        query:
          category != null
            ? 'SELECT `post`.`id`, `post`.`author`, `user`.`name_' +
              lang +
              '` AS `author_name`, `user`.`avatar`, `post`.`published_at`, `post`.`image`, `post_lang`.`title`, `post_lang`.`description` FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` WHERE ( `post`.`show_lang` = ? OR `post`.`show_lang` =? ) AND `post`.`show` = 1 AND `post`.`approved` = 1 AND `post_lang`.`lang` = ? AND `post`.`category` = ? ORDER BY `post`.`published_at` DESC LIMIT ?,?'
            : 'SELECT `post`.`id`, `post`.`author`, `user`.`name_' +
              lang +
              '` AS `author_name`, `user`.`avatar`, `post`.`published_at`, `post`.`image`, `post_lang`.`title`, `post_lang`.`description` FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` WHERE ( `post`.`show_lang` = ? OR `post`.`show_lang` =? ) AND `post`.`show` = 1 AND `post`.`approved` = 1 AND `post_lang`.`lang` = ?  ORDER BY `post`.`published_at` DESC LIMIT ?,?',
        values:
          category != null
            ? [lang, 'vi,en', lang, parseInt(category), start_rows, sql_limit]
            : [lang, 'vi,en', lang, start_rows, sql_limit],
      })
      if (db_res_2.error) {
        result.BadRequest(res, db_res_2)
        return
      }

      result.Ok(res, {
        list: db_res_2,
        length: db_res_2.length,
        page: page_sql,
        limit: sql_limit,
        total_pages: total_pages,
      })
      return
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
  result.ServerError(res, 'Api chưa được hỗ trợ')
  return
}
