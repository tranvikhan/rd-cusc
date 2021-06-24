const result = require('../../../helper/result.helps')
import excuteQuery from '../../../db'
import NextCors from 'nextjs-cors'
const fs = require('fs')

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  let { slug } = req.query
  if (req.method === 'GET') {
    /*  Get project with option---------------------------------------------------- */
    try {
      const { id, lang } = req.query
      if (parseInt(id) && lang != null) {
        const db_res = await excuteQuery({
          query:
            'SELECT `project`.`id`,`project`.`show_lang`, `project`.`writer`,`project_lang`.`lang`,`user`.`avatar`, `user`.`name_' +
            lang +
            '` AS `writer_name`, `project`.`published_at`, `project`.`created_at`, `project`.`image`, `project_lang`.`name`, `project_lang`.`description`,`project_lang`.`tags`,`project_lang`.`content`  FROM `project_lang` INNER JOIN `project` ON `project`.`id` = `project_lang`.`project` INNER JOIN `user` ON `user`.`id` = `project`.`writer`  WHERE `project`.`approved`=1 AND `project`.`show`=1 AND `project`.`id` = ? AND `project_lang`.`lang` =?',
          values: [parseInt(id), lang === 'en' ? 'en' : 'vi'],
        })
        if (db_res.error) {
          result.BadRequest(res, db_res)
          return
        }
        if (db_res.length < 1) {
          result.BadRequest(res, 'Không tìm thấy bài viết này')
          return
        }
        if (
          db_res[0].show_lang !== db_res[0].lang &&
          db_res[0].show_lang !== 'vi,en'
        ) {
          if (lang === 'vi') {
            result.BadRequest(
              res,
              'Không tìm thấy nội dung phù hợp với ngôn ngữ này'
            )
          } else {
            result.BadRequest(
              res,
              "Couldn't find any content for this language"
            )
          }

          return
        }
        result.Ok(res, db_res[0])
        return
      }
      result.BadRequest(res, 'Không tìm thấy bài viết này')
      return
    } catch (e) {
      result.ServerError(res, 'Lỗi hệ thống')
      return
    }
  }
}
