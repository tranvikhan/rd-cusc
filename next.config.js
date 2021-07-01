const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  future: {
    webpack5: true,
  },
  env: {
    MYSQL_HOST: '127.0.0.1',
    MYSQL_PORT: '3306',
    MYSQL_DATABASE: 'cusc-rd-web',
    MYSQL_USER: 'root',
    MYSQL_PASSWORD: '',
    AUTH_SECRET: 'cuscsoftrd',
    BASE_URL: 'https://cusc-rd.herokuapp.com',
    WEB_LOGO: 'https://cusc-rd.herokuapp.com/assets/img/Group 4.png',
  },
}
