const result = require('../../../../helper/result.helps')
import NextCors from 'nextjs-cors'
import excuteQuery from '../../../../db'


export default async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  try {
    const { page ,lang} = req.query;
   
    const db_res = await excuteQuery({
        query: 'SELECT * FROM `setting`',
        values: [],
      })
      if (db_res.error) {
        result.BadRequest(res, db_res)
        return
      }
      let obj = {}
      for (let i = 0; i < db_res.length; ++i) {
        let key = db_res[i].setting_name
        let value = db_res[i].setting_value
        let type = db_res[i].value_type
        if (type === 'number') {
          obj[key] = parseInt(value)
        } else if (type === 'boolean') {
          obj[key] = value === '1'
        } else {
          obj[key] = value
        }
      }
    if(page==='home'){
        let homeImages = []; 
        if(obj.homeImage_mode ==='manual'){
          if(obj.homeImage_1_show) homeImages.push(obj.homeImage_1)
          if(obj.homeImage_2_show) homeImages.push(obj.homeImage_2)
          if(obj.homeImage_3_show) homeImages.push(obj.homeImage_3)
        }
        let homeProjects = []
        if(obj.homeProject_mode ==='manual'){
            homeProjects = await excuteQuery({
                query:
                'SELECT `project`.`id`,`project`.`show_lang`, `project`.`writer`,`project_lang`.`lang`,`user`.`avatar`, `user`.`name_' +
            lang +
            '` AS `writer_name`, `project`.`published_at`, `project`.`created_at`, `project`.`image`, `project_lang`.`name`, `project_lang`.`description`,`project_lang`.`tags`  FROM `project_lang` INNER JOIN `project` ON `project`.`id` = `project_lang`.`project` INNER JOIN `user` ON `user`.`id` = `project`.`writer`  WHERE `project`.`approved`=1 AND `project`.`show`=1  AND `project_lang`.`lang` =? AND  (`project`.`id` = ? OR `project`.`id` = ? OR `project`.`id` = ?)',
                values: [lang === 'en' ? 'en' : 'vi',obj.homeProject_1,obj.homeProject_2,obj.homeProject_3],
              })
              if (homeProjects.error) {
                homeProjects =[];
                return
              }
        }
       
        result.Ok(res,{
            homeImage_mode:homeImages.length>0? obj.homeImage_mode:"default",
            homeImages:homeImages,
            homeProject_mode:obj.homeProject_mode,
            homeProjects:homeProjects,
            
        });
        return;
    }
    if(page==='project'){
        result.Ok(res,"OK");
    }
    if(page==='news'){
        result.Ok(res,"OK");
    }
    if(page==='organization'){
        result.Ok(res,"OK");
    }
  } catch (e) {
    result.ServerError(res, 'Lỗi server')
    console.log(e);
    return
  }
}
