import { Button, Card, Layout, List, Popconfirm, Tooltip } from 'antd'
import WebHead from '../../../components/Layout/head'
import {
  EditOutlined,
  PushpinOutlined,
  EyeInvisibleOutlined,
  UserAddOutlined,
  DeleteOutlined,
  UserOutlined,
  KeyOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import NewAccount from '../../../components/Form/user/newAccount'

const { Meta } = Card
const data = [
  {
    id: 1,
    name_vi: 'Trần Hoàng Việt',
    name_en: 'Viet Tran',
    position_vi: 'Trưởng nhóm R&D',
    image: '/assets/img/users/thViet.jpg',
    show: true,
    role: 'admin',
  },
  {
    id: 2,
    name_vi: 'Lê Hữu Phát',
    name_en: 'Phat Le',
    position_vi: 'Thành viên phụ trách Server System',
    image: '/assets/img/users/lhPhat.jpg',
    show: true,
    role: 'user',
  },
  {
    id: 3,
    name_vi: 'Đặng Hiếu Nghĩa',
    name_en: 'Nghia Dang',
    position_vi: 'Thành viên phụ trách Ai, Big Data',
    image: '/assets/img/users/dhNghia.jpg',
    show: false,
    role: 'user',
  },

  {
    id: 4,
    name_vi: 'Trần Vi Khan',
    name_en: 'Khan Tran',
    position_vi: 'Thành viên phụ trách IoT',
    image: '/assets/img/users/tvKhan.jpg',
    show: false,
    role: 'user',
  },
]
const user = {
  role: 'admin',
}

export default function AdminUser() {
  return (
    <>
      <NewAccount />
      <article>
        <WebHead
          title="Thành viên | Admin"
          pageTitle="Thành viên | Admin"
          description="Quản lý website nhóm R&D"
        />
        <Layout>
          <Card
            bordered={false}
            title="Danh sách thành viên"
            extra={
              user.role === 'admin' && (
                <Tooltip title="Tạo tài khoản">
                  <Button type="primary" icon={<UserAddOutlined />}>
                    Tạo tài khoản
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
                        appItem.role === 'admin' ? (
                          <Tooltip title="Amin">
                            <KeyOutlined key="admin" />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Thành viên">
                            <UserOutlined key="user" />
                          </Tooltip>
                        ),
                        appItem.show ? (
                          <Tooltip title="Đang hiển thị ở trang tổ chức">
                            <PushpinOutlined key="show" />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Đang ẩn ở trang tổ chức">
                            <EyeInvisibleOutlined key="hide" />
                          </Tooltip>
                        ),
                        <Tooltip title="Chỉnh sửa thông tin">
                          <Link href="/admin/user/profile/1">
                            <EditOutlined
                              key="setting"
                              onClick={() => {
                                console.log('setting')
                              }}
                            />
                          </Link>
                        </Tooltip>,
                        <Tooltip title="Xóa thành viên">
                          <Popconfirm
                            title="Xác nhận xóa thành viên"
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
                        <Link href={'/profile/' + appItem.id}>
                          {appItem.name_vi}
                        </Link>
                      }
                      description={appItem.position_vi}
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
