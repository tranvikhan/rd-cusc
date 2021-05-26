import { Form, Input, Button, Checkbox, Typography, Alert, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../../../hook/useAuth'

const { Title } = Typography
const Login = () => {
  const { login, error, loading } = useAuth()
  const onFinish = (values) => {
    login(values)
  }

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="flex flex-row bg-white rounded shadow-lg">
          <div className="lg:flex hidden">
            <img
              src="/assets/img/cuscsoft-small-ps.jpg"
              className="h-96 rounded-l"
            />
          </div>
          <Spin spinning={loading}>
            <div className="flex flex-col space-y-2 justify-center items-center p-6">
              <Title level={4}>ĐĂNG NHẬP</Title>
              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  className="w-full"
                />
              )}
              <Form
                name="normal_login"
                className="lg:w-60 w-full"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Tên đăng nhập"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Mật khẩu"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Ghi nhớ tôi</Checkbox>
                  </Form.Item>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button w-full"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Spin>
        </div>
        <div className="lg:absolute hidden bottom-0 left-0 right-0 text-center p-4 text-sm font-medium text-gray-400">
          © 2021 CUSC Software - R&D Department. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Login
