import {
  Card,
  Col,
  Layout,
  Row,
  Typography,
  Divider,
  Form,
  Button,
  Radio,
  Switch,
  Tabs,
  Input,
} from 'antd'
import WebHead from '../../components/Layout/head'

import Link from 'next/link'

const { Title, Paragraph, Text } = Typography

const { Meta } = Card
export default function AdminSetting() {
  return (
    <article>
      <WebHead
        title="Cài đặt | Admin"
        pageTitle="Cài đặt | Admin"
        description="Quản lý website nhóm R&D"
      />
      <Layout>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card bordered={false} title="Cài đặt">
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Trang chủ" key="homepage">
                  <HomePageSetting />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Trang dự án" key="projectpage">
                  <ProjectPageSetting />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Trang tin tức" key="newspage">
                  <NewsPageSetting />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Trang tổ chức" key="organization">
                  <OrganizationPageSetting />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Email tự động" key="auto email">
                  <AutoEmailSetting />
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Layout>
    </article>
  )
}

const HomePageSetting = (props) => {
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="horizontal">
      <Form.Item
        label="Hiển thị 3 dự án nghiên cứu"
        name="project_homePage_mode"
      >
        <Radio.Group buttonStyle="solid" defaultValue="auto">
          <Radio.Button value="auto">Tự động</Radio.Button>
          <Radio.Button value="manual">Tùy chỉnh</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        validateStatus="success"
        label="Dự án 1"
        name="project_1"
        hasFeedback
      >
        <Input placeholder="ID dự án 1" />
      </Form.Item>
      <Form.Item
        validateStatus="success"
        label="Dự án 2"
        name="project_2"
        hasFeedback
      >
        <Input placeholder="ID dự án 2" />
      </Form.Item>
      <Form.Item
        validateStatus="success"
        label="Dự án 3"
        name="project_3"
        hasFeedback
      >
        <Input placeholder="ID dự án 3" />
      </Form.Item>
      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          Lưu cài đặt
        </Button>
      </Form.Item>
    </Form>
  )
}

const ProjectPageSetting = (props) => {
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="horizontal">
      <Form.Item label="Hiển dự án chính" name="project_projectPage_mode">
        <Radio.Group buttonStyle="solid" defaultValue="auto">
          <Radio.Button value="auto">Dự án mới nhất</Radio.Button>
          <Radio.Button value="manual">Tùy chỉnh</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        validateStatus="success"
        label="Dự án tủy chỉnh"
        name="project_projectPage"
        hasFeedback
      >
        <Input placeholder="ID dự án" />
      </Form.Item>

      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          Lưu cài đặt
        </Button>
      </Form.Item>
    </Form>
  )
}

const NewsPageSetting = (props) => {
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="horizontal">
      <Form.Item label="Hiển bài viết chính" name="post_newsPage_mode">
        <Radio.Group buttonStyle="solid" defaultValue="auto">
          <Radio.Button value="auto">Bài viết mới nhất</Radio.Button>
          <Radio.Button value="manual">Tùy chỉnh</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        validateStatus="success"
        label="Bài viết tùy chỉnh"
        name="post_newPage"
        hasFeedback
      >
        <Input placeholder="ID bài viết" />
      </Form.Item>

      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          Lưu cài đặt
        </Button>
      </Form.Item>
    </Form>
  )
}

const OrganizationPageSetting = (props) => {
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="horizontal">
      <Form.Item label="Thành viên chính" name="user_organizationPage_mode">
        <Radio.Group buttonStyle="solid" defaultValue="auto">
          <Radio.Button value="auto">Người dùng root</Radio.Button>
          <Radio.Button value="manual">Tùy chỉnh</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        validateStatus="success"
        label="Thành viên tùy chỉnh"
        name="user_organizationPage"
        hasFeedback
      >
        <Input placeholder="ID thành viên" />
      </Form.Item>

      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          Lưu cài đặt
        </Button>
      </Form.Item>
    </Form>
  )
}

const AutoEmailSetting = (props) => {
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="horizontal">
      <Form.Item label="Trạng thái kích hoạt" name="auto_email_mode">
        <Radio.Group buttonStyle="solid" defaultValue="off">
          <Radio.Button value="off">Tắt</Radio.Button>
          <Radio.Button value="on">Bật</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Row gutter={[16, 16]}>
        <Col lg={12} md={24} xs={24}>
          <Form.Item
            label="Email"
            name="email_autoEmail"
            rules={[{ required: true, message: 'Vui lòng nhập email admin' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Host"
            name="host_autoEmail"
            rules={[
              { required: true, message: 'Vui lòng nhập máy chủ hộp thư' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Port"
            name="port_autoEmail"
            rules={[{ required: true, message: 'Vui lòng nhập cổng dịch vụ' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username_autoEmail"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên đăng nhập dịch vụ email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password_autoEmail"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu dịch vụ email',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={12} md={24} xs={24}>
          <Form.Item
            label="Tiêu đề"
            name="subject_autoEmail"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tiêu đề email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nội dung HTML"
            name="subject_autoEmail"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập nội dung email (html)',
              },
            ]}
          >
            <Input.TextArea rows={14} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          Lưu cài đặt
        </Button>
      </Form.Item>
    </Form>
  )
}
