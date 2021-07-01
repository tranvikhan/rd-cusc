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
  Typography,
  message,
  Avatar,
} from 'antd'
import WebHead from '../../../../components/Layout/head'
import { DeleteOutlined, KeyOutlined, SaveOutlined } from '@ant-design/icons'
import ImageUpload from '../../../../components/Upload/imageUpload'
import moment from 'moment'
import ResetPassword from '../../../../components/Form/user/resetPassword'
import { useAuth } from '../../../../hook/useAuth'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import {
  deleteUserAPI,
  editUserAPI,
  getDetailUserAPI,
  uploadAvatarAPI,
} from '../../../../axios/user'
import useSWR from 'swr'

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

const userFetcher = async (type, id) => {
  return await getDetailUserAPI(id)
}
export default function AdminUser() {
  const [form] = Form.useForm()
  const [file, setFile] = React.useState(null)
  const [defaultFileURL, setDefaultFileURL] = React.useState(null)
  const [checkRole, setCheckRole] = React.useState(false)
  const [resetPasswordModal, setResetPasswordModal] = React.useState(false)
  const router = useRouter()
  const { user, refreshUserInfo } = useAuth()
  const handelFileUpload = useCallback((file) => {
    setFile(file)
  }, [])
  const { data, error, isValidating, mutate } = useSWR(
    ['getUserDetailEdit', parseInt(router.query.slug)],
    userFetcher,
    {
      revalidateOnFocus: false,
    }
  )
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const { slug } = router.query
    if (user.role === 'root' || user.id === parseInt(slug)) {
      setCheckRole(true)
    }
  }, [user, router])
  React.useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        birth_day: moment(data.birth_day),
      })
      setDefaultFileURL(data.avatar)
    }
  }, [data, form])
  const handelError = useCallback((error) => {
    error.errorFields.forEach((ls) => {
      ls.errors.forEach((ms) => {
        message.error(ms, 1.5)
      })
    })
  }, [])
  const handelFinish = useCallback(
    (values) => {
      setLoading(true)
      if (user && data) {
        editUserAPI(
          parseInt(router.query.slug),
          { ...values, avatar: data.avatar },
          user.jwt
        )
          .then((res) => {
            setLoading(false)
            if (file) {
              uploadAvatarAPI(file, parseInt(router.query.slug), user.jwt)
                .then((res) => {
                  message.success(res.message, 2).then(() => {
                    if (user.id === parseInt(router.query.slug))
                      refreshUserInfo()
                  })
                })
                .catch((err) => {
                  message.success(res.message, 2).then(() => {
                    if (user.id === parseInt(router.query.slug))
                      refreshUserInfo()
                  })
                })
            } else {
              message.success(res.message, 2).then(() => {
                mutate()
                if (user.id === parseInt(router.query.slug)) refreshUserInfo()
              })
            }
          })
          .catch((err) => {
            setLoading(false)
            message.error(err.info, 2)
          })
      } else {
        message.error('Lỗi xác thực người dùng', 1.5)
      }
    },
    [user, router.query.slug, file, data]
  )
  return (
    <>
      {user && resetPasswordModal && (
        <ResetPassword
          user={user}
          userId={parseInt(router.query.slug)}
          isShow={resetPasswordModal}
          togle={() => {
            setResetPasswordModal(false)
          }}
        />
      )}
      <article>
        <WebHead
          title="Thông tin thành viên | Admin"
          pageTitle="Thông tin thành viên | Admin"
          description="Quản lý website nhóm R&D"
        />
        <Layout>
          <Card
            loading={isValidating || loading}
            bordered={false}
            title={
              data ? (
                <Space align="center">
                  <Avatar src={'/api/' + data.avatar} />
                  <Typography.Text level={5}>{data.name_vi}</Typography.Text>
                </Space>
              ) : (
                'Thông tin thành viên ...'
              )
            }
            extra={
              <Space size="middle">
                {checkRole && (
                  <>
                    <Tooltip title="Lưu thông tin">
                      <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={() => form.submit()}
                      >
                        Lưu
                      </Button>
                    </Tooltip>
                    <Tooltip title="Đổi mật khẩu">
                      <Button
                        icon={<KeyOutlined />}
                        onClick={() => {
                          setResetPasswordModal(true)
                        }}
                      ></Button>
                    </Tooltip>
                  </>
                )}

                {user && user.role === 'root' && router.query.slug != '1' && (
                  <Tooltip title="Xóa tài khoản">
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xóa tài khoản này khỏi hệ thống"
                      okText="Chấp nhập"
                      cancelText="Hủy"
                      onConfirm={() => {
                        if (user) {
                          setLoading(true)
                          deleteUserAPI(parseInt(router.query.slug), user.jwt)
                            .then((res) => {
                              message.success(res.message, 1.5).then(() => {
                                router.push('/admin/user')
                              })
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
                      <Button type="danger" icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                  </Tooltip>
                )}
              </Space>
            }
          >
            <Form
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="form_user"
              onFinishFailed={handelError}
              onFinish={handelFinish}
            >
              <Tabs defaultActiveKey="1">
                {/* Tab Thông tin chung ---------------------------------------------------- */}
                <Tabs.TabPane tab="Thông tin chung" key="1">
                  <Row gutter={[16, 16]}>
                    <Col lg={12} md={24} xs={24}>
                      <Form.Item
                        disabled={!checkRole}
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
                        disabled={!checkRole}
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
                        disabled={!checkRole}
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
                        disabled={!checkRole}
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
                      <Form.Item label="Ảnh đại diện" name="avatar">
                        <ImageUpload
                          file={file}
                          onChange={handelFileUpload}
                          defaultFileURL={defaultFileURL}
                        />
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
                        <Select
                          defaultValue="user"
                          style={{ width: '100%' }}
                          disabled={
                            (user && user.role !== 'root') ||
                            router.query.slug == '1'
                          }
                        >
                          <Select.Option value="user">Thành viên</Select.Option>
                          <Select.Option value="admin">
                            Quản trị (Admin)
                          </Select.Option>

                          {router.query.slug == '1' && (
                            <Select.Option value="root">Root</Select.Option>
                          )}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="show"
                        label="Hiển thị thành viên trên trang tổ chức"
                        valuePropName="checked"
                      >
                        <Switch
                          disabled={
                            (user && user.role !== 'root') ||
                            router.query.slug == '1'
                          }
                        />
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
