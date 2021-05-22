import {
  Avatar,
  Button,
  Card,
  Col,
  Layout,
  List,
  Popconfirm,
  Row,
  Tooltip,
} from 'antd'
import WebHead from '../../components/Layout/head'
import {
  SettingOutlined,
  PushpinOutlined,
  EyeInvisibleOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import NewApplication from '../../components/Form/application/newApplication'

const { Meta } = Card
const data = [
  {
    id: 1,
    name_vi: 'HỆ THỐNG ISO',
    name_en: 'ISO SYSTEM',
    domain: 'https://iso.cusc.vn',
    image: '/assets/img/iso.PNG',
    show: true,
  },
  {
    id: 2,
    name_vi: 'PHÒNG HỢP TRỰC TUYẾN',
    name_en: 'MEET ROOM SYSTEM',
    domain: 'https://cusc-meet.ddns.net',
    image: '/assets/img/meet.PNG',
    show: true,
  },
  {
    id: 3,
    name_vi: 'PHÒNG HỢP TRỰC TUYẾN 2',
    name_en: 'MEET ROOM SYSTEM 2',
    domain: 'https://cusc-meet.ddns.net',
    image: '/assets/img/meet.PNG',
    show: false,
  },

  {
    id: 4,
    name_vi: 'PHÒNG HỢP TRỰC TUYẾN 3',
    name_en: 'MEET ROOM SYSTEM 3',
    domain: 'https://cusc-meet.ddns.net',
    image: '/assets/img/meet.PNG',
    show: false,
  },
  {
    id: 5,
    name_vi: 'PHÒNG HỢP TRỰC TUYẾN 4',
    name_en: 'MEET ROOM SYSTEM 4',
    domain: 'https://cusc-meet.ddns.net',
    image: '/assets/img/meet.PNG',
    show: false,
  },
]
const user = {
  role: 'admin',
}

export default function AdminApp() {
  return (
    <>
      <NewApplication />
      <article>
        <WebHead
          title="Ứng dụng | Admin"
          pageTitle="Ứng dụng | Admin"
          description="Quản lý website nhóm R&D"
        />
        <Layout>
          <Card
            bordered={false}
            title="Danh sách ứng dụng"
            extra={
              user.role === 'admin' && (
                <Tooltip title="Thêm ứng dụng">
                  <Button type="primary" icon={<PlusOutlined />}>
                    Thêm ứng dụng
                  </Button>
                </Tooltip>
              )
            }
          >
            <List
              grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 4 }}
              dataSource={data}
              renderItem={(appItem) => (
                <List.Item>
                  <Card
                    type="inner"
                    actions={
                      user.role === 'admin' && [
                        appItem.show ? (
                          <Tooltip title="Đang hiển thị">
                            <PushpinOutlined key="show" />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Đang ẩn">
                            <EyeInvisibleOutlined key="hide" />
                          </Tooltip>
                        ),
                        <Tooltip title="Cài đặt">
                          <SettingOutlined
                            key="setting"
                            onClick={() => {
                              console.log('setting')
                            }}
                          />
                        </Tooltip>,
                        <Tooltip title="Xóa">
                          <Popconfirm
                            title="Xác nhận xóa ứng dụng"
                            okText="OK"
                            cancelText="Hủy"
                            key="delete"
                          >
                            <DeleteOutlined />
                          </Popconfirm>
                        </Tooltip>,
                      ]
                    }
                    cover={
                      <img
                        className="object-cover h-44 w-full filter brightness-90"
                        alt={appItem.name_vi}
                        src={appItem.image}
                      />
                    }
                  >
                    <Meta
                      title={
                        <Link href={appItem.domain}>{appItem.name_vi}</Link>
                      }
                      description={appItem.domain}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Layout>
      </article>
    </>
  )
}
