import Head from 'next/head'
import config from '../../constant/web_config'
const WebHead = (props) => (
  <Head>
    <title>{props.title}</title>

    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta charset="UTF-8" />
    <meta property="og:locale" content="vi_VN"></meta>
    <meta name="description" content={props.description} />
    <meta
      name="keywords"
      content={
        props.keywords
          ? props.keywords
          : 'R&D,CUSC,CTU,Cần Thơ,Nhóm nghiên cứu và phát triển'
      }
    />
    <meta name="author" content="R&D-CUSC SOFT" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="canonical" href={process.env.BASE_URL} />
    <meta name="robots" content="index, follow" />
    <meta property="og:url" content={process.env.BASE_URL} />

    <meta
      property="og:image"
      content={props.image ? props.image : process.env.WEB_LOGO}
    />

    <meta property="og:type" content="article" />

    <meta property="twitter:card" content="summary" />

    <meta property="twitter:title" content={props.pageTitle} />

    <meta property="og:site_name" content="CUSC-R&D" />

    <meta property="twitter:url" content={process.env.BASE_URL} />

    <meta property="og:title" content={props.pageTitle} />

    <meta property="og:description" content={props.description} />

    <meta
      property="twitter:image"
      content={props.image ? props.image : process.env.WEB_LOGO}
    />
    <meta property="twitter:description" content={props.description} />

    <meta property="og:url" content={process.env.BASE_URL}></meta>
  </Head>
)
export default WebHead
