import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Badge,
  Popover,
  Space,
  Alert,
  notification,
  Empty,
  message,
} from 'antd'
const { Text, Title } = Typography

import {
  DesktopOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  BellOutlined,
  AppstoreOutlined,
  TeamOutlined,
  MailOutlined,
  FormOutlined,
  ProjectOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useAuth } from '../../hook/useAuth'
import useSWR from 'swr'
import {
  getAllNotiAPI,
  deleteAllNotiAPI,
  deleteOneNotiAPI,
} from '../../axios/notification'

const { Header, Content, Footer, Sider } = Layout
const notiFetcher = async (type, user) => {
  if (user) return await getAllNotiAPI(user.jwt)
  return null
}
function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = React.useState(true)
  const [loginLayout, setLoginLayout] = React.useState(false)
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const { data, error, mutate } = useSWR(['getAllNoti', user], notiFetcher, {
    refreshInterval: 1000,
  })

  const onCollapse = () => {
    console.log(collapsed)
    setCollapsed(!collapsed)
  }
  React.useEffect(() => {
    data &&
      data.forEach((noti) => {
        if (noti.is_new === 1) {
          notification[noti.style]({
            key: noti.id,
            message: noti.name,
            description: noti.description,
            placement: 'bottomRight',
            duration: 2,
          })
        }
      })
  }, [data])
  React.useEffect(() => {
    let arr = router.asPath.split('/')
    if ((arr[1] === 'admin' && arr[2] === 'auth') || !arr[2]) {
      setLoginLayout(true)
      if (user) {
        router.replace('/admin/dashboard')
      }
    } else {
      setLoginLayout(false)
      if (!user) {
        router.replace('/admin/auth/login')
      }
    }
  }, [router.asPath, user])
  return (
    <>
      {loginLayout ? (
        <div> {children}</div>
      ) : (
        user != null && (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              onCollapse={onCollapse}
              className="site-layout-background"
            >
              <div className="flex justify-center items-center p-2">
                <img
                  src="/assets/img/whiteLogo.png"
                  alt="Logo"
                  className="h-12"
                />
              </div>

              <Menu
                theme="dark"
                selectedKeys={[router.asPath.split('/')[2]]}
                defaultSelectedKeys={[router.asPath.split('/')[2]]}
                mode="inline"
              >
                <Menu.Item key="dashboard" icon={<DesktopOutlined />}>
                  <Link href="/admin/dashboard">T???ng quan</Link>
                </Menu.Item>

                {user.role !== 'user' && (
                  <Menu.Item key="feedback" icon={<MailOutlined />}>
                    <Link href="/admin/feedback">Ph???n h???i</Link>
                  </Menu.Item>
                )}

                <Menu.Item key="project" icon={<ProjectOutlined />}>
                  <Link href="/admin/project">D??? ??n</Link>
                </Menu.Item>

                <Menu.Item key="post" icon={<FormOutlined />}>
                  <Link href="/admin/post">B??i vi???t</Link>
                </Menu.Item>

                <Menu.Item key="user" icon={<TeamOutlined />}>
                  <Link href="/admin/user">Th??nh vi??n</Link>
                </Menu.Item>

                <Menu.Item key="app" icon={<AppstoreOutlined />}>
                  <Link href="/admin/app">???ng d???ng</Link>
                </Menu.Item>
                {user.role === 'root' && (
                  <Menu.Item key="setting" icon={<SettingOutlined />}>
                    <Link href="/admin/setting">C??i ?????t</Link>
                  </Menu.Item>
                )}
                <Menu.Item key="about" icon={<QuestionCircleOutlined />}>
                  <Link href="/admin/about">Th??ng tin</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-header">
                <Row>
                  <Col span={4} className="text-left">
                    {React.createElement(
                      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                      {
                        className: 'trigger',
                        onClick: () => {
                          setCollapsed(!collapsed)
                        },
                      }
                    )}
                  </Col>
                  <Col span={20} className="text-right">
                    <Space size="middle">
                      <Popover
                        title="Th??ng b??o"
                        content={
                          <Space direction="vertical">
                            <Space
                              direction="vertical"
                              style={{
                                width: 350,
                                height: 400,
                                overflowY: 'auto',
                              }}
                            >
                              {data && data.length > 0 ? (
                                data.map((noti) => (
                                  <Alert
                                    type={noti.style}
                                    description={noti.description}
                                    message={
                                      <Link href={noti.link}>
                                        <span className="text-gray-900 cursor-pointer hover:text-indigo-800">
                                          {noti.name}
                                        </span>
                                      </Link>
                                    }
                                    key={noti.id}
                                    showIcon
                                    onClose={() => {
                                      deleteOneNotiAPI(noti.id, user.jwt)
                                        .then((data) => {
                                          message.success(data.message, 0.5)
                                          mutate()
                                        })
                                        .catch((err) => {
                                          message.error(err.info, 0.5)
                                        })
                                    }}
                                    closable
                                  />
                                ))
                              ) : (
                                <Empty description={false} />
                              )}
                            </Space>
                            {data && data.length != 0 && (
                              <Button
                                block
                                type="link"
                                danger
                                onClick={() => {
                                  deleteAllNotiAPI(user.jwt)
                                    .then((data) => {
                                      message.success(data.message, 0.5)
                                      mutate()
                                    })
                                    .catch((err) => {
                                      message.error(err.info, 0.5)
                                    })
                                }}
                              >
                                X??a t???t c???
                              </Button>
                            )}
                          </Space>
                        }
                        trigger="click"
                        placement="bottomRight"
                      >
                        <Badge count={data && data.length}>
                          <Button shape="circle" icon={<BellOutlined />} />
                        </Badge>
                      </Popover>
                      <Dropdown
                        overlay={
                          <Menu>
                            <div className="p-4">
                              <Title level={5}>{user.name_vi}</Title>
                              <Text>{user.username}</Text>
                              <Divider style={{ margin: '8px 0' }} />
                            </div>
                            <Menu.Item
                              icon={<InfoCircleOutlined />}
                              onClick={() => {
                                router.push('/profile/' + user.id)
                              }}
                            >
                              Th??ng tin
                            </Menu.Item>
                            <Menu.Item
                              icon={<EditOutlined />}
                              onClick={() => {
                                router.push('/admin/user/profile/' + user.id)
                              }}
                            >
                              Ch???nh s???a
                            </Menu.Item>
                            <Menu.Item
                              danger
                              icon={<LogoutOutlined />}
                              onClick={() => {
                                logout()
                              }}
                            >
                              ????ng xu???t
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <div className="rounded-full mb-1 cursor-pointer">
                          <Avatar src={'/api/' + user.avatar} />
                        </div>
                      </Dropdown>
                    </Space>
                  </Col>
                </Row>
              </Header>
              <Content className="container m-auto p-4">{children}</Content>
              <Footer className="text-center">
                <Text type="secondary">
                  ?? 2021 CUSC Software - R&D Department. All rights reserved.
                </Text>
              </Footer>
            </Layout>
          </Layout>
        )
      )}
    </>
  )
}

export default AdminLayout
