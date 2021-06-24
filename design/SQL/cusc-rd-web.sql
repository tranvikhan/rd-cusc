-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 23, 2021 lúc 02:15 PM
-- Phiên bản máy phục vụ: 10.4.18-MariaDB
-- Phiên bản PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `cusc-rd-web`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `application`
--

CREATE TABLE `application` (
  `id` int(11) NOT NULL,
  `name_vi` text NOT NULL DEFAULT '',
  `name_en` text NOT NULL DEFAULT '',
  `domain` varchar(150) NOT NULL DEFAULT '',
  `image` varchar(300) NOT NULL DEFAULT 'upload/appImage/default.jpg',
  `show` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `content` text DEFAULT '',
  `type` varchar(50) NOT NULL DEFAULT 'get_news',
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `action` varchar(100) DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `name` text NOT NULL DEFAULT '',
  `description` text NOT NULL DEFAULT '',
  `type` varchar(200) DEFAULT 'system',
  `style` varchar(200) DEFAULT 'success',
  `ref_id` int(11) DEFAULT NULL,
  `link` varchar(200) DEFAULT '#',
  `is_new` tinyint(1)  NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `author` int(11) NOT NULL DEFAULT 1,
  `category` int(11) NOT NULL,
  `image` varchar(300) NOT NULL DEFAULT 'upload/postImage/default.jpg',
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `show` tinyint(1) NOT NULL DEFAULT 1,
  `show_lang` varchar(100) NOT NULL DEFAULT 'vi,en',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post_category`
--

CREATE TABLE `post_category` (
  `id` int(11) NOT NULL,
  `name_vi` text NOT NULL DEFAULT '',
  `name_en` text NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- Đang đổ dữ liệu cho bảng `post_category`
--
INSERT INTO `post_category`(`id`,`name_vi`, `name_en`)
VALUES(
    1,
    'Hoạt động nhóm R&D',
    'R&D Activity'
);
INSERT INTO `post_category`(`id`,`name_vi`, `name_en`)
VALUES(2,'Công nghệ', 'Tech news');
-- --------------------------------------------------------


--
-- Cấu trúc bảng cho bảng `post_lang`
--

CREATE TABLE `post_lang` (
  `id` int(11) NOT NULL,
  `post` int(11) NOT NULL,
  `lang` char(10) NOT NULL DEFAULT 'vi',
  `title` text NOT NULL DEFAULT '',
  `description` text NOT NULL DEFAULT '',
  `content` mediumtext NOT NULL DEFAULT '',
  `tags` varchar(300) DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `writer` int(11) NOT NULL DEFAULT 1,
  `image` varchar(300) NOT NULL DEFAULT 'upload/projectImage/default.jpg',
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `show` tinyint(1) NOT NULL DEFAULT 1,
  `show_lang` varchar(100) NOT NULL DEFAULT 'vi,en',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `project_lang`
--

CREATE TABLE `project_lang` (
  `id` int(11) NOT NULL,
  `project` int(11) NOT NULL,
  `lang` char(10) NOT NULL DEFAULT 'vi',
  `name` text NOT NULL DEFAULT '',
  `description` text NOT NULL DEFAULT '',
  `content` mediumtext NOT NULL DEFAULT '',
  `tags` varchar(300) DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `setting`
--

CREATE TABLE `setting` (
  `id` int(11) NOT NULL,
  `setting_name` varchar(150) NOT NULL DEFAULT '',
  `setting_value` mediumtext NOT NULL DEFAULT '',
  `value_type` varchar(150) NOT NULL DEFAULT 'string',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `setting`
--
INSERT INTO `setting`(
    `id`,
    `setting_name`,
    `setting_value`,
    `value_type`,
    `created_at`,
    `updated_at`
)
VALUES(
    1,
    'homeImage_mode',
    'default',
    'string',
    '2021-05-22 14:24:53',
    '2021-05-22 14:24:53'
),(
    2,
    'homeImage_1_show',
    '0',
    'boolean',
    '2021-05-22 14:24:53',
    '2021-05-22 14:26:07'
),(
    3,
    'homeImage_1',
    'upload/homePageImage/default.jpg',
    'string',
    '2021-05-22 14:24:53',
    '2021-05-22 14:26:18'
),(
    4,
    'homeImage_2_show',
    '0',
    'boolean',
    '2021-05-22 14:24:53',
    '2021-05-22 14:26:21'
),(
    5,
    'homeImage_2',
    'upload/homePageImage/default.jpg',
    'string',
    '2021-05-22 14:24:53',
    '2021-05-22 14:27:06'
),(
    6,
    'homeImage_3_show',
    '0',
    'boolean',
    '2021-05-22 14:24:53',
    '2021-05-22 14:27:22'
),(
    7,
    'homeImage_3',
    'upload/homePageImage/default.jpg',
    'string',
    '2021-05-22 14:24:53',
    '2021-05-22 14:27:06'
),(
    8,
    'homeProject_mode',
    'auto',
    'string',
    '2021-05-22 14:24:53',
    '2021-05-22 14:27:38'
),(
    9,
    'homeProject_1',
    '0',
    'number',
    '2021-05-22 14:31:51',
    '2021-05-22 14:31:51'
),(
    10,
    'homeProject_2',
    '0',
    'number',
    '2021-05-22 14:31:51',
    '2021-05-22 14:31:51'
),(
    11,
    'homeProject_3',
    '0',
    'number',
    '2021-05-22 14:31:51',
    '2021-05-22 14:31:51'
),(
    12,
    'pageProject_mode',
    'auto',
    'string',
    '2021-05-22 14:31:51',
    '2021-05-22 14:31:51'
),(
    13,
    'pageProject_1',
    '0',
    'number',
    '2021-05-22 14:31:51',
    '2021-05-22 14:32:18'
),(
    14,
    'pageProject_2',
    '0',
    'number',
    '2021-05-22 14:31:51',
    '2021-05-22 14:32:15'
),(
    15,
    'pageProject_3',
    '0',
    'number',
    '2021-05-22 14:31:52',
    '2021-05-22 14:31:52'
),(
    16,
    'pageNews_mode',
    'auto',
    'string',
    '2021-05-22 14:31:52',
    '2021-05-22 14:31:52'
),(
    17,
    'pageNews_1',
    '0',
    'number',
    '2021-05-22 14:31:52',
    '2021-05-22 14:31:52'
),(
    18,
    'pageNews_2',
    '0',
    'number',
    '2021-05-22 14:31:52',
    '2021-05-22 14:31:52'
),(
    19,
    'pageNews_3',
    '0',
    'number',
    '2021-05-22 14:31:52',
    '2021-05-22 14:31:52'
),(
    20,
    'userTop_mode',
    'root',
    'string',
    '2021-05-22 14:31:52',
    '2021-05-22 14:31:52'
),(
    21,
    'userTop',
    '0',
    'number',
    '2021-05-22 14:31:52',
    '2021-05-22 14:31:52'
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user',
  `position_vi` tinytext NOT NULL DEFAULT 'Thành viên',
  `position_en` tinytext NOT NULL DEFAULT 'Member',
  `name_vi` tinytext NOT NULL,
  `name_en` tinytext NOT NULL,
  `avatar` varchar(300) NOT NULL DEFAULT 'upload/userAvatar/default.jpg',
  `birth_day` date DEFAULT '2000-01-01',
  `national_vi` tinytext DEFAULT 'Việt Nam',
  `national_en` tinytext DEFAULT 'Viet Nam',
  `gender` tinytext DEFAULT 'male',
  `address_vi` tinytext DEFAULT '',
  `address_en` tinytext DEFAULT '',
  `email` varchar(100) DEFAULT '#',
  `phone` varchar(30) DEFAULT '+84 ',
  `saying_vi` text DEFAULT '',
  `saying_en` text DEFAULT '',
  `cv` varchar(3000) DEFAULT '#',
  `show` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `position_vi`, `position_en`, `name_vi`, `name_en`, `avatar`, `birth_day`, `national_vi`, `national_en`, `gender`, `address_vi`, `address_en`, `email`, `phone`, `saying_vi`, `saying_en`, `cv`, `show`, `created_at`, `updated_at`) VALUES
(1, 'thviet', '$2a$08$qznKdv9znpW2BGHNmCbUi.G1GgO0l5tSCIcOd5BlqSPBzFIx9kvqy', 'root', 'Trưởng nhóm R&D', 'Head of the R&D department', 'Trần Hoàng Việt', 'Tran Hoang Viet', 'upload/userAvatar/default.jpg', '2000-01-01', 'Việt Nam', 'Viet Nam', 'Nam', '', '', '#', '+84 ', '', '', '#', 1, '2021-05-20 12:15:24', '2021-05-22 13:06:22');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `cusc-rd-web`.`application` ADD UNIQUE `ONLY ONE APP DOMAIN` (`domain`(150));
--
-- Chỉ mục cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ONLY ONE EMAIL AND TYPE` (`type`,`email`);
ALTER TABLE `feedback` ADD FULLTEXT KEY `EMAIL_SEARCH` (`email`);

--
-- Chỉ mục cho bảng `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `USER_ID_NOTIFICATION` (`user`);

--
-- Chỉ mục cho bảng `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `USER_ID_POST` (`author`),
  ADD KEY `CATEGORY_ID_POST` (`category`);

--
-- Chỉ mục cho bảng `post_category`
--
ALTER TABLE `post_category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `post_lang`
--
ALTER TABLE `post_lang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `POST_ID` (`post`);
ALTER TABLE `post_lang` ADD FULLTEXT KEY `POST_LANG_NAME_INDEX` (`title`);
ALTER TABLE `post_lang` ADD FULLTEXT KEY `POST_LANG_TAGS_INDEX` (`tags`);

--
-- Chỉ mục cho bảng `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `USER_ID_PROJECT` (`writer`);

--
-- Chỉ mục cho bảng `project_lang`
--
ALTER TABLE `project_lang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PROJECT_ID` (`project`);
ALTER TABLE `project_lang` ADD FULLTEXT KEY `PROJECT_LANG_NAME_INDEX` (`name`);
ALTER TABLE `project_lang` ADD FULLTEXT KEY `PROJECT_LANG_TAGS_INDEX` (`tags`);

--
-- Chỉ mục cho bảng `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`,`username`),
  ADD UNIQUE KEY `USER_USERNAME_INDEX` (`username`);
ALTER TABLE `user` ADD FULLTEXT KEY `USER_NAME_INDEX` (`name_vi`,`name_en`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `application`
--
ALTER TABLE `application`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `post_category`
--
ALTER TABLE `post_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `post_lang`
--
ALTER TABLE `post_lang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `project_lang`
--
ALTER TABLE `project_lang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `USER_ID_NOTIFICATION` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `CATEGORY_ID_POST` FOREIGN KEY (`category`) REFERENCES `post_category` (`id`),
  ADD CONSTRAINT `USER_ID_POST` FOREIGN KEY (`author`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `post_lang`
--
ALTER TABLE `post_lang`
  ADD CONSTRAINT `POST_ID` FOREIGN KEY (`post`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `USER_ID_PROJECT` FOREIGN KEY (`writer`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `project_lang`
--
ALTER TABLE `project_lang`
  ADD CONSTRAINT `PROJECT_ID` FOREIGN KEY (`project`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
