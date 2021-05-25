SELECT COUNT(`post`.`id`) as total FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` WHERE (`post`.`show_lang` = 'en' OR `post`.`show_lang` = 'vi,en') AND `post`.`show` =1 AND `post`.`approved` =1 AND `post_lang`.`lang`='en' AND `post`.`category`=1;

SELECT `post`.`id`, `post`.`author`, `user`.`name_en` AS 'author_name', `user`.`avatar`, `post`.`published_at`, `post`.`image`, `post_lang`.`title`, `post_lang`.`description` FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` WHERE ( `post`.`show_lang` = 'en' OR `post`.`show_lang` = 'vi,en' ) AND `post`.`show` = 1 AND `post`.`approved` = 1 AND `post_lang`.`lang` = 'en' AND `post`.`category` = 1 ORDER BY `post`.`published_at` DESC LIMIT 0,1



SELECT `post`.`id`, `post`.`author`, `user`.`name_en` AS 'author_name', `post`.`category`, `post_category`.`name_vi` AS `category_name`, `post`.`published_at`, `post`.`image`, `post_lang`.`title`, `post_lang`.`description` FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` INNER JOIN `post_category` ON `post_category`.`id` = `post`.`category` WHERE ( ( `post`.`show_lang` = 'en' AND `post_lang`.`lang` = 'en' ) OR( ( `post`.`show_lang` = 'vi' OR `post`.`show_lang` = 'vi,en' ) AND `post_lang`.`lang` = 'vi' ) ) AND `post`.`show` = 1 ORDER BY `post`.`published_at` DESC



SELECT `post`.`id`, `post`.`author`, `user`.`name_en` AS 'author_name', `post`.`category`, `post_category`.`name_vi` AS `category_name`, `post`.`published_at`, `post`.`image`, `post_lang`.`title`, `post_lang`.`description` FROM `post_lang` INNER JOIN `post` ON `post`.`id` = `post_lang`.`post` INNER JOIN `user` ON `user`.`id` = `post`.`author` INNER JOIN `post_category` ON `post_category`.`id` = `post`.`category` WHERE ( ( `post`.`show_lang` = 'en' AND `post_lang`.`lang` = 'en' ) OR( ( `post`.`show_lang` = 'vi' OR `post`.`show_lang` = 'vi,en' ) AND `post_lang`.`lang` = 'vi' ) ) AND `post`.`show` = 1 AND `post`.`author` = 1 ORDER BY `post`.`published_at` DESC