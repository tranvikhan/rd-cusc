import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Popconfirm,
  Row,
  Select,
  Switch,
  Tabs,
  Tooltip,
  Space,
  Avatar,
} from 'antd'
import WebHead from '../../../../components/Layout/head'
import { DeleteOutlined, KeyOutlined, SaveOutlined } from '@ant-design/icons'
import Link from 'next/link'
import ImageUpload from '../../../../components/Upload/imageUpload'
import moment from 'moment'
import ResetPassword from '../../../../components/Form/user/resetPassword'

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
]
const user = {
  role: 'admin',
}
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

export default function AdminUser() {
  return (
    <>
      <ResetPassword />
      <article>
        <WebHead
          title="Trần Hoàng Việt | Admin"
          pageTitle="Trần Hoàng Việt | Admin"
          description="Quản lý website nhóm R&D"
        />
        <Layout>
          <Card
            bordered={false}
            title="Thông tin thành viên"
            extra={
              <Space size="middle">
                <Tooltip title="Lưu thông tin">
                  <Button type="primary" disabled icon={<SaveOutlined />}>
                    Lưu
                  </Button>
                </Tooltip>
                <Tooltip title="Đổi mật khẩu">
                  <Button icon={<KeyOutlined />}></Button>
                </Tooltip>
                <Tooltip title="Xóa tài khoản">
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xóa tài khoản này khỏi hệ thống"
                    okText="Chấp nhập"
                    cancelText="Hủy"
                  >
                    <Button type="danger" icon={<DeleteOutlined />}></Button>
                  </Popconfirm>
                </Tooltip>
              </Space>
            }
          >
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="form_user"
            >
              <Tabs defaultActiveKey="1">
                {/* Tab Thông tin chung ---------------------------------------------------- */}
                <Tabs.TabPane tab="Thông tin chung" key="1">
                  <Row gutter={[16, 16]}>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item
                        label="Họ tên (vi)"
                        name="name_vi"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập tên tiếng Việt',
                          },
                        ]}
                      >
                        <Input placeholder="Tên tiếng Việt" />
                      </Form.Item>
                      <Form.Item
                        label="Họ tên (en)"
                        name="name_en"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập tên tiếng Anh',
                          },
                        ]}
                      >
                        <Input placeholder="Tên tiếng Anh" />
                      </Form.Item>
                      <Form.Item
                        label="Vị trí làm việc (vi)"
                        name="position_vi"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập vị trí làm việc tiếng Việt',
                          },
                        ]}
                      >
                        <Input placeholder="Vị trí làm việc tiếng Việt" />
                      </Form.Item>
                      <Form.Item
                        label="Vị trí làm việc (en)"
                        name="position_en"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập vị trí làm việc tiếng Anh',
                          },
                        ]}
                      >
                        <Input placeholder="Vị trí làm việc tiếng Anh" />
                      </Form.Item>
                      <Form.Item label="Trích dẫn (vi)" name="saying_vi">
                        <Input.TextArea
                          showCount
                          rows={4}
                          maxLength={600}
                          placeholder="Nhập trích dẫn tiếng Việt"
                        />
                      </Form.Item>
                      <Form.Item label="Trích dẫn (en)" name="saying_en">
                        <Input.TextArea
                          showCount
                          rows={4}
                          maxLength={600}
                          placeholder="Nhập trích dẫn tiếng Anh"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item label="Quốc tịch (vi)" name="national_vi">
                        <Input placeholder="Việt Nam" />
                      </Form.Item>
                      <Form.Item label="Quốc tịch (en)" name="national_en">
                        <Input placeholder="Viet Nam" />
                      </Form.Item>
                      <Form.Item label="Giới tính" name="gender">
                        <Select defaultValue="male" style={{ width: '100%' }}>
                          <Select.Option value="male">Nam</Select.Option>
                          <Select.Option value="female">Nữ</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="Ngày sinh" name="birth_day">
                        <DatePicker
                          style={{ width: '100%' }}
                          defaultValue={moment('01/01/1990', dateFormatList[0])}
                          format={dateFormatList}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Ảnh đại diện"
                        name="image"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng chọn ảnh đại diện',
                          },
                        ]}
                      >
                        <ImageUpload />
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tài khoản" key="2">
                  {/* Tab Tài khoản ---------------------------------------------------- */}
                  <Row gutter={[16, 16]}>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item label="Mã tài khoản" name="id">
                        <Input placeholder="Mã tài khoản" disabled />
                      </Form.Item>
                      <Form.Item label="Tên đăng nhập" name="username">
                        <Input placeholder="Tên đăng nhập" disabled />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item label="Quyền truy cập" name="role">
                        <Select defaultValue="user" style={{ width: '100%' }}>
                          <Select.Option value="user">Thành viên</Select.Option>
                          <Select.Option value="admin">
                            Quản trị (Admin)
                          </Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="show"
                        label="Hiển thị thành viên trên trang tổ chức"
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Liên hệ" key="3">
                  {/* Tab Liên hệ---------------------------------------------------- */}
                  <Row gutter={[16, 16]}>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item label="Email" name="email">
                        <Input placeholder="Nhập email" />
                      </Form.Item>
                      <Form.Item label="Số điện thoại" name="phone">
                        <Input placeholder="Nhập số điện thoại" />
                      </Form.Item>
                      <Form.Item label="CV" name="cv">
                        <Input placeholder="Nhập đường dẫn đến file cv" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item label="Địa chỉ (vi)" name="address_vi">
                        <Input placeholder="Nhập địa chỉ tiếng Việt" />
                      </Form.Item>
                      <Form.Item label="Địa chỉ (en)" name="address_en">
                        <Input placeholder="Nhập địa chỉ tiếng Anh" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Tabs.TabPane>
              </Tabs>
            </Form>
          </Card>
        </Layout>
      </article>
    </>
  )
}
