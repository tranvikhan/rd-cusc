import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {
  Layout,
  Menu,
  Select,
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
  Form,
  Input,
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
  CodeOutlined,
  TeamOutlined,
  MailOutlined,
  FormOutlined,
  ProjectOutlined,
} from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout
const { Option, OptGroup } = Select
const { SubMenu } = Menu

function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = React.useState(true)
  const [form] = Form.useForm()

  const [requiredMark, setRequiredMarkType] = React.useState(false)

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue)
  }
  const router = useRouter()

  const onCollapse = () => {
    console.log(collapsed)
    setCollapsed(!collapsed)
  }

  const menuUser = (
    <Menu>
      <div className="p-4">
        <Title level={5}>Trần Hoàng Việt</Title>
        <Text>thviet@cit.ctu.edu.vn</Text>
        <Divider style={{ margin: '8px 0' }} />
      </div>
      <Menu.Item icon={<InfoCircleOutlined />}>Thông tin</Menu.Item>
      <Menu.Item icon={<CodeOutlined />}>
        <Link href="/test">Console</Link>
      </Menu.Item>
      <Menu.Item danger icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  )
  const contentNotification = (
    <Space direction="vertical">
      <Space
        direction="vertical"
        style={{ width: 350, height: 400, overflowY: 'auto' }}
      >
        <Alert
          message="Success Tips"
          description="Detailed description and advice about successful copywriting."
          type="success"
          showIcon
          closable
        />
        <Alert
          message="Informational Notes"
          description="Additional description and information about copywriting."
          type="info"
          showIcon
          closable
        />
        <Alert
          message="Warning"
          description="This is a warning notice about copywriting."
          type="warning"
          showIcon
          closable
        />
        <Alert
          message="Error"
          description="This is an error message about copywriting."
          type="error"
          showIcon
          closable
        />
        <Alert
          message="Lời mời cộng tác"
          description="Vi Khan mời bạn cùng quản lý kho 'Nấm rơm 5' lúc 15:30:20 01/04/2021"
          type="info"
          action={
            <Space direction="vertical">
              <Button size="small" block type="primary">
                Chấp nhận
              </Button>
              <Button size="small" block danger type="ghost">
                Từ chối
              </Button>
            </Space>
          }
          closable
        />
      </Space>
      <Button block type="link" danger>
        Xóa tất cả
      </Button>
    </Space>
  )
  return (
    <>
      {(router.asPath.split('/')[1] === 'admin' &&
        router.asPath.split('/')[2] === 'auth') ||
      !router.asPath.split('/')[2] ? (
        <div> {children}</div>
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
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
                <Link href="/admin/dashboard">Tổng quan</Link>
              </Menu.Item>

              <Menu.Item key="feedback" icon={<MailOutlined />}>
                <Link href="/admin/feedback">Phản hồi</Link>
              </Menu.Item>

              <Menu.Item key="project" icon={<ProjectOutlined />}>
                <Link href="/admin/project">Dự án</Link>
              </Menu.Item>

              <Menu.Item key="post" icon={<FormOutlined />}>
                <Link href="/admin/post">Bài viết</Link>
              </Menu.Item>

              <Menu.Item key="user" icon={<TeamOutlined />}>
                <Link href="/admin/user">Thành viên</Link>
              </Menu.Item>

              <Menu.Item key="app" icon={<AppstoreOutlined />}>
                <Link href="/admin/app">Ứng dụng</Link>
              </Menu.Item>
              <Menu.Item key="setting" icon={<SettingOutlined />}>
                <Link href="/admin/setting">Cài đặt</Link>
              </Menu.Item>
              <Menu.Item key="about" icon={<QuestionCircleOutlined />}>
                <Link href="/admin/about">Thông tin</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-header">
              <Row>
                <Col span={24} className="text-right">
                  <Space size="middle">
                    <Popover
                      title="Thông báo"
                      content={contentNotification}
                      trigger="click"
                      placement="bottomRight"
                    >
                      <Badge count={1}>
                        <Button shape="circle" icon={<BellOutlined />} />
                      </Badge>
                    </Popover>
                    <Dropdown overlay={menuUser}>
                      <div className="rounded-full mb-1 cursor-pointer">
                        <Avatar src="/assets/img/users/thViet.jpg" />
                      </div>
                    </Dropdown>
                  </Space>
                </Col>
              </Row>
            </Header>
            <Content className="container m-auto p-4">{children}</Content>
            <Footer className="text-center">
              <Text type="secondary">
                © 2021 CUSC Software - R&D Department. All rights reserved.
              </Text>
            </Footer>
          </Layout>
        </Layout>
      )}
    </>
  )
}

export default AdminLayout
