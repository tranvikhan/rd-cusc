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
    /*  Get project with option---------------------------------------------------- */

    const { page, limit, lang } = req.query

    try {
      const db_res = await excuteQuery({
        query:
          'SELECT COUNT(`project`.`id`) as total FROM `project_lang` INNER JOIN `project` ON `project`.`id` = `project_lang`.`project` INNER JOIN `user` ON `user`.`id` = `project`.`writer` WHERE (`project`.`show_lang` = ? OR `project`.`show_lang` = ?) AND `project`.`show` =1 AND `project`.`approved` =1 AND `project_lang`.`lang`=?;',
        values: [lang, 'vi,en', lang],
      })
      if (db_res.error) {
        result.BadRequest(res, db_res)
        return
      }
      let sql_limit = parseInt(limit) < 1 ? 1 : parseInt(limit)
      let total_pages = Math.ceil(db_res[0].total / sql_limit)
      total_pages = total_pages == 0 ? 1 : total_pages
      let page_sql =
        parseInt(page) > total_pages
          ? total_pages
          : parseInt(page) < 1
          ? 1
          : parseInt(page)
      let start_rows = (page_sql - 1) * sql_limit
      const db_res_2 = await excuteQuery({
        query:
          'SELECT `project`.`id`, `project`.`writer`, `user`.`name_' +
          lang +
          '` AS `writer_name`, `user`.`avatar`, `project`.`published_at`, `project`.`image`, `project_lang`.`name`, `project_lang`.`description` FROM `project_lang` INNER JOIN `project` ON `project`.`id` = `project_lang`.`project` INNER JOIN `user` ON `user`.`id` = `project`.`writer` WHERE ( `project`.`show_lang` = ? OR `project`.`show_lang` =? ) AND `project`.`show` = 1 AND `project`.`approved` = 1 AND `project_lang`.`lang` = ?  ORDER BY `project`.`published_at` DESC LIMIT ?,?',
        values: [lang, 'vi,en', lang, start_rows, sql_limit],
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
