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
    /*  Get post with option---------------------------------------------------- */
    try {
      const { id, lang } = req.query
      if (parseInt(id) && lang != null) {
        const db_res = await excuteQuery({
          query:
            'SELECT `post`.`id`,`post`.`show_lang`, `post`.`author`,`post_lang`.`lang`,`user`.`avatar`, `user`.`name_' +
            lang +
            '` AS `author_name`, `post`.`category`, `post_category`.`name_' +
            lang +
            '` AS `category_name`, `post`.`published_at`, `post`.`created_at`, `post`.`image`, `post_lang`.`title`, `post_lang`.`description`,`post_lang`.`content`  FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` INNER JOIN `post_category` ON `post_category`.`id` = `post`.`category` WHERE `post`.`approved`=1 AND `post`.`show`=1 AND `post`.`id` = ? AND `post_lang`.`lang` =?',
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
        result.Ok(res, db_res)
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
