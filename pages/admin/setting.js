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
              <Form
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
                layout="horizontal"
              >
                <Form.Item label="Giao diện" name="theme">
                  <Radio.Group value="light">
                    <Radio.Button value="light">Sáng</Radio.Button>
                    <Radio.Button value="dark">Tối</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Thông báo">
                  <Switch checked />
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout>
    </article>
  )
}
