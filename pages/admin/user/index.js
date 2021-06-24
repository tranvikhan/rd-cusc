import {
  Button,
  Card,
  Layout,
  List,
  Popconfirm,
  Tooltip,
  Space,
  message,
} from 'antd'
import WebHead from '../../../components/Layout/head'
import {
  EditOutlined,
  PushpinOutlined,
  EyeInvisibleOutlined,
  UserAddOutlined,
  DeleteOutlined,
  UserOutlined,
  KeyOutlined,
  SyncOutlined,
  SketchOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import NewAccount from '../../../components/Form/user/newAccount'
import { useAuth } from '../../../hook/useAuth'
import { deleteUserAPI, getAllUserAPI } from '../../../axios/user'
import useSWR from 'swr'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

const { Meta } = Card
const userFetcher = async (type) => {
  return await getAllUserAPI()
}

export default function AdminUser() {
  const { user } = useAuth()
  const { data, error, isValidating, mutate } = useSWR('getUser', userFetcher, {
    revalidateOnFocus: false,
  })
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    if (error) {
      message.error(error.info, 2)
    }
  }, [error])
  const [modalNewAccount, setModalNewAccount] = React.useState(false)
  return (
    <>
      {modalNewAccount && (
        <NewAccount
          user={user}
          data={data ? data : []}
          isShow={modalNewAccount}
          toggle={(type) => {
            if (type === 'success') {
              mutate()
            }
            setModalNewAccount(false)
          }}
        />
      )}
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
            loading={isValidating || loading}
            extra={
              <Space size="middle">
                {user.role === 'root' && (
                  <Tooltip title="Tạo tài khoản">
                    <Button
                      type="primary"
                      icon={<UserAddOutlined />}
                      onClick={() => {
                        setModalNewAccount(true)
                      }}
                    >
                      Tạo tài khoản
                    </Button>
                  </Tooltip>
                )}
                <Tooltip title="Làm mới">
                  <Button
                    icon={<SyncOutlined />}
                    onClick={() => {
                      mutate()
                    }}
                  />
                </Tooltip>
              </Space>
            }
          >
            <List
              grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 4 }}
              dataSource={data ? data : []}
              renderItem={(userItem) => (
                <List.Item>
                  <Card
                    type="inner"
                    actions={
                      user.role === 'root' && [
                        userItem.role === 'admin' ? (
                          <Tooltip title="Admin">
                            <KeyOutlined key="admin" />
                          </Tooltip>
                        ) : userItem.role === 'root' ? (
                          <Tooltip title="Root">
                            <SketchOutlined key="root" />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Thành viên">
                            <UserOutlined key="user" />
                          </Tooltip>
                        ),
                        userItem.show ? (
                          <Tooltip title="Đang hiển thị ở trang tổ chức">
                            <PushpinOutlined key="show" />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Đang ẩn ở trang tổ chức">
                            <EyeInvisibleOutlined key="hide" />
                          </Tooltip>
                        ),
                        <Tooltip title="Chỉnh sửa thông tin">
                          <EditOutlined
                            key="setting"
                            onClick={() => {
                              router.push('/admin/user/profile/' + userItem.id)
                            }}
                          />
                        </Tooltip>,

                        <Popconfirm
                          disabled={userItem.role === 'root'}
                          title="Xác nhận xóa thành viên"
                          okText="OK"
                          cancelText="Hủy"
                          key="delete"
                          onConfirm={() => {
                            if (user) {
                              setLoading(true)
                              deleteUserAPI(userItem.id, user.jwt)
                                .then((res) => {
                                  mutate()
                                  setLoading(false)
                                  message.success(res.message, 1.5)
                                })
                                .catch((err) => {
                                  setLoading(false)
                                  message.error(err.info, 1.5)
                                })
                            } else {
                              message.error('Lỗi xác thực người dùng', 1.5)
                            }
                          }}
                        >
                          <DeleteOutlined />
                        </Popconfirm>,
                      ]
                    }
                    cover={
                      <img
                        className="object-cover h-44 w-full filter brightness-90"
                        alt={userItem.name_vi}
                        src={'/' + userItem.avatar}
                      />
                    }
                  >
                    <Meta
                      title={
                        <Link href={'/profile/' + userItem.id}>
                          {userItem.name_vi}
                        </Link>
                      }
                      description={userItem.position_vi}
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
