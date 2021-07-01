import NextCors from 'nextjs-cors'
import result from '../../../helper/result.helps'
const fs = require('fs')

export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  if (req.method === 'GET') {
    /*  GET image ----------------------------------------------------------------------- */
    let { url } = req.query

    if (url[0] && url[1]) {
      try {
        fs.readFile(
          `./public/upload/${url[0]}/${url[1]}`,
          function (err, data) {
            if (err) {
              result.NotFound(res, 'Không tìm thấy hình ảnh')
              return
            } else {
              res.writeHead(200, { 'Content-Type': 'image/*' })
              res.end(data) // Send the file data to the browser.
              return
            }
          }
        )
      } catch (errs) {
        result.ServerError(res, 'Lỗi server')
        return
      }
    } else {
      result.NotFound(res, 'Không tìm thấy hình ảnh')
      return
    }
  } else {
    result.ServerError(res, 'Api chưa được hỗ trợ')
    return
  }
}
